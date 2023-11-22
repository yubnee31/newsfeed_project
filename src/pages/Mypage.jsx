import MypagePost from 'components/MypagePost';
import MypageProfile from 'components/MypageProfile';
import React from 'react';
import styled from 'styled-components';

function Mypage() {
  return (
  <>
    <Header/>
    <Main>
      <MypageProfile/>
      <MypagePost/>
    </Main>
    <Footer/>
  </>);
}

const Header = styled.header`
  background-color: yellow;
  height:200px;
`;

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
