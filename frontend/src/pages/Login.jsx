import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { delToken, setToken } from '../utils/auth';
import { loginUser } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e)  => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log(data)
      setToken(data.user_id);
      navigate('/home');
    } catch (err) {
      console.log(err)
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <div></div>
      <div>
        <div>Login</div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Email' value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        </form>

      </div>
    </div>
  )
}

export default Login