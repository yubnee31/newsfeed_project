import AddForm from 'components/AddForm';
import MypagePost from 'components/MypagePost';
import MypageProfile from 'components/MypageProfile';
import React, { useState } from 'react';
import styled from 'styled-components';

function Mypage() {
  const [items, setItems] = useState([
    {text:"아이템 1", sold: false, id:1},
    {text:"아이템 2", sold: false, id:2},
])
  const [changeNickname, setChangeNickname] = useState("");
  const [changeEmail, setChangeEmail] = useState("");

  return (
  <>
    <Header/>
      <Main>
        <MypageProfile changeNickname={changeNickname} setChangeNickname = {setChangeNickname} changeEmail = {changeEmail} 
        setChangeEmail = {setChangeEmail} items={items} setItems={setItems}/>
        <MypagePost items={items} setItems={setItems}/>
        <AddForm items={items} setItems={setItems}/>
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
