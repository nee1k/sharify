import './about.css';
import React, { useState, useEffect } from 'react';
const AboutPage = () => {
  const images = [
    'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvdGlmeXxlbnwwfHwwfHx8MA%3D%3D',
    'https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE',
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/08/Cant-Share-Someone-Elses-Instagram-Story.png?fit=2000%2C1300&ssl=1'

    // Add more image URLs here
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Automatically advance to the next image every few seconds
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 3000); // Change the duration as needed (in milliseconds)

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [currentImage, images]);
  return (
    <div className="layout-container">
      <div className="slideshow">
        <h3>Welcome!</h3>
        <div className="image-container">
          <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
        </div>
      </div>

      <div className="about-container">
        <h1>About Sharify</h1>
        <p>
          At Sharify, we believe in the power of music to connect people. Our mission is to create a platform where music enthusiasts like you can come together to share, discover, and celebrate the universal language of music.
        </p>

        <h2>Why Sharify?</h2>
        <p>
          <strong>Music Unleashed:</strong> Share your favorite tunes, discover new tracks, and connect with like-minded individuals who share your passion for music.
        </p>

        <h2>Your Journey with Sharify</h2>
        <p>
          <strong>Create Your Profile:</strong> Build your music-centric profile to showcase your unique musical taste and preferences.
        </p>
        <p>
          <strong>Connect with Like Minds:</strong> Discover users who share your music taste and form meaningful connections based on your shared love for music.
        </p>
        <p>
          <strong>Share Your Soundtrack:</strong> Post your favorite tracks, create playlists, and express what they mean to you through music.
        </p>
        <p>
          <strong>Join the Conversation:</strong> Engage in music-related discussions, explore new genres, and stay updated with the latest trends in the world of music.
        </p>

        <h2>Let's Get Sharifying!</h2>
        <p>
          Join us in celebrating the beauty of music and fostering connections. Welcome to a world where music truly brings people together!
        </p>
        <div>
          <a href="../signin" class="button-link">Sign In</a>
          <a href="../signup" class="button-link">Sign Up</a>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
