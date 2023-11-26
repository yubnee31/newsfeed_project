import React from 'react';
import Item from 'components/Item';
import styled from 'styled-components';

export default function Search({ items, searchInput }) {
  const filteredList = items
    .filter((item) => item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput))
    .map((item) => <Item key={item.id} item={item} />);
  return (
    <SearchContainer>
      {filteredList.length > 0 ? filteredList : <NoResult>검색 결과가 없습니다.</NoResult>}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: 1200px;
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center;
  width: 100%;
`;

const NoResult = styled.p`
  width: 1200px;
  font-size: 30px;
  text-align: center;
  color: grey;
`;
