import React from 'react';
import AddForm from 'components/AddForm';
import Layout from 'components/layouts/Layout';

function AddPage({items, setItems}) {
  return (
    
<Layout>
    <AddForm items={items} setItems = {setItems}/>
  </Layout>
  )

}

export default AddPage;
