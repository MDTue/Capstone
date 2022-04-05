import {useNavigate} from "react-router-dom";
import '../css/NavBar.css';
import HerbsPage from "../Herbs/HerbsPage";
import Login from "../User/Login";
import Register from "../User/Register";
import OnLogout from "../User/OnLogout";


export default function NavBar(){
    const nav = useNavigate()

    return(
        <div className={'navBar'}>
            <li> <a href="/herbsPage" onClick={HerbsPage}>Home</a></li>
            <li><a href="/login" onClick={Login}>Login</a></li>
            <li><a href="/register" onClick={Register}>Registrierung</a></li>
            <li><a href="onLogout" onClick={OnLogout}>Abmelden</a></li>
            <li><a href="/login" onClick={Login}>Account löschen</a></li>




        </div>
    )
}

