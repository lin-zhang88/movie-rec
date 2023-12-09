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
      <h1>WElCOME TO JDCL</h1>
      <h2>Searching for the perfect film?</h2>
      <link rel="stylesheet" href="app.css"/>
        {users.map((user) => (
          <p class= "welcome">Please click below to begin.</p>
        ))}
  
         <a href="https://www.jdclrecommendations.com">Start here</a>
         <hr/>
         <img src= "https://imgur.com/a/L7xBExd" alt = "jdcl drawing"/>

         

    </div>
   
  );

}
export default App;
