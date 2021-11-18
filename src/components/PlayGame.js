import {useState, useContext} from 'react';
import Grid from './Grid';
import PlaceShips from './PlaceShips';
import PlayControls from './PlayControls';
import {GameStateContext} from "../contexts/GameStateContext";
import PlayGameCss from '../styles/PlayGame.css';
import {gridInit, player2place} from '../utils/utils.js';

function PlayGame() {
    const {gameState} = useContext(GameStateContext);
    const [hits, setHits]=useState([0,0]);
    const [player1Grid, setPlayer1Grid] = useState(gridInit);
    const [player2Grid, setPlayer2Grid] = useState(player2place());
    const [start1, setStart1] = useState("B9");
    const [end1, setEnd1] = useState("");
    const [start2, setStart2] = useState("select");
    const [end2, setEnd2] = useState("");
    
    return (
        <>
            <div className='playGameContainer'>
                <div className='playGameHeader'>
                    <img className="logo" src="../img/blackowl2_crop.jpg" alt="grey owl closeup"/>
                    <h3>Black Owl Systems</h3>
                    <h1>Battleship Challenge</h1>
                    <p style={{fontStyle: 'italic', marginTop: '-20px', marginBottom: '20px'}}>coded by Tisha Murvihill</p>
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-evenly'}}>
                    <Grid id='PLAYER1' grid={player1Grid}/>
                    <Grid id='PLAYER2' grid={player2Grid}/>
                </div>
                {gameState&&gameState==='prepare'&&<PlaceShips
                    player1Grid={player1Grid} 
                    setPlayer1Grid={setPlayer1Grid} 
                    start1={start1} 
                    setStart1={setStart1} 
                    start2={start2} 
                    setStart2={setStart2} 
                    end1={end1} 
                    setEnd1={setEnd1} 
                    end2={end2} 
                    setEnd2={setEnd2}
                />}
            </div>
            {gameState&&gameState==='play'&&<PlayControls 
                hits={hits} 
                setHits={setHits} 
                player1Grid={player1Grid} 
                setPlayer1Grid={setPlayer1Grid} 
                player2Grid={player2Grid} 
                setPlayer2Grid={setPlayer2Grid}
            />}
            <PlayGameCss />
        </>
    )
}

export default PlayGame;
