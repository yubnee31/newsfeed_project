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
`;

const Listh1 = styled.h1`
  font-size: 30px;
  text-decoration-color: #ab7323;
  color: #ab7323;
  margin: 20px;
  padding: 10px;
`;

const Setform = styled.form`
  display: flex;
  position:relative;
  width: 1000px;
  height: 100px;
  align-items: center;
  margin: 20px;
  padding: 10px;
  & input {
    width: 800px;
    height: 100px;
    border-radius: 12px;
    border: 3px solid #ab7323;
    text-align: center;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
  width: 1000px;
  height: 200px;
  margin: 10px;
  border-radius: 12px;
  border: 3px solid #ab7323;
`;

const CommentInfo = styled.p`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 20px;
  margin: 100px;

  & commentp {
    display: flex;
    padding: 0px 0;
  }

  & textp {
    display: flex;
    padding: 10px 0;
  }
`;

const CommentBtn = styled.button`
  position: absolute;
  right: 100px;
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const Addbutton = styled.button`
  position: absolute;
  right: 50px;
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const EditBtn = styled.button`
  position: absolute;
  right: 50px;
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:5px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
`;
const CommentInput = styled.input`
  outline: none;
  font-size: 20px;
`
const Button = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
`
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
        <Listh1>댓글</Listh1>
        <Setform
          onSubmit={(event) => {
            event.preventDefault();
            setNewComment(event.target.value);
            addComment();
          }}
        >
          <CommentInput
            type="text"
            value={newComment}
            onChange={(event) => {
              event.preventDefault();
              setNewComment(event.target.value);
            }}
            placeholder="댓글을 입력하세요"
          />
          <Addbutton type="button" onClick={() => addComment()}>
            댓글추가
          </Addbutton>
        </Setform>
        <div>
          {comments.map((comment) =>
            comment.uid !== user.uid ? (
              <CommentDiv key={comment.docId}>
                <CommentInfo>
                  <commentp>{comment.displayName}</commentp>
                  <commentp>{CommentTimeShow(comment.createdAt)}</commentp>
                  <textp>{comment.text}</textp>
                </CommentInfo>
              </CommentDiv>
            ) : !comment.editForm ? (
              <CommentDiv key={comment.docId}>
                <CommentInfo>
                  <commentp>{comment.displayName}</commentp>
                  <commentp>{CommentTimeShow(comment.createdAt)}</commentp>
                  <textp>{comment.text}</textp>
                </CommentInfo>
                <CommentBtn>
                  <Button type="button" onClick={(event) => handleCommentEdit(event, true, comment.docId)}>
                    수정
                  </Button>
                  <Button type="button" onClick={() => deleteComment(comment.docId)}>
                    삭제
                  </Button>
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
                <EditBtn>
                  <Button type="button" onClick={() => updateComment(comment.docId)}>
                    수정 완료
                  </Button>
                  <Button type="button" onClick={(event) => handleCommentEdit(event, false, comment.docId)}>
                    수정 취소
                  </Button>
                  <Button type="button" onClick={() => deleteComment(comment.docId)}>
                    삭제
                  </Button>
                </EditBtn>
              </CommentDiv>
            )
          )}
        </div>
      </div>
    </CommentList>
  );
}
