import {
    COLUMN_LABELS,
    COLUMN_NUMBERS,
    LOW_GRID_NUMBER,
    HIGH_GRID_NUMBER
} from '../constants/constants';

/**
 * Returns Array with each element having the text 'empty'
 * @function gridInit
 * @returns {Array}
 */
export const gridInit = ()=>{
    const fillGrid = []
    for (let n=LOW_GRID_NUMBER; n<=HIGH_GRID_NUMBER+1; n++) { // extra element added as hack because owl image not showing in last square of grid
        fillGrid.push(`empty`);
    }
    return fillGrid;
}
/**
 * Returns Array of labels format "A1,A2...H7,H8"
 * @function createGridAlphaNum
 * @returns {Array}
 */
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
/**
 * Used for second ship placement select box
 * Returns Array of labels format "A1,A2...H7,H8"
 * with occupied squares removed
 * @function removeOccupied
 * @param {Array}
 * @returns {Array}
 */
export const removeOccupied = (grid) => {
    const gridItemList = createGridAlphaNum();
    grid.forEach((item,idx)=>{
        if (item==='ship') gridItemList[idx] = 'delete'
    })
    return gridItemList.filter(gridItem=>gridItem!=='delete')
}
/**
 * Adds row of headings to top (A,B,C...) and left-side (1,2,3...) of grid
 * @function addRowColLabels
 * @param {Array}
 * @returns {Array}
 */
export const addRowColLabels = (grid) => {
    const gridCols = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const gridRows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    
    // add row numbers to each row
    gridRows.map((row, idx)=>grid.splice((idx*8)+idx, 0, row))
    
    // add row of column labels at top
    return gridCols.concat(grid);
}
/**
 * Used for ship end select box
 * Returns Array of available squares 
 * next to the selected ship start square
 * @function findGoodSquares
 * @param {Array}
 * @returns {Array}
 */
export const findGoodSquares = (gridNumber, shipSize, grid) => {
    const goodSquares = [];
    // push square if new occupied square between low or high grid number and does not carry to next row
    if (shipSize===2) {
        gridNumber+1<=HIGH_GRID_NUMBER&&(gridNumber+1)%8!==0&&goodSquares.push(getGridAlphaNumber(gridNumber+1));
        gridNumber-1>=LOW_GRID_NUMBER&&(gridNumber-1)%8!==7&&goodSquares.push(getGridAlphaNumber(gridNumber-1));
        gridNumber+8<=HIGH_GRID_NUMBER&&goodSquares.push(getGridAlphaNumber(gridNumber+8));
        gridNumber-8>=LOW_GRID_NUMBER&&goodSquares.push(getGridAlphaNumber(gridNumber-8));
    }
    if (shipSize===3) {
        gridNumber+2<=HIGH_GRID_NUMBER&&(gridNumber+2)%8>1&&grid[gridNumber+2]!=='ship'&&goodSquares.push(getGridAlphaNumber(gridNumber+2));
        gridNumber-2>=LOW_GRID_NUMBER&&(gridNumber-2)%8<6&&grid[gridNumber-2]!=='ship'&&goodSquares.push(getGridAlphaNumber(gridNumber-2));
        gridNumber+16<=HIGH_GRID_NUMBER&&grid[gridNumber+16]!=='ship'&&goodSquares.push(getGridAlphaNumber(gridNumber+16));
        gridNumber-16>=LOW_GRID_NUMBER&&grid[gridNumber-16]!=='ship'&&goodSquares.push(getGridAlphaNumber(gridNumber-16));
    }
    
    return goodSquares;
}
/**
 * Returns the grid number (0-64) of the
 * square matching the alphnum input param format (A1, A2)
 * @function getGridItemNumber
 * @param {String}
 * @returns {Number}
 */
export const getGridItemNumber = (label) => {
    // shortcut
    if (!label) return 'Error, label not defined';

    const letter = label.substr(0,1).toUpperCase();
    const labelNumber = Number(label.substr(1,1));
    const letterIdx = COLUMN_LABELS.indexOf(letter);

    if (COLUMN_LABELS.indexOf(letter)===-1) return `Error. Letter must be between ${COLUMN_LABELS[0]} and ${COLUMN_LABELS[COLUMN_LABELS.length-1]}.`;
    if (COLUMN_NUMBERS.indexOf(labelNumber.toString())===-1||label.length>2) return `Error. Number must be between ${COLUMN_NUMBERS[0]} and ${COLUMN_NUMBERS[COLUMN_LABELS.length-1]}.`;
    
    return (labelNumber-1)*8+(letterIdx);
}
/**
 * Returns the grid label (A1, A3) of the
 * square matching the grid number input param
 * @function getGridAlphaNumber
 * @param Number
 * @returns String
 */
export const getGridAlphaNumber = (gridNumber) => {
    if (gridNumber!==0&&!gridNumber) return 'Error, grid number not defined.';
    if (gridNumber<0||gridNumber>63) return 'Error, grid number out of range.';
    if (gridNumber===0) return 'A1';
    const letter = COLUMN_LABELS[gridNumber%8];
    // const alphaLabelNumber = gridNumber%8===1?Math.floaor(gridNumber/8)+1:Math.floor(gridNumber/8);
    const alphaLabelNumber = gridNumber%8===0?Math.ceil(gridNumber/8)+1:Math.ceil(gridNumber/8);
    return `${letter}${alphaLabelNumber}`;
}
/**
 * Marks the grid with the chosen ship coordinates
 * @function markOccupied
 * @param {String, String, Number, Array}
 * @returns {Array}
 */
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
/**
 * Randomly places ships for player 2 (computer player)
 * @function player2place
 * @returns {Array}
 */
// Todo needs refactoring
export const player2place = () => {
    function getShipStart2(start1, end1) {
        // runs recursively until it can return an unoccupied square
        const shipstart2 = Math.floor(Math.random()*63);
        if (shipstart2===start1 || shipstart2 === end1) getShipStart2(start1,end1);
        return shipstart2
    }
    let cleanGrid = gridInit();

    // ship 1 get random ship coordinates
    const shipstart1 = Math.floor(Math.random()*63);
    const goodSquares1 = findGoodSquares(shipstart1, 2, cleanGrid);
    const shipend1 = getGridItemNumber(goodSquares1[Math.floor(Math.random() * goodSquares1.length)]);
    
    // Mark squares occupied
    cleanGrid[shipstart1] = 'ship';
    cleanGrid[shipend1] = 'ship';
    
    // ship 2 get random ship coordinates
    const shipstart2 = getShipStart2(shipstart1, shipend1);
    const goodSquares2 = findGoodSquares(shipstart2, 3, cleanGrid)
    const shipend2 = getGridItemNumber(goodSquares2[Math.floor(Math.random() * goodSquares2.length)]);
    
    // mark squares occupied
    cleanGrid[shipstart2] = 'ship';
    cleanGrid[shipend2] = 'ship';
    
    // if 3-hole ship, mark middle square
    const shipDirection = getGridAlphaNumber(shipstart2).substr(0,1)===getGridAlphaNumber(shipend2).substr(0,1)?'vertical':'horizontal';
    if (shipstart2<shipend2) cleanGrid[shipstart2+(shipDirection==='vertical'?8:1)] = 'ship';
    if (shipstart2>shipend2) cleanGrid[shipend2+(shipDirection==='vertical'?8:1)] = 'ship';
    
    return cleanGrid;
}
