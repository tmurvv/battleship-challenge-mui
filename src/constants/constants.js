export const COLUMN_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const COLUMN_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRID_LABELS = () => {
    const fillGrid = [];
    const gridRows = ["A", "B", "C", "D", "E", "F", "G", "H"]
    gridRows.forEach((element, idx) => {
        for (var c=1; c<9; c++) {
            fillGrid.push(`${element}${c}`)
        }
    });
    return fillGrid;
}
