import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/herbs.css"
import "../css/button.css"


interface HerbsListProps{
    herbs: HerbsItemDTO[]
    onHerbsToChange: (herb:HerbsItemDTO)=> void;
}


export default function HerbsList(props:HerbsListProps){

    return(
        <div className={'herbList'}>
                <ul>
                    {props.herbs.length>0 && props.herbs.map((herbs,
                                          index) => <li
                                          onClick={()=>props.onHerbsToChange(herbs)}
                                          key={herbs.herbsName+index}>{herbs.herbsName} </li>)}
                </ul>
        </div>
    )
}