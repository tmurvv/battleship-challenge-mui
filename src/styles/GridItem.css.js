function GridItemCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .gridItem {
                height: 30px;
                width: 30px;
                padding: 10px;
                border: .5px solid #ECB208;
            }
            .gridItem img {
                height: 90%;
            }
            .mainContainer {
                background-color: #000000;
                height: 200px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 0 20px;
                position: relative;
            }
            @media only screen and (max-width: 750px) {
                .mainContainer {
                  height: 120px;
                  padding: 0 75px;
                }
            }
            .logo {
                height: 70%;
            }
            @media only screen and (max-width: 550px) {
                .textLogo {
                    height: 45%;
                    flex-direction: column-reverse;
                    align-items: center;
                }
            }
            .productGraphic {
                height: 100%;
            }
            @media only screen and (max-width: 550px) {
                .productGraphic {
                    height: 40%;
                }
            }
        `}
    </style>
    )
}

export default GridItemCss;
