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
      const sortedByCategory = items.sort((a, b) => a.category.localeCompare(b.category));
      setList(sortedByCategory);
    } catch (error) {
        toast.error('Failed To Fetch Data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      await deleteDoc(doc(db, 'foods', foodId));
      toast.success('Food Removed Successfully');
      fetchList();
    } catch (error) {
      toast.error('Failed To Delete Item');
    }
  };

  const sortList = (type) => {
    let sortedList = [...list];

    switch (type) {
      case 'az':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'priceLow':
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        sortedList.sort((a, b) => b.price - a.price);
        break;
      case 'category':
        sortedList.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        return;
    }

    setList(sortedList);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div style={{ marginBottom: '1rem' }}>
        <select onChange={(e) => sortList(e.target.value)} className="sort-dropdown">
          <option value="">-- Sort By --</option>
          <option value="az">Name: A → Z</option>
          <option value="priceLow">Price: Low → High</option>
          <option value="priceHigh">Price: High → Low</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
            <b>#</b>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>

        {list.map((item, index) => (
            <div key={index} className="list-table-format">
                <p>{index + 1}</p>
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
