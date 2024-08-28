import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { getUserId } from '../utils/auth';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Home, LogOut } from 'lucide-react';
import { delToken } from '../utils/auth';
import { logoutUser } from '../utils/api';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const socket = io('http://127.0.0.1:5000'); 

const RadarChart = ( {joy, sadness, anger, fear, disgust} ) => {
  const data = {
    labels: ['Joy', 'Sadness', 'Anger', 'Fear', 'Disgust'],
    datasets: [
      {
        label: 'Emotion Intensity',
        data: [Math.max(joy,5), Math.max(sadness,5), Math.max(anger,5), Math.max(fear,5), Math.max(disgust,5)],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 1
      }
    }
  };

  return <Radar data={data} options={options} />;
};

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState('');
  const [joy, setJoy] = useState(0);
  const [sadness, setSadness] = useState(0);
  const [anger, setAnger] = useState(0);
  const [fear, setFear] = useState(0);
  const [disgust, setDisgust] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('poem_chunk', (data) => {
      setPoem((prevPoem) => prevPoem + data.chunk);
    });

    socket.on('poem_complete', (data) => {
        setPoem(data.poem);
        setJoy(data.joy);
        setAnger(data.anger);
        setSadness(data.sadness);
        setFear(data.fear);
        setDisgust(data.disgust);
        // console.log(joy, sadness, anger, fear, disgust);
        setIsGenerating(false);
    });

    return () => {
      socket.off('connect');
      socket.off('poem_chunk');
      socket.off('poem_complete');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setPoem('');
    setJoy(0);
    setSadness(0);
    setAnger(0);
    setFear(0);
    setDisgust(0);
    let user_id = getUserId();
    socket.emit('generate_poem', { prompt, user_id });
  };

  const getBackgroundGradient = () => {
    const emotions = [
      { name: 'joy', value: joy, gradient: 'from-yellow-400 via-orange-300 to-yellow-200' },
      { name: 'sadness', value: sadness, gradient: 'from-blue-500 via-blue-400 to-indigo-300' },
      { name: 'anger', value: anger, gradient: 'from-red-600 via-red-500 to-orange-400' },
      { name: 'fear', value: fear, gradient: 'from-purple-600 via-purple-500 to-indigo-400' },
      { name: 'disgust', value: disgust, gradient: 'from-green-500 via-green-400 to-lime-300' },
    ];

    const dominantEmotion = emotions.reduce((prev, current) => 
      (current.value > prev.value) ? current : prev
    );

    return `bg-gradient-to-br ${dominantEmotion.gradient}`;
  };

  const handleLogout = () => {
    delToken();
    logoutUser();
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} py-12 px-4 sm:px-6 lg:px-8 relative`}>
      <Link to="/home" className="absolute top-4 left-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors duration-200">
        <Home className="text-[#313131]" size={24} />
      </Link>
      <button onClick={handleLogout} className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-colors duration-200">
        <LogOut className="text-[#313131]" size={24} />
      </button>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8 text-shadow-lg">Poem Generator</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt for your poem"
              className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="bg-indigo-600 text-white px-6 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition duration-300"
            >
              {isGenerating ? 'Generating...' : 'Generate Poem'}
            </button>
          </div>
        </form>
        {poem && (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4">Generated Poem:</h3>
            <pre className="whitespace-pre-wrap font-serif text-lg text-gray-700 mb-4">{poem}</pre>
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-indigo-800 mb-4">Emotion Analysis:</h4>
              <div className="w-full max-w-md mx-auto">
                <RadarChart joy={joy} sadness={sadness} anger={anger} fear={fear} disgust={disgust} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Generate