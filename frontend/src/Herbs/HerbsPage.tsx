import HerbsList from "../Herbs/HerbList";
import HerbsEdit from "../Herbs/HerbsEdit";
import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";

import "../css/herbs.css"
import "../css/button.css"

import logo from "../images/Logo_Hoerbs_Transparent.png";
import knopfRezepte from "../images/Rezepte.png";
import knopfApplication from "../images/Heilpflanzen.png";
import knopfAlle from "../images/allePflanzen.png";
import knopfRuehrkueche from "../images/Ruehrkueche.png";
import NavBar from "../Components/NavBar";

export default function HerbsPage(){
    const[token] = useState(localStorage.getItem('token') ?? '');
    const[userRole, setUserRole] = useState([] as Array <string>);
    const[herbs, setHerbs] = useState([] as Array<HerbsItemDTO>);
    const[errorMessage, setErrorMessage]= useState('');
    const[herbToChange, setHerbToChange]=useState({}as HerbsItemDTO);
    const seekId = '';
    const [headerListe, setHeaderListe] = useState('')

    const fetchAll = useCallback((seekId?:string) => {

        let urlToSeek= `${process.env.REACT_APP_BASE_URL}/api/items`;
        setHerbToChange({} as HerbsItemDTO)
        if (seekId==='') {
            setHeaderListe("Alle Pflanzen")
        }else if(seekId==="1"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Rezept`
            setHeaderListe("Rezept")
        }else if(seekId==="2"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/categoryDesc/Heilpflanze`
            setHeaderListe("Heilpflanze")
        }else if(seekId==="3"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Kosmetik`
            setHeaderListe("Kosmetik")
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
                        <img onClick={()=>fetchAll('1')} src={knopfRezepte} alt='Rezepte'  className={'knopf'}  />
                        <img onClick={()=>fetchAll('3')} src={knopfRuehrkueche} alt='Rührküche'  className={'knopf'}  />
                    </div>
                    <div className={'navBarUpper'}>
                            <NavBar />
                    </div>
                </div>
                <div className={'page'}>
                        <div className={'herbListHeader'}>
                            <h3>{headerListe}</h3>
                        </div>
                    <div className={'herbList'}>
                       <HerbsList herbs={herbs} onHerbsToChange={setHerbToChange} />
                    </div>
                    <HerbsEdit onHerbsCreation={fetchAll} herbToChange={herbToChange}/>
                </div>
            </div>
    )
}
