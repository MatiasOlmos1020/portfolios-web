import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
    </div>
  );
}

export default App;
