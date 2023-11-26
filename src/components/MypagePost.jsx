import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultItem from 'assets/defaultItem.png';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function MypagePost({ items, setItems }) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('login user'));
  console.log('mypagepost', user);
  const [selectedItem, setSelectedItem] = useState({});
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
            navigate('/addpage');
          }}
        >
          물건 판매하기
        </RegistItemBtn>
        <OnSale>
          <ItemP>판매중인 상품</ItemP>
          <ItemWrapper>
            {userItem
              .filter((item) => item.sold===false)
              .map((item) => {
                return (
                  <Item key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
                    <div>
                      <img src={item.images ?? defaultItem} alt="아바타이미지" />
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
          <ItemP>판매완료된 상품</ItemP>

          <ItemWrapper>
            {userItem
              .filter((item) => item.sold===true)
              .map((item) => {
                return (
                  <Item key={item.id} onClick={() => navigate(`/edit/${item.id}`)}>
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
  border: 3px solid #ab7323;
  border-radius: 20px;
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
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
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

const ItemP = styled.p`
  color: #ab7323;
  font-style: italic;
  font-weight: bold;
  font-size: 25px;
`;
