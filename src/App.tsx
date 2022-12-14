import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AdminOnly from './auth/AdminOnly';
import Login from './auth/Login';
import RouteGuard from './auth/RouteGuard';
import SignUp from './auth/SignUp';
import Header from './components/Header';
import Edit from './pages/Edit';
import Home from './pages/Home/Home';
import Order from './pages/Order';
import Vacations from './pages/Vacations/Vacations';

function App() {
  return (
  <>
    <Header/>
    <ToastContainer/>

    <Routes>
      <Route path='/' element={<RouteGuard> <Home/> </RouteGuard>}></Route>
      <Route path='/order' element={<RouteGuard> <Order/> </RouteGuard>}></Route>
      <Route path='/vacations' element={<RouteGuard> <Vacations/> </RouteGuard>}></Route>
      <Route path='/edit/:id' element={<RouteGuard> <Edit/> </RouteGuard>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/admin' element={<AdminOnly/>}></Route>

    </Routes>
  </>
  );
}

export default App;
