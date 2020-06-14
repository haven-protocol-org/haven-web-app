import styled, { keyframes } from "styled-components";
import {ReactComponent as RefreshSVG} from "../../../../assets/icons/sync-solid.svg";


export const Icon = styled(RefreshSVG)`
  height:14px;
  width:14px;
  display:inline-block;
  margin-right:auto;
  margin-left:20px;
  cursor:pointer;
  color:white;
  src: ${(props) => props.src};
   ${props => props.active && `
    color:red;    
`}
`;

