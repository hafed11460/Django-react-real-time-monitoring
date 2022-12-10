// import user from 'assets/img/user.png'
import user from 'assets/images/faces/1.jpg'
const Avatar = ({
    src=user,
    size=35,
    rounded='circle',
}) => {
    return (
        <span>
            <img width={size} height={size} src={src} className="rounded-circle " />
        </span>
    )
}

export default Avatar;