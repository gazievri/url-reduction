import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Register } from './components/Register';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { register, login, squeeze, getStatistics, getStatisticsLimit } from './utils/api';
import { Link } from './types/Link';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [listLinks, setListLinks] = useState<Link[]>([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit: number = 10;
  const [query, setQuery] = useState(`?offset=0&limit=${limit}`);

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

  const handleSqueeze = (link: string) => {
    squeeze(link, token)
      .then(data => setListLinks([...listLinks, data]));
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  }

  // Пагинация: делаем запрос для определния количества страниц
  useEffect(() => {
    getStatistics(token)
      .then(data => setPages(Math.ceil(data.length / limit)))
      .catch(err => console.log(err));
  }, [])

  // Пагинация: создаем строку запроса для загрузки ссылок для страницы пагинации
  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    setQuery(`?offset=${offset}&limit=${limit}`)
  }, [currentPage])

  console.log(query)
  console.log(listLinks)

  // Пагинация: делаем запрос ссылок для конкретной страницы пагинации
  useEffect(() => {
    getStatisticsLimit(token, query)
      .then(data => {setListLinks(data)})
      .catch(err => console.log(err));
  }, [query])




  return (
    <div className='app'>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<Main handleSqueeze={handleSqueeze} items={listLinks} pages={pages} handleChangePage={handleChangePage} currentPage={currentPage} />} />
        <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route path='*' element={<Navigate to="/signup" />} />

      </Routes>
    </div>
  );
}

export default App;
