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
    
    <div className="App2">
        <h1> Answer the questions below </h1>
  
        <script type ="text/javascript" src="App.js>"></script>
    </div>
   
        )

        };
export default App;