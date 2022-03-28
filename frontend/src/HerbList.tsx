import {useCallback, useEffect, useState} from "react";
import {HerbsItemDTO} from "./HerbsModel";
import "./HerbsEdit.css";
interface HerbsListProps{
    herbs: HerbsItemDTO[]
}
export default function HerbsList(props:HerbsListProps){


    return(
        <div className="leftSide">
            <ul>
                {props.herbs.length>0 && props.herbs.map(herbs => <li className={"herbName"} key={herbs.herbsName}>{herbs.herbsName} </li>)}
            </ul>



        </div>
    )
}