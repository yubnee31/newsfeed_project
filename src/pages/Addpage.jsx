import React from 'react';

function AddPage({items, setItems}) {
  return (
    
  <Layout>
    <AddForm items={items} setItems={setItems}/>
  </Layout>
  )


}

export default AddPage;
