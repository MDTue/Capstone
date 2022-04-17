import HerbsList from "../Herbs/HerbList";
import HerbsEdit from "../Herbs/HerbsEdit";
import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/herbs.css"


import logo from "../images/Logo_Hoerbs_Transparent.png";
import knopfRezepte from "../images/Rezepte.png";
import knopfApplication from "../images/Heilpflanzen.png";
import knopfAlle from "../images/allePflanzen.png";
import NavBar from "../Components/NavBar";
import {format} from "util";
import {TIMEOUT} from "dns";

export default function HerbsPage(){
    const[herbs, setHerbs] = useState([] as Array<HerbsItemDTO>);
    const[errorMessage, setErrorMessage]= useState('');
    const[herbToChange, setHerbToChange]=useState({}as HerbsItemDTO);
    const seekId = '';
    const[token] = useState(localStorage.getItem('token') ?? '');

    const[sessionEnd, setSessionEnd] = useState(0);
    const [username, setUsername] = useState('');
    let headerListe = ''


    useEffect(() => {
        if (localStorage.getItem('token')) {
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUsername(tokenDetails.sub);
            setSessionEnd(tokenDetails.exp)
            let d = new Date(tokenDetails.exp); // create Date object
            console.log(d.toString());
            console.log(d.toLocaleString()); // expected output: "7/25/2016, 1:35:07 PM"
            console.log(d.toLocaleDateString()); // expected output: "7/25/2016"
            console.log(d.toDateString());  // expected output: "Mon Jul 25 2016"
            console.log(d.toTimeString()); // expected output: "13:35:07 GMT+0530 (India Standard Time)"
            console.log(d.toLocaleTimeString()); // expected output: "1:35:07 PM"
        }
    }, [token])


    const fetchAll = useCallback((seekId?:string) => {
        let urlToSeek= `${process.env.REACT_APP_BASE_URL}/api/items`;
        setHerbToChange({} as HerbsItemDTO)
        if (seekId==='') {
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items`
            headerListe = "Alle Pflanzen"

        }else if(seekId==="1"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Rezept`
            headerListe = "Rezepte"

        }else if(seekId==="2"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/categoryDesc/Heilpflanze`
            headerListe = "Heilpflanzen"

        }
        fetch(urlToSeek,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
        })
            .then(response => {
                if (response.status===200) {
                    return response.json()
                }
                throw new Error('NotFound')
            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) =>
                setHerbs(herbsFromBackend))
            .catch(e  => {
                setErrorMessage(e.message)
            })

    },[])

    useEffect(() =>{
        fetchAll(seekId);
    },[fetchAll]);

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )
    return(
            <div>
                <div className={'navBar'}>
                    <img src={logo} alt="Logo" className={'logo'} />
                    <div className ={'navBarLower'}>
                            <img onClick={()=>fetchAll('')} src={knopfAlle} alt='alle' className={'knopf'} />
                            <img onClick={()=>fetchAll('2')} src={knopfApplication} alt='Heilpflanze'  className={'knopf'} />
                            <img onClick={()=>fetchAll('1')} src={knopfRezepte} alt='Rezepte'  className={'knopf'} />
                    </div>
                    <div className={'navBarUpper'}>
                            <NavBar />
                    </div>
                </div>
                <div className={'page'}>
                        <div className={'herbListHeader'}>
                            <h3>{headerListe}</h3>
                        </div>
                    <HerbsList herbs={herbs} onHerbsToChange={setHerbToChange} />
                    <HerbsEdit onHerbsCreation={fetchAll} herbToChange={herbToChange}/>
                </div>
            </div>

    )
}
