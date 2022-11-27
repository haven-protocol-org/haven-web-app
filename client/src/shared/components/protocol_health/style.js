import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-column: 1 / 3;
`;

export const ColorRange = styled.div`
    width:100%;
    height: 2rem;
    background: linear-gradient(270deg,red,yellow,green);
    position:relative;
`;

export const Legend = styled.div`
    width:100%;
    font-size:0.8rem;
    display: flex;
    color: white;
    justify-content: space-between;
`;

export const Pointer = styled.div`
    min-height:2rem;
    position:absolute;
    width:2px;
    left:${(props) => props.position}%;
    background-color:black;
`;

export const RatioValue = styled.div`
    line-height:2rem;
    position:absolute;
    left:${(props) => props.position}%;
    margin-left:5px;
    font-style:italic;
    font-size:.7rem;
    color: black;
`;

export const LegendNumber = styled.span`
    width:10px;
`;
 