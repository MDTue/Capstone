import {useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import {useNavigate} from "react-router-dom";

import "../css/HerbsEdit.css";
import "../css/HerbsPage.css";

interface HerbsFromProps{
    onHerbsCreation: ()=> void;
    herbToChange: HerbsItemDTO;
}

export default function HerbsEdit(props:HerbsFromProps){
    const[img, setImg] = useState({} as File)
    const[url, setUrl] = useState('')
    const nav = useNavigate()
    const[herbsName, setHerbsName] = useState(localStorage.getItem('herbsName')??'')
    const[herbsNameCategory, setHerbsNameCategory] = useState('')
    const[herbsDescription, setHerbsDescription] = useState(localStorage.getItem('herbDescription')??'')
    const[herbsDescriptionCategory, setHerbsDescriptionCategory] = useState('')
    const[herbsApplication, setHerbsApplication] = useState('')
    const[herbsApplicationCategory, setHerbsApplicationCategory] = useState('')
    const[herbsPic_Url1, setHerbsPicUrl1] = useState('')
    const[errorMessage, setErrorMessage] = useState('')
    const[token] = useState(localStorage.getItem('token') ?? '');
    useEffect(()=>{
        setHerbsName(props.herbToChange.herbsName);
        setHerbsNameCategory(props.herbToChange.herbsNameCategory)
        setHerbsDescription(props.herbToChange.herbsDescription);
        setHerbsDescriptionCategory(props.herbToChange.herbsDescriptionCategory)
        setHerbsApplication(props.herbToChange.herbsApplication);
        setHerbsApplicationCategory(props.herbToChange.herbsApplicationCategory)
        setHerbsPicUrl1(props.herbToChange.herbsPicUrl1)

    }, [props.herbToChange])

    const CreateOrEdit= (event:React.FormEvent) => {
            event.preventDefault()
        if(props.herbToChange.links != null){
            editItem()
        }else{
            createHerb()
        }
    }

    const editItem = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}${props.herbToChange.links.find(l=>l.rel=== 'self')?.href}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                herbsName: herbsName,
                herbsNameCategory: herbsNameCategory,
                herbsDescription: herbsDescription,
                herbsDescriptionCategory: herbsDescriptionCategory,
                herbsApplication: herbsApplication,
                herbsApplicationCategory: herbsApplicationCategory,
                herbsPicUrl1 : url
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                if (response.status === 403){
                    nav("/login")
                }else {
                    throw new Error("Fehler beim Speichern.")
                }
            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                setHerbsName('');
                setHerbsDescription('');
                props.onHerbsCreation();
            })
            .then (() => {
                localStorage.setItem('herbsName',herbsName);
                setHerbsNameCategory('');
                localStorage.setItem('herbsdescription',herbsDescription);
                setHerbsDescriptionCategory('');
                setHerbsApplication('');
                setHerbsApplicationCategory('');
                setHerbsPicUrl1('');
            })
            .catch(e=> setErrorMessage(e.message));
    }

    const createHerb = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/items`,{
            method: 'POST',
            headers: {
               'Content-Type' : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                herbsName: herbsName,
                herbsNameCategory: herbsNameCategory,
                herbsDescription: herbsDescription,
                herbsDescriptionCategory : herbsDescriptionCategory,
                herbsApplication : herbsApplication,
                herbsApplicationCategory : herbsApplicationCategory,
                herbsPicUrl1 : url
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                if (response.status === 403){
                    throw new Error("Session ist abgelaufen. Bitte neu anmelden!")
                }
                throw new Error("Fehler beim Speichern.")

            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                setHerbsName('');
                setHerbsDescription('');
                props.onHerbsCreation();
            })
            .then (() => {
                localStorage.setItem('herbsName',herbsName);
                setHerbsNameCategory('');
                localStorage.setItem('herbsdescription',herbsDescription);
                setHerbsDescriptionCategory('');
                setHerbsApplication('');
                setHerbsApplicationCategory('');
                setHerbsPicUrl1('')
            })
            .catch(e=> setErrorMessage(e.message));
    }

    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    const deleteHerb = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}${props.herbToChange.links.find(l=>l.rel=== 'self')?.href}`, {
            method: 'DELETE',
            headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                if (response.status === 403){
                    nav("/login")
                }else {
                    throw new Error("Fehler beim Löschen.")
                }
            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                setHerbsName('');
                setHerbsDescription('');
                props.onHerbsCreation();
            })
            .then (() => {
                localStorage.setItem('herbsName',herbsName);
                setHerbsNameCategory('');
                localStorage.setItem('herbsdescription',herbsDescription);
                setHerbsDescriptionCategory('');
                setHerbsApplication('');
                setHerbsApplicationCategory('');
                setHerbsPicUrl1('');
            })
            .catch(e=> setErrorMessage(e.message));
    }

    const handleUpload = () => {
        const formData = new FormData()
        formData.append('file', img)
        formData.append('upload_preset', 'uploadHoerbs')

        fetch(`https://api.cloudinary.com/v1_1/hoerbs/image/upload`, {
            method : 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => setUrl(data.secure_url))
    }
    return(

        <div className={'rightSide'}>
            {url ?
                <img src={url} alt="uploaded pic" className={'picturePlant1'} />
                :
                <img src={herbsPic_Url1} alt ="Bild Pflanze" className={'picturePlant1'}/>
            }
            {token ?
                <div >
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
                    <div className={'buttonSaveHerb'}>
                        <button onClick={CreateOrEdit} >Speichern</button>
                    </div>
                    <div className={'buttonDeleteHerb'}>
                        <button onClick={deleteHerb}  >Löschen</button>
                    </div>
                    <div className={'uploadBilder'}>
                         <input type="file" accept="image/*"  onChange={ev => {
                             if(ev.target.files !=null){
                                 setImg(ev.target.files[0]);
                             }
                         } }/>
                        {img.size>0 && <button onClick={handleUpload}>upload</button>}
                    </div>
                </div>
            :
                <div >
                    <input className={'herbName'} type="text" placeholder={"Name"} value={herbsName}
                           onChange={ev => setHerbsName(ev.target.value)} disabled={true}/>
                    <input className={'herbNameCategory'} type="text" placeholder={"Kategorie Pflanze"}
                           value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)}
                           disabled={true}/>
                    <textarea className={'herbDescription'} rows={10} placeholder={"Beschreibung"}
                              value={herbsDescription} onChange={ev => setHerbsDescription(ev.target.value)}
                              disabled={true}/>
                    <input className={'herbDescriptionCategory'} type="text" placeholder={"Kategorie Beschreibung"}
                           value={herbsDescriptionCategory}
                           onChange={ev => setHerbsDescriptionCategory(ev.target.value)} disabled={true}/>
                    <textarea className={'herbApplication'} rows={10} placeholder={"Anwendung"} value={herbsApplication}
                              onChange={ev => setHerbsApplication(ev.target.value)} disabled={true}/>
                    <input className={'herbApplicationCategory'} type="text" placeholder={"Kategorie Anwendung"}
                           value={herbsApplicationCategory}
                           onChange={ev => setHerbsApplicationCategory(ev.target.value)} disabled={true}/>
                </div>
            }
        </div>



    )
}