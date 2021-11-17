function GridCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .playGameHeader {
                background-color: #1A1F25;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: 30vh;
                text-align: center;
            }
            .playGameHeader img {
                width: 15vw;
                height: 15vw;
                margin: auto;
            }
            .playGameContainer {
                width: 480px;
                margin: 40px auto 0;
                border: .5 solid #ECB208;
                display: flex;
                flex-wrap: wrap;
            }
            // .battleship {
            //     position: absolute;
            // }
        `}
    </style>
    )
}

export default GridCss;
