import React, { useState } from 'react';

function Comment() {
  const [comments, setComments] = useState([
    { id: 1, text: '첫 번째 댓글' },
    { id: 2, text: '두 번째 댓글' }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleInputChange = (e) => {
    setNewComment(e.tarpget.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newId = Math.max(...comments.map((Comment) => Comment.id)) + 1;
      const newComments = [...Comment, { id: newId, text: newComment }];
      setComments(newComments);
      setNewComment('');
    }
  };

  const handleEditComment = (id, newText) => {
    const updatedComments = comments.map((comment) => (comment.id === id ? { ...comment, text: newText } : comment));
    setComments(updatedComments);
  };

  const handleDeleteComment = (id) => {
    const filterComments = comments.filter((comment) => comment.id !== id);
    setComments(filterComments);
  };

  return (
    <div>
      <h2>댓글</h2>
      <input type="text" value={newComment} onChange={handleInputChange} placeholder="댓글을 입력하세요" />
      <button onClick={handleAddComment}>댓글등록</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => handleEditComment(comment.id, '수정된 댓글')}>수정</button>
            <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comment;
