import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './ItemForm';

function ItemList() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = () => {
    axios.get("http://localhost:8000/api/items/")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8000/api/items/${id}/`);
    fetchItems();
  };

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
