import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogo from './pages/Jogo';


function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo/*" element={<Jogo />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
