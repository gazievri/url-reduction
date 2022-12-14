import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  handleLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  // Обработчик событий onChange
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  // Обработчик нажатия на кнопку Login
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = data;
    handleLogin(username, password);
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
      <h2 className='register__title'>Sign in</h2>
      <input
        className='register__input'
        placeholder='Enter your username'
        type="text" name="username"
        required
        onChange={handleChange}
        value={data.username} />
      <input
        className='register__input'
        placeholder='Enter your password'
        type="password"
        name="password"
        required
        onChange={handleChange}
        value={data.password} />
      <button className='register__btn'>Sign in</button>
      <p className='register__text'>Don't register? <Link to="/signup">Register</Link></p>
    </form>
  )
}

export { Login };

