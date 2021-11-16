import GridItemCss from '../styles/GridItem.css';

function GridItem({gridLabel}) {
    return (
        <>
            <div className="gridItem">
                {gridLabel.length===1
                    ?gridLabel
                    :<img key={gridLabel} className="gridImage" src="/img/BlackOwl_Systems_Logo_Owl.png" alt="Black Owl Systems Logo"/>
                }
            </div>
            <GridItemCss />
        </>
    )
}

export default GridItem;
