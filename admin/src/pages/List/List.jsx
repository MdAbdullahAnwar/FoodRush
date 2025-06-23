import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Pencil, Trash2 } from 'lucide-react';
import EditModal from './EditModal';

const List = () => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', category: '', price: '', image: '' });

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

  const handleEditClick = (item) => {
    setEditItem(item);
    setEditedData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
    });
  };

  const handleSave = async () => {
    try {
      const foodRef = doc(db, 'foods', editItem.id);
      await updateDoc(foodRef, {
        name: editedData.name,
        category: editedData.category,
        price: Number(editedData.price),
        image: editedData.image,
      });
      toast.success('Item Updated Successfully');
      setEditItem(null);
      fetchList();
    } catch (error) {
      toast.error('Update Failed');
    }
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
          <b>Actions</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <p>{index + 1}</p>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="action-icons">
              <Pencil
                size={18}
                className="cursor"
                style={{ marginRight: '10px', color: '#3498db' }}
                onClick={() => handleEditClick(item)}
              />
              <Trash2
                size={18}
                className="cursor"
                style={{ color: 'red' }}
                onClick={() => removeFood(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      
      {editItem && (
        <EditModal
          editedData={editedData}
          setEditedData={setEditedData}
          onSave={handleSave}
          onCancel={() => setEditItem(null)}
        />
      )}
    </div>
  );
};

export default List;
