import SignUpLogIn from 'components/SignUpLogIn';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Category from 'components/Category';
import { useItems } from 'shared/Items';

export default function Header() {
  const navigate = useNavigate();
  const [items, setItems] = useItems();

  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchInputHandler = (e) => setSearchInput(e.target.value);
  const search = (e) => {
    e.preventDefault();
    const filtered = items.filter((item) => {
      return item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput);
    });
    setSearchResults(filtered);
  };
  useEffect(() => {
    console.log('===========================');
    console.log('검색결과', searchResults);
    console.log('===========================');
  }, [searchResults]);

  return (
    <>
      <Title>GAMZA</Title>
      <SignUpLogIn />
      <SearchDiv>
        <Category />
        <HomeBtn type="button" onClick={() => navigate('/')}>
          <Img src="https://img.freepik.com/premium-vector/potato-root-vegetables-carbohydrate-agriculture-farm-product_22052-4629.jpg"></Img>
        </HomeBtn>
        <SearchForm onSubmit={search}>
          <SearchInput
            value={searchInput}
            onChange={(e) => searchInputHandler(e)}
            placeholder=" 검색어를 입력하세요."
          ></SearchInput>
          <SearchBtn type="submit">검색</SearchBtn>
        </SearchForm>
        {/* 게시물 작성 버튼 연결 */}
        <PostBtn onClick={() => navigate('/AddPage')}>상품등록</PostBtn>
      </SearchDiv>
    </>
  );
}

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start; // 카테고리 버튼을 왼쪽 끝으로 몰기 위해 flex-start 추가
  /* background-color: red; */
  width: 1200px; // 상품리스트 width와 맞춤 동일하게 설정
  height: 50px;
  margin: 35px auto 20px auto; // 20px auto 에서 수정
`;

const HomeBtn = styled.button`
  margin-right: 50px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 500px;
  height: 60px;
  border: 3px solid #ab7323;
  border-radius: 20px;
  font-size: 20px;
  /* margin-top: 15px; */ // 대신 SearchDiv의 margin-top을 20->35로 조정
`;

const SearchBtn = styled.button`
  display: flex;
  margin-left: 20px;
  /* margin-top: 15px; */ //솔, SearchDiv의 margin-top을 20->35로 조정
  position: relative;
  width: 100px; //솔, 너비 60 -> 100
  height: 60px;
  align-items: center;
  border: 3px solid #ab722374;
  background-color: transparent;
  border-radius: 15px;
  justify-content: center;
  font-size: 18px; // 15 -> 18
  font-weight: 600;
  color: #ab7323;
  &:hover {
    cursor: pointer; //솔, hover시 커서 변경
  }
`;

const Title = styled.h1`
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  color: #ab7323;
  font-style: italic;
  font-weight: bold;
`;

const PostBtn = styled.button`
  display: flex;
  margin: 13px 0 0 20px;
  /* margin-top: 15px; */ //솔, SearchDiv의 margin-top을 20->35로 조정
  width: 200px;
  height: 60px;
  align-items: center;
  border: none;
  background-color: #ab722374;
  border-radius: 15px;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  &:hover {
    cursor: pointer; //솔, hover시 커서 변경
    background-color: #ae7a32c7;
  }
`;

const SearchForm = styled.form`
  // 솔, SearchDiv -> SearchForm
  display: flex;
  align-items: center;
  justify-content: flex-start; // 솔, 카테고리 버튼을 왼쪽 끝으로 몰기 위해 flex-start 추가
  /* background-color: red; */
  width: 1200px; // 솔, 상품리스트 width와 맞춤 동일하게 설정
  height: 50px;
  margin: 35px auto 20px auto; // 솔, 20px auto 에서 수정
`;
