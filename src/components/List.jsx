import React, { useEffect, useState } from 'react';
import classes from './List.module.css';
import { createPortal } from 'react-dom';

const List = () => {
  const [presentes, setPresentes] = useState([]);
  const [displayWindow, setDisplayWindow] = useState(false);
  const [itemForDisplay, setItemForDisplay] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetch(
        'https://lista-de-presentes-25b37-default-rtdb.firebaseio.com/list.json'
      );
      if (!response.ok) {
        throw new Error('Não foi possível exibir a lista');
      }
      const data = await response.json();
      setPresentes(data || []);
    } catch (error) {
      console.log(error);
    }
  };

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

  const choosingWindowHandler = item => {
    setDisplayWindow(true);
    setItemForDisplay(item);
  };

  const choseHandler = chosenItem => {
    const newItem = {
      ...chosenItem,
      chosen: true,
    };

    const newList = presentes.filter(item => item.item !== newItem.item);

    newList.push(newItem);
    sendPresents(newList);
    setDisplayWindow(false);
  };

  useEffect(() => {
    fetchList();
  }, [presentes]);

  return (
    <ul className={classes.list}>
      {presentes.map(item => (
        <li key={item.item} className={item.chosen ? classes.chosen : ''}>
          <p>{item.item}</p>
          {item.chosen ? (
            ''
          ) : (
            <button onClick={() => choosingWindowHandler(item)}>
              Escolher
            </button>
          )}
        </li>
      ))}

      {displayWindow &&
        createPortal(
          <div className={classes.overlay}>
            <div className={classes.window}>
              <h2>{itemForDisplay.item}</h2>
              <p>Tem certeza?</p>
              <div>
                <button onClick={() => choseHandler(itemForDisplay)}>
                  Sim, tenho!
                </button>
                <button onClick={() => setDisplayWindow(false)}>Não</button>
              </div>
            </div>
          </div>,
          document.getElementById('window-root')
        )}
    </ul>
  );
};

export default List;
