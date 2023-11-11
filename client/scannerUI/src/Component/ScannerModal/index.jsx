import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import QRScanner from '../CodeReader';

const ScannerModal = (props) => {
    const [save, setSave] = useState(0);
    const handleSave = () => {
        const item = localStorage.getItem('userData');
        if (item != null)
            setSave(1);
        else {
            alert("Login first to save");
            return -1;
        }
    }
    return (
        <>
            <Modal show={props.modalShow} onHide={props.handler}>
                <Modal.Header closeButton>
                    <Modal.Title>Scanner</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '0px' }}>
                    <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <QRScanner save={save} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handler}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { const res = handleSave(); if (res != -1) props.handler(); }}>
                        Save Result
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ScannerModal;