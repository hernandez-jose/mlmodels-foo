import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// pages
import Home from './pages/Home';
import Sklearn from './pages/Sklearn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sklearn" element={<Sklearn />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
