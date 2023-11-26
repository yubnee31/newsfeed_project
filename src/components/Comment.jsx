import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import TimeForComment from '../shared/TimeForComment';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aqua;
  padding: 20px;
  gap: 12px;
`;

const SetComment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & input {
    width: 100px;
  }
`;

export default function Comment() {
  // const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchComments = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'comments'));
          const commentsList = snapshot.docs.map((doc) => ({
            docId: doc.id,
            createdAt: doc.createdAt,
            ...doc.data()
          }));
          const target = commentsList.filter((doc) => doc.productId === params.id);
          setComments(target);
        } catch (error) {
          console.error('Error fetching comments', error);
        }
      };

      fetchComments();
    }
  }, [user]);

  const handleCommentEdit = (event, docId) => {
    event.preventDefault();
    updateEditForm(docId);
  };

  const addComment = async () => {
    try {
      const newItem = {
        createdAt: TimeForComment(),
        displayName: user.displayName,
        editForm: false,
        email: user.email,
        productId: params.id,
        text: newComment,
        uid: user.uid
      };
      await addDoc(collection(db, 'comments'), newItem);
      setNewComment('');

      const snapshot = await getDocs(collection(db, 'comments'));
      const commentsList = snapshot.docs.map((doc) => ({
        docId: doc.id,
        createdAt: doc.createdAt,
        ...doc.data()
      }));
      const target = commentsList.filter((doc) => doc.productId === params.id);
      setComments(target);
    } catch (error) {
      console.error('Error addComment: ', error);
    }
  };

  const updateEditForm = async (docId) => {
    try {
      await updateDoc(doc(db, 'comments', docId), {
        editForm: true
      });

      const snapshot = await getDocs(collection(db, 'comments'));
      const commentsList = snapshot.docs.map((doc) => ({
        docId: doc.id,
        createdAt: doc.createdAt,
        ...doc.data()
      }));
      const target = commentsList.filter((doc) => doc.productId === params.id);
      setComments(target);
    } catch (error) {
      console.error('Error updateComment: ', error);
    }
  };

  const updateComment = async (docId) => {
    try {
      if (editComment !== '') {
        await updateDoc(doc(db, 'comments', docId), {
          text: editComment,
          editForm: false
        });
        setEditComment('');

        const snapshot = await getDocs(collection(db, 'comments'));
        const commentsList = snapshot.docs.map((doc) => ({
          docId: doc.id,
          createdAt: doc.createdAt,
          ...doc.data()
        }));
        const target = commentsList.filter((doc) => doc.productId === params.id);
        setComments(target);
      } else {
        window.alert('빈 문자열로 수정하는 것은 불가능합니다.');
      }
    } catch (error) {
      console.error('Error updateComment: ', error);
    }
  };

  const deleteComment = async (docId) => {
    try {
      const result = window.confirm('정말 삭제하시겠어요?');
      if (result) {
        await deleteDoc(doc(db, 'comments', docId));
        const commentsList = comments.filter((comment) => comment.docId !== docId);
        setComments(commentsList);
      }
    } catch (error) {
      console.error('Error deleteComment: ', error);
    }
  };

  return (
    <CommentList>
      <div>
        <h1>댓글</h1>
        <SetComment>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNewComment(event.target.value);
              addComment();
            }}
          >
            <input
              type="text"
              value={newComment}
              onChange={(event) => {
                event.preventDefault();
                setNewComment(event.target.value);
              }}
              placeholder="댓글을 입력하세요"
            />
            <button type="button" onClick={() => addComment()}>
              댓글추가
            </button>
          </form>
        </SetComment>
        <div>
          {comments.map((comment) =>
            comment.uid !== user.uid ? (
              <div key={comment.docId}>
                <p>{comment.text}</p>
                <p>{comment.createdAt}</p>
                <p>{comment.displayName}</p>
              </div>
            ) : !comment.editForm ? (
              <div key={comment.docId}>
                <p>{comment.text}</p>
                <p>{comment.createdAt}</p>
                <p>{comment.displayName}</p>
                <button type="button" onClick={(event) => handleCommentEdit(event, comment.docId)}>
                  수정
                </button>
                <button type="button" onClick={() => deleteComment(comment.docId)}>
                  삭제
                </button>
              </div>
            ) : (
              <div key={comment.docId}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setEditComment(event.target.value);
                    updateComment(comment.docId);
                  }}
                >
                  <input
                    type="text"
                    value={editComment}
                    onChange={(event) => {
                      event.preventDefault();
                      setEditComment(event.target.value);
                    }}
                    placeholder={comment.text}
                  ></input>
                </form>
                <p>{comment.createdAt}</p>
                <p>{comment.displayName}</p>
                <button type="button" onClick={() => updateComment(comment.docId)}>
                  수정 완료
                </button>
                <button type="button" onClick={() => deleteComment(comment.docId)}>
                  삭제
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </CommentList>
  );
}
