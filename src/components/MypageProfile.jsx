import React, { useState } from 'react';
import styled from 'styled-components';
import defaultUser from"assets/defaultUser.png"
import { storage, auth } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function MypageProfile({changeNickname, setChangeNickname,changeEmail, setChangeEmail}) {
    const [profileImg, setProfileImg] = useState(defaultUser);
    const [selectedFile, setSelectedFile] = useState();

    const user = auth.currentUser;
      
    const [editMode, setEditMode] = useState(false);

    const editProfile = () =>{
        setEditMode(true);
    }

    const handleFileSelect = (event)=>{
        setSelectedFile(event.target.files[0]);
    }
    const handleUpload = async() =>{
        const imageRef = ref(
            storage,
            `${auth.currentUser.uid}/profile/${selectedFile.name}`
        );
        await uploadBytes(imageRef, selectedFile);
        const downloadURL = await getDownloadURL(imageRef);
        setProfileImg(downloadURL);
    };


  return (

    <ProfileSection>
        { !editMode ?
        <div>
        <UserInfo>
            <Avatar>
                {/* firebase 에서 프로필사진, 닉네임, email 읽어오기*/}
                <img src = {profileImg} alt = "아바타이미지"/>
            </Avatar>
            <NicknameAndMail>
                <p>닉네임 : jinwoo</p>
                <p>이메일 : {user.email}</p>
            </NicknameAndMail>
        </UserInfo>
        <EditBtn><button onClick={editProfile}>수정하기</button></EditBtn>
        </div>
        :
        <div>
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <EditSection>
            <Avatar>

                <img src = {profileImg} alt = "아바타이미지"/>
            </Avatar>
            <input type = "file" onChange = {handleFileSelect} />
            <button type = "button" onClick = {handleUpload}>Upload</button>
            <InputNewNickname>닉네임 : <input value = {changeNickname} onChange={(e)=>setChangeNickname(e.target.value)}/></InputNewNickname>
            <InputNewEmail>이메일 : <input value = {changeEmail} onChange={(e)=>setChangeEmail(e.target.value)}/></InputNewEmail>
            </EditSection>
            <EditBtn><button type= "submit"onClick={()=>setEditMode(false)}>완료</button></EditBtn>
        </form>
        </div>
        }
    </ProfileSection>
  )
};

const ProfileSection = styled.section`
    width:1000px;
    height:300px;
    border:1px solid black;
    margin:20px;
    display:flex;
    flex-direction:column;
    padding:20px;
    position: relative;


`
const UserInfo = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    gap:40px;
`;

const EditSection = styled.div`
    display:flex;
    align-items: center;
    flex-direction:column;

    gap: 10px;
`
const InputNewNickname = styled.div`
    display: flex;
    align-items: center;
    gap:5px;
    width:250px;
`;
const InputNewEmail = styled.div`
    width:250px;
    display: flex;
    align-items: center;
    gap:5px;
`
const Avatar = styled.div`
    width:200px;
    height:200px;

    border-radius: 50%;
    overflow:hidden;
    & img{
        width:100%;
        height:100%;
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
    top:10px;
    & button {
        width:100px;
        height:40px;
    }
`;
