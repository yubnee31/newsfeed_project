import React, { useEffect } from 'react';
import styled from 'styled-components';
import defaultItem from 'assets/defaultItem.png';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function MypagePost({ items, setItems }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('login user'));
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'items'));
      const querySnapshot = await getDocs(q);
      const initialItems = [];

      querySnapshot.forEach((doc) => {
        initialItems.push({ id: doc.id, ...doc.data() });
      });

      setItems(initialItems);
    };

    fetchData();
  }, []);

  let userItem = [];
  user.uid === null ? (userItem = []) : (userItem = items.filter((item) => item.userId === user.uid));

  return (
    <>
      <PostSection>
        <RegistItemBtn
          onClick={() => {
            navigate('/register');
          }}
        >
          물건 판매하기
        </RegistItemBtn>
        <OnSale>
          <p>판매중인 상품</p>
          <ItemWrapper>
            {userItem
              .filter((item) => !item.sold)
              .map((item) => {
                return (
                  <Item key={item.id}>
                    <div>
                      <img src={null ?? defaultItem} alt="아바타이미지" />

                      <h1>{item.itemTitle}</h1>
                      <p>{item.itemInfo}</p>
                      <p>{item.itemPrice}</p>
                    </div>
                  </Item>
                );
              })}
          </ItemWrapper>
        </OnSale>

        <SoldOut>
          <p>판매완료된 상품</p>

          <ItemWrapper>
            {userItem
              .filter((item) => item.sold)
              .map((item) => {
                return (
                  <Item key={item.id}>
                    <div>
                      <img src={null ?? defaultItem} alt="아바타이미지" />
                      <h1>{item.itemTitle}</h1>
                      <p>{item.itemInfo}</p>
                      <p>{item.itemPrice}</p>
                    </div>
                  </Item>
                );
              })}
          </ItemWrapper>
        </SoldOut>
      </PostSection>
    </>
  );
}

const PostSection = styled.section`
  width: 1000px;
  min-height: 1000px;
  border: 1px solid black;
  padding: 20px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  position: relative;
`;
const RegistItemBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const OnSale = styled.div`
  width: 900px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
`;
const SoldOut = styled.div`
  width: 900px;
  height: 400px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ItemWrapper = styled.div`
  display: flex;
  gap: 20px;
  font-size: 17px;
  flex-wrap: wrap;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;

  & img {
    width: 270px;
    height: 270px;
  }
`;
