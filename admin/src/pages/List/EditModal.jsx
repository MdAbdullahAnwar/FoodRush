import React from 'react';
import './EditModal.css';

const EditModal = ({ editedData, setEditedData, onSave, onCancel }) => {
  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h3>Edit Food Item</h3>
        <label>Name</label>
        <input
          type="text"
          value={editedData.name}
          onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
        />
        <label>Category</label>
        <input
          type="text"
          value={editedData.category}
          onChange={(e) => setEditedData({ ...editedData, category: e.target.value })}
        />
        <label>Price</label>
        <input
          type="number"
          value={editedData.price}
          onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
        />
        <label>Image URL</label>
        <input
          type="text"
          value={editedData.image}
          onChange={(e) => setEditedData({ ...editedData, image: e.target.value })}
        />
        <div className="modal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
