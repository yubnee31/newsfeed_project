import React, { useEffect, useState } from 'react';
import Item from 'components/Item';
import { useItems } from 'shared/Items';
import Layout from 'components/layouts/Layout';

export default function Search({ query }) {
  const [items, setItems] = useItems();

  return (
    <Layout>
      {query
        ? items
            .filter((item) => item.itemTitle.includes(query) || item.itemInfo.includes(query))
            .map((item) => <Item key={item.id} item={item} />)
        : '검색 결과가 없습니다.'}
    </Layout>
  );
}

{
  /* <List title={`"${query}"에 대한 검색 결과`} query={query} items={searchResults} />; */
}
