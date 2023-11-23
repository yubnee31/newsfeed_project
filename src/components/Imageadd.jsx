import React, { useState, useRef, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import styled from "styled-components";

 
const UploaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

const ImgGrid = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
`;

const ImgPreview = styled.img`
  max-width: 200px;
  height: auto;
`;

const UploadButton = styled.div`
  display: flex;
  gap: 8px;
`;

const CustomButton = styled.button`
  width: 100px;
`;
const ImageBox = styled.div`
     display: flex;
  align-items: center;
  justify-content: center;
`

const ImageAdd = () => {
  const [images, setImages] = useState({
    imageFiles: [], // 업로드할 이미지 파일 
    previewURLs: Array.from({ length: 0 }, (_, index) => `img/default_image${index + 1}.png`), // 미리보기
  });
 // 파일입력에 대한 엘레멘트 참조 설정 
  const inputRef = useRef(null);

// 렌더링 될때 초기 상태 설정
  useEffect(()=>{
     setImages({
        imageFiles: [],
        previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
         // 파일 목록 배열로 변환
     });
  },[]); // defendency array 빈칸일 경우 한번만 렌더링 되고 실행 안댐 
 // 파일 버튼 listener 호출 
 const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 4);
  
    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef); // 수정: await 추가
      });
  
      const downloadURLs = await Promise.all(uploadPromises);
  
      setImages((prevImages) => ({
        ...prevImages,
        imageFiles: selectedFiles,
        previewURLs: downloadURLs,
      }));
    } catch (error) {
      console.error("이미지 업로드 에러 ", error);
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
      alert("서버에 등록이 완료되었습니다!");

      setImages((prevImages) => ({
        ...prevImages,
        imageFiles: [],
        previewURLs: Array.from({ length: 4 }, (_, index) => `img/default_image${index + 1}.png`),
      }));
    } else {
      alert("사진을 등록하세요!");
    }
  };

  return (
    <>
  <ImageBox>

      <ImgGrid>
        {images.previewURLs.map((url, index) => (
          <ImgPreview key={index} src={url} alt={`Preview ${index + 1}`} />
        ))}
      </ImgGrid>
      </ImageBox>
    <UploaderWrapper>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => (e.target.value = null)}
        ref={inputRef}
        className="hiddenInput"
        multiple = "multiple"
      />
    
      <UploadButton>
        <CustomButton
          type="primary"
          variant="contained"
          onClick={() => inputRef.current.click()}
        >
          Preview
        </CustomButton>
        <CustomButton
          color="error"
          variant="contained"
          onClick={deleteImages}
        >
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
    </>
  );
};

export default ImageAdd;
