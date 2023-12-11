
//sIc/ App. js
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="App">
      <h1>Joanna</h1>
      <h1>Gonzalez 2</h1>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id} > {user.name}</p>
      ))}
    </div>
  );
}
export default App;
