import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './Login';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';

const BtnWrap = styled.div`
  text-align: right;
`;

const LoginSignUpBtn = styled.button`
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 7px;
  background-color: black;
  color: white;
  cursor: pointer;
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
function SignUpLogIn() {
  const [logInModal, setLogInModal] = useState(false);
  const [signUpmodal, setSignUpModal] = useState(false);
  const [doneLogin, setDoneLogin] = useState(false);
  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    setDoneLogin(false);
    setLogInModal(false);
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
                <Login setDoneLogin={setDoneLogin} />
              </ModalBody>
            </ModalWrap>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SignUpLogIn;
