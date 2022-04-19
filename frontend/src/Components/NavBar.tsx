import {Link} from "react-router-dom";
import '../css/herbs.css';

export default function NavBar(){

    /*
    {tags.map(t =>
      <Link
        className="tags"
        activeStyle={{ color: 'red' }}
        to={t.path}
      >
        {t.title}
      </Link>
    )}

     */



    return(
             <div className={'navBarUpper'}>
                <div>

                <li> <Link to="/herbsPage" className="navBarSchrift" >Home </Link> </li>
                <li><Link to="/login" className="navBarSchrift">Login</Link> </li>
                <li><Link to="/register" className="navBarSchrift">Registrierung </Link></li>
                <li><Link to="/onLogout" className="navBarSchrift">Logout</Link> </li>
                </div>
            </div>

    )
}

