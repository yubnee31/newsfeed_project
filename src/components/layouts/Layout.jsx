import React from 'react';
import Header from './Header';
import Main from './Main';
function Layout(props) {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      {/* <Main /> */}
    </div>
  );
}

export default Layout;
