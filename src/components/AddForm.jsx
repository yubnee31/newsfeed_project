import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router';

const AddForm = ({ items, setItems, tags, setTags }) => {
  const [itemInfo, setItemInfo] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemTitle, setItemTitle] = useState('');
  const [itemcategory, setItemCategory] = useState('');
  const [fixedTags, setFixedTags] = useState('');
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [timeStamp, setTimeStamp] = useState('');
  const [isFavorite, setItemFavorite] = useState(false);
  const navigate = useNavigate();

  // 파일 선택 시 호출되는 함수
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setSelectedFile([...selectedFile, ...files]); // 새로 선택된 파일들을 추가

    const newPreviewUrl = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });
    Promise.all(newPreviewUrl).then((url) => {
      setPreviewUrl([...previewUrl, ...url]);
    });
  };

  // 미리보기 사진 삭제
  const handleRemovePreview = (index) => {
    const updatedFiles = [...selectedFile];
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);

    const updatedPreviewUrls = [...previewUrl];
    updatedPreviewUrls.splice(index, 1);
    setPreviewUrl(updatedPreviewUrls);
  };

  // 등록 클릭 시 호출되는 함수
  const HandleUpload = async () => {
    try {
      const uploadPromises = selectedFile.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });
      const downloadURLs = await Promise.all(uploadPromises);
      const newItem = {
        itemInfo,
        itemPrice,
        itemTitle,
        itemcategory,
        images: downloadURLs,
        sold: false,
        timeStamp: new Date(),
        isFavorite: false
      };
      // 아이템 목록 업데이트
      setItems((prev) => [newItem, ...prev]);

      const collectionRef = collection(db, 'items');
      await addDoc(collectionRef, newItem);
      // 입력값 초기화
      setItemInfo('');
      setItemPrice(0);
      setItemTitle('');
      setItemCategory('');
      setSelectedFile([]);
      setPreviewUrl([]);
      alert('상품이 등록되었습니다!');
    } catch (error) {
      console.error('Error adding document: ', error.message, error.code);
      alert('등록 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };
  const Categories = [
    {
      id: 1,
      itemcategory: '의류'
    },
    {
      id: 2,
      itemcategory: '전자제품'
    },
    {
      id: 3,
      itemcategory: '악세사리'
    },
    {
      id: 4,
      itemcategory: '반려용품'
    },
    {
      id: 5,
      itemcategory: '도서'
    },
    {
      id: 6,
      itemcategory: '생활용품'
    },
    {
      id: 7,
      itemcategory: '기타'
    }
  ];
  // 카테고리
  const ChangehandleCategory = (event) => {
    const eventHandler = event.target.value;
    const newCategory = tags.some((tag) => tag[0] === eventHandler);
    if (!newCategory) {
      setFixedTags(eventHandler);
      if (eventHandler !== '') {
        const tag = [eventHandler];
        setTags([...tags, tag]);
      }
    }
  };

  return (
    <AddSection>
      <FileUploadSection>
        <UploaderWrapper>
          {' '}
          {previewUrl.map((url, index) => (
            <div key={index}>
              <ImageContainer>
                <ArrayImage src={url} alt={`Preview ${index}`} />
                <ArrayImageremoveStyleButton onClick={() => handleRemovePreview(index)} alt={`Preview ${index}`}>
                  ❌
                </ArrayImageremoveStyleButton>
              </ImageContainer>
            </div>
          ))}
        </UploaderWrapper>
        <CustomFileButton htmlFor="fileInput">파일선택</CustomFileButton>
      </FileUploadSection>

      <StyledFileInput type="file" multiple="multiple" onChange={handleFileChange} id="fileInput" />

      {/*  제목, 내용, 카테고리, 등록하기 */}
      <FormContainer>
        <InputFieldTitle value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} placeholder="제목" />
        <CategoryDropdown value={itemcategory} onChange={ChangehandleCategory}>
          <option value="" disabled>
            카테고리 선택
          </option>
          {Categories.map((category) => (
            <option key={category.id} value={category.itemcategory}>
              {category.itemcategory}
            </option>
          ))}
          {/* <option value="의류">의류</option>
          <option value="전자제품">전자제품</option>
          <option value="악세사리">악세사리</option>
          <option value="악세사리">반려용품</option>
          <option value="악세사리">도서</option>
          <option value="악세사리">생활용품</option>
          <option value="악세사리">악세사리</option>
          <option value="악세사리">기타</option> */}
        </CategoryDropdown>
        <InputFieldComment
          value={itemInfo}
          onChange={(event) => setItemInfo(event.target.value)}
          placeholder="상품 설명"
        />
        <InputFieldPrice value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="가격" />
        <SubmitButton onClick={HandleUpload}>등록</SubmitButton>
      </FormContainer>
    </AddSection>
  );
};

// 스타일
const AddSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: bottom;
  max-height: 100vh;
  margin: 400px auto 30px auto;
`;

const FileUploadSection = styled.div`
  display: flex;
  width: 600px; /* 고정된 너비 설정 */
  height: 300px; /* 고정된 높이 설정 */
  overflow: hidden; /* 컨테이너 크기를 초과하는 내용을 숨김 */
  position: relative;
  border: 1px solid #ddd;
  color: burlywood;
  margin-left: 200px;
  padding: 25px;
`;

const FormContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  padding: 20px;
`;

const UploaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 20px;
  color: burlywood;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ArrayImage = styled.img`
  width: 200px; /* 원하는 고정된 가로 크기로 설정 */
  height: auto; /* 세로 크기를 가로 크기에 맞추도록 설정 */
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
const ArrayImageremoveStyleButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;
const StyledFileInput = styled.input`
  display: none;
`;
const CustomFileButton = styled.label`
  position: absolute;
  background-color: burlywood;
  border: 1px solid #ddd;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InputFieldTitle = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
`;
const InputFieldComment = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
`;
const InputFieldPrice = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
`;

const CategoryDropdown = styled.select`
  width: 80%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: burlywood;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: burlywood;
  }
`;
export default AddForm;
