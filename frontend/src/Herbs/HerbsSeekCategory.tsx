import {useEffect, useState} from "react";
import {HerbsItemDTO} from "./HerbsModel";
import HerbsFromProps from "./HerbsEdit";

interface HerbsFromProps{
    herbToShow: HerbsItemDTO;
}


export default function HerbsSeekCategory(props:HerbsFromProps){
    const[errorMessage, setErrorMessage] = useState('')
    const[nameCategory, setNameCategory] = useState('')
    const[descriptionCategory, setDescriptionCategory] = useState('')
    const[applicationCategory, setApplicationCategory]= useState('')
    const[herbsName, setHerbsName] = useState(localStorage.getItem('herbsName')??'')
    const[herbsNameCategory, setHerbsNameCategory] = useState('')
    const[herbsDescription, setHerbsDescription] = useState(localStorage.getItem('herbDescription')??'')
    const[herbsDescriptionCategory, setHerbsDescriptionCategory] = useState('')
    const[herbsApplication, setHerbsApplication] = useState('')
    const[herbsApplicationCategory, setHerbsApplicationCategory] = useState('')
    const[herbsPicUrl1, setHerbsPicUrl1] = useState('')
    const[herbsOk, setHerbsOk] = useState(true)
    useEffect(()=>{
        setHerbsName(props.herbToShow.herbsName);
        setHerbsNameCategory(props.herbToShow.herbsNameCategory)
        setHerbsDescription(props.herbToShow.herbsDescription);
        setHerbsDescriptionCategory(props.herbToShow.herbsDescriptionCategory)
        setHerbsApplication(props.herbToShow.herbsApplication);
        setHerbsApplicationCategory(props.herbToShow.herbsApplicationCategory)
        setHerbsOk(props.herbToShow.herbsOk)
        setHerbsPicUrl1(props.herbToShow.herbsPicUrl1)

    }, [props.herbToShow])



    const seekCategoryApplication = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}${props.herbToShow.links.find(l=>l.rel=== 'self')?.href}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                herbsApplicationCategory: "Rezept"
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then((herbsFromBackend: Array<HerbsItemDTO>) => {
                herbsName: herbsName,
                herbsNameCategory: herbsNameCategory,
                herbsDescription: herbsDescription,
                herbsDescriptionCategory : herbsDescriptionCategory,
                herbsApplication : herbsApplication,
                herbsApplicationCategory : herbsApplicationCategory,
                herbsOk: herbsOk,
                herbsPicUrl1: herbsPicUrl1
            })

            .catch(e=> setErrorMessage(e.message));
    }









}