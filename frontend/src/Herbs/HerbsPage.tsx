import HerbsList from "../Herbs/HerbList";
import HerbsEdit from "../Herbs/HerbsEdit";
import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/herbs.css"


import logo from "../images/Logo_Hoerbs_Transparent.png";
import knopfRezepte from "../images/KnopfRezepte.png";
import knopfWissen from "../images/KnopfWissen.png";
import knopfBestimmen from "../images/KnopfBestimmen.png";
import knopfSirup from "../images/KnopfSirup.png"
import NavBar from "../Components/NavBar";

export default function HerbsPage(){
    const[herbs, setHerbs] = useState([] as Array<HerbsItemDTO>);
    const[errorMessage, setErrorMessage]= useState('');
    const[herbToChange, setHerbToChange]=useState({}as HerbsItemDTO);
    const seekId = '';
    let urlToSeek= `${process.env.REACT_APP_BASE_URL}/api/items`;


    const fetchAll = useCallback((seekId?:string) => {
        setHerbToChange({} as HerbsItemDTO)
        if (!seekId) {
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items`

        }else if(seekId==="1"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Rezept`

        }else if(seekId==="2"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/wissen`

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
                            <img src={knopfBestimmen} alt='bestimmen' className={'knopf'} />
                            <img onClick={()=>fetchAll("2")} src={knopfWissen} alt='Wissen'  className={'knopf'} />
                            <img onClick={()=>fetchAll()} src={knopfSirup} alt='Sirup'  className={'knopf'} />
                            <img onClick={()=>fetchAll("1")} src={knopfRezepte} alt='Rezepte'  className={'knopf'} />
                    </div>
                    <div className={'navBarUpper'}>
                            <NavBar />
                    </div>
                </div>
                <div className={'page'}>
                    <HerbsList herbs={herbs} onHerbsToChange={setHerbToChange} />
                    <HerbsEdit onHerbsCreation={fetchAll} herbToChange={herbToChange}/>
                </div>
            </div>

    )
}
