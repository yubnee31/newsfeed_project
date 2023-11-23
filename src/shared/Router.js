import Detail from 'pages/Detail';
import DetailPage from 'pages/DetailPage';
import Home from 'pages/Home';
import Mypage from 'pages/Mypage';
import Register from 'pages/Register';
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
        <Route path="detail" element={<Detail />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="detailpage" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
