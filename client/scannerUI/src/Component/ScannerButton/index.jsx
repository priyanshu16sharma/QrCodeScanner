import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ScannerModal from '../ScannerModal';

const ButtonContainer = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); window.location.reload(); }
    const handleShow = () => setShow(true);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', height: '20rem', width: '20rem', backgroundColor: 'white', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <div style={{ height: '15rem' }}>
                    <img src="https://thumbs.dreamstime.com/b/qr-code-scanner-icon-sign-simple-design-vector-181165255.jpg" alt="" height={'100%'} />
                </div>
                <div>
                    {/* Trigger Button */}
                    <Button variant="success" onClick={handleShow}>
                        Scan QR Code
                    </Button>
                </div>
            </div>

            <ScannerModal modalShow={show} handler={handleClose} />
        </>
    )
}

export default ButtonContainer