import React from 'react';

const Navbar = ({ setView }) => (
  <nav className="navbar" data-aos="fade-down">
    <button onClick={() => setView('form')}>Registration</button>
    <button onClick={() => setView('list')}>Registered</button>
  </nav>
);

export default Navbar;