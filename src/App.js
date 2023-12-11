//sIc/App.js
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="App">
      <h1>WElCOME TO JDCL</h1>
      <h2>Searching for the perfect film?</h2>
      {users.map((user) => (
        <p className="welcome" key={user.id}>
          Please click below to begin.
        </p>
      ))}
      <hr />
      <Link to="/Users/missd/OneDrive/Documents/movie-rec/src/lin.js/staticPath">Get Started</Link>
      <img src="https://i.imgur.com/xhXZ3xB.jpg" alt="jdcl drawing" />
    </div>
  );
}
export default App;