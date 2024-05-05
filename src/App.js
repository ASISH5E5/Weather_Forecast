
import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css';
import Weather from './weatherinfo.js'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather/>}/>
        

      </Routes>
    </BrowserRouter>
  );
}
