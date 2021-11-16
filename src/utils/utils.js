import {COLUMN_LABELS} from '../constants/constants';

export const createGridLabels = () => {
    const fillGrid = [];
    const gridCols = ["A", "B", "C", "D", "E", "F", "G", "H"]
    // populate fillGrid with labels (A1, A2...H7, H8)
    gridCols.forEach((element, idx) => {
        for (let n=1; n<9; n++) {
            fillGrid.push(`${element}${n}`)
        }
    });
    return fillGrid;
}
export const addRowColLabels = (grid) => {
    const gridCols = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
    const gridRows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    // add row numbers to each row
    gridRows.map((row, idx)=>grid.splice((idx*8)+idx, 0, row))
    // add row of column labels at top
    return gridCols.concat(grid);
}
export const findGoodSquares = (gridLabel, shipSize, occupied) => {
    const letter = gridLabel.substr(0,1);
    const letterIdx = COLUMN_LABELS.indexOf(letter);
    const number = Number(gridLabel.substr(1,1));
    const goodSquares = [];

    // if end square on grid and not occupied, add to 'goodSquares' array
    if (number<10-shipSize&&occupied.indexOf(`${letter}${number+(shipSize-1)}`)<0) goodSquares.push(`${letter}${number+(shipSize-1)}`);
    if (number>-1+shipSize&&occupied.indexOf(`${letter}${number-(shipSize-1)}`)<0) goodSquares.push(`${letter}${number-(shipSize-1)}`);
    if (letterIdx<9-shipSize&&occupied.indexOf(`${COLUMN_LABELS[letterIdx-(shipSize-1)]}${number}`)<0) goodSquares.push(`${COLUMN_LABELS[letterIdx+(shipSize-1)]}${number}`);
    if (letterIdx>-2+shipSize&&occupied.indexOf(`${COLUMN_LABELS[letterIdx-(shipSize-1)]}${number}`)<0) goodSquares.push(`${COLUMN_LABELS[letterIdx-(shipSize-1)]}${number}`);
   
    // if ship is length three, check for middle square occupied
    
    return goodSquares;
}