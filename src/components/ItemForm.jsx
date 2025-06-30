import { useState, useEffect } from 'react';
import axios from 'axios';

function ItemForm({ fetchItems, editItem, setEditItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDescription(editItem.description);
      setPrice(editItem.price);
    }
  }, [editItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = { name, description, price };

    if (editItem) {
      // Update Item
      await axios.put(`http://localhost:8000/api/items/${editItem.id}/`, itemData);
      setEditItem(null);
    } else {
      // Add Item
      await axios.post('http://localhost:8000/api/items/', itemData);
    }

    setName('');
    setDescription('');
    setPrice('');
    fetchItems();  // Refresh List
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editItem ? "Edit Item" : "Add New Item"}</h2>
      <input
        type="text"
        placeholder="नाम"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="डिस्क्रिप्शन"
        value={description}
        onChange={e => setDescription(e.target.value)}
      /><br />
      <input
        type="number"
        placeholder="प्राइस"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      /><br />
      <button type="submit">{editItem ? "Update" : "Add"}</button>
    </form>
  );
}

export default ItemForm;
