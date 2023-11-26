import styled from 'styled-components';
import Bear from '../assets/bear.jpeg';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, favoriteSwitch }) => {
  const navigate = useNavigate();
  return (
    <StItem key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
      <Favorite onClick={(event) => favoriteSwitch(event, item)}>{item.isFavorite ? '♥' : '♡'}</Favorite>
      <Img src={Bear} />
      <ItemInfo>
        <p> {item.itemTitle}</p>
        {/* 가격 천단위 콤마표시 -> toLocaleString() */}
        <Price> {item.itemPrice.toLocaleString()} </Price>
      </ItemInfo>
    </StItem>
  );
};

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

const StItem = styled.div`
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

export default Item;