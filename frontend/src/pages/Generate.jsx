import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { getUserId } from '../utils/auth';

const socket = io('http://127.0.0.1:5000'); 

const Generate = () => {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState('');
  const [emotion, setEmotion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('poem_chunk', (data) => {
      setPoem((prevPoem) => prevPoem + data.chunk);
    });

    socket.on('poem_complete', (data) => {
        setPoem(data.poem);
        setEmotion(data.emotions);
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
    setEmotion('');
    let user_id=getUserId();
    console.log(user_id);
    socket.emit('generate_poem', { prompt, user_id});
  };

  return (
    <div>
      <div>Poem Generate</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for your poem"
        />
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Poem'}
        </button>
      </form>
      {poem && (
        <div>
          <h3>Generated Poem:</h3>
          <pre>{poem}</pre>
          <p>Emotion: {emotion}</p>
        </div>
      )}
    </div>
  )
}

export default Generate