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
    const[herbs, setHerbs] = useState([] as Array<HerbsItemDTO>);
    const[errorMessage, setErrorMessage]= useState('');
    const[herbToChange, setHerbToChange]=useState({}as HerbsItemDTO);
    const seekId = '';
    const [headerListe, setHeaderListe] = useState('')
    const[token] = useState(localStorage.getItem('token') ?? '');
    const[sessionEnd, setSessionEnd] = useState(0);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUsername(tokenDetails.sub);
            setSessionEnd(tokenDetails.exp*1000)
        }
    }, [token])

    const fetchAll = useCallback((seekId?:string) => {
        let urlToSeek= `${process.env.REACT_APP_BASE_URL}/api/items`;
        setHerbToChange({} as HerbsItemDTO)
        if (seekId==='') {
         //   urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items`
            setHeaderListe("Alle Pflanzen")
        }else if(seekId==="1"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Rezept`
            setHeaderListe("Rezepte")
        }else if(seekId==="2"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/categoryDesc/Heilpflanze`
            setHeaderListe("Heilpflanzen")
        }else if(seekId==="3"){
            urlToSeek = `${process.env.REACT_APP_BASE_URL}/api/items/category/Cremes`
            setHeaderListe("Cremes und Salben")
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
                <link rel="stylesheet" media="screen" href="https://fontlibrary.org//face/glacial-indifference" type="text/css"/>
                <div className={'navBar'}>
                    <img src={logo} alt="Logo" className={'logo'} />
                    <div className ={'navBarLower'}>
                        <img onClick={()=>fetchAll('')} src={knopfAlle} alt='alle' className={'knopf'} />
                        <img onClick={()=>fetchAll('2')} src={knopfApplication} alt='Heilpflanze'  className={'knopf'} />
                        <img onClick={()=>fetchAll('1')} src={knopfRezepte} alt='Rezepte'  className={'knopf'}  />
                        <img onClick={()=>fetchAll('3')} src={knopfRuehrkueche} alt='Rührküche'  className={'knopf'}  />
                    </div>
                    <div className={'navBarUpper'}>
                        Session läuft ab:  {new Date(sessionEnd).toLocaleString() }
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
