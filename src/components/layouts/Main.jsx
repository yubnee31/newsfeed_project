import React, { useEffect, useState } from 'react';
import List from 'components/List';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Search from 'components/Search';
import { useItems } from 'shared/Items';

export default function Main() {
  const [items] = useItems();
  const [searchResults, setSearchResults] = useState([]);
  const { state: searchInput } = useLocation();

  useEffect(() => {
    if (searchInput) {
      const filteredResults = items.filter(
        (item) => item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput)
      );
      setSearchResults(filteredResults);
    }
  }, [searchInput]);

  useEffect(() => {
    setSearchResults(items);
  });

  return (
    <ListWrapper>
      {searchInput && searchInput.length > 0 ? <Search items={searchResults} searchInput={searchInput} /> : <List />}
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
