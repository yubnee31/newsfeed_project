import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import TimeForComment from '../shared/TimeForComment';
import styled from 'styled-components';

// import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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
          const collections = collection(db, 'comments');

          const snapshot = await getDocs(collections);
          const commentsList = snapshot.docs.map((doc) => ({
            docId: doc.id,
            createdAt: doc.createdAt,
            ...doc.data()
          }));
          setComments(commentsList);
        } catch (error) {
          console.error('Error fetching comments', error);
        }
      };

      fetchComments();
    }
  }, [user]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = async (event) => {
    // event.preventDefault();
    try {
      const newItem = {
        createdAt: TimeForComment(),
        displayName: user.displayName,
        email: user.email,
        text: newComment,
        uid: user.uid
      };
      await addDoc(collection(db, 'comments'), newItem);
      setNewComment('');

      const collections = collection(db, 'comments');

      const snapshot = await getDocs(collections);
      const commentsList = snapshot.docs.map((doc) => ({
        docId: doc.id,
        createdAt: doc.createdAt,
        ...doc.data()
      }));
      setComments(commentsList);
    } catch (error) {
      console.error('Error addComment: ', error);
    }
  };

  // const updateComment = async (event, commentId) => {
  //   event.preventDefault();
  //   try {
  //     setNewComment('');
  //     await updateDoc(doc(db, 'comments', commentId), {
  //       text: newComment
  //     });
  //   } catch (error) {
  //     console.error('Error updateComment: ', error);
  //   }
  // };

  const deleteComment = async (event, docId) => {
    try {
      await deleteDoc(doc(db, 'comments', docId));
      const commentsList = comments.filter((comment) => comment.docId !== docId);
      setComments(commentsList);
    } catch (error) {
      console.error('Error deleteComment: ', error);
    }
  };

  return (
    <CommentList>
      <div>
        <h1>댓글</h1>
        <SetComment>
          <input
            type="text"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
            placeholder="댓글을 입력하세요"
          />
          <button type="button" onClick={() => addComment()}>
            댓글추가
          </button>
        </SetComment>
        <div>
          {/* <ul> */}
          {comments.map((comment) => (
            <div key={comment.docId}>
              <p>{comment.docId}</p>
              <p>{comment.text}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.displayName}</p>
              <p>{comment.email}</p>
              <p>
                {comment.uid === user.uid && (
                  <button type="button" onClick={() => handleCommentChange()}>
                    수정
                  </button>
                )}
              </p>
              <p>
                {comment.uid === user.uid && (
                  <button type="button" onClick={() => deleteComment(comment.docId)}>
                    삭제
                  </button>
                )}
              </p>
            </div>
          ))}
          {/* </ul> */}
        </div>
      </div>
    </CommentList>
  );
}
