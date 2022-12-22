import React, { useEffect, useState } from 'react'
import db from './firebase';
import { collection, getDocs } from "firebase/firestore"; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import TodoList from './components/TodoList.js';


const App = () => {

  return (
    <div className="container">
    <BrowserRouter>
        <Routes>
          <Route path={`/signUp/`} element={<SignUp />} />
          <Route path={`/signIn/`} element={<SignIn />} />
          <Route path={`/`} element={<TodoList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
