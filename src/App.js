import {useState} from 'react';
import './App.css';
import {GameStateContext} from "./contexts/GameStateContext";
import {OccupiedContext} from "./contexts/OccupiedContext";
import {Player1Context} from "./contexts/Player1Context";
import {Player2Context} from "./contexts/Player2Context";
import PlayGame from "./components/PlayGame";

function App() {
    const [gameState, setGameState] = useState("prepare");
    const [occupied, setOccupied] = useState(["empty"]);
    // const [player1Grid, setPlayer1Grid] = useState(gridInit);
    // const [player2Grid, setPlayer2Grid] = useState(gridInit);
    
    return (
        <>  
            <GameStateContext.Provider value={{gameState, setGameState}}>    
                {/* <Player1Context.Provider value={{player1Grid, setPlayer1Grid}}>
                <Player2Context.Provider value={{player2Grid, setPlayer2Grid}}> */}
                <OccupiedContext.Provider value={{occupied, setOccupied}}>
                    {gameState==="welcome"
                        ?<>
                            <div className="splash">
                                <img className="owl" src='./img/BlackOwl_Systems_Logo_Owl.png' alt="Black Owl logo" />
                            </div>
                            <div className='welcome'>
                                <h1>Black Owl</h1>
                                <h1>Battleship Challenge</h1>
                                <button className='btn' onClick={()=>setGameState('prepare')}>Begin</button>
                            </div>
                        </>
                        :<PlayGame />
                    }
                </OccupiedContext.Provider>
                {/* </Player2Context.Provider>
                </Player1Context.Provider> */}
            </GameStateContext.Provider>
        </>
    );
}

export default App;
