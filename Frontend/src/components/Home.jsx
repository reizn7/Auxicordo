import React from 'react';
import './Home.css';
import Notes from './Notes/Notes';  // Assuming your Notes component is located here  // Assuming you have a MusicPlayer component

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Auxicordo</h1>
        <p>Your notes and music companion.</p>
      </header>

      <Notes />
      <section className="features">
        <div className="feature-card">
          <p>Notes locked, beats encrypted – Welcome to the dark side of creativity.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Auxicordo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
