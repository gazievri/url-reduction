import { useState } from 'react';

interface RegisterProps {
  handleRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ handleRegister }) => {

  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { username, password } = data;
    handleRegister(username, password);
  }

  return (
    <form className='register' name='register' onSubmit={handleSubmit} >
      <h2 className='register__title'>Registration</h2>
      <input
        className='register__input'
        placeholder='Enter your username'
        onChange={handleChange}
        type="text"
        name="username"
        value={data.username}
        required minLength={1}
        maxLength={30} />
      <input
        className='register__input'
        placeholder='Enter your password'
        onChange={handleChange}
        type="password"
        name="password"
        value={data.password}
        required
        minLength={8} />
      <button
        className='register__btn'
        type='submit'>Register</button>
      <p className='register__text'>Already register? Sign in</p>
    </form>
  )
}

export { Register };
