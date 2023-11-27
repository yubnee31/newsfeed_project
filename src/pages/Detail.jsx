import Comment from 'components/Comment';
import Edit from 'components/Edit';
import Layout from 'components/layouts/Layout';
import React from 'react';

function Detail({ items, setItems }) {
  return (
    <Layout>
      <div>
        <Edit items={items} setItems={setItems} />
        <Comment />
      </div>
    </Layout>
  );
}

export default Detail;
