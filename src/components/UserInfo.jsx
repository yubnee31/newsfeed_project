import React, { useEffect } from 'react'
import styled from 'styled-components'
import defaultItem from "assets/defaultItem.png"
import { db } from '../firebase';
import { collection, getDocs, query } from "firebase/firestore";

export default function UserInfo() {

    const [users, setUsers] = useState([
        {userId:"abc", userEmail:"abc@gmail.com", userNickname:"nickname"}
    ])
    
    useEffect(() => {
        const fetchData = async () => {
          
          const q = query(collection(db, "users"));
          const querySnapshot = await getDocs(q);
          const initialUsers = [];
    
          querySnapshot.forEach((doc) => {
            initialUsers.push({ id: doc.id, ...doc.data() });
          });
          setUsers(initialUsers);
          
        };
    
        fetchData();
      }, []);

  return (
    <div></div>
  )
}