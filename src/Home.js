import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'; 
import './Home.css';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import firebase from 'firebase';
import { FaBeer } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Home() {

  const [todos, setTodos] = useState([])
  const [input, setinput] = useState('')
  const [user]=useAuthState(auth);

  useEffect(()=>{
    db.collection('todo').orderBy('timeStamp','desc').onSnapshot(onSnapshot=>{
      setTodos(onSnapshot.docs.map(doc=>({id:doc.id,todo:doc.data().todo})));
    })
    // db.collection("todo").orderBy('timestamp',"desc").onSnapshot(onSnapshot=>{
    //   setTodos(onSnapshot.docs.map(doc=>({id:doc.id, todo:doc.data().todo})))
    // })
  },[]) 
  const logOut=(e)=>{
      firebase.auth().signOut().then(() => {
            alert('you log-out successfully. see you soon 🙏🏻')
        }).catch((error) => {
            console.log(error)
         });
  }  

 const addTodo=(event)=>{
    event.preventDefault();
     db.collection('todo').add({
        todo:input,
        timeStamp:firebase.firestore.FieldValue.serverTimestamp(),  
      })  
      setinput('');
    return setTodos([...todos,input]);
  }
  
  return (
    <div className="home">
      <div className="top">
        
        <div className="userDetails">
            <img src={user.photoURL} alt="userpic" />
            <h1>Hey {user.displayName}, Let's do it🔥🔥!!</h1> 
            <AiOutlineLogout className="logoutIcon" onClick={logOut}/>
        </div>
        <div className="verticalLine"/>
        
        <div className="inputArea">
            <FormControl className='inputArea'>
            <InputLabel htmlFor="my-input">😃Write a Todo</InputLabel>
            <Input id="my-input" type="input" value={input} onChange={event=>setinput(event.target.value)} aria-describedby="my-helper-text"/>
            </FormControl >
            <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">add todo</Button>
        </div>
        
      </div>
      <div className="todoItem">
        <ul >
            {
                todos.map((todo)=>(
                    <Todo todo={todo}/>
                ))
            }
        </ul>
      </div>
    </div>
  );
}

export default Home;
