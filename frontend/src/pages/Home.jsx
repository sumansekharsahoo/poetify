import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, getUserName,delToken } from '../utils/auth';
import { getHistory, getPoem,logoutUser } from '../utils/api';
import { getRelativeTime } from '../utils/timeConvert';
import ChatCell from '../components/ChatCell';
import Modal from '../components/Modal';
import { LogOut } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState('');

  const user_id = getUserId();
  const user_name = getUserName();
  // console.log(user_name);

  const modalOpener = async (promptId) => {
    setLoading(true);
    try {
      const response = await getPoem(promptId);
      // console.log(response);
      setSelectedData({
        prompt: response.prompt,
        poem: response.poem,
        time: response.time,
        anger: response.anger,
        joy: response.joy, 
        sadness: response.sadness, 
        fear: response.fear, 
        disgust: response.disgust,
      });
      setIsModalOpen(true);
    } catch (error) {
      // console.error('Error fetching poem:', error);
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
    logoutUser();
    navigate('/');
  }


  useEffect(() => {
    getHistory(user_id).then((data) => {
      setHistory(data);
    });
  }, []);

  return (
    <div className="backgroundGradient min-h-screen p-6">
      <div className="max-w-4xl mx-auto text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome {user_name}</h1>
          <LogOut onClick={handleLogout}/>
        </div>
        <div className='mb-5'>
          <h2 className="text-2xl font-semibold mb-4">Generate Poem</h2>
          <button
                onClick={() => navigate('/generate')}
                className="bg-[#e5c96e] text-stone-800 px-6 py-3 rounded-md font-semibold hover:bg-[#dcbc50] transition duration-300"
              >
                Generate Poem
              </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Chat History</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <ChatCell
                key={item.id}
                prompt={item.prompt}
                date={getRelativeTime(item.timestamp)}
                modalOpener={modalOpener}
                id={item.id}
              />
            ))}
            {history.length === 0? <p className="text-center">No chat history</p> : null}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={modalCloser}
        prompt={selectedData?.prompt}
        poem={selectedData?.poem}
        time={selectedData?.time}
        anger={selectedData?.anger}
        joy={selectedData?.joy}
        sadness={selectedData?.sadness}
        fear={selectedData?.fear}
        disgust={selectedData?.disgust}
      />
    </div>
  );
};

export default Home;
