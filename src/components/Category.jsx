import React, { useState } from 'react';
import styled from 'styled-components';
import MenuImg from '../assets/menu.png';

export default function Category() {

  //카테고리 메뉴 버튼 상태
  const [showDropDownBtn, setShowDropDownBtn] = useState(false);
  const [activateDropDown, setActivateDropDown] = useState(false);
  const dropDownCategory = () => {
    alert('드롭다운 연결');
  };

  return (
    <ConTainer>
      <CategoryBtn onClick={dropDownCategory} src={MenuImg} />
      <DropDown>
        <Content>All</Content>
        <Content>의류</Content>
        <Content>악세사리</Content>
        <Content>전자제품</Content>
        <Content>도서</Content>
        <Content>생활용품</Content>
        <Content>반려용품</Content>
        <Content>기타</Content>
      </DropDown>
    </ConTainer>
  );
}

const ConTainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CategoryBtn = styled.img`
  margin-right: 200px;
  width: 40px;
  &:hover {
    cursor: pointer;
  }
`;

// const CategoryBtn = styled.button`
//   border: 3px solid #ab722374;
//   border-radius: 20px;
//   font-size: 18px;
//   width: 100px;
//   height: 60px;
//   background-color: transparent;
//   margin-top: 20px;
//   /* margin-left: 10px; */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #ab7323;
// `;

const DropDown = styled.ul`
  position: absolute;
  /* background-color: #fbd6d6; */
  width: 200px;
`;

const Content = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
  width: 200px;
  height: 30px;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }

`;
