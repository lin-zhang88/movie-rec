//sIc/ App. js
import { useEffect, useState } from "react" ;
import "./App.css" ;
function App() {
const [users, setUsers] = useState ([]);
useEffect (() => {
fetch ( '/api/users')
.then ( (res) => res.json ())
.then ( (data) => setUsers (data));
},[]);

  return (
    <div className="App">
      <h1>Welcome to JDCL</h1>
        {users.map((user) => (
          <p>Please click below to begin</p>
        ))}
         <a href="https://www.jdclrecommendations.com">Start here</a>

    </div>
   
  );

}
export default App;
