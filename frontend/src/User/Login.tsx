import "../css/HerbsEdit.css";
import "../css/HerbsPage.css";
import "../css/HerbsItem.css"
import "../css/Login.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import OnLogout from "./OnLogout";


export default function Login() {
    const [loginName, setLoginName] = useState('')
    const [loginPW, setLoginPW] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()

    // OnLogout()

    const loginUser = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
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
                throw new Error("Die Logindaten stimmen nicht!")
            })
            .then(response => {
                localStorage.setItem('token', response.token)
                nav("/herbsPage")
            })
            .catch(e => setErrorMessage(e.message));
    }
    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    return (
        <div>
            <div className="loginpage">
                <div className={"loginContainer"}>
                    <div className={'loginError'}> {errorMessage}  </div>
                    <br></br>
                    <br></br>
                    <span><h2>Login für registrierte User </h2></span>
                    <input className={'Login'} type="text" placeholder={"Name"} value={loginName}
                           onChange={ev => setLoginName(ev.target.value)}/>
                    <br></br>
                    <br></br>
                    <input className={'Login'} type="password" placeholder={"Passwort"} value={loginPW}
                           onChange={ev => setLoginPW(ev.target.value)}/>
                    <br></br>
                    <br></br>
                    <button onClick={loginUser}> Anmelden</button>
                </div>
            </div>
        </div>
    )
}