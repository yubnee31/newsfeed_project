import React, { useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  line-height: 150%;
  margin-top: 30px;
`;

const LoginForm = styled.form`
  margin-left: 25px;
  margin-top: 40px;
  border: 2px solid black;
  border-radius: 20px;
  width: 350px;
  height: 320px;
  position: relative;
  display: flex;
  justify-content: center;
`;

const LoginDiv = styled.div`
  position: absolute;
`;

const EmailDiv = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
`;

const LoginP = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const LoginInput = styled.input`
  height: 30px;
  width: 200px;
  border: 2px solid black;
`;

const PasswordDiv = styled.div`
  margin-bottom: 30px;
`;

const LoginBtn = styled.button`
  width: 207px;
  height: 40px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

// const BtnDiv = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
// `;

// const SignUpBtn = styled.button`
//   margin-top: 10px;
//   margin-right: 10px;
//   width: 150px;
//   height: 40px;
//   background-color: black;
//   color: white;
//   cursor: pointer;
// `;

function Login({ email, setEmail, password, setPassword, setIsDoneLogin }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  });

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      setIsDoneLogin(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signIn', errorCode, errorMessage);
      alert('등록되지 않은 회원입니다.');
    }
  };

  return (
    <div>
      <Title>🎉감자에 오신 것을 환영합니다🎉</Title>
      <LoginForm>
        <LoginDiv>
          <EmailDiv>
            <LoginP>이메일</LoginP>
            <LoginInput
              type="email"
              value={email}
              name="email"
              onChange={(e) => {
                return setEmail(e.target.value);
              }}
            ></LoginInput>
          </EmailDiv>
          <PasswordDiv>
            <LoginP>비밀번호</LoginP>
            <LoginInput
              type="password"
              value={password}
              name="password"
              onChange={(e) => {
                return setPassword(e.target.value);
              }}
            ></LoginInput>
          </PasswordDiv>
          <LoginBtn onClick={signIn} setIs>
            로그인하기
          </LoginBtn>
        </LoginDiv>
      </LoginForm>
    </div>
  );
}

export default Login;
