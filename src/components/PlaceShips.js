import {useEffect, useState, useContext} from 'react';
import PlaceShipsCss from '../styles/PlaceShips.css';
import {createGridLabels, findGoodSquares, createGridAlphaNum, getGridItemNumber} from '../utils/utils';
import {COLUMN_LABELS} from '../constants/constants';
import {OccupiedContext} from "../contexts/OccupiedContext";
import {GameStateContext} from "../contexts/GameStateContext";

function PlaceShips({player1Grid, setPlayer1Grid, start1, setStart1, start2, setStart2, end1, setEnd1, end2, setEnd2}) {
    const {occupied, setOccupied} = useContext(OccupiedContext);
    const {setGameState} = useContext(GameStateContext);
    const [end1GoodSquares, setEnd1GoodSquares] = useState([]);
    const [end2GoodSquares, setEnd2GoodSquares] = useState([]);
    const [gridLabels, setGridLabels] = useState(createGridAlphaNum());

    function markOccupied(startSquare, endSquare, shipSize) {
        if (endSquare==='') return;
        let newGrid = [...player1Grid];
        newGrid[getGridItemNumber(startSquare)] = 'ship';
        newGrid[getGridItemNumber(endSquare)] = 'ship';
        //old
        const newOccupied = [...occupied, startSquare, endSquare];
        const startSquareLetterIdx = COLUMN_LABELS.indexOf(startSquare.substr(0,1));
        const endSquareLetterIdx = COLUMN_LABELS.indexOf(endSquare.substr(0,1));
        
        if (shipSize===3&&startSquare.substr(0,1)===endSquare.substr(0,1)) {
            
            const shipStart = getGridItemNumber(startSquare);
            const shipEnd = getGridItemNumber(endSquare);
            //needs work
            if (shipStart<shipEnd) newGrid[shipStart+8] = 'ship';
            if (shipStart>shipEnd) newGrid[shipStart-8] = 'ship';
            //old
            if (Number(startSquare.substr(1,1))<Number(endSquare.substr(1,1))) newOccupied.push(`${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))+1}`);
            if (Number(startSquare.substr(1,1))>Number(endSquare.substr(1,1))) newOccupied.push(`${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))-1}`);
        }
        if (shipSize===3&&startSquare.substr(1,1)===endSquare.substr(1,1)) {
            console.log('insamenum')
            const shipStart = getGridItemNumber(startSquare);
            const shipEnd = getGridItemNumber(endSquare);
            console.log('shipStart:', shipStart)
            console.log('shipEnd:', shipEnd)
            if (shipStart<shipEnd) newGrid[shipStart+1] = 'ship';
            if (shipStart>shipEnd) newGrid[shipEnd+1] = 'ship';
            //old
            if (startSquareLetterIdx<endSquareLetterIdx) newOccupied.push(`${COLUMN_LABELS[startSquareLetterIdx+1]}${Number(startSquare.substr(1,1))}`);
            if (startSquareLetterIdx>endSquareLetterIdx) newOccupied.push(`${COLUMN_LABELS[startSquareLetterIdx-1]}${Number(startSquare.substr(1,1))}`);
        }
        setOccupied(Array.from(new Set(newOccupied)));
        setPlayer1Grid(newGrid);
    }
    function handleStartSelect(e) {
        if (e.target.name.endsWith("1")) {
            setEnd1GoodSquares(findGoodSquares(e.target.value, 2, occupied));
            setEnd1('');
        }
        if (e.target.name.endsWith("2")) {
            setEnd2GoodSquares(findGoodSquares(e.target.value, 3, occupied));
            setEnd2('');
        };
    }

    function handleEndSelect(e) {
        if (e.target.name.endsWith("1")) {
            setEnd1(e.target.value);
            markOccupied(start1, e.target.value, 2);
        }
        if (e.target.name.endsWith("2")) {
            setEnd2(e.target.value);
            markOccupied(start2, e.target.value, 3);
        }
    }
    useEffect(()=>{
        // setGridLabels(createGridLabels());
    }, []);
    return (
        <div style={{margin: '70px 0'}}>
            <h4 style={{textAlign: 'center'}}>{end2===""?"Time to place your ships on the board!":"Ships are ready!"}</h4>  
            <div style={{textAlign: 'center', marginTop: '-20px'}}>{end2===""?"":"Press fire to begin game"}</div> 
            <div style={{textAlign: 'center'}}>{end2===""?"":"Refresh Screen to change ship placement"}</div> 
            <div className="placeShipsContainer"> 
                <div className="ship">
                    <h3>Place Ship #1</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 2</p>
                    <p>Starting Coordinate</p>
                    <select name='start1' onChange={(e)=>{setStart1(e.target.value); handleStartSelect(e);}} disabled={end2!==''}>
                        <option key="startselect1">select</option>
                        {gridLabels.map(label=><option key={label}>{label}</option>)}
                    </select>
                    <p>Ending Coordinate</p>
                    <select name='end1' onChange={(e)=>{setEnd1(e.target.value); handleEndSelect(e);}} disabled={start1==="B9"||end2!==''}>
                        <option key="endselect1">select</option>
                        {end1GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
                <div className="ship">
                    <h3>Place Ship #2</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 3</p>
                    <p>Starting Coordinate</p>
                    <select name='start2' onChange={(e)=>{setStart2(e.target.value); handleStartSelect(e);}} disabled={end1===""||end2!==''}>
                        <option key="startselect2">{start2}</option>
                        {gridLabels.map(label=>(occupied.indexOf(label)<0)&&<option key={label}>{label}</option>)}
                        <option key='safety'>{start2}</option>
                    </select>
                    <p>Ending Coordinate</p>
                    <select name='end2' onChange={(e)=>{setEnd2(e.target.value); handleEndSelect(e);}} disabled={start2==="E9"||end2!==''}>
                        <option key="endselect2">select</option>
                        {end2GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <button style={{fontSize: '26px', padding: '10px 20px', backgroundColor: '#D09D12'}} type='button' onClick={()=>setGameState('play')} disabled={end2===''}>Begin Game</button>
            </div>
            <PlaceShipsCss />
        </div>
    )
}

export default PlaceShips;

// import {useEffect, useState, useContext} from 'react';
// import PlaceShipsCss from '../styles/PlaceShips.css';
// import {createGridLabels, findGoodSquares} from '../utils/utils';
// import {COLUMN_LABELS} from '../constants/constants';
// import {OccupiedContext} from "../contexts/OccupiedContext";
// import {GameStateContext} from "../contexts/GameStateContext";

// function PlaceShips({start1, setStart1, start2, setStart2, end1, setEnd1, end2, setEnd2}) {
//     const {occupied, setOccupied} = useContext(OccupiedContext);
//     const {setGameState} = useContext(GameStateContext);
//     const [end1GoodSquares, setEnd1GoodSquares] = useState([]);
//     const [end2GoodSquares, setEnd2GoodSquares] = useState([]);
//     const [gridLabels, setGridLabels] = useState([]);

//     function markOccupied(startSquare, endSquare, shipSize) {
//         if (endSquare==='') return;
//         const newOccupied = [...occupied, startSquare, endSquare];
//         const startSquareLetterIdx = COLUMN_LABELS.indexOf(startSquare.substr(0,1));
//         const endSquareLetterIdx = COLUMN_LABELS.indexOf(endSquare.substr(0,1));
        
//         if (shipSize===3&&startSquare.substr(0,1)===endSquare.substr(0,1)) {
//             if (Number(startSquare.substr(1,1))<Number(endSquare.substr(1,1))) newOccupied.push(`${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))+1}`);
//             if (Number(startSquare.substr(1,1))>Number(endSquare.substr(1,1))) newOccupied.push(`${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))-1}`);
//         }
//         if (shipSize===3&&startSquare.substr(1,1)===endSquare.substr(1,1)) {
//             if (startSquareLetterIdx<endSquareLetterIdx) newOccupied.push(`${COLUMN_LABELS[startSquareLetterIdx+1]}${Number(startSquare.substr(1,1))}`);
//             if (startSquareLetterIdx>endSquareLetterIdx) newOccupied.push(`${COLUMN_LABELS[startSquareLetterIdx-1]}${Number(startSquare.substr(1,1))}`);
//         }
//         setOccupied(Array.from(new Set(newOccupied)));
//     }
//     function handleStartSelect(e) {
//         if (e.target.name.endsWith("1")) {
//             setEnd1GoodSquares(findGoodSquares(e.target.value, 2, occupied));
//             setEnd1('');
//         }
//         if (e.target.name.endsWith("2")) {
//             setEnd2GoodSquares(findGoodSquares(e.target.value, 3, occupied));
//             setEnd2('');
//         };
//     }

//     function handleEndSelect(e) {
//         if (e.target.name.endsWith("1")) {
//             setEnd1(e.target.value);
//             markOccupied(start1, e.target.value, 2);
//         }
//         if (e.target.name.endsWith("2")) {
//             setEnd2(e.target.value);
//             markOccupied(start2, e.target.value, 3);
//         }
//     }
//     useEffect(()=>{
//         setGridLabels(createGridLabels());
//     }, []);
//     return (
//         <div style={{margin: '70px 0'}}>
//             <h4 style={{textAlign: 'center'}}>{end2===""?"Time to place your ships on the board!":"Ships are ready!"}</h4>  
//             <div style={{textAlign: 'center', marginTop: '-20px'}}>{end2===""?"":"Press fire to begin game"}</div> 
//             <div style={{textAlign: 'center'}}>{end2===""?"":"Refresh Screen to change ship placement"}</div> 
//             <div className="placeShipsContainer"> 
//                 <div className="ship">
//                     <h3>Place Ship #1</h3>
//                     <p style={{fontStyle: 'italic'}}>Length of 2</p>
//                     <p>Starting Coordinate</p>
//                     <select name='start1' onChange={(e)=>{setStart1(e.target.value); handleStartSelect(e);}} disabled={end2!==''}>
//                         <option key="startselect1">select</option>
//                         {gridLabels.map(label=><option key={label}>{label}</option>)}
//                     </select>
//                     <p>Ending Coordinate</p>
//                     <select name='end1' onChange={(e)=>{setEnd1(e.target.value); handleEndSelect(e);}} disabled={start1==="B9"||end2!==''}>
//                         <option key="endselect1">select</option>
//                         {end1GoodSquares.map(label=><option key={label}>{label}</option>)}
//                     </select>
//                 </div>
//                 <div className="ship">
//                     <h3>Place Ship #2</h3>
//                     <p style={{fontStyle: 'italic'}}>Length of 3</p>
//                     <p>Starting Coordinate</p>
//                     <select name='start2' onChange={(e)=>{setStart2(e.target.value); handleStartSelect(e);}} disabled={end1===""||end2!==''}>
//                         <option key="startselect2">{start2}</option>
//                         {gridLabels.map(label=>(occupied.indexOf(label)<0)&&<option key={label}>{label}</option>)}
//                         <option key='safety'>{start2}</option>
//                     </select>
//                     <p>Ending Coordinate</p>
//                     <select name='end2' onChange={(e)=>{setEnd2(e.target.value); handleEndSelect(e);}} disabled={start2==="E9"||end2!==''}>
//                         <option key="endselect2">select</option>
//                         {end2GoodSquares.map(label=><option key={label}>{label}</option>)}
//                     </select>
//                 </div>
//             </div>
//             <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
//                 <button style={{fontSize: '26px', padding: '10px 20px', backgroundColor: '#D09D12'}} type='button' onClick={()=>setGameState('play')} disabled={end2===''}>Begin Game</button>
//             </div>
//             <PlaceShipsCss />
//         </div>
//     )
// }

// export default PlaceShips;
