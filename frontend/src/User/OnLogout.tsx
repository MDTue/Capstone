import {useNavigate} from "react-router-dom";
import NavBar from "../Components/NavBar";


export default function OnLogout(){
    const nav = useNavigate()
    localStorage.setItem('herbsName', '')
    localStorage.setItem('herbsdescription', '')
    localStorage.setItem('token', '')
    nav("/LOGIN")

    return(
        <div className={'navBar'}>
            <NavBar/>
            <div>Auf Wiedersehen</div>
        </div>
    )
}