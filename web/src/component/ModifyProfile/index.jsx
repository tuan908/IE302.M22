import { NavLink, useLocation } from "react-router-dom";
import "./styles.scss";

const ModifyProfile = (props) => {
    const nav = [
        { name: "Thông tin cá nhân", path: "modifyInfoUser" },
        { name: "Example", path: "" },
    ];

    const component = []

    const location = useLocation()
    return (
        <div className="modifyProfile container">
            ModifyProfile
            <div className="row">
                <div className="modifyProfile_nav col-sm-3">
                    <ul>
                        {nav.map((value) => {
                            return (
                                <NavLink key={value.path} className={"modifyProfile_nav_items"} to={value.path}>
                                    <li>{value.name}</li>
                                </NavLink>
                            );
                        })}
                    </ul>
                </div>
                <div className="modifyProfile_cpn col">
                    {console.log(location)}
                </div>
            </div>
        </div>
    );
};

export default ModifyProfile;
