
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import NavBar from "../Components/NavBar";
import logo from "../images/Logo_Hoerbs_Transparent.png";
import knopfRezepte from "../images/Rezepte.png";
import knopfApplication from "../images/Heilpflanzen.png";
import knopfAlle from "../images/allePflanzen.png";
import knopfRuehrkueche from "../images/Ruehrkueche.png";
import "../css/Login.css"
import "../css/herbs.css"


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
                     <img src={knopfAlle} alt='alle' className={'knopf'} />
                     <img src={knopfApplication} alt='Heilpflanze'  className={'knopf'} />
                     <img src={knopfRezepte} alt='Rezepte'  className={'knopf'} />
                     <img src={knopfRuehrkueche} alt='Rührküche' className={'knopf'}/>
                 </div>
                 <div className={'navBarUpper'}>
                        <NavBar />
                 </div>
             </div>

            <div className={'loginContainer'}>
                <div className={'loginFehler'}>
                    <h3>{errorMessage}</h3>
                </div>
                <div className={'login'}>
                    <div className={'loginHeader'}>Login für registrierte User</div>
                    <input className={'loginUserName'} type="text" placeholder={"Name"} value={loginName}
                           onChange={ev => setLoginName(ev.target.value)}/>
                    <input className={'userPassword'} type="password" placeholder={"Passwort"} value={loginPW}
                           onChange={ev => setLoginPW(ev.target.value)}/>
                    <button onClick={loginUser} className={'loginButtonSave'} > Anmelden </button>
                </div>
            </div>

        </div>
    )
}