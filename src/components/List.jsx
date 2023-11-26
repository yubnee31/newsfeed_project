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
  const latestSortedDates = items.sort((a, b) => b.timeStamp - a.timeStamp);

  //관심 수 많은 순으로 정렬
  // const mostPopular

  //props로 받아오는 title 값에 따라 변경하기.
  // const visibleItems = title ? visibleLatestItems : visiblePopularItems;

  //더보기 상태에 따라 렌더링 개수 조절
  // const visibleLatestItems = showLatestMore ? latestSortedDates : latestSortedDates.slice(0, 5);

  const visiblePopularItems = showPopularMore ? items : items.slice(0, 5);

  return (
    <ListWrapper>
      <TitleWrapper>
        <SectionTitle>{title ? '최신 등록 상품' : '인기 상품'}</SectionTitle>
        {title && (
          <ShowMoreBtn
            onClick={() => {
              setShowLatestMore(!showLatestMore);
            }}
          >
            {showLatestMore ? '접기' : '더보기'}
          </ShowMoreBtn>
        )}
      </TitleWrapper>
      <Items>
        {/* 이부분 조건부 렌더링 하기 */}
        {/* title true일때 최신, showLatestMore 상태 true일때 인기상품 렌더링 안되고 데이터 전체 최신순 정렬 */}
        {showLatestMore
          ? latestSortedDates.map((item) => <Item key={item.id} item={item} />)
          : latestSortedDates.slice(0, 5).map((item) => <Item key={item.id} item={item} />)}
      </Items>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  /* background-color: #edc29a; */
  width: 1200px;
  /* height: 450px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  gap: 10px;
`;

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
