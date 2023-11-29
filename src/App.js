'author'; "carlos, diane"
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

  return ( //Everything in this purple bracket is html, unless it is in curly braces--> Javascript embedded
    <div className="App">
        {users.map((user) => (
          <p key= {user.id} > {user.name}</p> //Information embedded in curly braces is Javascript
        ))}
    </div>
  );
}
export default App;
/*git status    
gitstatus
git add.
git commit -m 'added author'
git branch
*/