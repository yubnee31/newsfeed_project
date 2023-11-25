import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

// 이름을 컴포넌트 useItems로 설정 =>  useItems로 export하고 사용할 컴포넌트에서 import하여 구조분해할당하여 사용.
export const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'items'));
        const querySnapshot = await getDocs(q);

        const initialItems = [];
        querySnapshot.forEach((doc) => {
          initialItems.push({ id: doc.id, ...doc.data() });
        });

        setItems(initialItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { items, setItems };
};
