import {Link, useNavigate} from "react-router-dom";
import '../css/NavBar.css';

export default function NavBar(){
    const nav = useNavigate()

    return(
        <div className={'navBar'}>
            <li><Link to="/herbsPage">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrierung</Link></li>
            <li><Link to="/onLogout">Abmelden</Link></li>
            <li><Link to="/login">Account löschen</Link></li>
        </div>
    )
}

