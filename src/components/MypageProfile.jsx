import React from 'react';
import styled from 'styled-components';
import defaultUser from"assets/defaultUser.png"

export default function MypageProfile() {
  return (
    <ProfileSection>
        <UserInfo>
            <Avatar>
                {/* firebase 에서 프로필사진, 닉네임, email 읽어오기*/}
                <img src = {null ?? defaultUser} alt = "아바타이미지"/>
            </Avatar>
            <NicknameAndMail>
                <p>닉네임 : jinwoo ma</p>
                <p>이메일 : maddonge@naver.com</p>
            </NicknameAndMail>
        </UserInfo>
        <EditBtn><button>수정하기</button></EditBtn>
    </ProfileSection>
  )
};

const ProfileSection = styled.section`
    width:1000px;
    height:450px;
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
    gap:20px;
`;
const Avatar = styled.div`
    width:300px;
    height:300px;
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
    & button {
        width:100px;
        height:40px;
    }
`;
