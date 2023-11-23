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
  margin-right: 100px;
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
  border: 3px solid black;
  border-radius: 20px;
  font-size: 20px;
  position: relative;
`;

const SearchBtn = styled.button`
  display: flex;
  margin-left: 20px;
  position: relative;
  width: 60px;
  height: 60px;
  align-items: center;
  background-color: black;
  color: white;
  border-radius: 15px;
  justify-content: center;
`;

// const CategoryBtn = styled.button`
//   border-radius: 20px;
//   font-size: 20px;
//   width: 100px;
//   height: 50px;
//   background-color: transparent;
//   margin-top: 20px;
//   margin-left: 100px;
//   display: flex;
// `;

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <SignUpLogIn />
      <SearchDiv>
        <HomeBtn type="button" onClick={() => navigate('/')}>
          <Img src="https://img.freepik.com/premium-vector/potato-root-vegetables-carbohydrate-agriculture-farm-product_22052-4629.jpg"></Img>
        </HomeBtn>
        <SearchInput placeholder=" 검색어를 입력하세요"></SearchInput>
        <SearchBtn>검색</SearchBtn>
      </SearchDiv>
      {/* <div>
        <CategoryBtn>카테고리</CategoryBtn>
      </div> */}
    </>
  );
}

export default Header;
