import {Link} from "react-router-dom";
import '../css/herbs.css';
import {useEffect, useState} from "react";

export default function NavBar(){
    const[token] = useState(localStorage.getItem('token') ?? '');
    const[sessionEnd, setSessionEnd] = useState(0);
    const [username, setUsername] = useState('');
    const[userRole, setUserRole] = useState([] as Array <string>);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUsername(tokenDetails.sub);
            setSessionEnd(tokenDetails.exp*1000);
            setUserRole(tokenDetails.roles)
        }
    }, [token])

    return(
             <div className={'navBarUpper'}>
                <div>
                <li> <Link to="/herbsPage" className="navBarSchrift" >Home </Link> </li>
                <li><Link to="/login" className="navBarSchrift">Login</Link> </li>
                <li><Link to="/register" className="navBarSchrift">Registrierung </Link></li>
                <li><Link to="/onLogout" className="navBarSchrift">Logout</Link> </li>
                </div>


                 {token &&
                     <div className={'navBarSchrift'}>
                         {(sessionEnd > Date.now()) ?
                            <p>Ende der Sitzung:  {new Date(sessionEnd).toLocaleString()} </p>
                         :
                            <div className={'fehlerSession'}>
                                <p>Sitzung: abgelaufen</p>
                            </div>
                         }
                         <p>angemeldeter User: {username} </p>
                     </div>
                 }
            </div>





    )
}

