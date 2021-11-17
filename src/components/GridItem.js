import GridItemCss from '../styles/GridItem.css';

function GridItem({gridLabel, gridItemState}) {
    if (gridLabel.indexOf('PLAYER1')!==-1) {
        return (
            <>
                <div id={gridLabel} className="gridItem">
                        {/* here */}
                    {gridLabel.substr(0,2)}
                    {gridItemState&&gridItemState==='heading'&&gridLabel}
                    {gridItemState&&gridItemState==='ship'&&"S"}
                    {gridItemState&&gridItemState==='empty'&&<img key={gridLabel} className="gridImage" src="/img/blackowl2_crop.jpg" alt="Grey Owl head shot"/>}
                    {gridItemState&&gridItemState==='hit'&&<img key={gridLabel} className="gridImage" src="/img/explosion_crop.jpg" alt="Grey Owl head shot"/>} 
                </div>
                <GridItemCss />
            </>
        )
    } else {
        return (
            <>
                <div id={gridLabel} className="gridItem">
                    {/* {gridLabel} */}
                    {gridLabel.substr(0,2)}
                    {gridItemState&&gridItemState==='heading'&&gridLabel}
                    {gridItemState&&gridItemState==='ship'&&"S"}
                    {gridItemState&&(gridItemState==='empty')&&<img key={gridLabel} className="gridImage" src="/img/blackowl2_crop.jpg" alt="Grey Owl head shot"/>}
                    {/* {gridItemState&&(gridItemState==='empty'||gridItemState==='ship')&&<img key={gridLabel} className="gridImage" src="/img/blackowl2_crop.jpg" alt="Grey Owl head shot"/>} */}
                    {gridItemState&&gridItemState==='hit'&&<img key={gridLabel} className="gridImage" src="/img/explosion_crop.jpg" alt="Explosion"/>} 
                </div>
                <GridItemCss />
            </>
        )
    }
    
}

export default GridItem;
