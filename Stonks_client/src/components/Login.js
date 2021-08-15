import React, {useState } from 'react';
import axios from 'axios';
import { Tab } from 'semantic-ui-react'


const Login =()=>{
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass]=useState('');

    const login=()=>{
        
        axios({
            method: "POST",
            data: {
                username: userName,
                password: pass
            },
            withCredentials: true,
            url: "http://localhost:3001/login"
        }).then(res=>{
            console.log(res.data);
            if(res.data==="success"){
                document.getElementById("homeNav").click();
            }
        })
    };
    const register=()=>{
        axios({
            method: 'POST',
            data: {
                username: registerUser,
                password: registerPass
            },
            withCredentials: true,
            url: "http://localhost:3001/register"
        }).then(res=>{
            console.log(res);
        })
    };
    const signOut = ()=>{
        axios.get("http://localhost:3001/logout",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        })
    }
    const checkAuth=()=>{
        //withCredentials needed for server to identify user request
        axios.get("http://localhost:3001/signedin",{
            withCredentials: true,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(response=>{
            
        })
    }
    const panes = [
        { menuItem: 'Register', render: () => 
        <Tab.Pane>
            <div className="ui form">
                <h1>Register</h1>
                <div className="field">
                    <label>Username</label>
                    <input placeholder="create username" id="regUser" value={registerUser} autofocus onChange={e=>setRegisterUser(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="make password" value={registerPass} onChange={e=>setRegisterPass(e.target.value)} />
                </div>
                <button className="ui button" onClick={register}>Register</button>
            </div>
        </Tab.Pane> },
        { menuItem: 'Login', render: () => 
            <Tab.Pane>
                <div className="ui form">
                <h1>Log in</h1>
                <div className="field">
                    <label>Username</label>
                    <input placeholder="username" value={userName} onChange={e=>setUserName(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
                </div>
                <button className="ui button" onClick={login}>Submit</button>
                </div>
            </Tab.Pane> 
        },
      ]
    
    return(
        <div className="logReg container">
           <Tab panes={panes} />
        </div>
        )
}


export default Login;