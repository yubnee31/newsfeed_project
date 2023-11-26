import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import { getAuth, updateProfile } from "firebase/auth";
import { storage, auth } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function MypageProfile() {
  const [selectedFile, setSelectedFile] = useState();
  const [changeNickname, setChangeNickname] = useState("");

  const user = JSON.parse(localStorage.getItem('login user'));
  const [profileImg, setProfileImg] = useState(user.photoURL);

  const auth = getAuth();

  const [editMode, setEditMode] = useState(false);

  const editProfile = () => {
    setEditMode(true);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);    
    setProfileImg(event.target.files[0]);
  };

  const handleUpload = async () => {
    const imageRef = ref(storage, `${user.displayName}/profile/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    setProfileImg(downloadURL);
  };

  const changeProfile=(event)=>{
    event.preventDefault();
    updateProfile(auth.currentUser,{
      displayName:changeNickname, photoURL:profileImg
    })
    localStorage.setItem('login user',JSON.stringify({ email: user.email, displayName: changeNickname, uid: user.uid, photoURL:profileImg }))

    setEditMode(false);
  }
  return (
    <ProfileSection>
      {!editMode ? (
        <div>
          <UserInfo>
            <Avatar>
              {/* firebase 에서 프로필사진, 닉네임, email 읽어오기*/}
              <img src={profileImg} alt="아바타이미지" />
            </Avatar>
            <NicknameAndMail>
              <p>닉네임 : {user.displayName}</p>
              <p>이메일 : {user.email}</p>
            </NicknameAndMail>
          </UserInfo>
          <EditBtn>
            <button onClick={editProfile}>수정하기</button>
          </EditBtn>
        </div>
      ) : (
        <div>
          <form
            onSubmit={changeProfile}
          >
            <EditSection>
              <Avatar>
                <img src={profileImg} alt="아바타이미지" />
              </Avatar>
              <input type="file" onChange={handleFileSelect} />
              <button type="button" onClick={handleUpload}>
                Upload
              </button>
              <InputNewNickname>
                닉네임 : <input value={changeNickname} onChange={(e) => setChangeNickname(e.target.value)} />
              </InputNewNickname>

            </EditSection>
            <EditBtn>
              <button type="submit">완료</button>
            </EditBtn>
          </form>
        </div>
      )}
    </ProfileSection>
  );
}

const ProfileSection = styled.section`
  width: 1000px;
  height: 300px;
  border: 3px solid #ab7323;
  border-radius: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const EditSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 10px;
`;
const InputNewNickname = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 250px;
`;
const InputNewEmail = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Avatar = styled.div`
  width: 200px;
  height: 200px;

  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const NicknameAndMail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 300px;
`;

const EditBtn = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  & button {
    width: 120px;
    height: 40px;
    border: 3px solid #ab722374;
    border-radius: 10px;
    background-color: transparent;
  }
`;
