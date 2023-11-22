import React from 'react'
import styled from 'styled-components'
import defaultItem from"assets/defaultItem.png"

export default function MypagePost() {
  return (
    <PostSection>
        <OnSale>
            <p>판매중인 상품</p>
            <ItemWrapper>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
                <p>1000원</p>
            </Item>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
                <p>1000원</p>

            </Item>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
                <p>1000원</p>

            </Item>
            </ItemWrapper>
        </OnSale>
        <SoldOut>
            <p>판매완료된 상품</p>
            <ItemWrapper>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
            </Item>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
            </Item>
            <Item>                
                <img src = {null ?? defaultItem} alt = "아바타이미지"/>
                <p>~~팝니다.</p>
            </Item>

            </ItemWrapper>
        </SoldOut>
    </PostSection>

  )
}

const PostSection = styled.section`
    width:1000px;
    height:1000px;
    border:1px solid black;
    padding:20px;
    margin-bottom:50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:100px;
`

const OnSale = styled.div`
    width:900px;
    height: 400px;
    display:flex;
    flex-direction: column;
    gap:20px;
    font-size: 20px;

`;
const SoldOut = styled.div`
    width:900px;
    height:400px;
    font-size: 20px;
    display:flex;
    flex-direction: column;
    gap:20px;

`;
const ItemWrapper = styled.div`
    display:flex;
    gap:20px;
    font-size:17px;
`
const Item = styled.div`
    display: flex;
    flex-direction: column;

    & img{
        width: 300px;
        height:300px;
    }
`;