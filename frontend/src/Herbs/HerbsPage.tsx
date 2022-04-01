import HerbsList from "../Herbs/HerbList";
import HerbsEdit from "../Herbs/HerbsEdit";
import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/HerbsEdit.css";
import "../css/HerbsPage.css";


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
        <div>



            <div className={"page"}>
                <div className={'error'} > {errorMessage}  </div>
                <div className={"leftSide"}>
                    <HerbsList herbs={herbs} onHerbsToChange={setHerbToChange} />
                </div>
                <div className={"rightSide"}>
                    <HerbsEdit onHerbsCreation={fetchAll} herbToChange={herbToChange}/>
                </div>
            </div>
        </div>
    )
}
