import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';
import SignUp from './SignUp';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function SignUpLogIn() {
  const [logInModal, setLogInModal] = useState(false);
  const [signUpmodal, setSignUpModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [doneLogin, setDoneLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setDoneLogin(user);
      doneLogin ? setUserId(user.uid) : setUserId(null);
      user === null
        ? localStorage.setItem('login user', JSON.stringify({ email: '', displayName: '', uid: '' }))
        : localStorage.setItem(
            'login user',
            JSON.stringify({ email: user.email, displayName: user.displayName, uid: user.uid, photoURL:user.photoURL})
          );
    });
  }, []);

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    alert('로그아웃 되었습니다.');
    setLogInModal(false);
    navigate('/');
  };

  return (
    <div>
      {doneLogin ? (
        <div>
          <BtnWrap>
            <LoginSignUpBtn onClick={() => navigate('/mypage')}>마이페이지</LoginSignUpBtn>
            <LoginSignUpBtn onClick={logOut}>로그아웃</LoginSignUpBtn>
          </BtnWrap>
          {signUpmodal === true ? (
            <ModalWrap>
              <ModalBody>
                <CloseBtn onClick={() => setSignUpModal(!signUpmodal)}>&times;</CloseBtn>
                <SignUp />
              </ModalBody>
            </ModalWrap>
          ) : null}
        </div>
      ) : (
        <div>
          <BtnWrap>
            <LoginSignUpBtn
              onClick={() => {
                setSignUpModal(true);
              }}
            >
              회원가입
            </LoginSignUpBtn>
            {signUpmodal === true ? (
              <ModalWrap>
                <ModalBody>
                  <CloseBtn onClick={() => setSignUpModal(!signUpmodal)}>&times;</CloseBtn>
                  <SignUp setSignUpModal={setSignUpModal} />
                </ModalBody>
              </ModalWrap>
            ) : null}
            <LoginSignUpBtn
              onClick={() => {
                setLogInModal(true);
              }}
            >
              로그인
            </LoginSignUpBtn>
          </BtnWrap>

          {logInModal === true ? (
            <ModalWrap>
              <ModalBody>
                <CloseBtn onClick={() => setLogInModal(!logInModal)}>&times;</CloseBtn>
                <Login />
              </ModalBody>
            </ModalWrap>
          ) : null}
        </div>
      )}
    </div>
  );
}

const BtnWrap = styled.div`
  text-align: right;
  margin-right: 50px;
`;

const LoginSignUpBtn = styled.button`
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  margin-right: 7px;
  color: black;
  font-size: 16px;
  border: 2px solid #ab722374;
  cursor: pointer;
  background-color: transparent;
  color: #ab7323;
`;

const CloseBtn = styled.span`
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 25px;
  cursor: pointer;
`;

const ModalWrap = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  width: 400px;
  height: 500px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  border-radius: 20px;
  background-color: #fff;
`;

export default SignUpLogIn;
