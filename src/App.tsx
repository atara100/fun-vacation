import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Order from './pages/Order';
import Vacations from './pages/Vacations/Vacations';

function App() {
  return (
  <>
    <Header/>
    <ToastContainer/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
      <Route path='/vacations' element={<Vacations/>}></Route>
    </Routes>
  </>
  );
}

export default App;
