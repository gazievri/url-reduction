import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Register } from './components/Register';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { register, login, squeeze } from './utils/api';
import { Link } from './types/Link';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [listLinks, setListLInks] = useState<Link[]>([]);

  const history = useNavigate();

  const handleRegister = (username: string, password: string) => {
    register(username, password)
    .then(data => {
      if (data) {
        history('/signin');
      }
    })
    .catch(err => console.log(err))
  }

  const handleLogin = (username: string, password: string) => {
    login(username, password)
    .then(data => {
      console.log('Login', data);
      setLoggedIn(true);
      setToken(data.access_token);
      history('/');
      })
    .catch(err => console.log(err))
  }

  const handleSqueeze = (link: string)=> {
    squeeze(link, token)
    .then(data => setListLInks([...listLinks, data]));
  }
  console.log(listLinks);

  return (
    <div className='app'>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main handleSqueeze={handleSqueeze} items={listLinks} />} />
        <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route path='*' element={<Navigate to="/signup" />} />

      </Routes>
    </div>
  );
}

export default App;
