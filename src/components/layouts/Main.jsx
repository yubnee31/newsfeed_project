import React from 'react';
import styled from 'styled-components';
import List from '../List';

function Main() {
  return (
    <Container>
      <List title={true} />
      <List title={false} />
    </Container>
  );
}

const Container = styled.div`
  /* background-color: powderblue; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default Main;
