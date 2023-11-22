import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore'; // 수정: getDocs 사용
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Bear from './bear.jpeg';

export default function List({ title }) {
  const [items, setItems] = useState([
    { 
      id: 1,
      itemTitle: '말 안 듣는 곰돌이 팝니다.',
      itemPrice: 20000,
      sold: false
    },
    {
      id: 2,
      itemTitle: '못생긴 곰돌이 팔아요.',
      itemPrice: 20000,
      sold: false
    },
    {
      id: 3,
      itemTitle: '곰돌이 곰돌이 곰돌이',
      itemPrice: 20000,
      sold: false
    },
    {
      id: 4,
      itemTitle: '여러분의 친구 곰돌이',
      itemPrice: 20000,
      sold: false
    }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'items'));
      const querySnapshot = await getDocs(q);

      const initialItems = [];
      querySnapshot.forEach((doc) => {
        initialItems.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setItems(initialItems);
      console.log(initialItems)
    };
    fetchData();
    // console.log(items)
  }, []);


  return (
    <ListWrapper>
      <SectionTitle>{title ? '최신 등록 상품' : '인기 상품'}</SectionTitle>
      <Items>
        {items.map((item) => (
          <Item key={item.id}>
            <Img src={Bear} />
            <ItemInfo>
              <p> {item.itemTitle}</p>
              <Price> {item.itemPrice} </Price>
            </ItemInfo>
          </Item>
        ))}
      </Items>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  /* background-color: #edc29a; */
  width: 85%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  gap: 10px;
`;

const SectionTitle = styled.h1`
  font-size: 35px;
  font-weight: 800;
  font-style: italic;
`;

const Items = styled.div`
  /* background-color: #d6ed9d; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  width: 100;
  gap: 10px;
`;

const Item = styled.div`
  background-color: white;
  width: 295px;
  height: 390px;
  border-radius: 3px;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 10px 5px 0;
  gap: 15px;
`;

const Price = styled.p`
  font-weight: 800;
`;
