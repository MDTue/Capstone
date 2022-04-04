import {useNavigate} from "react-router-dom";
import '../css/NavBar.css';


export default function NavBar(){
    const nav = useNavigate()

    return(
        <div className={'navBar'}>
            <li><a onClick={() => nav('/herbsPage')}>Home</a></li>
            <li><a onClick={() => nav('/login')}>Login</a></li>
            <li><a onClick={() => nav('/register')}>Registrierung</a></li>
            <li><a onClick={() => nav('/onLogout')}>Abmelden</a></li>
            <li><a onClick={() => nav('/login')}>Account löschen</a></li>
        </div>
    )
}