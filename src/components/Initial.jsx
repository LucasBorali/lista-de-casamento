import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Initial.module.css';
import white from '../assets/white.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../FirebaseConfig';

const Initial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged(user => {
      if (user !== null) {
        navigate('/admin');
      }

      authUnsubscribe();
    });
  }, []);

  return (
    <div className={classes.initial}>
      <img src={white} alt="" srcset="" />

      <Link to="/lista" className={classes.link}>
        Lista de Presentes
      </Link>
      <Link to="/login" className={classes.link}>
        Login
      </Link>
    </div>
  );
};

export default Initial;
