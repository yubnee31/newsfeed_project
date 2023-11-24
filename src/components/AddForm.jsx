import React, { useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { auth, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import defaultItem from 'assets/defaultItem.png';
import DateAndTime from 'shared/DateAndTime';

export default function AddForm({ items, setItems }) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [itemImg, setitemImg] = useState(defaultItem);

  const user = JSON.parse(localStorage.getItem('login user'));
  const [itemInfo, setItemInfo] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeStamp, setTimeStamp] = useState('');

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    const imageRef = ref(storage, `${user.uid}/item/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    setitemImg(downloadURL);
  };

  const addItem = async (event) => {
    event.preventDefault();
    //itemImg는 왜 DB로 안가지
    const newItem = { itemInfo, itemPrice, itemTitle, sold: false, userId: user.uid, isFavorite, itemImg, timeStamp: DateAndTime() };
    setItems((prev) => {
      return [...items, newItem];
    });
    const collectionRef = collection(db, 'items');
    await addDoc(collectionRef, newItem);

    setItemInfo('');
    setItemPrice('');
    setItemTitle('');
    setUserId('');
    navigate('/mypage');
  };

  return (
    <AddSection>
      <form onSubmit={addItem} key={user.uid}>
        <div>
          <img src={itemImg} />
          <br />
          <input type="file" onClick={handleFileSelect} />
          <br />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
          <br />
          <input value={itemInfo} onChange={(event) => setItemInfo(event.target.value)} placeholder="상품 설명" />
          <br />
          <input value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="가격" />
          <br />

          <input value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} placeholder="제목" />
          <br />
          <br />

          <button onClick={addItem}>완료</button>
        </div>
      </form>
    </AddSection>
  );
}

const AddSection = styled.section``;
