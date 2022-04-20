import {useEffect, useRef, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import {useNavigate} from "react-router-dom";
import "../css/herbs.css"
import "../css/button.css"


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
    const[userRole, setUserRole] = useState([] as Array <string>);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUserRole(tokenDetails.roles)
        }
    }, [token])
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
        if (herbsName.length > 0) {
            if (props.herbToChange.links != null) {
                editItem()
            } else {
                createHerb()
            }
        } else{
            setErrorMessage("Bitte einen Pflanzennamen eingeben!")
            }
    }
    const clearFields =() => {
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
                herbsPicUrl1 : herbsPic_Url1
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
                clearFields()
            })
            .catch(e=> setErrorMessage(e.message));
    }

    const createHerb = () => {

        fetch(`${process.env.REACT_APP_BASE_URL}/api/items`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
             },
             body: JSON.stringify({
                 herbsName: herbsName,
                 herbsNameCategory: herbsNameCategory,
                 herbsDescription: herbsDescription,
                 herbsDescriptionCategory: herbsDescriptionCategory,
                 herbsApplication: herbsApplication,
                 herbsApplicationCategory: herbsApplicationCategory,
                 herbsOk: herbsOk,
                 herbsPicUrl1: herbsPic_Url1
             })
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    if (response.status === 403) {
                        throw new Error("Session ist abgelaufen. Bitte neu anmelden!")
                    }
                    throw new Error("Fehler beim Speichern.")
            })
                .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                    setHerbsName('');
                    setHerbsDescription('');
                    props.onHerbsCreation();
                })
                .then(() => {
                    clearFields()
                })
                .catch(e => setErrorMessage(e.message));
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
                clearFields()
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
            .then(data => setHerbsPicUrl1(data.secure_url))
            .then(()  => {
                if(ref.current !== null){
                    ref.current.value = ""
                }
                setImg({} as File)
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
         <div >
             <button onClick={clearFields} className={'createButton'} hidden={!token} >Neuanlage </button>
         </div>
        <div className={'herbEdit'}>
            {url ?
                <img src={url} alt="" className={'picture1'} />
            :
                <img src={herbsPic_Url1} alt ="." className={'picture1'}/>
            }
            <input data-testid="herbName" className={'herbName'} type="text" placeholder={"Name"} value={herbsName}
                   onChange={ev => setHerbsName(ev.target.value)} disabled={!token}  />
            <textarea className={'herbDescription'} rows={15} placeholder={"Beschreibung"}
                   value={herbsDescription} onChange={ev => setHerbsDescription(ev.target.value)}disabled={!token}/>
            <textarea className={'herbApplication'} rows={10} placeholder={"Anwendung"} value={herbsApplication}
                   onChange={ev => setHerbsApplication(ev.target.value)} disabled={!token} />
            <div className={'herbNameCategory'}>
                <input placeholder={"Kategorie Pflanze"}
                   value={herbsNameCategory} onChange={ev => setHerbsNameCategory(ev.target.value)} disabled={!token}/>
                </div>
            <div className={'herbDescriptionCategory'}>
                <input  placeholder={"zB. Heilpflanze"}
                    value={herbsDescriptionCategory}
                    onChange={ev => setHerbsDescriptionCategory(ev.target.value)} disabled={!token} />
                </div>
            <div className={'herbApplicationCategory'}>
                    <input type="text" placeholder={"Rezept/Kosmetik"}
                           value={herbsApplicationCategory}
                           onChange={ev => setHerbsApplicationCategory(ev.target.value)}disabled={!token} />
                <div>
                    <button  onClick={CreateOrEdit} className='saveButton' hidden={!token} >Speichern</button>
                </div>
                <div>
                    <button  data-testid="delete-button" onClick={deleteHerb} className={'deleteButton'} hidden={!token} >Löschen</button>
                </div>
                <div>
                <label hidden={!token}  >
                    < input type="file" accept="image/*" ref={ref}  onChange={ev => {
                        if(ev.target.files !=null){setImg(ev.target.files[0]);} } }    /> <div className={'seekPicture'}> Bild wählen </div>
                </label>

                </div>

                <div >{img.size>0 && <button onClick={handleUpload} className={'uploadButton'} hidden={!token} >Bild hochladen</button>}  {img.name}   </div>
            </div>
        </div>
     </div>
    )
}



