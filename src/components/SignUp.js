import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignUp = () => {

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );
    } catch(error) {
      alert("正しく入力してください");
    }
  };

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
        <h1>新規登録</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input 
            name="email" 
            type="email" 
            placeholder="email" 
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input 
            name="password" 
            type="password" 
            placeholder='password'
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            />
          </div>
            <button>
              SignUp
              </button>
            <p>サインインは<Link to={`/signIn`}>こちら</Link></p>
        </form>
      </>
      )}
    </> 
  )
}

export default SignUp;
