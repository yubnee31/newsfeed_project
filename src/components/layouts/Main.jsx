import React from 'react';
import List from 'components/List';
import styled from 'styled-components';

export default function Main() {
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
