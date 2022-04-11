import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
//import NavBar from "../Components/NavBar";

export default function Register() {
    const [loginName, setLoginName] = useState('')
    const [loginPW, setLoginPW] = useState('')
    const [loginPWAgain, setLoginPWAgain] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()

    const Register = () => {
        if (!(loginPW === loginPWAgain)) {
            setErrorMessage("Die Passwörter sind nicht identisch!");
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
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
                        return response.text()
                    }
                    throw new Error("Den User gibt es schon!")
                })
                .then(() => {
                    nav("/login")
                })
                .catch(e => setErrorMessage(e.message));
        }
    }
    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    return (
        <div className="loginpage">
            <div className={"loginContainer"}>
                <div className={'loginError'}>
                    {errorMessage}
                </div>
                <h2>Registrierung neue User</h2>
                <input className={'login'} type="text" placeholder={"Name"} value={loginName}
                       onChange={ev => setLoginName(ev.target.value)}/>
                <br/>
                <br/>
                <input className={'login'} type="password" placeholder={"Passwort"} value={loginPW}
                       onChange={ev => setLoginPW(ev.target.value)}/>
                <br/>
                <br/>
                <input className={'login'} type="password" placeholder={"Passwortwiederholung"} value={loginPWAgain}
                       onChange={ev => setLoginPWAgain(ev.target.value)}/>
                <br/>
                <br/>
                <button onClick={Register}> Anmelden</button>
            </div>
        </div>
    )
}