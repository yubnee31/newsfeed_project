import React from 'react';
import Header from './Header';
import Main from './Main';

function Layout(props) {
  return (
    <div>
      <Header />
      <Main />
      {/* <main>{props.children}</main> */}
    </div>
  );
}

export default Layout;
