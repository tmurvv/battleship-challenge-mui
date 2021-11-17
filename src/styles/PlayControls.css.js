function PlayControlsCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .playControlsContainer {
                width: 480px;
                margin: 0px auto 40px;
                border: .5 solid #ECB208;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .fire-btn {
                background: #ECB208;
                font-size: 26px;
                padding: 10px 30px;
                border-radius: 7px;
                letter-spacing: 2px;
                margin: auto;
                margin-bottom: 40px;
            }
            .inputContainer {
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                margin: 25px;
            }
            .inputContainer input {
                border-radius: 7px;
                font-size: 16px;
                padding: 10px 15px;
                width: 50px;
                margin-top: 15px;
                text-align: center;
                text-transform: capitalize;
                margin-top: -10px;
                margin-bottom: 25px;
            }
            .battleship {
                position: absolute;
            }
        `}
    </style>
    )
}

export default PlayControlsCss;
