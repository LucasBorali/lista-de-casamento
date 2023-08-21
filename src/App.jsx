import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './pages/RootLayout';
import Initial from './components/Initial';
import List from './components/List';
import Admin from './components/Admin';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Initial /> },
      { path: 'lista', element: <List /> },
      { path: 'admin', element: <Admin /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
],{basename: '/lista-de-casamento'});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
