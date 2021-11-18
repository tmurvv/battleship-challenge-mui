import {useState} from 'react';
import { COLUMN_LABELS, COLUMN_NUMBERS } from '../constants/constants';
import PlayControlsCss from '../styles/PlayControls.css';
import {getGridAlphaNumber, getGridItemNumber} from '../utils/utils';

function PlayControls({hits, setHits, player1Grid, setPlayer1Grid, player2Grid, setPlayer2Grid}) {
    const [target, setTarget] = useState('');
    const [player1Turn, setPlayer1Turn] = useState(true);
    
    const handleInputChange = (e) => setTarget(e.target.value);
    
    function handleFire() {
        let newGrid = [...player2Grid];
        let gameover = false;
        // validations
        if (!target) return;
        if (COLUMN_LABELS.indexOf(target.substr(0,1).toUpperCase())===-1) {
            return alert('Did not find that square. The format is "A1, A2, etc."');
        }
        if (COLUMN_NUMBERS.indexOf(target.substr(1,1))===-1) {
            return alert('Did not find that square number. The format is "A1, A2, etc."');
        }

        // check if square previously targeted
        if (!newGrid[getGridItemNumber(target)]) return alert('Did not find that square');
        if (newGrid[getGridItemNumber(target)]!=='ship'&&newGrid[getGridItemNumber(target)]!=='empty') {
            return alert('Already targeted')
        }
        
        // if a hit, update score and check if game over
        if (newGrid[getGridItemNumber(target)] === 'ship'&&hits[0]+1===5) {
            gameover = true;
            alert("Player 1 wins!! Refresh screen to play again.");
        }
        newGrid[getGridItemNumber(target)] === 'ship'&&setHits([hits[0]+1, hits[1]]);
        
        // change player message
        document.querySelector('#inputLabel').innerText=newGrid[getGridItemNumber(target)] === 'ship'?`Hit !!! Good Shooting !!!`:`Miss`;
        
        // update grid and turn
        newGrid[getGridItemNumber(target)] = newGrid[getGridItemNumber(target)]==='ship'?'hit': 'miss';
        setTarget('');
        setPlayer2Grid(newGrid);
        if (!gameover) setPlayer1Turn(false);
    }
    function player2Fire() {
        const player1Target = Math.floor(Math.random() * 63)+1;
        let newGrid = [...player1Grid];
        let gameover = false;
        
        // alert customer to target
        alert(`Player2 fires on ${getGridAlphaNumber(player1Target)}!`)
        
        // if a hit, update score and check if game over
        if (newGrid[player1Target] === 'ship'&&hits[1]+1===5) {
            gameover=true;
            alert("Player 2 wins!! Refresh screen to play again.");
        }
        newGrid[player1Target] === 'ship'&&setHits([hits[0], hits[1]+1]);
        
        // change player message
        document.querySelector('#inputLabel').innerText='Which square would you like to target?';
        
        // update grid and update turn
        newGrid[player1Target] = newGrid[player1Target]==='ship'?'hit': 'miss';
        setPlayer1Grid(newGrid);
        if (!gameover) setPlayer1Turn(true);
    }
    
    return (
        <>
            <div className="playControlsContainer">
                <div className='inputContainer'>
                    <label htmlFor="target">
                        <h3 id='inputLabel'>Which square would you like to target?</h3>
                    </label>
                    <input 
                        value={target} 
                        id='target' 
                        onChange={(e)=>handleInputChange(e)} 
                        name="target" 
                        autoComplete='off'
                        disabled={!player1Turn}
                    />
                </div>
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <button 
                        id='player1Fire' 
                        className='fire-btn' 
                        onClick={()=>handleFire()} 
                        hidden={!player1Turn}
                    >Fire !!</button>
                    <button 
                        className='fire-btn' 
                        onClick={()=>player2Fire()} 
                        hidden={player1Turn}
                    >Continue</button>
                </div>
            </div>
            <PlayControlsCss />
        </>
    )
}

export default PlayControls;
