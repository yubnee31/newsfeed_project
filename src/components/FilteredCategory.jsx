import React from 'react';
import Item from './Item';
import styled from 'styled-components';

export default function FilteredCategory({ filtered }) {
  return (
    <CategoryContainer>
      {filtered.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </CategoryContainer>
  );
}
const CategoryContainer = styled.div`
  width: 1200px;
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center;
  width: 100%;
`;
