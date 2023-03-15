
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { CartProvider } from './components/ContextReducer';
import './App.css';

import {Routes , Route} from 'react-router-dom';
function App() {
  return (
    <CartProvider>
    <div className='fs-1'>
      <Routes>
      <Route path="/" element={<Home/>} /> 
      <Route path="/signup" element={<SignUp/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/about" element={<About/>} /> 
      </Routes>
    </div>
    </CartProvider>
  );
}

export default App;
