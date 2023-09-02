import './App.css';
import io from 'socket.io-client';
import {useEffect} from 'react'
const socket = io('http://localhost:5000');

function App() {
  useEffect(()=>{
    socket.emit('connected',"Hello from react")

  },[])
  return (
   <>
   </>
  );
}

export default App;
