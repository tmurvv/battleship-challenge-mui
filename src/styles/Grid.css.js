function GridCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .gridHeader {
                background-color: #1A1F25;
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 100%;
                height: 30vh;
                text-align: center;
            }
            .gridHeader img {
                width: 15vw;
                height: 15vw;
                margin: auto;
            }
            .gridContainer {
                width: 480px;
                margin: 40px auto;
                border: .5 solid #ECB208;
                display: flex;
                flex-wrap: wrap;
            }
        `}
    </style>
    )
}

export default GridCss;
