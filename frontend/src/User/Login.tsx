
import './Login.css'
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import OnLogout from "./OnLogout";


export default function Login() {
    const [loginName, setLoginName] = useState('')
    const [loginPW, setLoginPW] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()

   // OnLogout()

    const loginUser = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginName,
                password: loginPW
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error("Unbekannter Loginname. Bitte zuerst registrieren!")
            })
            .then (response=>{
                localStorage.setItem('token',response.token)
                nav("/HerbsPage")
            })

            .catch(e=> setErrorMessage(errorMessage));
        nav("/HerbsPage")
    }


    return(
        <div>
            <div className="login">
                <div className="header">
                    <h1> Login für angemeldete User</h1>
                </div>

                <div>
                    <input className={'login'} type="text" placeholder={"Name"} value ={loginName} onChange={ev => setLoginName(ev.target.value)}/>
                    <input className={'login'} type="password" placeholder={"Passwort"} value={loginPW} onChange={ev => setLoginPW(ev.target.value)} />
                    <button onClick={loginUser}>  Anmelden </button>

                </div>
            </div>
        </div>
    )
}