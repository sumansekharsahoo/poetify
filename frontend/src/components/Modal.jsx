import React from 'react';

const Modal = ({ isOpen, onClose, prompt, poem, joy, fear, anger, disgust, sadness, time }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden z-10 my-8">
        <div className="p-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Prompt:</h3>
            <p className="text-gray-700">{prompt}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Poem:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{poem}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Emotions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Joy', value: joy },
                { label: 'Sadness', value: sadness },
                { label: 'Anger', value: anger },
                { label: 'Fear', value: fear },
                { label: 'Disgust', value: disgust },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-100 p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900">{label}</h4>
                  <p className="text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Time:</h3>
            <p className="text-gray-700">{time}</p>
          </div>
        </div>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClose}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;