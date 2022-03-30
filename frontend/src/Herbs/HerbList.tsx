import {HerbsItemDTO} from "../Herbs/HerbsModel";
import "../css/HerbsEdit.css";

interface HerbsListProps{
    herbs: HerbsItemDTO[]
}
export default function HerbsList(props:HerbsListProps){


    return(
        <div className="leftSide">
            <ul>
                {props.herbs.length>0 && props.herbs.map((herbs,index) => <li className={"herbName"}
                                                                              key={herbs.herbsName+index}>{herbs.herbsName} </li>)}
            </ul>
        </div>
    )
}