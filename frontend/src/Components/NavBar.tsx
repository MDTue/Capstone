import {Link} from "react-router-dom";
import '../css/herbs.css';

export default function NavBar(){

    return(
             <div className={'navBarUpper'}>
                <div >
                <li><Link to="/herbsPage">Home </Link> </li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registrierung</Link></li>
                <li><Link to="/onLogout">Logout</Link></li>
                </div>
            </div>

    )
}

