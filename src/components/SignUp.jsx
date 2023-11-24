import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  line-height: 150%;
  margin-top: 30px;
  margin-right: 20px;
  color: #ab7323;
`;

const SignUpForm = styled.form`
  margin-left: 25px;
  margin-top: 40px;
  border: 2px solid #ab7323;
  border-radius: 20px;
  width: 350px;
  height: 320px;
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const SignUpDiv = styled.div`
  position: absolute;
  margin-top: 30px;
`;
const EmailPwDiv = styled.div`
  width: 200px;
  color: #ab7323;
`;

const EmailDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SignUpP = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
`;

const SignUpInput = styled.input`
  height: 30px;
  width: 200px;
  border: 2px solid #ab722374;
`;

const PasswordDiv = styled.div`
  margin-bottom: 30px;
`;

const SignUpBtn = styled.button`
  margin-right: 10px;
  width: 150px;
  height: 40px;
  border: 2px solid #ab7323;
  background-color: #ab722341;
  color: black;
  cursor: pointer;
`;

function SignUp({ setSignUpModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 닉네임 설정
  const [name, setName] = useState('');

  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', userCredential.user);
      alert('회원가입이 완료되었습니다.');

      // 닉네임 설정
      await updateProfile(auth.currentUser, { displayName: name });
      //

      setSignUpModal(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
      alert('이미 등록되었거나 사용할 수 없는 이메일입니다.');
    }
  };

  return (
    <div>
      <Title>🎉감자의 회원이 되어보세요🎉</Title>
      <SignUpForm>
        <SignUpDiv>
          <EmailPwDiv>
            <EmailDiv>
              <SignUpP>이메일</SignUpP>
              <SignUpInput
                type="email"
                value={email}
                name="email"
                onChange={(e) => {
                  return setEmail(e.target.value);
                }}
              ></SignUpInput>
            </EmailDiv>
            <PasswordDiv>
              <SignUpP>비밀번호</SignUpP>
              <SignUpInput
                type="password"
                value={password}
                name="password"
                onChange={(e) => {
                  return setPassword(e.target.value);
                }}
              ></SignUpInput>
            </PasswordDiv>
          </EmailPwDiv>
          {/* 닉네임 설정하는 부분 */}
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <SignUpBtn onClick={signUp}>회원가입하기</SignUpBtn>
        </SignUpDiv>
      </SignUpForm>
    </div>
  );
}

export default SignUp;
