import './Header.css';
import React, { useState } from 'react';

export default function Header({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRedirect = (path) => {
    if (path === 'logout') {
      alert('Logging out...');
    }
  }

  return (
    <>
      <header className="header">
        <h1 className="logo">CRY Foundation</h1>

        <div className="menu" onClick={toggleDropdown}>
           <h3>{user.name}</h3>
          {dropdownOpen && (
            <div className="dropdown">
              <button onClick={() => { setShowProfile(true); setDropdownOpen(false); }}>
                Profile
              </button>
              <button onClick={() => handleRedirect('logout')}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {showProfile && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> NGO Partner</p>
            <button onClick={() => setShowProfile(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
