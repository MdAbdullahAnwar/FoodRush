import React from 'react';
import { db } from '../../firebase' // adjust path as needed
import { collection, addDoc } from 'firebase/firestore';
import { food_list } from '../../assets/food_list' // adjust if placed differently
import { toast } from 'react-toastify';

const UploadFoods = () => {
  const handleUpload = async () => {
    const foodsCollection = collection(db, 'foods');

    try {
      for (const item of food_list) {
        await addDoc(foodsCollection, item);
      }
      toast.success('All foods uploaded successfully!');
    } catch (error) {
      console.error('Error uploading foods:', error);
      toast.error('Failed to upload foods!');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Upload All Foods to Firestore</h2>
      <button onClick={handleUpload}>Upload Foods</button>
    </div>
  );
};

export default UploadFoods;
