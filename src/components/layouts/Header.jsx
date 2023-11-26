import SignUpLogIn from 'components/SignUpLogIn';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import CategoryMenu from 'components/CategoryMenu';
import { useItems } from 'shared/Items';

export default function Header() {
  const navigate = useNavigate();
  const [items, setItems] = useItems();

  const [searchInput, setSearchInput] = useState('');

  const searchInputHandler = (e) => setSearchInput(e.target.value);

  const search = (e) => {
    e.preventDefault();
    const filtered = items.filter((item) => {
      return item.itemTitle.includes(searchInput) || item.itemInfo.includes(searchInput);
    });
    navigate(`/`, { state: searchInput });
  };
  // useEffect(() => {
  //   console.log('검색결과', searchResults);
  // }, [searchResults]);

  return (
    <>
      <Title>GAMZA</Title>
      <SignUpLogIn />
      <SearchDiv>
        <CategoryMenu />
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
        <PostBtn onClick={() => navigate('/Addpage')}>상품등록</PostBtn>
      </SearchDiv>
    </>
  );
}

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
  height: 50px;
  margin: 35px auto 20px auto;
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
`;

const SearchBtn = styled.button`
  display: flex;
  margin-left: 20px;
  position: relative;
  width: 100px;
  height: 60px;
  align-items: center;
  border: 3px solid #ab722374;
  background-color: transparent;
  border-radius: 15px;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #ab7323;
  &:hover {
    cursor: pointer;
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
  &:hover {
    cursor: pointer;
  }
`;

const PostBtn = styled.button`
  display: flex;
  margin: 13px 0 0 20px;
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
    cursor: pointer;
    background-color: #ae7a32c7;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1200px;
  height: 50px;
  margin: 35px auto 20px auto;
`;
