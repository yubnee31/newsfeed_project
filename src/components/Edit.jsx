import { db } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { collection, getDocs, query } from 'firebase/firestore';

export default function Edit({ setItems }) {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [changedTitle, setChangedTitle] = useState('');
  const [changedInfo, setChangedInfo] = useState('');
  const [changedPrice, setChangedPrice] = useState('');
  const [soldStatus, setSoldStatus] = useState('판매중');

  const updateItem = async (event) => {
    event.preventDefault();
    const itemRef = doc(db, 'items', params.id);
    if (soldStatus === '판매완료') {
      await updateDoc(itemRef, { sold: true, itemTitle: changedTitle, itemInfo: changedInfo, itemPrice: changedPrice });
      setItems((prev) => {
        return prev.map((item) => {
          if (item.id === params.id) {
            return { ...item, sold: true, itemTitle: changedTitle, itemInfo: changedInfo, itemPrice: changedPrice };
          } else {
            return item;
          }
        });
      });
      setSelectedItem({...selectedItem, sold: true, itemTitle: changedTitle, itemInfo: changedInfo, itemPrice: changedPrice });
    } else {
      await updateDoc(itemRef, {
        sold: false,
        itemTitle: changedTitle,
        itemInfo: changedInfo,
        itemPrice: changedPrice
      });
      setItems((prev) => {
        return prev.map((item) => {
          if (item.id === params.id) {
            return { ...item, sold: false, itemTitle: changedTitle, itemInfo: changedInfo, itemPrice: changedPrice };
          } else {
            return item;
          }
        });
      });
      setSelectedItem({...selectedItem,sold: false, itemTitle: changedTitle, itemInfo: changedInfo, itemPrice: changedPrice });
    }

    setEditMode(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'items'));
      const querySnapshot = await getDocs(q);
      const initialItems = [];

      querySnapshot.forEach((doc) => {
        initialItems.push({ id: doc.id, ...doc.data() });
      });
      setItems(initialItems);
      setSelectedItem(initialItems.find((item) => item.id === params.id));

    };
    fetchData();
  }, []);

  const deleteItem = async (event) => {
    const itemRef = doc(db, 'items', params.id);
    await deleteDoc(itemRef);

    setItems((prev) => {
      return prev.filter((item) => item.id !== params.id);
    });
    navigate('/mypage');
  };

  const selectHendler = async (event) => {
    setSoldStatus(event.target.value);
  };

  return (
      <Main>
        {!editMode ? (
          <SelectedItemSection>
            <ItemInfoSection>
              <ItemImg src={selectedItem.images}></ItemImg>
              <ItemTitle>{selectedItem.itemTitle}</ItemTitle>
              <ItemInfo>{selectedItem.itemInfo}</ItemInfo>
              <ItemPrice>{selectedItem.itemPrice}</ItemPrice>
            </ItemInfoSection>

            <EditBtn onClick={() => setEditMode(true)}>수정하기</EditBtn>
            <DeleteBtn onClick={deleteItem}>삭제하기</DeleteBtn>
            <BackBtn onClick={() => navigate('/mypage')}>돌아가기</BackBtn>
          </SelectedItemSection>
        ) : (
          <SelectedItemForm onSubmit={updateItem}>
            <ChangeSection>
              <label>상품제목</label>
              <ChangeInput value={changedTitle} onChange={(e) => setChangedTitle(e.target.value)} />

              <label>상품설명</label>
              <ChangeInput value={changedInfo} onChange={(e) => setChangedInfo(e.target.value)} />

              <label>상품가격</label>
              <ChangeInput value={changedPrice} onChange={(e) => setChangedPrice(e.target.value)} />

              <ChangeSelect onChange={selectHendler}>
                <option value="판매완료">판매완료</option>
                <option value="판매중">판매중</option>
              </ChangeSelect>
            </ChangeSection>
            <CompleteBtn type="submit">완료하기</CompleteBtn>
          </SelectedItemForm>
        )}
      </Main>
  );
}
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedItemSection = styled.section`
  display: flex;
  border: 3px solid #ab7323;
  border-radius: 20px;
  margin: 20px;
  width: 1000px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;
`;

const SelectedItemForm = styled.form`
  display: flex;
  border: 3px solid #ab7323;
  border-radius: 20px;
  margin: 20px;
  width: 1000px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;
`;

const ItemInfoSection = styled.div`
  top: 90px;
  left: 320px;
  width: 350px;
  height: 200px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 20px;
`;
const ChangeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
`;
const ChangeInput = styled.input`
  width: 200px;
  font-size: 20px;
  border: none;
  border-bottom: 3px solid #ab7323;
  outline: none;
`;
const ChangeSelect = styled.select`
  width: 100px;
  height: 30px;
  font-size: 20px;
  float: right;
`;
const ItemImg = styled.img`
  width : 250px;
  height:250px;
  position:absolute;
  left:50px;
  top:80px;
`
const ItemTitle = styled.p``;
const ItemInfo = styled.p``;
const ItemPrice = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-top: 40px;
`;
const EditBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 200px;
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 70px;

  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;
const BackBtn = styled.button`
  position: absolute;
  bottom: 20px;
  right: 70px;
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;
const CompleteBtn = styled.button`
  position: absolute;
  bottom: 20px;
  right: 70px;
  width: 120px;
  height: 40px;
  border: 3px solid #ab722374;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
`;
