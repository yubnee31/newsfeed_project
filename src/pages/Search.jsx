import React from 'react';
import Item from 'components/Item';
import Layout from 'components/layouts/Layout';

export default function Search({ items, searchInput }) {
  return (
    <Layout>
      {searchInput
        ? items
            .filter((item) => item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput))
            .map((item) => <Item key={item.id} item={item} />)
        : '검색 결과가 없습니다.'}
    </Layout>
  );
}

{
  /* <List title={`"${query}"에 대한 검색 결과`} query={query} items={searchResults} />; */
}
