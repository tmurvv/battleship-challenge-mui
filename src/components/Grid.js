import { useEffect, useState } from 'react';
import GridCss from '../styles/Grid.css';
import {createGridLabels} from '../utils/utils.js';
 
function Grid() {
    const [gridLabels, setGridLabels] = useState([]);
    useEffect(()=>{
        setGridLabels(createGridLabels());
    }, []);
    return (
        <>
            <div className="mainContainer">
                <img className="logo" src="../img/BlackOwl_Systems_Logo_Owl.png" alt="Black Owl Systems Logo"/>
                <h1>Battleship Challenge</h1>
                {gridLabels.map(label=><p>{label}</p>)}
            </div>
            
            <GridCss />
        </>
    )
}

export default Grid;
