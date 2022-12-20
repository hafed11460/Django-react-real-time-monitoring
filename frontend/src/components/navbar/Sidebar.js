import { useContext, useState } from "react"
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import AppContext from "context/Context"
import routes from 'routes/routes'


export const MenuItem = () => {
    return (
        <></>
    )
}
export const SidebarItem = ({ route, label, icon, items }) => {
    const [active, setActive] = useState(false)
    const handleItemClick = () => {
        setActive(!active)
    }
    return (
        <Nav.Item className={`sidebar-item active ${route.labelDisable ? '' : 'has-sub'}`} >
            {
                route.labelDisable ?
                    <Link to={route.to} className='sidebar-link'>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </Link> :
                    <a href="#" className='sidebar-link' onClick={handleItemClick}>
                        <i className={icon}></i>
                        <span>{label}</span>
                    </a>
            }

            <Nav className={`submenu ${active ? 'active' : ''}`}>
                {
                    items && items.map((item) => (
                        <Nav.Item className="submenu-item " key={item.name}>
                            <Link to={item.to}>
                                <i className={item.icon}></i>
                                <span> {item.name} </span>
                            </Link>
                        </Nav.Item>
                    ))
                }
            </Nav>
        </Nav.Item>

    )
}



const Sidebar = ({ label }) => {
    const {
        config: { isSidebar },
        setConfig
    } = useContext(AppContext)
    const [show, setShow] = useState(true)
    return (
        <div id="sidebar" className={`${isSidebar ? 'active' : ''}`}>
            <div className="sidebar-wrapper active">
                <div className="sidebar-header position-relative">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                        <Link to={`/`} className="   ">
                           PLC
                        </Link>
                        </div>

                        <div className="sidebar-toggler  x" onClick={() => setConfig('isSidebar', !isSidebar)}>
                            <a href="#" className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <Nav className="sidebar-title">Menu</Nav>
                        {
                            routes.map((route) => (
                                <SidebarItem route={route}
                                    key={route.label}
                                    icon={route.icon}
                                    label={route.label}
                                    items={route.children}
                                >
                                </SidebarItem>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;