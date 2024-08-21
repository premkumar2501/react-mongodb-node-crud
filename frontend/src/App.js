import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom'
import DashBoard from './components/dashboard/DashBoard';
import { Header } from './components/header/Header';
import PostUser from './components/postUser/PostUser';
import UpdateUser from './components/updateUser/UpdateUser';

function App() {

  return (

    <>
      <Header title='CRUD Operation' />
      <Routes>
        <Route path='/' element={<DashBoard />}></Route>
        <Route path='/post' element={<PostUser />}></Route>
        <Route path='/post/:id' element={<UpdateUser />}></Route>
      </Routes>
    </>

  )
}

export default App