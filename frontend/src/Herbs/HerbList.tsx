import {HerbsItemDTO} from "../Herbs/HerbsModel";
import {useState} from "react";

interface HerbsListProps{
    herbs: HerbsItemDTO[]
    onHerbsToChange: (herb:HerbsItemDTO)=> void;
}


export default function HerbsList(props:HerbsListProps){

    return(


        <div className="leftSide">
            <ul>
                {props.herbs.length>0 && props.herbs.map((herbs,index) => <li className={"herbName"}
                                                                              onClick={()=>props.onHerbsToChange(herbs)}
                                                                              key={herbs.herbsName+index}>{herbs.herbsName} </li>)}
            </ul>
        </div>
    )
}