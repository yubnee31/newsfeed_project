import React from 'react';
import Layout from 'components/layouts/Layout';
import AddForm from 'components/AddForm';

function Addpage({ items, setItems }) {
  return (
    <Layout>
      <AddForm items={items} setItems={setItems} />
    </Layout>
  );
}

export default Addpage;
