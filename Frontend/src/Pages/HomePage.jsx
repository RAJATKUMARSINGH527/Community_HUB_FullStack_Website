import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to the Community Collaboration Platform</h1>
        <p>Share ideas, resources, and collaborate effortlessly.</p>
        
      </header>

      {/* Features Section */}
      <section className="features">

        <div className="feature-card">
        <Link  to="/signup" className="link">
          <h3>Text Chat</h3>
        </Link>
          <p>Send messages, share files, and keep conversations organized in dedicated channels.</p>
        </div>

        <div className="feature-card">
        <Link to="/signup" className="link">
          <h3>Voice Chat</h3>
        </Link>
          <p>Jump into voice channels when you're free. Friends can see you're around and pop in to talk.</p>
        </div>

        <div className="feature-card">
        <Link  to="/signup" className="link">
          <h3>Servers</h3>
        </Link>
          <p>Create dedicated spaces for your communities, clubs, or friend groups.</p>
        </div>

        <div className="feature-card">
        <Link  to="/signup" className="link">
          <h3>Idea Sharing</h3>
        </Link>
          <p>Collaborate on projects, share knowledge, and grow together.</p>
        </div>

        <div className="feature-card">
        <Link  to="/signup" className="link">
          <h3>Resource Pooling</h3>
        </Link>
          <p>Access a shared library of resources to help each other succeed.</p>
        </div>

        <div className="feature-card">
        <Link  to="/signup" className="link">
          <h3>Skill Exchange</h3>
        </Link>
          <p>Learn from others and offer your expertise in a collaborative space.</p>
        </div>
      </section>

      {/* Community Highlights Section */}
      
      <section className="community-highlights">
        <h2>Community Highlights</h2>
        <p>Check out trending projects and discussions happening now!</p>
      </section>

      {/* Collaboration Tools Section */}
      <section className="collaboration-tools">
        <h2>Collaboration Tools</h2>
        <p>Chat | Video Calls | Document Sharing | Task Management</p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <p>"This platform changed the way we work together!"</p>
      </section>

      {/* CTA Section */}
      <footer className="cta">
        <h3>Ready to start your journey?</h3>
        <p>Join thousands of communities on CommunityHub today.</p>
        <Link to="/signup">
          <button className="get-started">Get Started</button>
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;

