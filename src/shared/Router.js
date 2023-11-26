import Detail from 'pages/Detail';
import Home from 'pages/Home';
import Mypage from 'pages/Mypage';
import Edit from 'components/Edit';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Search from 'pages/Search';
import Addpage from 'pages/Addpage';

const Router = () => {
  const [items, setItems] = useState([
    { text: '아이템 1', sold: false, id: 1 },
    { text: '아이템 2', sold: false, id: 2 }
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="addpage" element={<Addpage items={items} setItems={setItems} />} />
        <Route path="detail/:id" element={<Detail items={items} setItems={setItems} />} />
        <Route path="/search" element={<Search />} />
        <Route path="mypage" element={<Mypage items={items} setItems={setItems} />} />
        {/* <Route path="edit/:id" element={<Edit items={items} setItems={setItems} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
