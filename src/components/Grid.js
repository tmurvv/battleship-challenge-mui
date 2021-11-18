import GridCss from '../styles/Grid.css';
import GridItem from './GridItem';
import {COLUMN_LABELS} from '../constants/constants';
import {COLUMN_NUMBERS} from '../constants/constants';
 
function Grid({grid, id}) {
    return (
        <> 
            <div style={{display: 'block', margin: '15px'}}>
                <div className='gridHeader'>
                    {id&&id}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', borderTop: '1px solid #ECB208', borderLeft: '1px solid #ECB208'}}>
                    <div className='gridContainer' style={{flexDirection: 'column', width: '54px', transform: 'translateY(52px)'}}> 
                        {COLUMN_NUMBERS&&COLUMN_NUMBERS.map(label=><GridItem key={label} gridLabel={label} gridItemState={`heading`}/>)}
                    </div>
                    <div>
                        <div className='gridContainer'> 
                            {COLUMN_LABELS&&COLUMN_LABELS.map(label=><GridItem key={label} gridLabel={label} gridItemState={`heading`}/>)}
                        </div>
                        <div className='gridContainer'> 
                            {grid&&grid.map((label,idx)=><GridItem key={`${Number(idx)}-${id}`} gridLabel={`${Number(idx)}-${id}`} gridItemState={`${grid[idx]}`}/>)}
                        </div>
                    </div>
                </div>
            </div>
            <GridCss />
        </>
    )
}

export default Grid;
