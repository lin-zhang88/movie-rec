
//sIc/ App. js
import { useEffect, useState } from "react" ;
import "./App.css" ;
function App() {
const [users, setUsers] = useState ([]);
useEffect (() => {
fetch ( '/api/users')
 .then ( (res) => res. json ())
 .then ( (data) => setUsers (data));
},[]);

  return ( //whatever you want to show the user in html
  //anything in here will appear in the brower screen
    <div className="App">
      <h1>Movie Recommendation Tool</h1>
        {users.map((user) => (
          <p key= {user.id} > {user.name}</p>
        ))}
    </div>
    
  );
}
export default App;
