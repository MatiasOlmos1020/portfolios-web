import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SocialTab from './components/SocialTab';
import AppRoutes from './routes/AppRoutes';  
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <SocialTab />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
