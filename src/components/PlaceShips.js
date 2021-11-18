import { useState, useContext} from 'react';
import PlaceShipsCss from '../styles/PlaceShips.css';
import {GameStateContext} from "../contexts/GameStateContext";
import {
    findGoodSquares, 
    createGridAlphaNum, 
    markOccupied,
    getGridItemNumber,
    gridInit,
    removeOccupied
} from '../utils/utils';

function PlaceShips({player1Grid, setPlayer1Grid, start1, setStart1, start2, setStart2, end1, setEnd1, end2, setEnd2}) {
    const {setGameState} = useContext(GameStateContext);
    const [end1GoodSquares, setEnd1GoodSquares] = useState([]);
    const [end2GoodSquares, setEnd2GoodSquares] = useState([]);
    const [gridLabels] = useState(createGridAlphaNum());

    function handleStartSelect(e) {
        const shipLength = e.target.name.endsWith("1")?2:3;
        const goodSquares = findGoodSquares(getGridItemNumber(e.target.value), shipLength, player1Grid);
        if (shipLength===2) {
            setPlayer1Grid(gridInit);
            setEnd1GoodSquares(goodSquares);
            setEnd1('');
        } else {
            removeOccupied(player1Grid)
            setEnd2GoodSquares(goodSquares);
            setEnd2('');
        }
    }
    function handleEndSelect(e) {
        const shipLength = e.target.name.endsWith("1")?2:3;
        if (shipLength===2) {
            setEnd1(e.target.value);
            const newGrid = markOccupied(start1, e.target.value, 2, player1Grid);
            setPlayer1Grid(newGrid);
        } else {
            setEnd2(e.target.value);
            setPlayer1Grid(markOccupied(start2, e.target.value, 3, player1Grid));
        }
    }
    return (
        <div style={{margin: 'auto'}}>
            <h4 style={{textAlign: 'center'}}>
                {end2===""?"Time to place your ships on the board!":"Ships are ready!"}
            </h4>  
            <div style={{textAlign: 'center'}}>
                {end2===""?"":"Refresh Screen to change ship placement"}
            </div> 
            <div className="placeShipsContainer"> 
                <div className="ship">
                    <h3>Place Ship #1</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 2</p>
                    <p>Starting Coordinate</p>
                    <select 
                        name='start1' 
                        onChange={(e)=>{setStart1(e.target.value); handleStartSelect(e);}} 
                        disabled={end1!==''||end2!==''}
                    >
                        <option key="startselect1">select</option>
                        {gridLabels.map(label=><option key={label}>{label}</option>)}
                    </select>
                    <p>Ending Coordinate</p>
                    <select 
                        name='end1' 
                        onChange={(e)=>{setEnd1(e.target.value); handleEndSelect(e);}} 
                        disabled={start1==="B9"||end1!==''||end2!==''}
                    >
                        <option key="endselect1">select</option>
                        {end1GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
                <div className="ship">
                    <h3>Place Ship #2</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 3</p>
                    <p>Starting Coordinate</p>
                    <select 
                        name='start2' 
                        onChange={(e)=>{setStart2(e.target.value); handleStartSelect(e);}} 
                        disabled={end1===""||end2!==''}
                    >
                        <option key="startselect2">{start2}</option>
                        {(removeOccupied(player1Grid)).map(label=><option key={label}>{label}</option>)}
                        <option key='safety'>{start2}</option>
                    </select>
                    <p>Ending Coordinate</p>
                    <select 
                        name='end2' 
                        onChange={(e)=>{setEnd2(e.target.value); handleEndSelect(e);}} 
                        disabled={start2==="select"||end2!==''}
                    >
                        <option key="endselect2">select</option>
                        {end2GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <button 
                    className='beginGame' 
                    type='button' 
                    onClick={()=>setGameState('play')} 
                    disabled={end2===''}
                >Begin Game</button>
            </div>
            <PlaceShipsCss />
        </div>
    )
}

export default PlaceShips;
