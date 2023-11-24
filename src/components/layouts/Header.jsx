import SignUpLogIn from 'components/SignUpLogIn';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  width: 1000px;
  height: 50px;
  margin: 20px auto;
`;

const HomeBtn = styled.button`
  margin-right: 50px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 500px;
  height: 60px;
  border: 3px solid #ab7323;
  border-radius: 20px;
  font-size: 20px;
  position: relative;
  margin-top: 15px;
`;

const SearchBtn = styled.button`
  display: flex;
  margin-left: 20px;
  margin-top: 15px;
  position: relative;
  width: 60px;
  height: 60px;
  align-items: center;
  border: 3px solid #ab722374;
  background-color: transparent;
  border-radius: 15px;
  justify-content: center;
  font-size: 15px;
  color: #ab7323;
`;

const CategoryBtn = styled.button`
  border: 3px solid #ab722374;
  border-radius: 20px;
  font-size: 18px;
  width: 100px;
  height: 60px;
  background-color: transparent;
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ab7323;
`;

const Title = styled.h1`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #ab7323;
  font-style: italic;
  font-weight: bold;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Title>GAMZA</Title>
      <SignUpLogIn />
      <SearchDiv>
        <CategoryBtn>카테고리</CategoryBtn>
        <HomeBtn type="button" onClick={() => navigate('/')}>
          <Img src="https://img.freepik.com/premium-vector/potato-root-vegetables-carbohydrate-agriculture-farm-product_22052-4629.jpg"></Img>
        </HomeBtn>
        <SearchInput placeholder=" 검색어를 입력하세요"></SearchInput>
        <SearchBtn>검색</SearchBtn>
      </SearchDiv>
      <div></div>
    </>
  );
}

export default Header;
