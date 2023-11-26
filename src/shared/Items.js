import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

//useItems 커스텀 훅 [items, setItems]를 반환하는 함수
// 사용할 컴포넌트에서 import하여 구조분해할당하여 사용. useImport 후   const [items, setItems] = useItems(); 형태로 사용
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

  return [items, setItems];
};
