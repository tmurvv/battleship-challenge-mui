import {useContext, useState} from 'react';
import logo from './logo.svg';
import splash from './img/splashscreen.jpg';
import './App.css';
import {GameStateContext} from "./contexts/GameStateContext";
import Grid from "./components/Grid";

function App() {
    const [gameState, setGameState] = useState("play");
    
    return (
        <>  
            <GameStateContext.Provider value={{gameState, setGameState}}>
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
            </GameStateContext.Provider>
        </>
    );
}

export default App;
