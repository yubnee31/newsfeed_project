import styled from 'styled-components';
import Bear from '../assets/bear.jpeg';
import { useNavigate } from 'react-router-dom';

const Item = ({ item, favoriteSwitch }) => {
  const navigate = useNavigate();
  return (
    <StItem key={item.id} onClick={() => navigate(`/detail/${item.id}`)}>
      <Favorite onClick={(event) => favoriteSwitch(event, item)}>{item.isFavorite ? '♥' : '♡'}</Favorite>
      <ImgContainer>
        {item.sold && <SoldStatus>SOLD</SoldStatus>}
        <Img src={item.images} $sold={item.sold} alt="item image" />
      </ImgContainer>
      <ItemInfo>
        <p> {item.itemTitle}</p>
        {/* 가격 천단위 콤마표시 -> toLocaleString() */}
        <Price>₩{Number(item.itemPrice).toLocaleString()}</Price>
      </ItemInfo>
    </StItem>
  );
};

const StItem = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 500px;
  border-radius: 3px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const Favorite = styled.span`
  font-weight: 300;
  font-size: 60px;
  position: absolute;
  width: 60px;
  margin: 20px 290px 0 0;
  color: white;
  &:hover {
    cursor: pointer;
  }
  z-index: 45;
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const SoldStatus = styled.p`
  width: 100%;
  height: 100%;
  position: absolute;
  color: white;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const Img = styled.img`
  width: 98%;
  height: 98%;
  object-fit: cover;
  filter: ${({ $sold }) => ($sold == true ? 'brightness(40%)' : 'none')};
  &:hover {
    border: 1px solid #111;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: auto;
  padding: 10px 10px 5px 0;
  gap: 15px;
  font-size: 18px;
`;

const Price = styled.p`
  font-weight: 800;
`;

export default Item;
