import React from 'react';
import SignUpLogIn from 'components/SignUpLogIn';
import ItemLists from 'components/ItemLists';

function Home() {
  return (
    <>
      <header>
        <SignUpLogIn />
      </header>
      <main>
        <ItemLists />
      </main>
      <footer></footer>
    </>
  );
}

export default Home;
