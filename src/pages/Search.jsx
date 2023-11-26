import React from 'react';
import Item from 'components/Item';

export default function Search({ items, searchInput }) {
  const filteredList = items
    .filter((item) => item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput))
    .map((item) => <Item key={item.id} item={item} />);
  return <div>{filteredList.length > 0 ? filteredList : '검색 결과가 없습니다.'}</div>;
}
