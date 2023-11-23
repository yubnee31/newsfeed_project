import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
  text-align: center;
`;

const LoginDiv = styled.div`
  position: absolute;
`;

const EmailPwDiv = styled.div`
  width: 200px;
  margin-left: 60px;
`;
const EmailDiv = styled.div`
  margin-top: 40px;
  margin-bottom: 15px;
`;

const LoginP = styled.p`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
`;

const LoginInput = styled.input`
  height: 30px;
  width: 200px;
  border: 2px solid black;
`;

const PasswordDiv = styled.div`
  margin-bottom: 30px;
`;

const LoginBtnDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const LoginBtn = styled.button`
  margin-top: 10px;
  margin-right: 10px;
  width: 150px;
  height: 40px;
  background-color: black;
  color: white;
  cursor: pointer;
`;

function Login({ setDoneLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with LogIn', userCredential.user);
      console.log(userCredential.user.email);
      setEmail('');
      setPassword('');
      setDoneLogin(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with LogIn', errorCode, errorMessage);
      alert('등록되지 않은 회원이거나 유효하지 않은 이메일입니다.');
    }
  };

  const googleLogIn = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      console.log(result);
      setDoneLogin(true);
      console.log(result.user.displayName);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with GoogleLogIn', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <Title>🎉감자에 오신 것을 환영합니다🎉</Title>
      <LoginForm>
        <LoginDiv>
          <EmailPwDiv>
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
          </EmailPwDiv>

          <LoginBtnDiv>
            <LoginBtn onClick={logIn}>로그인하기</LoginBtn>
            <LoginBtn onClick={googleLogIn}>구글로 로그인하기</LoginBtn>
          </LoginBtnDiv>
        </LoginDiv>
      </LoginForm>
    </div>
  );
}

export default Login;
