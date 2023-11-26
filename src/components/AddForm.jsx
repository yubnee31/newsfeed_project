import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const AddForm = ({ items, setItems, user }) => {
  const navigate = useNavigate();
  const [itemInfo, setItemInfo] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [images, setImages] = useState({
    imageFiles: [],
    previewURLs: Array(4)
      .fill()
      .map((_, index) => `img/default_image${index + 1}.png`)
  });
  const inputRef = useRef(null);

  useEffect(() => {
    setImages({
      imageFiles: [],
      previewURLs: Array(4)
        .fill()
        .map((_, index) => `img/default_image${index + 1}.png`)
    });
  }, []);

  // 파일 업로드 핸들러
  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const downloadURLs = await Promise.all(uploadPromises);

      // 이미지 정보 업데이트
      setImages(({ imageFiles, ...rest }) => ({
        ...rest,
        imageFiles: selectedFiles,
        previewURLs: downloadURLs
      }));
    } catch (error) {
      console.error('이미지 업로드 에러 ', error);
    }
  };

  // 이미지 삭제
  const deleteImages = () => {
    setImages(({ imageFiles, ...rest }) => ({
      ...rest,
      imageFiles: [],
      previewURLs: Array(4)
        .fill()
        .map((_, index) => `img/default_image${index + 1}.png`)
    }));
  };

  // 서버에 이미지 업로드
  const sendImagesToServer = () => {
    if (images.imageFiles.length > 0) {
      alert('서버에 등록이 완료되었습니다!');
      setImages(({ imageFiles, ...rest }) => ({
        ...rest,
        imageFiles: [],
        previewURLs: Array(4)
          .fill()
          .map((_, index) => `img/default_image${index + 1}.png`)
      }));
    } else {
      alert('사진을 등록하세요!');
    }
  };

  // 아이템 등록
  const addItem = async (event) => {
    event.preventDefault();

    try {
      const newItem = {
        itemInfo,
        itemPrice,
        itemTitle,
        isFavorite,
        category,
        sold: false,
        timestamp: new Date(),
        userId: user.uid,
        images: images.imageFiles
      };

      // 아이템 목록 업데이트
      setItems((prev) => [...prev, newItem]);

      const collectionRef = collection(db, 'items');
      await addDoc(collectionRef, newItem);

      // 입력값 초기화
      setItemInfo('');
      setItemPrice('');
      setItemTitle('');
      setCategory('');

      // 이미지 초기화
      setImages(({ imageFiles, ...rest }) => ({
        ...rest,
        imageFiles: [],
        previewURLs: Array(4)
          .fill()
          .map((_, index) => `img/default_image${index + 1}.png`)
      }));

      // 페이지 이동
      navigate('/addForm');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <AddSection>
      <FileUploadSection>
        <UploaderWrapper>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            onClick={() => (inputRef.current.value = null)}
            ref={inputRef}
            multiple="multiple"
          />
          <UploadButton>
            <CustomButton type="button" variant="contained" onClick={() => inputRef.current.click()}>
              미리보기
            </CustomButton>
            <CustomButton color="error" variant="contained" onClick={deleteImages}>
              삭제
            </CustomButton>
            <CustomButton color="success" variant="contained" onClick={sendImagesToServer}>
              업로드
            </CustomButton>
          </UploadButton>
        </UploaderWrapper>
      </FileUploadSection>

      {/* 오른쪽 부분 (제목, 내용, 카테고리, 등록하기) */}
      <form onSubmit={addItem}>
        <InputField value={itemInfo} onChange={(event) => setItemInfo(event.target.value)} placeholder="상품 설명" />
        <br />
        <InputField value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="가격" />
        <br />
        <InputField value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} placeholder="제목" />
        <br />
        <CategoryDropdown value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="" disabled>
            카테고리 선택
          </option>
          <option value="의류">의류</option>
          <option value="전자제품">전자제품</option>
          <option value="악세사리">악세사리</option>
          <option value="악세사리">반려용품</option>
          <option value="악세사리">도서</option>
          <option value="악세사리">생활용품</option>
          <option value="악세사리">악세사리</option>
        </CategoryDropdown>
        <br />
        <SubmitButton type="submit">완료</SubmitButton>
      </form>
    </AddSection>
  );
};

// 스타일
const AddSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
`;

const FileUploadSection = styled.div`
  width: 50%;
`;

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

const CategoryDropdown = styled.select`
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

export default AddForm;
