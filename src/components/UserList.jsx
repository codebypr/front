import { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>यूजर लिस्ट</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.username} - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
