import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './SideBar.css'; 
import image from '../assets/img1.webp';


export default function SideBar({ user, onLogout }) {
  const [activeView, setActiveView] = useState('')
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <h2>Dashboard Content</h2>;
      case 'tasks':
        return <h2>Assigned Tasks Content</h2>;
      case 'upload':
        return <h2>Upload documents</h2>
      default:
        return <h2></h2>;
    }
  };

  return (
    <div className="layout">
      <Header user={user} onLogout={onLogout} />

      <div className="body">
        <aside className="sidebar">
          <ul>
            <li onClick={() => setActiveView('dashboard')}>Admin Dashboard</li>
            <li onClick={() => setActiveView('tasks')}>Frontliners</li>
            <li onClick={() => setActiveView('upload')}>NGO's</li>
          </ul>
        </aside>

        <main className="content">
            {activeView === '' ? (
                <img src={image} alt="CRY img" />
            ) : (
                renderContent()
            )}
        </main>

      </div>

      <Footer />
    </div>
  );
}
