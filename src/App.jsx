import classes from'./App.module.scss';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import Login from './views/Login/Login';
import Register from './views/Register/Register'

import {ProtectedRoutes} from './core/AuthRoleUser';
import Home from './views/Home/Home';

import Stores from './views/Stores/Stores';
import Store from './views/Stores/Store/Store';
import Product from './components/Stores/Product/Product';
import Category from './views/Stores/Category/Category';

import StoreV from './views/Store/Store';

import Profile from './views/Profile/Profile';
import Activity from './views/Profile/Activity/Activity';
import WishList from './views/Profile/WishList/WishList';
import Orders from './views/Profile/Orders/Orders';
import Configuration from './views/Profile/Configuration/Configuration';

import Contact from './views/Contact/Contact';
import Cart from './views/Cart/Cart';

import Users from './views/Users/Users';

import NotFound404 from './views/NotFound404/NotFound404';

function App() {

  return (
    <div className={classes["App"]}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="Stores" element={<Stores/>}>
              <Route path="Store/:id/:Store" element={<Store/>}>
                <Route path="Product/:idProduct/:Name" element={<Product/>}/>
              </Route>
              <Route path="Category/:Category" element={<Category/>}/>
              <Route path="*" element={<NotFound404/>}/>
            </Route> 
            <Route element={<ProtectedRoutes/>}>
              <Route path="Profile" element={<Profile/>}>
                <Route path="Activity" element={<Activity/>}/>
                <Route path="WishList" element={<WishList/>}/>
                <Route path="Orders" element={<Orders/>}/>
                <Route path="Configuration" element={<Configuration/>}/>
              </Route>
              <Route path="Store" element={<StoreV/>}>
              </Route>
              <Route path="Users" element={<Users/>}>
              </Route>
            </Route>
            <Route path="Cart" element={<Cart/>}/>
            <Route path="Contact" element={<Contact/>}/>
            <Route path="*" element={<NotFound404/>} />
          </Route>
          <Route path="/Login" element={<Login />}/>
          <Route path="/Register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App