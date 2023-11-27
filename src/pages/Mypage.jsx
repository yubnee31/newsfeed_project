import MypagePost from 'components/MypagePost';
import MypageProfile from 'components/MypageProfile';
import React from 'react';
import styled from 'styled-components';
import Layout from 'components/layouts/Layout';

function Mypage({items, setItems}) {


  return (
  <>
  <Layout>
      <Main>
        <MypageProfile items={items} setItems={setItems}/>
        <MypagePost items={items} setItems={setItems}/>
      </Main>
    <Footer/>
  </Layout>
  </>);
}



const Main = styled.section`
  min-height: 700px;
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.footer`
  height:200px;
`;

export default Mypage;
