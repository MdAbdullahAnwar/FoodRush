import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'foods'));
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(items);
    } catch (error) {
    //   console.error(error);
      toast.error('Failed To Fetch Data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      await deleteDoc(doc(db, 'foods', foodId));
      toast.success('Food Removed Successfully');
      fetchList();
    } catch (error) {
    //   console.error(error);
      toast.error('Failed To Delete Item');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item.id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
