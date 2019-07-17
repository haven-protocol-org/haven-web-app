import {Rotate} from "./styles";
import React from "react";
import Icon from "../../assets/haven.svg";


export const Spinner = ({width}) => {
    return (
        <Rotate>
            <img width={'24px'} src={Icon}/>
        </Rotate>
    )};
