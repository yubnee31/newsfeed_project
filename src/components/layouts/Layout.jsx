import React from 'react';
import Header from './Header';
function Layout(props) {
  console.log(props);
  return (
    <div>
      <Header selectedCategory={props.selectedCategory} setSelectedCategory={props.setSelectedCategory} />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
