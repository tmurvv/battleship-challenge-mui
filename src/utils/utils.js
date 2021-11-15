export const createGridLabels = () => {
    const fillGrid = [];
    const gridRows = ["A", "B", "C", "D", "E", "F", "G", "H"]
    gridRows.map((element, idx) => {
        for (var c=1; c<9; c++) {
            fillGrid.push(`${element}${c}`)
        }
    });
    return fillGrid;
}