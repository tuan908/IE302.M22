import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar, Button } from "@mui/material";

interface UserInfoProps {
    avatarUrl?: string;
    username?: string;
    email?: string;
}

function PinterestProfile() {
    const location = useLocation();
    console.log(location.state);
    const { avatarUrl, email, username } = location.state as UserInfoProps;

    return (
        <>
            <div className=" container-fluid d-flex justify-content-center flex-column align-items-center">
                <Avatar  src={avatarUrl || ""}  sx={{width: '120px', height:'120px', marginBottom: "1em"}}/>
                <h2 className="mb-1" >
                    <strong>{username}</strong>
                </h2>
                <p>{email || "admin@email"}</p>
                <div>
                    <Button
                        sx={{ borderRadius: "30px" }}
                        variant="contained"
                        color="secondary"
                        className='mb-5'
                    >
                        <Link style={{listStyleType: 'none', color: 'inherit', textDecoration: 'none'}}  to={"/modify-profile"}>
                            <span>Chỉnh sửa hồ sơ</span>
                        </Link>
                    </Button>
                </div>
                <div>
                    <h5>
                        <span>Đã lưu</span>
                    </h5>
                </div>
            </div>
        </>
    );
}

export default PinterestProfile;
