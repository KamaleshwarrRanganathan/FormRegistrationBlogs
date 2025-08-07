import React, { useState, useEffect } from 'react';
import RegistrationForm from './RegistrationForm';
import RegisteredList from './RegisteredList';
import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('form');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const addUser = (user) => {
    setUsers(prev => [...prev, user]);
  };

  return (
    <div className="app-container">
      <Navbar setView={setView} />
      <h1 className="header" data-aos="fade-down">Blog Registration</h1>
      {view === 'form' ? (
        <RegistrationForm addUser={addUser} />
      ) : (
        <RegisteredList users={users} />
      )}
    </div>
  );
};

export default App;