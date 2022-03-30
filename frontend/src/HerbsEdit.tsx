import {useEffect, useState} from "react";
import {HerbsItemDTO} from "./HerbsModel";
import "./HerbsEdit.css";
import "./HerbsPage.css";
import logo from "../src/images/LogoHoerbs.png"
import {Link} from "react-router-dom";




interface HerbsFromProps{
    onHerbsCreation: ()=> void;
}

export default function HerbsEdit(props:HerbsFromProps){
    const[herbsName, setHerbsName] = useState(localStorage.getItem('herbsName')??'')
    const[herbsNameCategory, setHerbsNameCategory] = useState('')
    const[herbsDescription, setHerbsDescription] = useState(localStorage.getItem('herbDescription')??'')
    const[herbsDescriptionCategory, setHerbsDescriptionCategory] = useState('')
    const[herbsApplication, setHerbsApplication] = useState('')
    const[herbsApplicationCategory, setHerbsApplicationCategory] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const[token] = useState(localStorage.getItem('token') ?? '');

    const createHerb = () => {
        debugger
        fetch(`${process.env.REACT_APP_BASE_URL}/api/items`,{
            method: 'POST',
            headers: {
               'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                "herbsName": herbsName,
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
                props.onHerbsCreation();
            })
            .catch(e=> setErrorMessage(e.message));
    }
    /*
    useEffect(() => {
        localStorage.setItem('herbsName',herbsName);
        setHerbsNameCategory('');
        localStorage.setItem('herbsdescription',herbsDescription);
        setHerbsDescriptionCategory('');
        setHerbsApplication('');
        setHerbsApplicationCategory('');
    }, [herbsName, herbsDescription]);
*/
    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )
    return(

        <div className={'page'}>
            <div className={'error'} > {errorMessage}  </div>
            <div className={'header'}>Wildkräuter</div>
            <img src={logo} alt="Logo" className={'logo'} />
            {/*{token ?*/}
                <div className={'rightSide'}>
                    <input className={'herbName'} type="text" placeholder={"Name"} value={herbsName}
                           onChange={ev => setHerbsName(ev.target.value)}/>
                    <input className={'herbNameCategory'} type="text" placeholder={"Kategorie Pflanze"}
                           value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)}/>
                    <textarea className={'herbDescription'} rows={10} placeholder={"Beschreibung"}
                              value={herbsDescription} onChange={ev => setHerbsDescription(ev.target.value)}/>
                    <input className={'herbDescriptionCategory'} type="text" placeholder={"Kategorie Beschreibung"}
                           value={herbsDescriptionCategory}
                           onChange={ev => setHerbsDescriptionCategory(ev.target.value)}/>
                    <textarea className={'herbApplication'} rows={10} placeholder={"Anwendung"} value={herbsApplication}
                              onChange={ev => setHerbsApplication(ev.target.value)}/>
                    <input className={'herbApplicationCategory'} type="text" placeholder={"Kategorie Anwendung"}
                           value={herbsApplicationCategory}
                           onChange={ev => setHerbsApplicationCategory(ev.target.value)}/>
                    <button className={'buttonSave'} onClick={createHerb}>Speichern</button>
                </div>
           {/*} :
                <div className={'rightSide'}>

                    <input className={'herbName'} type="text" placeholder={"Name"} value={herbsName}
                           onChange={ev => setHerbsName(ev.target.value)} disabled={true} />
                    <input className={'herbNameCategory'} type="text" placeholder={"Kategorie Pflanze"}
                           value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)}disabled={true}/>
                    <textarea className={'herbDescription'} rows={10} placeholder={"Beschreibung"}
                              value={herbsDescription} onChange={ev => setHerbsDescription(ev.target.value)}disabled={true}/>
                    <input className={'herbDescriptionCategory'} type="text" placeholder={"Kategorie Beschreibung"}
                           value={herbsDescriptionCategory}
                           onChange={ev => setHerbsDescriptionCategory(ev.target.value)}disabled={true}/>
                    <textarea className={'herbApplication'} rows={10} placeholder={"Anwendung"} value={herbsApplication}
                              onChange={ev => setHerbsApplication(ev.target.value)}disabled={true}/>
                    <input className={'herbApplicationCategory'} type="text" placeholder={"Kategorie Anwendung"}
                           value={herbsApplicationCategory}
                           onChange={ev => setHerbsApplicationCategory(ev.target.value)}disabled={true}/>
                </div>
           */}
        </div>



    )
}