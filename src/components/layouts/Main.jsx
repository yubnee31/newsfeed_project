import React, { useEffect, useState } from 'react';
import List from 'components/List';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Search from 'pages/Search';
import { useItems } from 'shared/Items';

export default function Main() {
  const [items, setItems] = useItems();
  const location = useLocation();
  //   console.log('location: navigate에서 넘어오는 부분', location);
  const queryParams = new URLSearchParams(location.search);
  //   console.log('queryParams', queryParams);
  const query = queryParams.get('query');
  //   console.log('추출된 query(검색어)', query);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // 검색어가 있다면 해당 검색어에 대한 결과를 가져옴
    if (query) {
      const filteredResults = items.filter((item) => item.itemTitle.includes(query) || item.itemInfo.includes(query));
      setSearchResults(filteredResults);
      console.log('필터링된 검색결과', filteredResults);
    }
  }, [searchResults]);

  return (
    <ListWrapper>
      {query ? <Search query={query} /> : '검색 결과가 없습니다.'}

      <List title={true} />
      <List title={false} />
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  /* background-color: #edc29a; */
  width: 1200px;
  /* height: 450px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  gap: 10px;
`;

const Container = styled.div`
  /* background-color: powderblue; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
