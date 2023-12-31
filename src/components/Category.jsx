import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuImg from '../assets/menu.png';
import { useItems } from 'shared/Items';

export default function Category(props) {
  const [items, setItems] = useItems();

  //카테고리별 분류된 아이템 관리
  const [filteredItems, setFilteredItems] = useState([]);

  //카테고리 메뉴 버튼 상태
  const [showDropDownBtn, setShowDropDownBtn] = useState(false);

  //show DROP DOWN  MENU
  const dropDownCategory = (categoryName) => {
    const filtered = items.filter((item) => item.itemcategory === categoryName);
    setFilteredItems(filtered);
    setShowDropDownBtn(!showDropDownBtn);
  };

  //카테고리 클릭시 해당 상품들 필터링
  const handleCategories = (category) => {
    const filteredList = items.filter((item) => item.itemcategory === category);
    setFilteredItems(filteredList);
    props.setSelectedCategory(category);
  };
  // console.log('filteredItems', filteredItems);
  return (
    <ConTainer>
      <CategoryBtn onClick={dropDownCategory} src={MenuImg} />
      {showDropDownBtn && (
        <DropDownMenu>
          <Content onClick={() => handleCategories('All')}>All</Content>
          <Content onClick={() => handleCategories('의류')}>의류</Content>
          <Content onClick={() => handleCategories('악세사리')}>악세사리</Content>
          <Content onClick={() => handleCategories('전자제품')}>전자제품</Content>
          <Content onClick={() => handleCategories('도서')}>도서</Content>
          <Content onClick={() => handleCategories('생활용품')}>생활용품</Content>
          <Content onClick={() => handleCategories('반려용품')}>반려용품</Content>
          <Content onClick={() => handleCategories('기타')}>기타</Content>
        </DropDownMenu>
      )}
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

const DropDownMenu = styled.ul`
  position: absolute;
  background-color: white;
  margin-left: 40px;
  width: 210px;
  padding: 20px 0;
  z-index: 999;
  box-shadow: 1px 1px 3px 0 gray;
  /* animation: 0.3s ease-in-out; */
`;

const Content = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
  width: 210px;
  height: 50px;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
    cursor: default;
  }
`;
