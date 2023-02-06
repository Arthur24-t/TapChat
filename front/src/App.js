import React from "react";
import './App.css';
import Chat from './page/Home.js'
import Login from './page/Login'
import Register from './page/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/Home" element={ <Chat/>} />
            <Route path="/" element={ <Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
