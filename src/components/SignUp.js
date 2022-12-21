import React, { useRef, useState } from 'react';
import { auth } from '..firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value);
  };

  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input 
          id="email"
          name="email" 
          type="email" 
          placeholder="email" 
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input 
          id="password"
          name="password" 
          type="password" 
          placeholder='password'
          />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
