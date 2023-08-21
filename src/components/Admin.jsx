import React, { useEffect, useState } from 'react';
import classes from './Admin.module.css';

const Admin = () => {
  const [item, setItem] = useState('');
  const [presentes, setPresentes] = useState([]);

  const sendPresents = async presentes => {
    try {
      const response = await fetch(
        'https://lista-de-presentes-25b37-default-rtdb.firebaseio.com/list.json',
        {
          method: 'PUT',
          body: JSON.stringify(presentes),
        }
      );

      if (!response.ok) {
        throw new Error('Não foi possível adicionar este item');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getList = async () => {
    try {
      const response = await fetch(
        'https://lista-de-presentes-25b37-default-rtdb.firebaseio.com/list.json'
      );
      if (!response.ok) {
        throw new Error('Não foi possível carregar a lista');
      }

      const data = await response.json();

      setPresentes(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemHandler = e => {
    e.preventDefault();
    const newItem = {
      item,
      chosen: false,
    };
    presentes.push(newItem);
    sendPresents(presentes);
    setItem('');
  };

  const removeItemHandler = item => {
    const newList = presentes.filter(pres => pres !== item);

    sendPresents(newList);
  };

  useEffect(() => {
    getList();
  }, [presentes]);

  return (
    <div id='admin' className={classes.admin}>
      <form onSubmit={addItemHandler} className={classes['add-item']}>
        <label htmlFor="item">Adicionar</label>
        <input
          onChange={e => setItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Digite aqui"
          value={item}
        />
        <button>+</button>
      </form>
      <h2>Sua lista</h2>
      <ul>
        {presentes.map(item => (
          <li key={item.item} className={item.chosen ? classes.chosen : ''}>
            {item.item}
            <button onClick={() => removeItemHandler(item)}>excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
