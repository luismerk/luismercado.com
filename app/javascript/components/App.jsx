import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';

function Placeholder({ title }) {
  return (
    <section className='home'>
      <h1>{title}</h1>
      <p>Content coming soon.</p>
    </section>
  );
}

export default function App() {
  return (
    <div className='app'>
      <Navigation />
      <main className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/drum-and-bass' element={<Placeholder title='Drum & Bass' />} />
          <Route path='/software-engineering' element={<Placeholder title='Software Engineering' />} />
          <Route path='/wrestling' element={<Placeholder title='Wrestling' />} />
          <Route path='/physics' element={<Placeholder title='Physics' />} />
        </Routes>
      </main>
    </div>
  );
}