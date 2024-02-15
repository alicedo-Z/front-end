import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import CreateHouse from './components/Main/CreateHouse';
import ViewListing from './components/Listing/ViewListing';
import ViewAndEditList from './components/Listing/ViewAndEditList';
import Hosted from './components/HostListing/Hosted';

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/main' element={<Main />} />
          <Route path='/main' element={<Main />} />
          <Route path='/host' element={<CreateHouse />} />
          <Route path='/mylisting' element={<Main />} />
          <Route path='/viewlisting' element={<ViewListing/>} />
          <Route path='/ViewAndEditList/:listId/:pageType' element={<ViewAndEditList/>} />
          <Route path='hostlisting' element={<Hosted/>} />
          {/* <Route path='/editlisting' element={<EditListing/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
