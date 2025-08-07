import React, { useState } from 'react';

const RegisteredList = ({ users }) => {
  const [current, setCurrent] = useState(0);

  const nextUser = () => {
    setCurrent(prev => (prev + 1 < users.length ? prev + 1 : 0));
  };

  if (users.length === 0) {
    return <p data-aos="fade-up">No registrations yet.</p>;
  }

  const user = users[current];

  return (
    <div className="list-container" data-aos="fade-up">
      <h2>Registered User {current + 1} of {users.length}</h2>
      <div className="user-card">
        <strong>{user.firstName} {user.lastName}</strong><br />
        📧 {user.email}<br />
        📞 {user.phone}<br />
        📝 {user.description}<br />
        ⭐ {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
      </div>
      <button onClick={nextUser}>Next</button>
    </div>
  );
};

export default RegisteredList;