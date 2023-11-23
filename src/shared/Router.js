import Detail from 'pages/Detail';
import Home from 'pages/Home';
import Mypage from 'pages/Mypage';
import Addpage from 'pages/Addpage';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<Detail />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="Addpage" element={<Addpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
