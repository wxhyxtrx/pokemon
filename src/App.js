import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Detail from './components/detail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/detail/pokemon/:id' element={<Detail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
