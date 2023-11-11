import React from 'react';
import NavigationBar from '../../Component/Navbar';
import HistoryList from '../../Component/HistoryList'


const History = () => {
    return (
        <>
            <NavigationBar />
            <div style={{ height: '100vh', backgroundImage: 'url("https://cdn.wallpapersafari.com/33/58/GrcZ13.jpg', padding: '15px' }}>
                <HistoryList />
            </div>

        </>
    )
}

export default History;