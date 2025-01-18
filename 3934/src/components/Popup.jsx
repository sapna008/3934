import React, { useState } from 'react';
import axios from 'axios';

const AIInteractionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setUserInput('');
    setResponse('');
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA8wGyjklMdQNd8kAmETp0cosj1pClSuzc', {
        contents: [
          {
            parts: [
              {
                text: userInput
              }
            ]
          }
        ]
      });
      console.log('API Response:', res.data); // Debugging: Log the API response

      // Extract the response text from the candidates array
      if (res.data && res.data.candidates && res.data.candidates.length > 0) {
        const responseText = res.data.candidates[0].content.parts[0].text;
        setResponse(responseText);
        setUserInput(''); // Clear the input box after response
      } else {
        setResponse('No response received.');
      }
    } catch (error) {
      console.error('API Error:', error); // Debugging: Log the error
      setResponse('An error occurred. Please try again...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Icon */}
      <div
        className="floating-icon"
        onClick={togglePopup}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}
      >
        💬
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="chat-popup"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            backgroundColor: '#2c2d2f',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3 style={{color:'white', margin: 0, fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>AI Assistant</h3>
          {response && (
            <div
              style={{
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                fontSize: '14px',
                border: '1px solid #ddd',
                maxHeight: '150px',
                overflowY: 'auto',
              }}
            >
              {response}
            </div>
          )}
          <textarea
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            style={{
              width: '100%',
              height: '80px',
              marginBottom: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '8px',
              resize: 'none',
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIInteractionPopup;
