import HerbsList from "../Herbs/HerbList";
import HerbsEdit from "../Herbs/HerbsEdit";
import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/HerbsEdit.css";
import "../css/HerbsPage.css";
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


    const fetchAll = useCallback(() => {
        setHerbToChange({}as HerbsItemDTO)
        fetch(`${process.env.REACT_APP_BASE_URL}/api/items`,{
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
        fetchAll();
    },[fetchAll]);

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )
    return(
            <div className={'page'}>
                <div className={'menue'}>

                    <img src={logo} alt="Logo" className={'logo'} />
                    <div className={'navBar'}>
                        <NavBar />
                    </div>
                    <div className ={'knopf'}>
                    <img src={knopfBestimmen} alt='Rezepte' />
                    <img src={knopfWissen} alt='Rezepte' />
                    <img src={knopfSirup} alt='Rezepte' />
                    <img src={knopfRezepte} alt='Rezepte' />
                    </div>

                </div>
                <div className={'leftSide'}>
                    <HerbsList herbs={herbs} onHerbsToChange={setHerbToChange} />
                </div>
                <HerbsEdit onHerbsCreation={fetchAll} herbToChange={herbToChange}/>

            </div>

    )
}
