import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import defaultItem from 'assets/defaultItem.png';

export default function AddForm({ items, setItems }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('login user'));
  const [itemInfo, setItemInfo] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [images, setImages] = useState({
    imageFiles: [],
    previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
  });
  const inputRef = useRef(null);

  useEffect((event) => {
    event.preventDefault();
    setImages({
      imageFiles: [],
      previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
    });
  }, []);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const downloadURLs = await Promise.all(uploadPromises);

      setImages((prevImages) => ({
        ...prevImages,
        imageFiles: selectedFiles,
        previewURLs: downloadURLs,
      }));
    } catch (error) {
      console.error('이미지 업로드 에러 ', error);
    }
  };

  const deleteImages = () => {
    setImages((prevImages) => ({
      ...prevImages,
      imageFiles: [],
      previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
    }));
  };

  const sendImagesToServer = () => {
    if (images.imageFiles.length > 0) {
      alert('서버에 등록이 완료되었습니다!');

      setImages((prevImages) => ({
        ...prevImages,
        imageFiles: [],
        previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
      }));
    } else {
      alert('사진을 등록하세요!');
    }
  };

  const addItem = async () => {
    const newItem = { itemInfo, itemPrice, itemTitle, sold: false, userId: user.uid };
    setItems((prev) => [...items, newItem]);
    const collectionRef = collection(db, 'items');
    await addDoc(collectionRef, newItem);

    setItemInfo('');
    setItemPrice('');
    setItemTitle('');
    navigate('/mypage');
  };

  return (
    <AddSection>
         <div>

<div>
  {images.previewURLs.map((url, index) => (
    <img key={index} src={url} alt={`Preview ${index + 1}`} />
  ))}
</div>
</div>
      <form onSubmit={addItem} key={user.uid}>
        <StyledContainer>
            <FileUploadSection>
          <UploaderWrapper>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              onClick={(e) => (e.target.value = null)}
              ref={inputRef}
              multiple="multiple"
            />
            
            <UploadButton>
              <CustomButton
                type="primary"
                variant="contained"
                onClick={() => inputRef.current.click()}
              >
                Preview
              </CustomButton>
              <CustomButton color="error" variant="contained" onClick={deleteImages}>
                Delete
              </CustomButton>
              <CustomButton
                color="success"
                variant="contained"
                onClick={sendImagesToServer}
              >
                Upload
              </CustomButton>
            </UploadButton>
          </UploaderWrapper>

          <InputField
            value={itemInfo}
            onChange={(event) => setItemInfo(event.target.value)}
            placeholder="상품 설명"
          />
          <br />
          <InputField
            value={itemPrice}
            onChange={(event) => setItemPrice(event.target.value)}
            placeholder="가격"
          />
          <br />
          <InputField
            value={itemTitle}
            onChange={(event) => setItemTitle(event.target.value)}
            placeholder="제목"
          />
          <br />
          <br />
          <SubmitButton type={"onSubmit"} onClick={addItem}>완료</SubmitButton>
          </FileUploadSection>
        </StyledContainer>
      </form>
    </AddSection>
  );
}

const StyledContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FileUploadSection = styled.div`
    width: 50%;
`
const UploaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
`;

const UploadButton = styled.div`
  display: flex;
  gap: 8px;
`;

const CustomButton = styled.button`
  width: 100px;
`;

const InputField = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AddSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
