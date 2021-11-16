import {useEffect, useState, useContext} from 'react';
import PlaceShipsCss from '../styles/PlaceShips.css';
import {createGridLabels, findGoodSquares} from '../utils/utils';

import {OccupiedContext} from "../contexts/OccupiedContext";

function PlaceShips() {
    const {occupied, setOccupied} = useContext(OccupiedContext);
    const [start1, setStart1] = useState("select");
    const [end1, setEnd1] = useState("select");
    const [end1GoodSquares, setEnd1GoodSquares] = useState(['test1', 'test2']);
    const [start2, setStart2] = useState("select");
    const [end2, setEnd2] = useState("select");
    const [end2GoodSquares, setEnd2GoodSquares] = useState(['test2', 'test5']);
    const [gridLabels, setGridLabels] = useState([]);


    function markOccupied(startSquare, endSquare, shipSize) {
        console.log('startSquare:', startSquare)
        console.log('endSquare:', endSquare)
        console.log('shipSize:', shipSize)
        let newOccupied;
        if (startSquare.substr(0,1)===endSquare.substr(0,1)&&shipSize===2) {
            newOccupied = [...occupied, startSquare, endSquare]
            console.log(newOccupied)
        }
        if (startSquare.substr(0,1)===endSquare.substr(0,1)&&shipSize===3) {

            newOccupied = [...occupied, startSquare, endSquare];
            if (Number(startSquare.substr(1,1))<Number(endSquare.substr(1,1))) newOccupied = [...occupied, startSquare, endSquare, `${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))+1}`];
            if (Number(startSquare.substr(1,1))>Number(endSquare.substr(1,1))) newOccupied = [...occupied, startSquare, endSquare, `${startSquare.substr(0,1)}${Number(startSquare.substr(1,1))-1}`];
            console.log('end', newOccupied);
        }
    }
    function handleStartSelect(e) {
        if (e.target.name.endsWith("1")) setEnd1GoodSquares(findGoodSquares(e.target.value, 2, occupied));
        if (e.target.name.endsWith("2")) setEnd2GoodSquares(findGoodSquares(e.target.value, 3, occupied));
    }

    function handleEndSelect(e) {
        if (e.target.name.endsWith("1")) {
            setEnd1(e.target.value);
            markOccupied(start1, e.target.value, 2);
        }
        if (e.target.name.endsWith("2")) {
            console.log('here')
            setEnd2(e.target.value);
            markOccupied(start2, e.target.value, 3);
        }
    }
    useEffect(()=>{
        setGridLabels(createGridLabels());
    }, []);
    return (
        <>
            <h4 style={{textAlign: 'center'}}>Time to place your ships on the board!</h4>  
            <div className="placeShipsContainer"> 
                <div className="ship">
                    <h3>Place Ship #1</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 2</p>
                    <p>Starting Coordinate</p>
                    <select name='start1' onChange={(e)=>{setStart1(e.target.value); handleStartSelect(e);}}>
                        <option key="startselect1">select</option>
                        {gridLabels.map(label=><option key={label}>{label}</option>)}
                    </select>
                    <p>Ending Coordinate</p>
                    <select name='end1' onChange={(e)=>{setEnd1(e.target.value); handleEndSelect(e);}} disabled={start1==="select"}>
                        <option key="endselect1">select</option>
                        {end1GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
                <div className="ship">
                    <h3>Place Ship #2</h3>
                    <p style={{fontStyle: 'italic'}}>Length of 3</p>
                    <p>Starting Coordinate</p>
                    <select name='start2' onChange={(e)=>{setStart2(e.target.value); handleStartSelect(e);}}>
                        <option key="startselect2">select</option>
                        {gridLabels.map(label=><option key={label}>{label}</option>)}
                    </select>
                    <p>Ending Coordinate</p>
                    <select name='end2' onChange={(e)=>{setEnd2(e.target.value); handleEndSelect(e);}} disabled={start2==="select"}>
                        <option key="endselect2">select</option>
                        {end2GoodSquares.map(label=><option key={label}>{label}</option>)}
                    </select>
                </div>
               
            </div>
            <PlaceShipsCss />
        </>
    )
}

export default PlaceShips;
