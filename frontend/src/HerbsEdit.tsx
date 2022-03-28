import HerbsItem from "./HerbsItem";
import {useEffect, useState} from "react";
import {HerbsItemDTO} from "./HerbsModel";




interface HerbsItemProps{
    onHerbsCreation: (herbsItem: Array<HerbsItemDTO>)=> void;
}

export default function HerbsEdit(props:HerbsItemProps){
    const[herbsName, setHerbsName] = useState(localStorage.getItem('herbsName')??'')
    const[herbsNameCategory, setHerbsNameCategory] = useState('')
    const[herbsDescription, setHerbsDescription] = useState(localStorage.getItem('herbDescription'))
    const[herbsDescriptionCategory, setHerbsDescriptionCategory] = useState('')
    const[herbsApplication, setHerbsApplication] = useState('')
    const[herbsApplicationCategory, setHerbsApplicationCategory] = useState('')

    const[errorMessage, setErrorMessage] = useState('')
    const[token] = useState(localStorage.getItem('token') ?? '');

    const createHerb = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/herbs`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                herbsName: herbsName,
                herbsNameCategory: herbsNameCategory,
                herbsDescription: herbsDescription,
                herbsDescriptionCategory : herbsDescriptionCategory,
                herbsApplication : herbsApplication,
                herbsApplicationCategory : herbsApplicationCategory
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error("NotFound")
            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                setHerbsName('');
                setHerbsDescription('');
                props.onHerbsCreation(herbsFromBackend);
            })
            .catch(e=> setErrorMessage(e.message));
    }
    useEffect(() => {
        localStorage.setHerbsName('herbsName',herbsName);
        localStorage.setHerbsDescription('herbsdescription',herbsDescription);
    }, [herbsName, herbsDescription]);


    return(
        <div className={'herbsform'}>
            <input className={'herbsform'} type="text" placeholder={"Name"} value={herbsName} onChange={ev => setHerbsName(ev.target.value)}/>
            <input className={'herbsform'} type="text" placeholder={"Kategorie Pflanze"} value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)}/>
            <input className={'herbsform'} type="text" placeholder={"Beschreibung"} value={herbsApplication} onChange={ev => setHerbsApplication(ev.target.value)}/>
            <input className={'herbsform'} type="text" placeholder={"Kategorie Beschreibung"} value={herbsApplicationCategory} onChange={ev => setHerbsDescriptionCategory(ev.target.value)}/>
            <input className={'herbsform'} type="text" placeholder={"Anwendung"} value={herbsApplication} onChange={ev => setHerbsApplication(ev.target.value)}/>
            <input className={'herbsform'} type="text" placeholder={"Kategorie Anwendung"} value={herbsApplicationCategory} onChange={ev => setHerbsApplicationCategory(ev.target.value)}/>
            <button onClick={createHerb}>Speichern</button>
        </div>


    )
}