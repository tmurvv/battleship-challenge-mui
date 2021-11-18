import GridItemCss from '../styles/GridItem.css';

function GridItem({gridLabel, gridItemState}) {
    if (gridLabel.indexOf('PLAYER1')!==-1) {
        return (
            <>
                <div 
                    id={gridLabel} 
                    className="gridItem" 
                    style={{display: gridLabel.indexOf('64')>-1?'none':''}}
                >
                    {gridItemState&&gridItemState==='heading'&&gridLabel}
                    {gridItemState&&gridItemState==='ship'&&"S"}
                    {gridItemState&&gridItemState.indexOf('empty')>-1&&
                        <img 
                            key={gridLabel} 
                            className="gridImage" 
                            src="/img/blackowl2_crop.jpg" 
                            alt="Grey Owl head shot"
                        />
                    }
                    {gridItemState&&gridItemState==='hit'&&
                        <img 
                            key={gridLabel} 
                            className="gridImage" 
                            src="/img/explosion_crop.jpg" 
                            alt="Grey Owl head shot"
                        />
                    } 
                </div>
                <GridItemCss />
            </>
        )
    } else {
        return (
            <>
                <div id={gridLabel} className="gridItem" style={{display: gridLabel.indexOf('64')>-1?'none':''}}>
                    {gridItemState&&gridItemState==='heading'&&gridLabel}
                    {gridItemState&&(gridItemState==='empty'||gridItemState==='ship')&&
                        <img 
                            key={gridLabel} 
                            className="gridImage" 
                            src="/img/blackowl2_crop.jpg" 
                            alt="Grey Owl head shot"
                        />
                    }
                    {gridItemState&&gridItemState==='hit'&&
                        <img 
                            key={gridLabel} 
                            className="gridImage" 
                            src="/img/explosion_crop.jpg" 
                            alt="Explosion"
                        />
                    } 
                </div>
                <GridItemCss />
            </>
        )
    }
}

export default GridItem;
