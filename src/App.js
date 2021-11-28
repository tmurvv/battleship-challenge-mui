import {useState} from 'react';
import {GameStateContext} from "./contexts/GameStateContext";
import PlayGame from "./components/PlayGame";
import AppCss from './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, purple } from '@mui/material/colors';

// Or Create your Own theme:
const blackOwlTheme = createTheme({
    palette: {
        primary: amber,
        // primary: {
        //     main: '#ECB208',
        //     // main: '#dfe567',
        //     secondary: '#beadec',
        //     // secondary: '#D09D12',
        //     // contrastText: "#aaaaaa"
        //     contrastText: "#1A1F25"
        // },
        secondary: purple,
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
  });
function App() {
    const [gameState, setGameState] = useState("play");
    
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
                    :
                    <ThemeProvider theme={blackOwlTheme}>
                        <PlayGame />
                    </ThemeProvider>
                    
                }
            </GameStateContext.Provider>
            <AppCss />
        </>
    );
}

export default App;
