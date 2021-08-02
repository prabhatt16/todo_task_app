import React from 'react'
import './GoogleSignInPage.css';
import Button from '@material-ui/core/Button';
import LogInImage from './todoImage.png'
import { auth, provider } from './firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

function GoogleSignIn() {
    const [user]=useAuthState(auth);
    const history=useHistory();
    const Login = (e) =>{
        e.preventDefault();
        auth.signInWithPopup(provider).then((res)=>{
            history.push('/home');
            console.log(res);
        }).catch((error)=>{
            alert(error.message);
        })
    }

    
    return (
        <div className="signInPage">
            <div className="signleft">
                <h1>
                    Hey there,<br/>
                    Welcome to
                    <span style = {{color:"blueviolet"}}> Todo App</span>
                </h1>
                <h3>
                    Get started with your Todo 😃
                </h3>
                <Button color="primary" variant='contained' onClick={Login}
                className='loginbtn'>Sign Up with Google </Button>

            </div>
            <div className="signright">
                <img src={LogInImage} alt="loginpic"/>
            </div>
            

        </div>
    )
}
export default GoogleSignIn
