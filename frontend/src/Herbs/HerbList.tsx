import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/HerbsPage.css";

interface HerbsListProps{
    herbs: HerbsItemDTO[]
    onHerbsToChange: (herb:HerbsItemDTO)=> void;
}


export default function HerbsList(props:HerbsListProps){

    return(
                <ul>
                    {props.herbs.length>0 && props.herbs.map((herbs,
                                          index) => <li
                                          onClick={()=>props.onHerbsToChange(herbs)}
                                          key={herbs.herbsName+index}>{herbs.herbsName} </li>)}
                </ul>

    )
}