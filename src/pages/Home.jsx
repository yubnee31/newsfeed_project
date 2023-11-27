import Layout from 'components/layouts/Layout';
import Main from 'components/layouts/Main';
import React, { useState } from 'react';
// import Search from './Search';
function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  return (
    <Layout selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
      <Main selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </Layout>
  );
}

export default Home;
