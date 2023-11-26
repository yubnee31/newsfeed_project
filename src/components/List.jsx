import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useItems } from 'shared/Items';
import Item from './Item';

export default function List() {
  const [items, setItems] = useItems();

  //최신등록상품 더보기 상태
  const [showLatestMore, setShowLatestMore] = useState(false);

  //최신 등록 순으로 정렬
  const latestSorted = items.sort((a, b) => b.timeStamp - a.timeStamp);

  //더보기 버튼
  const handleShowMoreBtn = () => {
    setShowLatestMore(!showLatestMore);
  };

  //관심 버튼 상태 변경
  const favoriteSwitch = (event, clickedItem) => {
    event.stopPropagation();
    const updatedFavorites = items.map((item) => {
      return item.id === clickedItem.id ? { ...item, isFavorite: !item.isFavorite } : item;
    });
    setItems(updatedFavorites);
  };
  return (
    <Container>
      <TitleWrapper>
        <SectionTitle>{'새 주인을 찾는 GAMZA의 상품'}</SectionTitle>
        <ShowMoreBtn onClick={handleShowMoreBtn}>{showLatestMore ? '접기' : '더보기'}</ShowMoreBtn>
      </TitleWrapper>
      <Items>
        {showLatestMore
          ? latestSorted.map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)
          : latestSorted.slice(0, 6).map((item) => <Item key={item.id} favoriteSwitch={favoriteSwitch} item={item} />)}
      </Items>
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  margin-top: 70px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h1`
  font-size: 35px;
  font-weight: 800;
  font-style: italic;
  color: #ab7323;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center;
  width: 100%;
`;
