import {useState, useEffect, useContext} from 'react';
import PlayControlsCss from '../styles/PlayControls.css';
import {getGridAlphaNumber, getGridItemNumber} from '../utils/utils';
// import {Player2Context} from '../contexts/Player2Context';


function PlayControls({gridLabel, hits, setHits, player1Grid, setPlayer1Grid, player2Grid, setPlayer2Grid}) {
    // const {player2Grid, setPlayer2Grid} = useContext(Player2Context);
    const [target, setTarget] = useState();
    const [player1Turn, setPlayer1Turn] = useState(true);
    
    function player2Fire() {
        const player1Target = Math.floor(Math.random() * 63)+1;
        console.log(getGridAlphaNumber(player1Target))
        alert(`Player2 fires on ${getGridAlphaNumber(player1Target)}!`)
        let newGrid = [...player1Grid];
        if (newGrid[player1Target] === 'ship'&&hits[1]+1===5) return alert("Player 2 wins!! Refresh screen to play again.");
        newGrid[player1Target] === 'ship'&&setHits([hits[0], hits[1]+1]);
        newGrid[player1Target] = newGrid[player1Target]==='ship'?'hit': 'miss';
        setPlayer1Grid(newGrid);
        setPlayer1Turn(true);
    }
    function handleFire() {
        console.log('hits:', hits)
        if (!target) return;
        let newGrid = [...player2Grid];
        if (newGrid[getGridItemNumber(target)] === 'ship'&&hits[0]+1===5) return alert("Player 1 wins!! Refresh screen to play again.");
        newGrid[getGridItemNumber(target)] === 'ship'&&setHits([hits[0]+1, hits[1]]);
        if (newGrid[getGridItemNumber(target)]!=='ship'&&newGrid[getGridItemNumber(target)]!=='empty') return alert('Already targeted')
        newGrid[getGridItemNumber(target)] = newGrid[getGridItemNumber(target)]==='ship'?'hit': 'miss';
        setTarget('');
        setPlayer2Grid(newGrid);
        setPlayer1Turn(false);
    }
    
    return (
        <>
            <div className="playControlsContainer">
                <div className='inputUnit'>
                    <label htmlFor="target"><h3>Which square would you like to target?</h3></label>
                    <input value={target} id='target' onChange={(e)=>setTarget(e.target.value)} name="target" disabled={!player1Turn}/>
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <button className='fire-btn' onClick={()=>handleFire()} hidden={!player1Turn}>Fire !!</button>
                    <button className='fire-btn' onClick={()=>player2Fire()} hidden={player1Turn}>Continue</button>
                </div>
            </div>
            <PlayControlsCss />
        </>
    )
}

export default PlayControls;
