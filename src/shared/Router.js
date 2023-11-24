import Detail from 'pages/Detail';
import Home from 'pages/Home';
import Mypage from 'pages/Mypage';
import Register from 'pages/Register';
import Test from 'pages/Test';
import React, { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  const [items, setItems] = useState([
    { text: '아이템 1', sold: false, id: 1 },
    { text: '아이템 2', sold: false, id: 2 }
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="mypage" element={<Mypage items = {items} setItems = {setItems}/>} />
        <Route path="register" element={<Register items = {items} setItems = {setItems}/>} />
        <Route path="test/:id" element={<Test items = {items} setItems = {setItems}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
