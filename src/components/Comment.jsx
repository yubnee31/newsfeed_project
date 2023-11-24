import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import TimeForComment from '../shared/TimeForComment';
import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

export default function Comment() {
  const navigate = useNavigate();
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
          console.log(commentsList);
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
      console.error('Error adding comment: ', error);
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
  //     console.error('Error update comment: ', error);
  //   }
  // };

  const deleteComment = async (event, commentId) => {
    // event.preventDefault();
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      const commentsList = comments.filter((comment) => comment.docId !== commentId);
      setComments(commentsList);
    } catch (error) {
      console.error('Error deletinf comment: ', error);
    }
  };

  return (
    <div>
      <div>
        <h1>댓글</h1>
        <div>
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
        </div>
        <div>
          {/* <ul> */}
          {comments.map((comment) => (
            <div key={comment.docId}>
              <p>{comment.text}</p>
              <p>{comment.createdAt.toLocaleString()}</p>
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
    </div>
  );
}
