import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import PortfolioGrid from './components/PortfolioGrid';
import About from './components/About';
import MainBanner from './components/MainBanner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MainBanner />
        <PortfolioGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
