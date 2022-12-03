import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Order from './pages/Order';

function App() {
  return (
  <>
    <Header/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
    </Routes>
  </>
  );
}

export default App;
