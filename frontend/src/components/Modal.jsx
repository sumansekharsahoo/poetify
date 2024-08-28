import React from 'react';

const Modal = ({ isOpen, onClose, prompt, poem, time }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-full  p-4 rounded relative">
        <h2 className="text-xl font-bold mb-4">Details</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Prompt:</h3>
          <p>{prompt}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Poem:</h3>
          <p>{poem}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Time:</h3>
          <p>{time}</p>
        </div>
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-0" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
