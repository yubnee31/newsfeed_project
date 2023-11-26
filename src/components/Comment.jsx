import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import CommentTimeSave from '../shared/CommentTimeSave';
import CommentTimeShow from '../shared/CommentTimeShow';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aqua;
  padding: 50px;
  margin: 100px;
  gap: 12px;
  height: 100%;
`;

const Setform = styled.form`
  display: flex;
  justify-content: center;
  background-color: #758181;
  width: 1000px;
  height: 100px;
  align-items: center;
  margin: 20px;
  padding: 10px;
  & input {
    width: 900px;
    height: 100px;
    background-color: #000000;
    border-radius: 12px;
    text-align: center;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #758181;
  width: 1000px;
  height: 100%;
  margin: 20px;
  padding: 10px;
`;

const CommentInfo = styled.p`
  display: flex;
  background-color: #758181;
  width: 100%;
  height: 100%;
  margin: 20px;
  padding: 10px;

  & commentp {
    display: flex;
    padding: 10px 0;
  }

  & textp {
    display: flex;
    padding: 10px 0;
  }
`;

const CommentBtn = styled.button`
  display: flex;
  text-align: center;
  & button {
    background-color: #ab722374;
    color: #ab722374;
    font-size: 16px;
    padding: 6px 12px;
    cursor: pointer;
  }
`;

export default function Comment() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');

  const updateList = async () => {
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
      updateList();
    }
  }, [user]);

  const handleCommentEdit = (event, type, docId) => {
    event.preventDefault();
    updateEditForm(type, docId);
  };

  const addComment = async () => {
    try {
      const newItem = {
        createdAt: CommentTimeSave(),
        displayName: user.displayName,
        editForm: false,
        email: user.email,
        productId: params.id,
        text: newComment,
        uid: user.uid
      };
      await addDoc(collection(db, 'comments'), newItem);
      setNewComment('');

      updateList();
    } catch (error) {
      console.error('Error addComment: ', error);
    }
  };

  const updateEditForm = async (type, docId) => {
    try {
      await updateDoc(doc(db, 'comments', docId), {
        editForm: type
      });

      updateList();
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

        updateList();
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
        <Setform
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
        </Setform>
        <div>
          {comments.map((comment) =>
            comment.uid !== user.uid ? (
              <CommentDiv key={comment.docId}>
                <CommentInfo>
                  <textp>{comment.text}</textp>
                  <commentp>{comment.displayName}</commentp>
                  <commentp>{CommentTimeShow(comment.createdAt)}</commentp>
                </CommentInfo>
              </CommentDiv>
            ) : !comment.editForm ? (
              <CommentDiv key={comment.docId}>
                <CommentInfo>
                  <textp>{comment.text}</textp>
                  <commentp>{comment.displayName}</commentp>
                  <commentp>{CommentTimeShow(comment.createdAt)}</commentp>
                </CommentInfo>
                <CommentBtn>
                  <button type="button" onClick={(event) => handleCommentEdit(event, true, comment.docId)}>
                    수정
                  </button>
                  <button type="button" onClick={() => deleteComment(comment.docId)}>
                    삭제
                  </button>
                </CommentBtn>
              </CommentDiv>
            ) : (
              <CommentDiv key={comment.docId}>
                <CommentInfo>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setEditComment(event.target.value);
                      updateComment(comment.docId);
                    }}
                  >
                    <input
                      type="text"
                      defaultValue={comment.text}
                      onChange={(event) => {
                        event.preventDefault();
                        setEditComment(event.target.value);
                      }}
                    ></input>
                  </form>
                  <p>{comment.displayName}</p>
                  <p>{CommentTimeShow(comment.createdAt)}</p>
                </CommentInfo>
                <CommentBtn>
                  <button type="button" onClick={() => updateComment(comment.docId)}>
                    수정 완료
                  </button>
                  <button type="button" onClick={(event) => handleCommentEdit(event, false, comment.docId)}>
                    수정 취소
                  </button>
                  <button type="button" onClick={() => deleteComment(comment.docId)}>
                    삭제
                  </button>
                </CommentBtn>
              </CommentDiv>
            )
          )}
        </div>
      </div>
    </CommentList>
  );
}
