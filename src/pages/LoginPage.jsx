import React, { useState } from 'react';
import classes from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import {useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const createUserHandler = e => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };

  if (user) {
    navigate('/admin');
  }

  return (
    <div>
      <form className={classes.login} onSubmit={e => createUserHandler(e)}>
        <h1>Entrar</h1>

        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          name=""
          id="email"
          placeholder="Email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          name=""
          id="password"
          placeholder="Senha"
        />
        <button>LogIn</button>
      </form>
    </div>
  );
};

export default LoginPage;
