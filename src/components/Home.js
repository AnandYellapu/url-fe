import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import video from '../assests/video/ani.mp4';

function Text() {
  const typewriterRef = useRef(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    videoRef.current.playbackRate = 0.7; // Adjust the playback rate here
  }, []);

  return (
    <div className="typewriter-container">
      <video className="video-background" autoPlay loop muted ref={videoRef}>
        <source src={video} type="video/mp4" />
      </video>
      <div className="typewriter-content">
        <h2 className="typewriter-heading">Hello <span className="waving-hand">👋</span></h2>
        <h2 className="typewriter-subheading">I'm URL Shortener</h2>
        <div className="typewriter-text">
          <Typewriter
            options={{
              strings: [
                "Are your links too long and difficult to share? Our URL Shortener is here to help. With our tool, you can quickly and easily shorten any long URL into a concise and manageable link. It's perfect for social media posts, emails, and any other situation where you need a shorter, more presentable URL.",
              ],
              autoStart: true,
              loop: true,
              deleteSpeed: 30,
            }}
            onInit={(typewriter) => {
              typewriterRef.current = typewriter;
            }}
          />
        </div>
        <button onClick={handleClick} className="typewriter-btn">Click Me!</button>
      </div>
    </div>
  );
}

export default Text;





