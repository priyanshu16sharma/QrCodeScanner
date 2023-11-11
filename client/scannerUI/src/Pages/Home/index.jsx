import React from 'react';
import QRScanner from '../../Component/CodeReader';
import ButtonContainer from '../../Component/ScannerButton';
import NavigationBar from '../../Component/Navbar';


const Home = () => {
    return (
        <>
            <NavigationBar />
            <div style={{ height: '100vh', backgroundImage: 'url("https://cdn.wallpapersafari.com/33/58/GrcZ13.jpg")' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: '100%' }}>
                    <ButtonContainer />
                </div>
            </div>
        </>
    )
}

export default Home;