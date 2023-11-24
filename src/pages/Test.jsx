import Layout from "components/layouts/Layout";
import { db } from "../firebase";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

export default function Test({items, setItems}) {
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(db, "items"));
          const querySnapshot = await getDocs(q);
          const initialItems = [];
    
          querySnapshot.forEach((doc) => {
            initialItems.push({ id: doc.id, ...doc.data() });
          });
          setItems(initialItems);
        };
        fetchData();
      },[]);

      const updateItem = async (event) => {
        const itemRef = doc(db, "items", testItem[0].id);
        console.log("item",itemRef);
        await updateDoc(itemRef, { ...testItem[0], itemTitle,itemPrice,itemInfo });
    
        setItems((prev) => {
          return prev.map((item) => {
            if (item.id === testItem[0].id) {
              return { ...item, itemTitle,itemPrice,itemInfo };
            } else {
              return item;
            }
          });
        });
      };
      const testItem = items.filter((item)=>item.id===params.id);

      const [editMode, setEditMode] = useState(false);

      const [itemTitle, setItemTitle] = useState("");
      const [itemInfo, setItemInfo] = useState("");
      const [itemPrice, setItemPrice] = useState("");
  return (
    <Layout>
        {!editMode?
        <div>
            {testItem.map((item)=>{
                return(
                    <div key = {item.id}>
                        <p>{item.itemTitle}</p>
                        <p>{item.itemInfo}</p>
                        <p>{item.itemPrice}</p>
                    </div>
                );
            })}
            <button onClick={()=>setEditMode(true)}>수정하기</button>
      </div>
      :
      <form onSubmit={(e)=>{
        e.preventDefault();
        updateItem();
      }}>
        <label>상품제목</label>
        <input value = {itemTitle} onChange={(e)=>setItemTitle(e.target.value)}/>
        <label>상품설명</label>
        <input value={itemInfo} onChange={(e)=>setItemInfo(e.target.value)}/>
        <label>상품가격</label>
        <input value={itemPrice} onChange={(e)=>setItemPrice(e.target.value)}/>
        <button type = "submit"onClick={()=>setEditMode(false)}>완료하기</button>

      </form>
    }
    </Layout>

  )
}
