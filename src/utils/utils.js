import {COLUMN_LABELS} from '../constants/constants';

export const createGridLabels = () => {
    const fillGrid = []
    for (let n=1; n<=65; n++) {
        fillGrid.push('empty');
    }
    return fillGrid;
}
export const createGridAlphaNum = () => {
    const fillGrid = [];
    const gridCols = ["A", "B", "C", "D", "E", "F", "G", "H"]
    // populate fillGrid with labels (A1, A2...H7, H8)
    for (let n=1; n<9; n++) {
        gridCols.forEach((element, idx) => {
            fillGrid.push(`${element}${n}`)
        });
    }
    return fillGrid;
}
export const addRowColLabels = (grid) => {
    const gridCols = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const gridRows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    // add row numbers to each row
    gridRows.map((row, idx)=>grid.splice((idx*8)+idx, 0, row))
    // console.log('after add row grid:', grid)
    // add row of column labels at top
    // console.log('after add letters', gridCols.concat(grid))
    return gridCols.concat(grid);
}
export const findGoodSquares = (gridLabel, shipSize, occupied) => {
    const letter = gridLabel.substr(0,1);
    const letterIdx = COLUMN_LABELS.indexOf(letter);
    const number = Number(gridLabel.substr(1,1));
    const goodSquares = [];
    
    // if end square on grid and not occupied, add to 'goodSquares' array
    if (number<10-shipSize&&(occupied.indexOf(`${letter}${number+(shipSize-1)}`)<0)) goodSquares.push(`${letter}${number+(shipSize-1)}`);
    if (number>-1+shipSize&&(occupied.indexOf(`${letter}${number-(shipSize-1)}`)<0)) goodSquares.push(`${letter}${number-(shipSize-1)}`);
    if (letterIdx<(9-shipSize)&&(occupied.indexOf(`${COLUMN_LABELS[letterIdx+(shipSize-1)]}${number}`)<0)) goodSquares.push(`${COLUMN_LABELS[letterIdx+(shipSize-1)]}${number}`);
    if (letterIdx>(-1+shipSize)&&(occupied.indexOf(`${COLUMN_LABELS[letterIdx-(shipSize-1)]}${number}`)<0)) goodSquares.push(`${COLUMN_LABELS[letterIdx-(shipSize-1)]}${number}`);
   
    return goodSquares;
}
export const getGridItemNumber = (label) => {
    const letter = label.substr(0,1).toUpperCase();
    const labelNumber = Number(label.substr(1,1));
    const letterIdx = COLUMN_LABELS.indexOf(letter);
    return (labelNumber-1)*8+(letterIdx+1);
}
export const getGridAlphaNumber = (gridNumber) => {
    console.log('gridNumber:', gridNumber)
    const letter = COLUMN_LABELS[gridNumber%8===0?7:(gridNumber % 8)-1];
    console.log('letter:', letter)
    const alphaLabelNumber = gridNumber%8===0?Math.floor(gridNumber/8):Math.floor(gridNumber/8)+1;
    console.log('alphaLabelNumber:', alphaLabelNumber)
    return `${letter}${alphaLabelNumber}`;
}
