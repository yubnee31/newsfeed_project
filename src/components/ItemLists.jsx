import { collection, getDocs, query } from 'firebase/firestore';
import styled from 'styled-components';
import List from './List';

export default function ItemLists() {
  return (
    <Container>
      <List title={true}/>
      <List title={false}/>
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