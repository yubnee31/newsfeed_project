import Layout from "components/layouts/Layout";
import { db } from "../firebase";
import { deleteDoc, doc,updateDoc } from "firebase/firestore";
import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";

export default function Edit({items, setItems}) {
    const params = useParams();
    const navigate = useNavigate();
    const selectedItem = items.find((item)=>item.id===params.id);
    const [editMode, setEditMode] = useState(false);
    const [changedTitle, setChangedTitle] = useState("");
    const [changedInfo, setChangedInfo] = useState("");
    const [changedPrice, setChangedPrice] = useState("");
    const [soldStatus, setSoldStatus] = useState('');

      const updateItem = async (event) => {
        event.preventDefault();
        const itemRef = doc(db, "items", params.id);
        if(soldStatus==="판매완료"){
          await updateDoc(itemRef, {sold:true,itemTitle:changedTitle, itemInfo:changedInfo, itemPrice:changedPrice});
          setItems((prev)=>{
            return prev.map((item)=>{
              if(item.id===params.id){
                return {...item, sold:true,itemTitle:changedTitle,itemInfo:changedInfo, itemPrice:changedPrice};
              }else{
                return item;
              }
            })
          })
        }else{
          await updateDoc(itemRef, {sold:false,itemTitle:changedTitle, itemInfo:changedInfo, itemPrice:changedPrice});
          setItems((prev)=>{
            return prev.map((item)=>{
              if(item.id===params.id){
                return {...item, sold:false,itemTitle:changedTitle,itemInfo:changedInfo, itemPrice:changedPrice};
              }else{
                return item;
              }
            })
          })

        }

        
        setEditMode(false);
        
      };

      const deleteItem = async (event) => {
        const itemRef = doc(db, "items", params.id);
        await deleteDoc(itemRef);
    
        setItems((prev) => {
          return prev.filter((item) => item.id !== params.id);
        });
        navigate('/mypage');
      };

      const selectHendler = async (event)=>{
        setSoldStatus(event.target.value);
      }


  return (
    <Layout>
      <Main>
        {!editMode?
        <SelectedItemSection>
            
                    <div>
                        <p>{selectedItem.itemTitle}</p>
                        <p>{selectedItem.itemInfo}</p>
                        <p>{selectedItem.itemPrice}</p>
                    </div>
                
          
            <button onClick={()=>setEditMode(true)}>수정하기</button>
            <button onClick={deleteItem}>삭제하기</button>
            <button onClick={()=>navigate('/mypage')}>돌아가기</button>
      </SelectedItemSection>
      :

      <form onSubmit={updateItem}>
        <label>상품제목</label>
        <input value = {changedTitle} onChange={(e)=>setChangedTitle(e.target.value)}/>

        <label>상품설명</label>
        <input value={changedInfo} onChange={(e)=>setChangedInfo(e.target.value)}/>

        <label>상품가격</label>
        <input value={changedPrice} onChange={(e)=>setChangedPrice(e.target.value)}/>

        <select onChange={selectHendler}>
          <option value="판매완료">판매완료</option>
          <option value="판매중">판매중</option>
        </select>

        <button type="submit">완료하기</button>


      </form>
    }
    </Main>
    </Layout>

  )
}
const Main = styled.main`
  display:flex;
  flex-direction: column;
  align-items: center;

`
const SelectedItemSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  height:400px;
  width:100%;
  
`