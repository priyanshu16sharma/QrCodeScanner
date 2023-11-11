import React, { useEffect } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import '../CodeReader/style.css'
import { json } from 'react-router-dom';



const QRScanner = (props) => {
    const [data, setData] = useState('No result');


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {data}
        </Tooltip>
    );

    useEffect(() => {
        const item = localStorage.getItem('userData');
        if (item != null) {
            const obj = JSON.parse(item);
            console.log(obj.data.tableName);
            const userData = {
                tableName: obj.data.tableName,
                content: data,
                thumbnail: "empty"
            }
            console.log("MKC");
            if (data != 'No result') {
                axios.post('http://localhost:8080/qrcodes', userData)  // Assuming your backend is running on the same host
                    .then(response => {
                        // console.log("response here");
                        // console.log(response);
                        console.log(response.data);

                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }


    }, [props.save]);

    return (
        <>
            <div style={{ height: '250px', width: '250px', margin: '0px' }}>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }

                        if (!!error) {
                            console.info(error);
                        }
                    }}
                    style={{ width: '100%', margin: '0px', padding: '0px' }}
                />
            </div>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
            >
                {/* <Button variant="success">Hover me to see</Button> */}
                {
                    data == 'No result' ? <div style={{ textAlign: 'center', margin: '10px' }} id='resultText'><button>Scan QR for Result</button></div>
                        :
                        <div style={{ textAlign: 'center', margin: '10px', color: 'pink' }} id='resultText'><button style={{ backgroundColor: 'green' }}><a href={data} style={{ textDecoration: 'none', color: "white" }}>Redirect</a></button></div>
                }
            </OverlayTrigger>



        </>
    )
}

export default QRScanner;
