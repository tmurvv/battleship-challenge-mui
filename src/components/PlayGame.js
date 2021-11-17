import {useEffect, useState, useContext} from 'react';
import Grid from './Grid';
import PlayGameCss from '../styles/PlayGame.css';
import {addRowColLabels, createGridLabels} from '../utils/utils.js';
import GridItem from './GridItem';
import PlaceShips from './PlaceShips';
import PlayControls from './PlayControls';
import {COLUMN_LABELS} from '../constants/constants';
import {GameStateContext} from "../contexts/GameStateContext";
// import {Player1Context} from "../contexts/Player1Context";
// import {Player2Context} from "../contexts/Player2Context";

const gridInit = ()=>{
    let fillGrid = []
    for (let n=1; n<=64; n++) {
        fillGrid.push('empty');
    }

    return fillGrid;
}

const player2place = () => {
    let cleanGrid = gridInit();
    const shipstart1 = Math.floor(Math.random()*63)+1;
    const shipstart2 = Math.floor(Math.random()*63)+1;
    console.log('shipstart1:', shipstart1)
    console.log('firstifanswer',shipstart1%8)
    console.log('firstif',shipstart1%8<7)
    console.log('secondifanswer',shipstart1%8)
    console.log('seconif',shipstart1%8>=7)
    let shipend1;
    if (shipstart1%8<7&&shipstart1%8>0) {
        shipend1 = shipstart1+1;
    }else {
        shipend1 = shipstart1-1;
    }
        
    console.log('shipend1:', shipend1)

    let shipend2;
    if (shipstart2%8<6) shipend2 = shipstart2+2;
    console.log('shipstart2:', shipstart2)
    console.log('firstifanswer',shipstart2%8)
    console.log('firstif',shipstart2%8<6)
    console.log('secondifanswer',shipstart2%8)
    console.log('seconif',shipstart2%8>=6)
    if (shipstart2%8>=6) shipend2 = shipstart2-2;
    console.log('shipend2:', shipend2)

    
    cleanGrid[shipstart1] = 'ship';
    cleanGrid[shipend1] = 'ship';
    cleanGrid[shipstart2] = 'ship';
    cleanGrid[shipend2] = 'ship';
    if (shipstart2<shipend2) {
        cleanGrid[shipstart2+1] = 'ship';
    } else {
        cleanGrid[shipstart2-1] = 'ship';
    }
    return cleanGrid;
}

function PlayGame() {
    const {gameState, setGameState} = useContext(GameStateContext);
    const [hits, setHits]=useState([0,0]);
    const [player1Grid, setPlayer1Grid] = useState(gridInit);
    const [player2Grid, setPlayer2Grid] = useState(player2place);
    const [start1, setStart1] = useState("B9");
    const [end1, setEnd1] = useState("");
    const [shipRotation1, setShipRotation1] = useState('');
    const [start2, setStart2] = useState("E9");
    const [end2, setEnd2] = useState("");
    // const [shipRotation2, setShipRotation2] = useState('');
    // const [newGrid, setNewGrid] = useState(createGridLabels());
    // console.log('player1Grid:', player1Grid[64])
    // console.log('player2Grid:', player2Grid[63])
    useEffect(()=>{
        // if (player2Grid) console.log('player2Grid', player2Grid)
        // if (player2Grid) console.log('player2Grid', player2Grid)
        // let newGrid2 = [...player2Grid];
        // newGrid2[33] = 'ship'
        // newGrid2[34] = 'ship'
        // setPlayer2Grid(newGrid2)
        // let newGrid1 = [...player1Grid];
        // newGrid1[46] = 'ship'
        // newGrid1[47] = 'ship'
        // setPlayer1Grid(newGrid1)
    }, [])
    
    return (
        <>
            <div className='playGameContainer'>
                <div className='playGameHeader'>
                    <img className="logo" src="../img/blackowl2_crop.jpg" alt="grey owl closeup"/>
                    <h1>Battleship Challenge</h1>
                </div>
                <Grid id='PLAYER1' grid={player1Grid}/>
                {/* <img id="ship1" style={{top: `${Number(start1.substr(1,1))*51.5+282+(start1.substr(0,1)===end1.substr(0,1)?26:0)}px`, left: `${COLUMN_LABELS.indexOf(start1.substr(0,1))*51.5+177-(start1.substr(0,1)===end1.substr(0,1)?26:0)}px`, transform: `rotate(${shipRotation1}deg)`}} className='battleship' src='img/battleships2hole.png' alt='2 hole battleship' />
                <img id="ship2" style={{top: `${Number(start2.substr(1,1))*51.5+282+(start2.substr(0,1)===end2.substr(0,1)?51.5:0)}px`, left: `${COLUMN_LABELS.indexOf(start2.substr(0,1))*51.5+177}px`,  transform: `rotate(${shipRotation2}deg)`}} className='battleship' src='img/battleships3hole.png' alt='3 hole battleship' /> */}
                {gameState&&gameState==='play'&&<Grid id='PLAYER2' grid={player2Grid}/>}
                {gameState&&gameState==='prepare'&&<PlaceShips player1Grid={player1Grid} setPlayer1Grid={setPlayer1Grid} start1={start1} setStart1={setStart1} start2={start2} setStart2={setStart2} end1={end1} setEnd1={setEnd1} end2={end2} setEnd2={setEnd2}/>}
            </div>
            {gameState&&gameState==='play'&&<PlayControls hits={hits} setHits={setHits} player1Grid={player1Grid} setPlayer1Grid={setPlayer1Grid} player2Grid={player2Grid} setPlayer2Grid={setPlayer2Grid}/>}
            <PlayGameCss />
        </>
    )
}

export default PlayGame;
