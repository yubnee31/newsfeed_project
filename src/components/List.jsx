import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useItems } from 'shared/Items';
import Item from './Item';

export default function List({ title }) {
  const [items, setItems] = useItems();

  //최신등록상품 더보기 상태
  const [showLatestMore, setShowLatestMore] = useState(false);

  //인기 상품 더보기 상태
  const [showPopularMore, setShowPopularMore] = useState(false);

  //하트가 클릭된 상품 관리
  const [countFavorites, setCountFavorites] = useState(0);

  //최신 등록 순으로 정렬
  const latestSorted = items.sort((a, b) => b.timeStamp - a.timeStamp);
  // console.log('최신순 정렬', latestSorted);

  //관심 수 많은 순으로 정렬
  const mostPopularSorted = [];
  // console.log('인기순 정렬', mostPopularSorted);

  //더보기 버튼
  const handleShowMoreBtn = () => {
    title ? setShowLatestMore(!showLatestMore) : setShowPopularMore(!showPopularMore);
  };
  // useEffect(() => {
  //   console.log('최신더보기 상태', showLatestMore);
  //   console.log('인기더보기 상태', showPopularMore);
  // }, [handleShowMoreBtn]);

  //관심 버튼 상태 변경
  const favoriteSwitch = (event, clickedItem) => {
    event.stopPropagation();
    const updatedFavorites = items.map((item) => {
      return item.id === clickedItem.id ? { ...item, isFavorite: !item.isFavorite } : item;
    });
    setItems(updatedFavorites);
  };

  return (
    <>
      <TitleWrapper>
        <SectionTitle>{title ? '최신 등록 상품' : '인기 상품'}</SectionTitle>
        <ShowMoreBtn onClick={handleShowMoreBtn}>
          {title ? (showLatestMore ? '최신접기' : '최신더보기') : showPopularMore ? '인기접기' : '인기더보기'}
        </ShowMoreBtn>
      </TitleWrapper>
      <Items>
        {showLatestMore
          ? latestSorted.map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)
          : latestSorted.slice(0, 5).map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)}
        {/* 인기상품 아직 미구현 */}
        {showPopularMore
          ? mostPopularSorted.map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)
          : mostPopularSorted
              .slice(0, 5)
              .map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)}
      </Items>
    </>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

//옆으로 좀 가 ㅠㅠ ㅠ
const SectionTitle = styled.h1`
  font-size: 35px;
  font-weight: 800;
  font-style: italic;
  color: #ab7323;
  /* margin-right: auto; */
`;

const ShowMoreBtn = styled.p`
  color: #b7b3b3;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    color: grey;
    cursor: pointer;
  }
`;

const Items = styled.div`
  position: relative;
  /* background-color: #d6ed9d; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  justify-content: center;
  width: 100%;
`;
