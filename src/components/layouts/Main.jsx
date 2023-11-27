import React, { useEffect, useState } from 'react';
import List from 'components/List';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Search from 'components/Search';
import { useItems } from 'shared/Items';
import FilteredCategory from 'components/FilteredCategory';

export default function Main(props) {
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

  const filtered = items.filter((item) => item.itemcategory === props.selectedCategory);

  return (
    <ListWrapper>
      {filtered && <FilteredCategory filtered={filtered} />}
      {searchInput && searchInput.length > 0 ? <Search items={searchResults} searchInput={searchInput} /> : <List />}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  width: 1200px;
  /* height: 450px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  gap: 10px;
`;
