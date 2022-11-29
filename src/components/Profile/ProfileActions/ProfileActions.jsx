import classes from './ProfileActions.module.scss';
import { RiPencilFill, RiHistoryFill, RiStarSFill } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { IoIosArrowForward } from 'react-icons/io';

import { useLocation, Link } from 'react-router-dom';

const ProfileActions = ({Name = "", Icon = "", url = ""}) => {
    const location = useLocation();

    const icons = [
        {
            IconName: "RiPencilFill",
            Icon: RiPencilFill
        },
        {
            IconName: "RiHistoryFill",
            Icon: RiHistoryFill
        },
        {
            IconName: "RiStarSFill",
            Icon: RiStarSFill
        },
        {
            IconName: "TbFileInvoice",
            Icon: TbFileInvoice
        }
        
    ];

    const iconToUse = icons.filter(icon => icon.IconName === Icon);    
    Icon = iconToUse[0].Icon;

    const iconToUseElements = iconToUse.length !== 0 ? [
        <div key={`${iconToUse[0].IconName} ${Name} icon`} className={classes["Icon-IconMessage"]}>
            <Icon key={ `${iconToUse[0].IconName} icon` } className={ classes["Icon"] } />
            <p key={ Name } className={ classes["IconMessage"] }> {Name}</p>
        </div>,        
        <IoIosArrowForward key={`arrow ${Name}`}/>
    ] : "";

    return (
        <Link to={url === "/Profile" ? "/Profile" : `${url}`} className={ location.pathname === url ? `${classes["ProfileActions"]} ${classes["active"]}` : classes["ProfileActions"] }>
            { iconToUseElements }
        </Link>
    )
}

export default ProfileActions;