import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignIn = () => {

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        signInEmail,
        signInPassword
      );
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
   <>
    {user ? (
      <Navigate to={`/`} />
    ) : (
      <>
        <h1>サインイン</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                />
            </div>
            <div>
              <label>パスワード</label>
                <input
                  name="password"
                  type="password"
                  placeholder='password'
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                />
            </div>
              <button>
                SignIn
                </button>
              <p>新規登録は<Link to={`/signUp/`}>こちら</Link></p>
            </form>
            </>
          )}
    </>
  )
}

export default SignIn
