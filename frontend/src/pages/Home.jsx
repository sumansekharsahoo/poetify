import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, delToken, getUserId } from '../utils/auth';
import { pingHistory,logoutUser, getHistory, getPoem } from '../utils/api';
import { getRelativeTime } from '../utils/timeConvert';
import ChatCell from '../components/ChatCell';
import Modal from '../components/Modal';

const Home = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const user_id = getUserId();
    
    const modalOpener = async (promptId) => {
      setLoading(true);
      try {
        const response = await getPoem(promptId);
        console.log(response);
        setSelectedData({
          prompt: response.prompt,
          poem: response.poem,
          time: response.time,
          emotions: [response.anger, response.joy, response.sadness, response.fear, response.disgust]
        });
        setIsModalOpen(true);
      } catch (error) {
        console.error('Error fetching poem:', error);
        // Handle error (e.g., show a message to the user)
      } finally {
        setLoading(false);
      }
    };

    const modalCloser = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const handleLogout = () => {
    delToken();
    console.log(logoutUser());
    navigate('/');
  };

  useEffect(() => {
    getHistory(user_id).then((data) => {
      console.log(data);
      setHistory(data);
    });
  }, []);

  const handlePing =async () => {
    // getUserId();
    let response= await getPoem(5);
    console.log(response);
    // console.log("here",response);
  } 
  return (
    <div>Welcome
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handlePing}>ping</button>

      <div>
        <div>
          Chat History
        </div>
        {history.map((item) => (
        <ChatCell key={item.id} prompt={item.prompt} date={getRelativeTime(item.timestamp)} modalOpener={modalOpener} id={item.id}/>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={modalCloser}
        prompt={selectedData?.prompt}
        poem={selectedData?.poem}
        time={selectedData?.time}
      />
      </div>
    </div>
  )
}

export default Home