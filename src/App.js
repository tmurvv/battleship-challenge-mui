import {useState} from 'react';
import './App.css';
import {GameStateContext} from "./contexts/GameStateContext";
import {OccupiedContext} from "./contexts/OccupiedContext";
import Grid from "./components/Grid";

function App() {
    const [gameState, setGameState] = useState("play");
    const [occupied, setOccupied] = useState(["B5"]);
    
    return (
        <>  
            <GameStateContext.Provider value={{gameState, setGameState}}>
                <OccupiedContext.Provider value={{occupied, setOccupied}}>
                    {gameState==="welcome"
                        ?<>
                            <div className="splash">
                                <img className="owl" src='./img/BlackOwl_Systems_Logo_Owl.png' alt="Black Owl logo" />
                            </div>
                            <div className='welcome'>
                                <h1>Black Owl</h1>
                                <h1>Battleship Challenge</h1>
                                <button className='btn'>Enter</button>
                            </div>
                        </>
                        :<Grid />
                    }
                </OccupiedContext.Provider>
            </GameStateContext.Provider>
        </>
    );
}

export default App;
