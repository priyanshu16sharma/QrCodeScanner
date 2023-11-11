import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
    const [logged, setLogged] = useState("");
    const signUp = () => {
        setLogged(1);
        localStorage.removeItem('userData');
        window.location.reload();
        console.log(localStorage.getItem('userData'));
    }

    console.log("HiPri", localStorage.getItem('userData') == null);
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">QR Scanner</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/history">History</Nav.Link>

                    </Nav>
                    <Nav>
                        {localStorage.getItem('userData') == null ?
                            <>
                                <Nav.Link href="/logIn">LogIn</Nav.Link>
                                <Nav.Link eventKey={2} href="/signUp">
                                    SignUp
                                </Nav.Link>
                            </> :
                            <div>
                                <Nav.Link eventKey={2} href="#" onClick={() => { signUp(); }}>
                                    SignOut
                                </Nav.Link>
                            </div>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;