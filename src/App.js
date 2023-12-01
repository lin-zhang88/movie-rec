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
},[]); //the section of ' user.name ' --> ' user.nam ' == results in no placeholder name appearing on website 

  return ( //Everything in this purple bracket is html, unless it is in curly braces--> Javascript embedded
    <div className="App">
        {users.map((user) => (
          <p key= {user.id} > {user.nam}</p> //Information embedded in curly braces is Javascript. There is a change in user.name
        ))}                                  
        <p>'Click here'</p>
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