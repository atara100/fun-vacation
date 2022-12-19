
import { createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AdminOnly from './auth/AdminOnly';
import Login from './auth/Login';
import RouteGuard from './auth/RouteGuard';
import SignUp from './auth/SignUp';
import { setToken } from './auth/tokenMgmt';
import Header from './components/Header';
import Edit from './pages/Edit';
import Home from './pages/Home/Home';
import Order from './pages/Order';
import Vacations from './pages/Vacations/Vacations';
import { postRequest } from './services/apiService';

interface ILoginData {
    email: string;
    password: string;
}

interface Context{
  userName: string;
  handleLogout:Function;
  login:Function;
  isAdmin:boolean;
}

export const AppContext = createContext<Context | null>(null);

function App() {

const [userName, setUserName] = useState<string>('');
const [isAdmin, setIsAdmin] = useState<boolean>(false);
const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        setUserName('');
        setIsAdmin(false)
        navigate('/login');
    }

    function login(data: ILoginData) {
        const res=postRequest('users/login',data,false)
        if(!res) return;
           res.then(response => response.json())
            .then(json => {
                setToken(json.token);
                setIsAdmin(json.isAdmin);
                setUserName(json.name);
                navigate('/vacations');
            })
    }


  return (
  <AppContext.Provider value={{userName,handleLogout,login,isAdmin}}>

    <Header />
    <ToastContainer/>

    <Routes>
        <Route path='/' element={<RouteGuard> <Home/> </RouteGuard>}></Route>
        <Route path='/order' element={<RouteGuard> <Order/> </RouteGuard>}></Route>
        <Route path='/vacations' element={<RouteGuard> <Vacations/> </RouteGuard>}></Route>
        <Route path='/edit/:id' element={<RouteGuard> <Edit/> </RouteGuard>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login  login={login}/>}></Route>
        <Route path='/admin' element={<AdminOnly/>}></Route>
    </Routes>

  </AppContext.Provider>
  );
}

export default App;
