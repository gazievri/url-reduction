import React, { useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Register } from './components/Register';
import { Main } from './components/Main';
import { Login } from './components/Login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { register, login, squeeze, getStatistics } from './utils/api';
import { Link } from './types/Link';
import { PrivateRoutes } from './utils/PrivateRoutes';

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [listLinks, setListLinks] = useState<Link[]>([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit: number = 10;
  const [query, setQuery] = useState(`?offset=0&limit=${limit}`);
  const [user, setUser] = useState('');

  const history = useNavigate();

  // Проверка наличия токена при обновлении страницы и передаресация пользователя
  const tokenCheck = () => {
    let userToken = localStorage.getItem('token');
    let userName = localStorage.getItem('name');
    if (userToken && userName) {
      setLoggedIn(true);
      setToken(userToken);
      setUser(userName);
      history('/');
    }
  }

  // Регистрация нового пользователя
  const handleRegister = (username: string, password: string) => {
    register(username, password)
      .then(data => {
        if (data) {
          history('/signin');
        }
      })
      .catch(err => console.log(err))
  }

  // Функция авторизации
  const handleLogin = (username: string, password: string) => {
    login(username, password)
      .then(data => {
        setLoggedIn(true);
        setUser(username)
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('name', username);
        history('/');
      })
      .catch(err => { console.log(err); alert('Login or password do not match. Please, check.') })
  }

  // Выход из учетной записи пользователя
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setLoggedIn(false);
    history('/signin');
  }

  // Обработка новой ссылки
  const handleSqueeze = (link: string) => {
    squeeze(link, token)
      .then(data => setListLinks([data, ...listLinks]));
  }

  // Обработчки установки текущеуй позиции для пагинации и отображения контента
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  }

  // При загрузке старницы с помощью функции tokenCheck проверяем наличие токена в LocalStorage
  useEffect(() => {
    tokenCheck()
  }, []);

  // Пагинация: делаем запрос для определния количества страниц
  useEffect(() => {
    if (loggedIn) {
      getStatistics(token, '?offset0&limit=0')
        .then(data => setPages(Math.ceil(data.length / limit)))
        .catch(err => console.log(err));
    }
  }, [loggedIn, token])

  // Пагинация: создаем строку запроса для загрузки ссылок для страницы пагинации
  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    setQuery(`?offset=${offset}&limit=${limit}`)
  }, [currentPage])

  // Пагинация: делаем запрос ссылок для конкретной страницы пагинации
  useEffect(() => {
    if (loggedIn) {
      getStatistics(token, query)
        .then(data => {
          setListLinks(data)
        })
        .catch(err => console.log(err));
    }
  }, [query, loggedIn, token])

  return (
    <div className='app'>
      <Header loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route element={<PrivateRoutes token={token} />}>
          <Route element={<Main
            handleSqueeze={handleSqueeze}
            items={listLinks}
            pages={pages}
            handleChangePage={handleChangePage}
            currentPage={currentPage}
          />} path='/' />
        </Route>
        <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
        <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
        <Route path='*' element={<Navigate to={loggedIn ? "/" : "/signin"} />} />
      </Routes>
    </div>
  );
}

export default App;
