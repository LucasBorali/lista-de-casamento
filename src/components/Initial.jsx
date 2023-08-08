import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Initial.module.css';
import white from '../assets/white.png';

const Initial = () => {
  return (
    <div className={classes.initial}>
      <img src={white} alt="" srcset="" />

      <Link to='/lista' className={classes.link}>Lista de Presentes</Link>
    </div>
  );
};

export default Initial;
