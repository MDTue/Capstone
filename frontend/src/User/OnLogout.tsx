import {useNavigate} from "react-router-dom";


export default function OnLogout(){
    const nav = useNavigate()
    localStorage.setItem('herbsName', '')
    localStorage.setItem('herbsdescription', '')
    localStorage.setItem('token', '')
    nav("/LOGIN")

    return(
        <div>Auf Wiedersehen</div>
    )
}