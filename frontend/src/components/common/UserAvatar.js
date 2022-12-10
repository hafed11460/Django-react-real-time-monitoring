import { useSelector } from 'react-redux';
import avatar from 'assets/img/team/4.jpg'
const UserAvatar = ({
    src=avatar,
    size=50,
    rounded='circle',
}) => {
    const {user} = useSelector((state)=>state.auth)
    return (
        <div className='text-center'>
            {/* <img width={size} height={size} src={user.image} className="rounded-circle" /> */}
            <img width={size} height={size} src={avatar} className="rounded-circle" />
        </div>
    )
}

export default UserAvatar;