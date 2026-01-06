import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <header className='site-header'>
      <nav className='nav-container'>
        <div className='nav-brand'>Luis Mercado</div>
        <ul className='nav-links'>
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