import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../utils/api';
import { setToken } from '../utils/auth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const data = await signupUser(name, email, password);
      // setToken(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen backgroundGradient">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-2">Poetify</h1>
        <p className="text-3xl text-white">Turn your thoughts into Poem</p>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Signup</h2>
        {error && <p className="text-red-300 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="w-full bg-white text-[#313131] font-semibold py-2 px-4 rounded-md hover:bg-purple-100 transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link 
            to="/"
            className="text-white hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup