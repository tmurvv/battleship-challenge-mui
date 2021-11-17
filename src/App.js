import {useState} from 'react';
import {GameStateContext} from "./contexts/GameStateContext";
import PlayGame from "./components/PlayGame";
import AppCss from './styles/App.css';

function App() {
    const [gameState, setGameState] = useState("prepare");
    
    return (
        <>  
            <GameStateContext.Provider value={{gameState, setGameState}}>    
                {gameState==="welcome"
                    ?<>
                        <div className="splash">
                            <img className="owl" src='./img/blackowl2.jpg' alt="grey owl" />
                        </div>
                        <div className='welcome'>
                            <h1>Black Owl</h1>
                            <h1>Battleship Challenge</h1>
                            <button className='btn' onClick={()=>setGameState('prepare')}>Begin</button>
                        </div>
                    </>
                    :<PlayGame />
                }
            </GameStateContext.Provider>
            <AppCss />
        </>
    );
}

export default App;
