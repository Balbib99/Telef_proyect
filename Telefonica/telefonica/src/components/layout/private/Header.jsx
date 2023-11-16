/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <Link to="/social/rpc">
          <button
            className={`rpc ${activeButton === 'rpc' ? 'active' : ''}`}
            onClick={() => handleButtonClick('rpc')}
          >
            RPC
          </button>
        </Link>
        <Link to="/social/ctu">
          <button
            className={`ctu ${activeButton === 'ctu' ? 'active' : ''}`}
            onClick={() => handleButtonClick('ctu')}
          >
            CTU
          </button>
        </Link>
        <Link to="/social/contact">
          <button
            className={`ctu ${activeButton === 'contact' ? 'active' : ''}`}
            onClick={() => handleButtonClick('contact')}
          >
            AGENDA
          </button>
        </Link>
        <Link to="/social/file">
          <button
            className={`ctu ${activeButton === 'file' ? 'active' : ''}`}
            onClick={() => handleButtonClick('file')}
          >
            TÉCNICO
          </button>
        </Link>
      </div>
    </header>
  );
};
