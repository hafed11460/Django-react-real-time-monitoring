import AppContext from "context/Context";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BsBrightnessHigh, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { iconSize } from "value";

const TopNavbar = () => {
    const {
        config: { isHide, isDark,isSidebar },
        setConfig
    } = useContext(AppContext)
    return (
        <header className='mb-2 border-bottom '>
            <Navbar className="ps-0 " style={{height:'60px'}}>
                <Container fluid className="" >
                    <Nav onClick={()=>setConfig('isSidebar',!isSidebar)}>
                        <Nav.Link className="burger-btn d-block text-white">
                            <i className="bi bi-justify fs-3"></i>
                        </Nav.Link>
                    </Nav>
                    <Navbar.Collapse>
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <div className="d-flex align-items-end">
                                <Nav.Link href="#!"
                                    className="p-0 px-3  nav-link"
                                    onClick={() => setConfig('isDark', !isDark)}
                                >
                                    {
                                        isDark ?
                                            <BsBrightnessHigh  size={iconSize} />
                                            : <BsFillEyeSlashFill  size={iconSize} />
                                    }
                                </Nav.Link>
                                {/* <Nav.Link href="#!"
                                    className="p-0 px-3  nav-link"
                                    onClick={() => setConfig('isHide', !isHide)}
                                >
                                    {
                                        isHide ?
                                            <BsFillEyeFill  size={iconSize} />
                                            : <BsFillEyeSlashFill  size={iconSize} />
                                    }
                                </Nav.Link>

                                <MessageDropdown width={350} />
                                <NotificationDropdown width={350} /> */}
                                {/* <ProfileDropdwon /> */}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default React.memo(TopNavbar);