import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { Button, Typography } from '@mui/material';
import { EmojiPeople } from '@mui/icons-material'; // Importing an example icon
import video from '../assets/video/ani.mp4';

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
    <div style={{ position: 'relative' }}>
      <video style={{ width: '100%', height: 'auto', objectFit: 'cover' }} autoPlay loop muted ref={videoRef}>
        <source src={video} type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
        <Typography variant="h4" gutterBottom>Hello <span role="img" aria-label="waving-hand" style={{ animation: 'shake 1s infinite' }}>👋</span></Typography>
        <Typography variant="h4" gutterBottom>I'm URL Shortener</Typography>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Typography variant="body1">
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
          </Typography>
        </div>
        <Button variant="contained" onClick={handleClick} style={{ marginTop: '20px' }} startIcon={<EmojiPeople />}>
          Click Me!
        </Button>
      </div>
    </div>
  );
}

export default Text;
