import React, { useEffect, useState } from 'react';
import { auth, db } from 'firebase';

// import styled from 'styled-components';

function Comment() {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const userIn = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => userIn();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchComments = async () => {
        try {
          const snapshot = await db.collection('comments').where('userId', '==', user.uid).get();
          const commentsDate = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(commentsDate);
        } catch (error) {
          console.error('Error fetching comments', error);
        }
      };

      fetchComments();
    }
  }, [user]);

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = async () => {
    try {
      await db.collection('comments').add({
        text: newComment,
        userId: user.uid,
        createdAt: new Date()
      });
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await db.collection('comments').doc(commentId).delete();
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deletinf comment: ', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>댓글</h1>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                {comment.text}
                {comment.userId === user.uid && <button onClick={() => deleteComment(comment.id)}>삭제</button>}
              </li>
            ))}
          </ul>
          <div>
            <input type="text" value={newComment} onChange={handleInputChange} placeholder="댓글을 입력하세요" />
            <button onClick={addComment}>댓글추가</button>
          </div>
        </div>
      ) : (
        <p>로그인 되지 않음</p>
      )}
      ;
    </div>
  );
}

export default Comment;
