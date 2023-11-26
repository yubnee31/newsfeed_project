import AddForm from 'components/AddForm';
import Layout from 'components/layouts/Layout';
import React from 'react';

export default function Register({ items, setItems }) {
  return (
    <>
      <Layout>
        <AddForm items={items} setItems={setItems} />
      </Layout>
    </>
  );
}
