import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore'; // 수정: getDocs 사용
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Bear from '../assets/bear.jpeg';
import DateAndTime from 'shared/DateAndTime';
// 관심 버튼 이미지로 변경하기
// import FavoriteImg from '../assets/Favorite.png'
import { useNavigate } from 'react-router-dom';
// import FavoriteImg from './Favorite.png';

export default function List({ title }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

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

  // 전체 상품 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'items'));
      const querySnapshot = await getDocs(q);

      const initialItems = [];
      querySnapshot.forEach((doc) => {
        initialItems.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setItems(initialItems);
    };
    fetchData();
  }, []);

  //관심 버튼 상태 변경
  const favoriteSwitch = (event, clickedItem) => {
    event.stopPropagation();
    const updatedFavorites = items.map((item) => {
      return item.id === clickedItem.id ? { ...item, isFavorite: !item.isFavorite } : item;
    });
    setItems(updatedFavorites);
  };

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
          ? latestSortedDates.map((item) => {
              return (
                <Item key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
                  <Favorite onClick={(event) => favoriteSwitch(event, item)}>{item.isFavorite ? '♥' : '♡'}</Favorite>
                  <Img src={Bear} />
                  <ItemInfo>
                    <p> {item.itemTitle}</p>
                    {/* 가격 천단위 콤마표시 -> toLocaleString() */}
                    <Price> {item.itemPrice.toLocaleString()} </Price>
                  </ItemInfo>
                </Item>
              );
            })
          : latestSortedDates.slice(0, 5).map((item) => {
              return (
                <Item key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
                  <Favorite onClick={(event) => favoriteSwitch(event, item)}>{item.isFavorite ? '♥' : '♡'}</Favorite>
                  <Img src={Bear} />
                  <ItemInfo>
                    <p> {item.itemTitle}</p>
                    {/* 가격 천단위 콤마표시 -> toLocaleString() */}
                    <Price> {item.itemPrice.toLocaleString()} </Price>
                  </ItemInfo>
                </Item>
              );
            })}
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

const Favorite = styled.span`
  font-size: 35px;
  position: absolute;
  width: 35px;
  margin: 10px 170px 0 0;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const Item = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  height: 300px;
  border-radius: 3px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;
//왜 가운데야
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: auto; //flex-start로 적용 안 됨. 부모태그가 align-items: center여서 그런거겠지..?
  padding: 10px 10px 5px 0;
  gap: 15px;
`;

const Price = styled.p`
  font-weight: 800;
`;
