import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import MainBanner from '../components/MainBanner';
import CreatePortfolio from '../components/CreatePortfolio';
import ListPortfolios from '../components/ListPortfolios';
import EditPortfolio from '../components/EditPortfolio';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/mainbanner" element={<MainBanner />} />
      <Route path="/createPortfolio" element={<CreatePortfolio />} />
      <Route path="/listPortfolios" element={<ListPortfolios />} />
      <Route path="/editPortfolio/:id" element={<EditPortfolio />} />
    </Routes>
  );
}

export default AppRoutes;
