import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAAjKFL-xQPFHQcZfJiTbPkRINnvkO3ojo',
  authDomain: 'lista-de-presentes-25b37.firebaseapp.com',
  databaseURL: 'https://lista-de-presentes-25b37-default-rtdb.firebaseio.com',
  projectId: 'lista-de-presentes-25b37',
  storageBucket: 'lista-de-presentes-25b37.appspot.com',
  messagingSenderId: '479666130973',
  appId: '1:479666130973:web:816dae5a48d8bccc36b6f4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
