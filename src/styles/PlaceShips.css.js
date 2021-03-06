function PlaceShipsCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .placeShipsContainer {
                width: 420px;
                margin: 40px auto;
                border: .5 solid #ECB208;
                display: flex;
                justify-content: space-evenly;
            }
            .ship {
                border: 1px solid #ECB208;
                padding: 0 15px 15px;
                text-align: center;
            }
            .beginGame {
                font-size: 26px;
                padding: 10px 20px;
                background-color: #D09D12;
            }
        `}
    </style>
    )
}

export default PlaceShipsCss;
