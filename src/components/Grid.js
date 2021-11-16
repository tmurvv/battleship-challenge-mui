import {useEffect, useState} from 'react';
import GridCss from '../styles/Grid.css';
import {addRowColLabels, createGridLabels} from '../utils/utils.js';
import GridItem from './GridItem';
import PlaceShips from './PlaceShips';
 
function Grid() {
    const [gridLabels, setGridLabels] = useState([]);
    useEffect(()=>{
        setGridLabels(addRowColLabels(createGridLabels()));
    }, []);
    return (
        <>
            <div className='gridHeader'>
                <img className="logo" src="../img/BlackOwl_Systems_Logo_Owl.png" alt="Black Owl Systems Logo"/>
                <h1>Battleship Challenge</h1>
            </div>
            <div className='gridContainer'>
                {gridLabels.map(label=><GridItem gridLabel={label} />)}
            </div>
            <PlaceShips />
            <GridCss />
        </>
    )
}

export default Grid;
