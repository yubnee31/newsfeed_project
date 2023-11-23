import MypagePost from 'components/MypagePost';
import MypageProfile from 'components/MypageProfile';
import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'components/layouts/Layout';

function Mypage({items, setItems}) {

  const [changeNickname, setChangeNickname] = useState("");
  const [changeEmail, setChangeEmail] = useState("");

  return (
  <>
  <Layout>
      <Main>
        <MypageProfile changeNickname={changeNickname} setChangeNickname = {setChangeNickname} changeEmail = {changeEmail} 
        setChangeEmail = {setChangeEmail} items={items} setItems={setItems}/>
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
  background-color: green;
  height:200px;
`;

export default Mypage;
