import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Register() {
    const [loginName, setLoginName] = useState('')
    const [loginPW, setLoginPW] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()

    const Register = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: loginName,
                password: loginPW
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.text()
                }
                throw new Error("Den User gibt es schon!")
            })

            .catch(e=> setErrorMessage(e.message));
            nav("/login")

    }

    useEffect(() => {
        const timoutId = setTimeout(() => setErrorMessage(''), 10000)
        return () => clearTimeout(timoutId)
    }, [errorMessage]
 )

    return(
        <div className="login">
            <div className={'error'} > {errorMessage}  </div>
            <Link to={'login'}>Login</Link>
            <div className="header">
                <h1> Registrierung neue User</h1>
            </div>
            {errorMessage}
            <div>
                <input className={'login'} type="text" placeholder={"Name"} value ={loginName} onChange={ev => setLoginName(ev.target.value)}/>
                <input className={'login'} type="password" placeholder={"Passwort"} value={loginPW} onChange={ev => setLoginPW(ev.target.value)} />
                <button onClick={Register}>  Anmelden</button>
            </div>
        </div>
    )}
