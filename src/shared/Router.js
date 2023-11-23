import Detail from 'pages/Detail';
import Home from 'pages/Home';
import Mypage from 'pages/Mypage';
import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
