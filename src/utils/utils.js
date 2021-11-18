import {
    COLUMN_LABELS,
    COLUMN_NUMBERS,
    LOW_GRID_NUMBER,
    HIGH_GRID_NUMBER
} from '../constants/constants';

export const gridInit = ()=>{
    const fillGrid = []
    for (let n=0; n<=64; n++) {
        fillGrid.push(`empty`);
    }
    return fillGrid;
}
export const createGridAlphaNum = () => {
    const fillGrid = [];
    const gridCols = ["A", "B", "C", "D", "E", "F", "G", "H"]
    // populate fillGrid with AlphaNum labels (A1, A2...H7, H8)
    for (let n=1; n<9; n++) {
        gridCols.forEach((element, idx) => {
            fillGrid.push(`${element}${n}`)
        });
    }
    return fillGrid;
}
export const removeOccupied = (grid) => {
    const gridItemList = createGridAlphaNum();
    return gridItemList.filter(gridItem=>gridItem!=='delete')
}
export const addRowColLabels = (grid) => {
    const gridCols = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const gridRows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    
    // add row numbers to each row
    gridRows.map((row, idx)=>grid.splice((idx*8)+idx, 0, row))
    
    // add row of column labels at top
    return gridCols.concat(grid);
}
export const findGoodSquares = (gridNumber, shipSize, grid) => {
    const goodSquares = [];
    if (shipSize===2) {
        gridNumber+1<=HIGH_GRID_NUMBER&&(gridNumber+1)%8!==0&&goodSquares.push(getGridAlphaNumber(gridNumber+1));
        gridNumber-1>=LOW_GRID_NUMBER&&(gridNumber-1)%8!==7&&goodSquares.push(getGridAlphaNumber(gridNumber-1));
        gridNumber+8<=HIGH_GRID_NUMBER&&goodSquares.push(getGridAlphaNumber(gridNumber+8));
        gridNumber-8>=LOW_GRID_NUMBER&&goodSquares.push(getGridAlphaNumber(gridNumber-8));
    }
    if (shipSize===3) {
        gridNumber+2<=HIGH_GRID_NUMBER&&(gridNumber+2)%8>1&&grid[gridNumber+2]!=='ship'&&goodSquares.push([getGridAlphaNumber(gridNumber+2)]);
        gridNumber-2>=LOW_GRID_NUMBER&&(gridNumber-2)%8<6&&grid[gridNumber-2]!=='ship'&&goodSquares.push([getGridAlphaNumber(gridNumber-2)]);
        gridNumber+16<=HIGH_GRID_NUMBER&&grid[gridNumber+16]!=='ship'&&goodSquares.push([getGridAlphaNumber(gridNumber+16)]);
        gridNumber-16>=LOW_GRID_NUMBER&&grid[gridNumber-16]!=='ship'&&goodSquares.push([getGridAlphaNumber(gridNumber-16)]);
    }
    
    return goodSquares;
}
export const getGridItemNumber = (label) => {
    if (!label) return 'Error, label not defined';
    const letter = label.substr(0,1).toUpperCase();
    const labelNumber = Number(label.substr(1,1));
    const letterIdx = COLUMN_LABELS.indexOf(letter);
    if (COLUMN_LABELS.indexOf(letter)===-1) return "Error. Letter must be between A and H."; // TODO A and H should be a constant
    if (COLUMN_NUMBERS.indexOf(labelNumber.toString())===-1||label.length>2) return "Error. Number must be between 1 and 8."; // TODO 1 and 8 should be a constant
    return (labelNumber-1)*8+(letterIdx);
}
export const getGridAlphaNumber = (gridNumber) => {
    if (gridNumber!==0&&!gridNumber) return 'Error, grid number not defined.';
    if (gridNumber<0||gridNumber>63) return 'Error, grid number out of range.';
    if (gridNumber===0) return 'A1';
    const letter = COLUMN_LABELS[gridNumber%8];
    // const alphaLabelNumber = gridNumber%8===1?Math.floaor(gridNumber/8)+1:Math.floor(gridNumber/8);
    const alphaLabelNumber = gridNumber%8===0?Math.ceil(gridNumber/8)+1:Math.ceil(gridNumber/8);
    return `${letter}${alphaLabelNumber}`;
}
export const markOccupied=(startSquare, endSquare, shipSize, player1Grid) => {
    if (endSquare==='') return player1Grid;
    let newGrid = [...player1Grid];
    const shipStart = getGridItemNumber(startSquare);
    const shipEnd = getGridItemNumber(endSquare);
    const shipDirection = startSquare.substr(0,1)===endSquare.substr(0,1)?'vertical':'horizontal';

    // mark start and end squares
    newGrid[getGridItemNumber(startSquare)] = 'ship';
    newGrid[getGridItemNumber(endSquare)] = 'ship';
    
    // if 3-hole ship, mark middle square
    if (shipSize===3) {    
        if (shipStart<shipEnd) newGrid[shipStart+(shipDirection==='vertical'?8:1)] = 'ship';
        if (shipStart>shipEnd) newGrid[shipEnd+(shipDirection==='vertical'?8:1)] = 'ship';
    }

    return newGrid;
}
export const player2place = () => {
    let cleanGrid = gridInit();

    // get random ship coordinates
    const shipstart1 = Math.floor(Math.random()*63)+1;
    const shipstart2 = Math.floor(Math.random()*63)+1;
    const shipend1 = shipstart1+(shipstart1%8<7&&shipstart1%8>0?1:-1);
    const shipend2 = shipstart2+(shipstart2%8<7&&shipstart2%8>0?2:-2);
    
    // mark squares occupied
    cleanGrid[shipstart1] = 'ship';
    cleanGrid[shipend1] = 'ship';
    cleanGrid[shipstart2] = 'ship';
    cleanGrid[shipend2] = 'ship';
    
    // if 3-holed ship, mark middle square occupied
    cleanGrid[shipstart2+(shipstart2<shipend2?1:-1)] = 'ship';

    return cleanGrid;
}
// gets list of occupied spaces in a grid
export function getOccupied(grid) {
    if (!grid) return [];
    const occupied = [];
    grid.forEach((square, idx) => square==='ship'&&occupied.push(idx))
    return occupied;
}