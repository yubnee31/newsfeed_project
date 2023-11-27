/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const AddForm = ({ items, setItems }) => {
  const [itemInfo, setItemInfo] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemTitle, setItemTitle] = useState('');
  const [itemcategory, setItemCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);

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

  const Categories = [
   
    {
      id:0,
      itemcategory: '의류'
    },
    {
     id:1,
      itemcategory: '전자제품'
    },
    {
      id:2,
      itemcategory: '악세사리'
    },
    {
      id:3,
      itemcategory: '반려용품'
    },
    {
      id:4,
      itemcategory: '도서'
    },
    {
     id:5,
      itemcategory: '생활용품'
    },
    {
    id:6,
      itemcategory: '기타'
    },
  ];

  // 카테고리
  const ChangehandleCategory = (event) => {
    const CategoryValue = event.target.value;
    setItemCategory(CategoryValue);
  };
  // 등록 클릭 시 호출되는 함수 
  const HandleUpload = async () => {
    if (!itemInfo || itemPrice === 0  || !itemTitle  || selectedFile.length === 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    } else if (isNaN(itemPrice) || itemPrice === '') { 
      alert('숫자만 입력 가능합니다.');
    } else {
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
         if( itemcategory !== '' ) {
          await addDoc(collectionRef, newItem);
          // 입력값 초기화
          setItemInfo('');
          setItemPrice('');
          setItemTitle('');
          setItemCategory('');
          setSelectedFile([]);
          setPreviewUrl([]);
          alert('등록완료');
        }  else {
          alert('카테고리를 선택해주세요')
        }
        }catch (error) {
          console.log("error :",error.message);
          alert(`등록 중 오류가 발생했습니다: ${error.message}. 나중에 다시 시도해주세요.`);
      }
    }
  };
  // 카테고리 라인 
  return (
    <AddSection> 
     <ImageLogo src="https://img.freepik.com/premium-vector/potato-root-vegetables-carbohydrate-agriculture-farm-product_22052-4629.jpg"/>
         <BorderInnerPageTitle type="text">중고 상품 등록</BorderInnerPageTitle>
      <FileUploadSection>
        <UploaderWrapper>
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
       
      </FileUploadSection>
      <CustomFileButton htmlFor="fileInput">파일선택</CustomFileButton>
      <StyledFileInput type="file" multiple="multiple" onChange={handleFileChange} id="fileInput" />

      {/*  제목, 내용, 카테고리, 등록하기 */}
      <FormContainer>
        <InputFieldTitle  value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} placeholder="제목" />

        <CategoryDropdown  onChange={ChangehandleCategory}>
        <option value={itemcategory} disabled>카테고리 선택</option>  
          { Categories.map((category) => (
           <option key={`${category.id}`} value={category.itemcategory}>
              <ul>
                <li>
               {category.itemcategory}
               </li>
               </ul>
            </option>
          ))}
        </CategoryDropdown>
        <InputFieldComment
          value={itemInfo}
          onChange={(event) => setItemInfo(event.target.value)}
          placeholder="상품 설명"
        />
        <InputFieldPrice   value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} placeholder="가격" />
        <SubmitButton onClick={HandleUpload}>등록</SubmitButton>
      </FormContainer>
    </AddSection>
  );
};


// 스타일
const AddSection = styled.div`
width: 1200px;
 position: relative;
 border: 2px solid black;
 bottom : 280px;
  display: inline-block;
  left:430px;
  max-height: 130vh;
  margin: 400px 5px 1px 1px;;
  gap: 10px;
 
  @media (max-width: 1200px) {
    margin: 20px 10px 20px 10px;
  }
`;
   const BorderInnerPageTitle = styled.h1`
    font-weight: bold;
    font-size: 30px;
    display: flex;
    justify-content: center;
    background-color: white;
    margin-top: 50px;
    padding: 30px;
    padding-left: 60px;
    color: burlywood; ;

   `;

const ImageLogo = styled.img`
margin-top: 40px;
    width: 100px;
    height: 100px;
    position: absolute;
    left: 400px;
    object-fit: cover;

`;



const FileUploadSection = styled.div`
  display: flex;
  width: 600px; /* 고정된 너비 설정 */
  height: 480px; /* 고정된 높이 설정 */
  overflow: hidden; /* 컨테이너 크기를 초과하는 내용을 숨김 */
  position: relative;
  top: 200px;
  left: 50px;
  justify-content: center;
  border: 5px solid #ddd;
  color: burlywood;
  background-color: white;
  flex-direction: column;
  padding: 25px;
  @media (max-width: 1200px) {
    width: 85%;
    margin-left: 0; /* Adjusted margin for smaller screens */
  }
`;

const FormContainer = styled.div`
  width: 30%;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: 770px;
  bottom: 340px;
  border: 5px solid #ddd;
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
  width: 200px; 
  height: auto; 
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
  left: 570px;
  top: 790px;
  background-color: burlywood;
  border: 1px solid burlywood;
  color: white;
  padding: 30px 27px;
  border-radius: 1px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #de9887;
  }
`;

const InputFieldTitle = styled.input`
   display: inline-block;
   align-items: center;
  width:40%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
  cursor: pointer;
`;
const InputFieldComment = styled.input`
 display: inline-block;
  width: 91%;
  height: 300px;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
  cursor: pointer;
`;
const InputFieldPrice = styled.input`
  width: 91%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
  cursor: pointer;
`;

const CategoryDropdown = styled.select`
 display: inline-block;
  width: 51%;
  padding: 8px;
  margin-bottom: 16px;
  color: burlywood;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 20px;
  background-color: burlywood;
  color: white;
  border: none;
  border-radius: 1px;
  cursor: pointer;
  margin: 1px auto 1px auto;
  &:hover {
    background-color: #de9a87;
  }
`;
export default AddForm;
