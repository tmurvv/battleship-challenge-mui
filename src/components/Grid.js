import GridCss from '../styles/Grid.css';
import GridItem from './GridItem';
import {COLUMN_LABELS} from '../constants/constants';
import {COLUMN_NUMBERS} from '../constants/constants';
 
function Grid({grid, id}) {
    return (
        <> 
            <div className='gridHeader'>
                {id&&id}
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className='gridContainer' style={{flexDirection: 'column', width: '52px', transform: 'translateY(52px)'}}> 
                    {COLUMN_NUMBERS&&COLUMN_NUMBERS.map(label=><GridItem key={label} gridLabel={label} gridItemState={`heading`}/>)}
                </div>
                <div>
                    <div className='gridContainer'> 
                        {COLUMN_LABELS&&COLUMN_LABELS.map(label=><GridItem key={label} gridLabel={label} gridItemState={`heading`}/>)}
                    </div>
                    <div className='gridContainer'> 
                        {grid&&grid.map((label,idx)=><GridItem key={`${Number(idx+1)}-${id}`} gridLabel={`${Number(idx+1)}-${id}`} gridItemState={`${grid[idx+1]}`}/>)}
                    </div>
                </div>
            </div>
            <GridCss />
        </>
    )
}

export default Grid;
