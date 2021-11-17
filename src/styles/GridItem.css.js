function GridItemCss() {
    return (
        <style jsx="true">{`
            body {
                box-sizing : border-box;
            }
            .gridItem {
                height: 30px;
                width: 34px;
                padding: 10px;
                border: .5px solid #ECB208;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .gridItem img {
                height: 95%;
            }
        `}
    </style>
    )
}

export default GridItemCss;
