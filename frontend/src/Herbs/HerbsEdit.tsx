import {useEffect, useRef, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import {useNavigate} from "react-router-dom";
import "../css/herbs.css"


interface HerbsFromProps{
    onHerbsCreation: (seekId?:string)=> void;
    herbToChange: HerbsItemDTO;
}

export default function HerbsEdit(props:HerbsFromProps){
    const[img, setImg] = useState({} as File)
    const[url, setUrl] = useState('')
    const ref = useRef <HTMLInputElement>(null) ;
    const nav = useNavigate()
    const[herbsName, setHerbsName] = useState(localStorage.getItem('herbsName')??'')
    const[herbsNameCategory, setHerbsNameCategory] = useState('')
    const[herbsDescription, setHerbsDescription] = useState(localStorage.getItem('herbDescription')??'')
    const[herbsDescriptionCategory, setHerbsDescriptionCategory] = useState('')
    const[herbsApplication, setHerbsApplication] = useState('')
    const[herbsApplicationCategory, setHerbsApplicationCategory] = useState('')
    const[herbsPic_Url1, setHerbsPicUrl1] = useState('')
    const[herbsOk, setHerbsOk] = useState(true)
    const[errorMessage, setErrorMessage] = useState('')
    const[token] = useState(localStorage.getItem('token') ?? '');
    useEffect(()=>{
        setHerbsName(props.herbToChange.herbsName);
        setHerbsNameCategory(props.herbToChange.herbsNameCategory)
        setHerbsDescription(props.herbToChange.herbsDescription);
        setHerbsDescriptionCategory(props.herbToChange.herbsDescriptionCategory)
        setHerbsApplication(props.herbToChange.herbsApplication);
        setHerbsApplicationCategory(props.herbToChange.herbsApplicationCategory)
        setHerbsOk(props.herbToChange.herbsOk)
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
    const create =() => {
        setHerbsName('');
        setHerbsNameCategory('');
        setHerbsDescription('');
        setHerbsDescriptionCategory('');
        setHerbsApplication('');
        setHerbsApplicationCategory('');
        setHerbsOk(true);
        setHerbsPicUrl1('');
        setUrl('')
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
                herbsOk: herbsOk,
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
                setHerbsOk(true);
                setHerbsPicUrl1('');
                setUrl('')
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
                herbsOk: herbsOk,
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
                setHerbsOk(true);
                setHerbsPicUrl1('')
                setUrl('')
            })
            .catch(e=> setErrorMessage(e.message));
    }

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
                setHerbsOk(true);
                setHerbsPicUrl1('');
                setUrl('')
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
            .then(()  => {
                if(ref.current !== null){
                    ref.current.value = ""
                }
            })
    }




    useEffect(() => {
            const timoutId = setTimeout(() => setErrorMessage(''), 10000)
            return () => clearTimeout(timoutId)
        }, [errorMessage]
    )

    return(
     <div>
         <div className={'navBarLower'}>
             <div className={'fehler'}>
                 <h3>{errorMessage}</h3>
             </div>
         </div>
        <div className={'herbEdit'}>
            {url ?
                <img src={url} alt="uploaded pic" className={'picture1'} />
            :
                <img src={herbsPic_Url1} alt ="Bild Pflanze" className={'picture1'}/>
            }
            <div className={'picture2'}>
                bild2
            </div>
            <input data-testid="herbName" className={'herbName'} type="text" placeholder={"Name"} value={herbsName}
                   onChange={ev => setHerbsName(ev.target.value)} disabled={!token}/>
            <textarea className={'herbDescription'} rows={10} placeholder={"Beschreibung"}
                   value={herbsDescription} onChange={ev => setHerbsDescription(ev.target.value)}disabled={!token}/>
            <textarea className={'herbApplication'} rows={10} placeholder={"Anwendung"} value={herbsApplication}
                   onChange={ev => setHerbsApplication(ev.target.value)} disabled={!token} />
            <input className={'herbNameCategory'} type="text" placeholder={"Kategorie Pflanze"}
                   value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)} disabled={!token}/>
            <input className={'herbDescriptionCategory'} type="text" placeholder={"Kategorie Beschreibung"}
                   value={herbsDescriptionCategory}
                   onChange={ev => setHerbsDescriptionCategory(ev.target.value)}disabled={!token} />
            <div className={'herbApplicationCategory'}>
                    <input type="text" placeholder={"Kategorie Anwendung"}
                           value={herbsApplicationCategory}
                           onChange={ev => setHerbsApplicationCategory(ev.target.value)}disabled={!token} />
                <div className={'createButton'}>
                    <button onClick={create} disabled={!token} >Neuanlage</button>
                </div>
                <div className={'saveButton'}>
                    <button  onClick={CreateOrEdit} disabled={!token} >Speichern</button>
                </div>
                <div className={'deleteButton'}>
                    <button  data-testid="delete-button" onClick={deleteHerb} disabled={!token} >Löschen</button>
                </div>

                <div className={'seekPicture'}>
                    <input type="file" accept="image/*" ref={ref}  onChange={ev => {
                    if(ev.target.files !=null){setImg(ev.target.files[0]);}} } disabled={!token} />
                </div>

                <div className={'uploadButton'}>{img.size>0 && <button onClick={handleUpload}disabled={!token} >upload</button>}
                </div>
            </div>
        </div>
     </div>
    )
}



