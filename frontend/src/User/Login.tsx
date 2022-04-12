
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import NavBar from "../Components/NavBar";
import logo from "../images/Logo_Hoerbs_Transparent.png";
import knopfBestimmen from "../images/KnopfBestimmen.png";
import knopfWissen from "../images/KnopfWissen.png";
import knopfSirup from "../images/KnopfSirup.png";
import knopfRezepte from "../images/KnopfRezepte.png";
import "../css/Login.css"
import "../css/herbs.css"
import "../css/Fehler.css"


export default function Login() {
    const [loginName, setLoginName] = useState('')
    const [loginPW, setLoginPW] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const nav = useNavigate()
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
             <div className={'navBar'}>
                 <img src={logo} alt="Logo" className={'logo'} />
                 <div className ={'navBarLower'}>
                     <img src={knopfBestimmen} alt='bestimmen' className={'knopf'} />
                     <img src={knopfWissen} alt='Wissen'  className={'knopf'} />
                     <img src={knopfSirup} alt='Sirup'  className={'knopf'} />
                     <img src={knopfRezepte} alt='Rezepte'  className={'knopf'} />
                 </div>
                 <div className={'navBarUpper'}>
                        <NavBar />
                 </div>
             </div>
            <div className={'loginContainer'}>
                <div className={'login'}>
                    <div className={'loginHeader'}>Login für registrierte User</div>
                    <input className={'loginUserName'} type="text" placeholder={"Name"} value={loginName}
                           onChange={ev => setLoginName(ev.target.value)}/>
                    <input className={'userPassword'} type="password" placeholder={"Passwort"} value={loginPW}
                           onChange={ev => setLoginPW(ev.target.value)}/>
                    <button onClick={loginUser} className={'loginButtonSave'} > Anmelden </button>
                </div>
            </div>
            <div className={'fehler'}>
                <div className={'fehlerAusgabe'}>
                    <div >{errorMessage}</div>
                </div>
            </div>
        </div>
    )
}