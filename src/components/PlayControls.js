import {useState} from 'react';
import PlayControlsCss from '../styles/PlayControls.css';
import {getGridAlphaNumber, getGridItemNumber} from '../utils/utils';

function PlayControls({hits, setHits, player1Grid, setPlayer1Grid, player2Grid, setPlayer2Grid}) {
    const [target, setTarget] = useState();
    const [player1Turn, setPlayer1Turn] = useState(true);
    
    function handleFire() {
        if (!target) return;
        let newGrid = [...player2Grid];

        // check if previously targeted
        if (newGrid[getGridItemNumber(target)]!=='ship'&&newGrid[getGridItemNumber(target)]!=='empty') return alert('Already targeted')
        
        // if a hit, check if game over and update score
        if (newGrid[getGridItemNumber(target)] === 'ship'&&hits[0]+1===5) return alert("Player 1 wins!! Refresh screen to play again.");
        newGrid[getGridItemNumber(target)] === 'ship'&&setHits([hits[0]+1, hits[1]]);
        
        // update grid and turn
        newGrid[getGridItemNumber(target)] = newGrid[getGridItemNumber(target)]==='ship'?'hit': 'miss';
        setTarget('');
        setPlayer2Grid(newGrid);
        setPlayer1Turn(false);
    }
    function player2Fire() {
        const player1Target = Math.floor(Math.random() * 63)+1;
        let newGrid = [...player1Grid];
        
        // alert customer to target
        alert(`Player2 fires on ${getGridAlphaNumber(player1Target)}!`)
        
        // if a hit, check if game over and update score
        if (newGrid[player1Target] === 'ship'&&hits[1]+1===5) return alert("Player 2 wins!! Refresh screen to play again.");
        newGrid[player1Target] === 'ship'&&setHits([hits[0], hits[1]+1]);
        
        // update grid and turn
        newGrid[player1Target] = newGrid[player1Target]==='ship'?'hit': 'miss';
        setPlayer1Grid(newGrid);
        setPlayer1Turn(true);
    }
    
    return (
        <>
            <div className="playControlsContainer">
                <div className='inputContainer'>
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
