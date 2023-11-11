import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListBox = (props) => {
    const time = new Date(props.userData.scanTime);
    const formattedDate = time.toLocaleDateString();
    const formattedTime = time.toLocaleTimeString();
    console.log(formattedDate);
    const handleDelete = (e) => {
        const id = e.target.id;
        console.log(id);
        const obj = JSON.parse(localStorage.getItem('userData'));
        console.log(obj.data.tableName);
        const userData = {
            tableName: obj.data.tableName,
        }
        axios.delete(`http://localhost:8080/qrcodes/${id}`, {
            params: userData
        })  // Assuming your backend is running on the same host
            .then(response => {
                // console.log("response here");
                // console.log(response);
                console.log(response.data);
                window.location.reload();

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    return (<>
        <ListGroup.Item as="li" >

            <Row >
                <Col xs lg={6} >
                    {props.userData.content}
                </Col>
                <Col xs lg={2} >{formattedDate}</Col>
                <Col xs lg={2} >{formattedTime}</Col>
                <Col xs lg={2}> <button style={{ borderRadius: "25px", padding: "5px", backgroundColor: "lightcyan", textAlign: "center" }} id={props.userData.id} onClick={(e) => { handleDelete(e) }}>Delete</button></Col>
            </Row>

        </ListGroup.Item>
    </>)
}


const HistoryList = () => {
    const [userHistory, setUserHistory] = useState([]);
    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('userData'));
        if (obj != null) {
            console.log(obj.data.tableName);
            const userData = {
                tableName: obj.data.tableName,
            }
            axios.get('http://localhost:8080/qrcodes', {
                params: userData
            })  // Assuming your backend is running on the same host
                .then(response => {
                    // console.log("response here");
                    // console.log(response);
                    console.log(response.data);
                    setUserHistory(response.data);

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

    }, [])



    return (
        <>
            {localStorage.getItem('userData') != null ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '75%' }}>
                    < ListGroup as="ul" >
                        <ListGroup.Item as="li" active>

                            <Row >
                                <Col xs lg={6} >
                                    Content
                                </Col>
                                <Col xs lg={2} >
                                    Date</Col>
                                <Col xs lg={2} >
                                    Time</Col>
                                <Col xs lg={2}></Col>
                            </Row>

                        </ListGroup.Item>
                        {
                            userHistory.map((data, index) => {
                                return (<ListBox userData={data} key={index} />)
                            })
                        }
                    </ListGroup >
                </div >
            </div >
                :
                <div style={{ color: "red" }}>
                    LogIn to see history
                </div>
            }

        </>
    )
}

export default HistoryList;