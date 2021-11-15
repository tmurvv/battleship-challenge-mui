// import GridCss from '../styles/Grid.css';
 
function Grid() {
    return (
        <>
            <div className="mainContainer">
                <img className="logo" src="img/BlackOwls_Systems_Logo_Owl.png" alt="Black Owl Systems Logo"/>
            </div>
            {/* <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>{process.env.REACT_APP_DEV_ENV.indexOf('staging')>0&&'STAGING BACKEND'}</div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>{process.env.REACT_APP_DEV_ENV.indexOf('local')>0&&'LOCAL BACKEND'}</div> */}
            {/* <GridCss /> */}
        </>
    )
}

export default Grid;
