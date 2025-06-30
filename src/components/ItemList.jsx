import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';
import ItemForm from './ItemForm';

function ItemList() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = () => {
    axios.get(`${BASE_URL}/items/`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  const deleteItem = async (id) => {
    await axios.delete(`${BASE_URL}/items/${id}/`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <ItemForm fetchItems={fetchItems} editItem={editItem} setEditItem={setEditItem} />
      <h2>सभी आइटम्स</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - ₹{item.price}
            <button onClick={() => setEditItem(item)}>✏️</button>
            <button onClick={() => deleteItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
