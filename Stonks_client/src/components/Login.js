import React, {useState } from 'react';
import axios from 'axios';


const Login =()=>{
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [registerUser, setRegisterUser] = useState("");
    const [registerPass, setRegisterPass]=useState('');
    const [signed, setSigned] = useState('');
    const [sessionKey, setSession] = useState('');

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
            if(response.data===false){
                setSigned('');
            }else{
                setSigned(response.data.username);
            }
        })
    }

    return(
        <div className="logReg">
            <div>
                <h1>Register</h1>
                <input placeholder="user" value={registerUser} onChange={e=>setRegisterUser(e.target.value)} />
                <input placeholder="pass" value={registerPass} onChange={e=>setRegisterPass(e.target.value)} />
                <button onClick={register}>Register</button>
            </div>
            <div>
                <h1>Log in</h1>
                <input placeholder="username" value={userName} onChange={e=>setUserName(e.target.value)} />
                <input placeholder="username" value={pass} onChange={e=>setPass(e.target.value)} />
                <button onClick={login}>Submit</button>
            </div>
            <br />

            <button onClick={checkAuth}>Check if authenticated</button><button onClick={signOut}>Sign Out</button>
                <h3>{signed}</h3>
            
        </div>
        )
}


export default Login;