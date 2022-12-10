import { Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "features/auth/authSlice";
import UserAvatar from "components/common/UserAvatar";
import { useLogoutUserMutation } from "features/auth/authApi";
const ProfileDropdwon = () => {
    const { user } = useSelector((state) => state.auth)

    const [LogoutUser, { isSuccess }] = useLogoutUserMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async () => {
        LogoutUser()
        dispatch(logout())
        navigate('/login/')
    }
    return (
        <Dropdown navbar={true} as="li">
            <Dropdown.Toggle
                bsPrefix="toggle"
                as={Link}
                to="#!"
                className="p-0 ps-3 nav-link"
            >
                <div className="user-menu d-flex">

                    <div className="user-name text-start ms-3">
                        <h6 className="mb-0 text-gray-600">{user.firstname}</h6>
                        <p className="mb-0 text-sm text-gray-600">Admin</p>
                    </div>
                    <div className="user-img d-flex align-items-center ms-3">
                        <div className="avatar avatar-md">
                            <UserAvatar src={user.image} size={50} />
                        </div>
                    </div>

                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="dropdown-menu-end mt-2 rounded-0 rounded-bottom border border-dark "
            // className=" dropdown-menu-card  dropdown-menu-end mt-2 border"
            >
                <div className=" rounded-2 py-2 dark__bg-1000">
                    {/* <Dropdown.Item className="fw-bold text-warning" href="#!">
                        <span>Go Pro</span>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#!">Set status</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/user/profile">
                        Profile &amp; account
                    </Dropdown.Item>
                    <Dropdown.Item href="#!">Feedback</Dropdown.Item>
                    <Dropdown.Divider /> */}
                    <Dropdown.Item as={Link} to="/user/settings">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={onLogout} as={Link} to="#!">
                        Logout
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileDropdwon;