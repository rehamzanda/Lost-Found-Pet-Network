import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './component/Navbar';
import Index from './component/Index';
import Lost from './component/Lost';
import Found from './component/Found';
import Show from './component/Show';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Lost" element={<Lost />} />
          <Route path="/Found" element={<Found />} />
          <Route path="/Show/:id" element={<Show />} />
        </Routes>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
