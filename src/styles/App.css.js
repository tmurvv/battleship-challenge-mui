function AppCss() {
    return (
        <style jsx="true">{`
            body {   
                color: whitesmoke;
                background-color: #1A1F25;
                box-sizing : border-box;
            }
            .btn {
                font-size: 24px;
                padding: 5px 20px;
                border-radius: 7px;
                background-color: #ECB208;
            }
            .splash {
                height: 60vh;
                text-align: center;
                background-image: url('./img/splashscreen.jpg');
                background-position: center;
                background-size: cover;  
            }
            .owl {
                height: 10vh;
                position: absolute;
                top: 45%;
                right: 33%;
            }
            .welcome {
                width: 100%;
                text-align: center;
            }
        `}</style>
    )
}

export default AppCss;
