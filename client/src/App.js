import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './component/Navbar';
import Index from './component/Index';
<<<<<<< HEAD
import Found from './component/Found';
import Show from './component/Show';
=======
import Lost from './component/Lost';
import Found from './component/Found';
import Show from './component/Show';
import Edit from './component/Edit';
>>>>>>> Feature-Kareem


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
<<<<<<< HEAD
          <Route path="/Found" element={<Found />} />
          <Route path="/Show/:id" element={<Show />} />
=======
          <Route path="/Lost" element={<Lost />} />
          <Route path="/Found" element={<Found />} />
          <Route path="/Show/:id" element={<Show />} />
          <Route path="/Edit/:id" element={<Edit />} />
>>>>>>> Feature-Kareem
        </Routes>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
