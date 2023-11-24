import React, { useState } from 'react';
import styled from 'styled-components';

export default function Category() {

  const [activateDropDown, setActivateDropDown] = useState(false);
  const dropDownCategory = () => {

  };

  return (
    <ConTainer>
      <CategoryBtn onClick={dropDownCategory}>카테고리</CategoryBtn>
      <DropDown>
      </DropDown>
    </ConTainer>
  );
}

const ConTainer = styled.div``;

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

const DropDown = styled.div``;
