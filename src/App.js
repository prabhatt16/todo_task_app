import './App.css';
import Home from './Home';
import GoogleSignInPage from './GoogleSignInPage';
import  { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
import { auth, db } from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

function App() {

  const [user] =useAuthState(auth);

  useEffect(() => {
    if(user && auth){
        db.collection('users').doc(user?.id).set({
        accoutType:"normal",
        userId:user?.uid,
        name:user?.displayName,
        email:user?.email,
        profilePic:user?.photoURL,
        phone:user?.phoneNumber,
    })
    } 
  },[user])

  return (
    <div className="App">
      <Router>
        {
          !user?(
            <GoogleSignInPage/>
          )
          :(
             <Switch>
                <Home/>
                <Route path="/home">
                  <Home/>
                </Route>
                <Route path="/signIn">
                  <GoogleSignInPage/>
                </Route>
            </Switch>
          )
        }
      </Router>
      
    </div>
  );
}

export default App;
