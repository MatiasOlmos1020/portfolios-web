import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import MainBanner from '../components/MainBanner';
import CreatePortfolio from '../components/CreatePortfolio';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mainbanner" element={<MainBanner />} />
      <Route path="/createPortfolio" element={<CreatePortfolio />} />
    </Routes>
  );
}

export default AppRoutes;
