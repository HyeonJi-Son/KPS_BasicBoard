import React, {useState,useEffect} from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState("");

  useEffect(()=>{
    axios.post("/api/users").then((response)=>{
      if(response.data){
        console.log(response.data);
        setUser(response.data);
      }else{
        alert("failed to");
      }
    });
  },[]);

  return (
    <div className="App">
      <header className="App-header">

        <h3>{user.id}</h3>
        <h3>{user.username}</h3>
        <h3>{user.password}</h3>
        <h3>{user.email}</h3>
      </header>
    </div>
  );
}

export default App;
