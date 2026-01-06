import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className='site-header'>
      <nav className='nav-container'>
        <div className='nav-brand'>Luis Mercado</div>

        <button
          className='nav-toggle'
          onClick={() => setOpen(!open)}
          aria-label='Toggle navigation'
          aria-expanded={open}
        >
          <span/>
          <span/>
          <span/>
        </button>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/drum-and-bass'>Drum & Bass</NavLink></li>
          <li><NavLink to='/software-engineering'>Software Engineering</NavLink></li>
          <li><NavLink to='/wrestling'>Wrestling</NavLink></li>
          <li><NavLink to='/physics'>Physics</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}