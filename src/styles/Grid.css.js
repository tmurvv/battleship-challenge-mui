function GridCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .gridHeader {
                display: flex;
                justify-content: center;
                width: 100%;
                margin: 40px;
            }
            .gridContainer {
                width: 450px;
                margin: 0;
                border: .5 solid #ECB208;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
        `}
    </style>
    )
}

export default GridCss;
