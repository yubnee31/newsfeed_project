import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';

function SignUp({ email, password }) {
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <button onclick={signUp}>회원가입하기</button>
    </div>
  );
}

export default SignUp;
