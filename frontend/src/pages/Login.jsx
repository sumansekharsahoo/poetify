import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/auth';
import { loginUser } from '../utils/api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      console.log(data);
      setToken([data.user_id,data.name]);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen backgroundGradient">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-2">Poetify</h1>
        <p className="text-3xl text-white">Turn your thoughts into Poem</p>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="w-full bg-white text-[#313131] font-semibold py-2 px-4 rounded-md hover:bg-purple-100 transition duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
          <Link 
            to="/signup"
            className="text-white hover:underline"
          >
            Don't have an account? Signup
          </Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login