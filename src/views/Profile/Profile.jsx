import classes from './Profile.module.scss';

import { useState, useRef } from 'react';
import { Outlet, useOutlet, Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../core/AuthRoleUser';

import { AiFillTwitterSquare, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { IoArrowUndo } from 'react-icons/io5';
import { HiCog } from 'react-icons/hi';

import ProfileActions from '../../components/Profile/ProfileActions/ProfileActions';

const Profile = () => {
    const [open, setOpen] = useState(false);
    const outlet = useOutlet();
    const Backgroundwrapper = useRef(null);    

    const handleClick = (e) => {        
        if (open === false) {
            setOpen(true);
            return;
        }

        if (Backgroundwrapper.current && Backgroundwrapper.current.contains(e.target)) {
            setOpen(false);
            return;
        }
        setOpen(false);        
    }    

    return (
        <div className={ classes["Profile"] }>
            <div className={ open ?  `${ classes["Backgroundwrapper"] } ${ classes["Backgroundwrapper-black"] }` : classes["Backgroundwrapper"] } ref={Backgroundwrapper} onClick={handleClick}></div>
            <div className={ classes["Profile-container"] }>
                <div className={ open ? `${ classes["Profile-SideMenu"] } ${ classes["active"] }` : classes["Profile-SideMenu"]}>
                    <div className={ classes["Main-ProfileActions"] }>
                            <ProfileActions Icon={"RiPencilFill"} Name={"Perfil"} url="/Profile"/>
                            {                                
                                useAuth().role === "Client" && 
                                <>
                                    <ProfileActions Icon={"RiHistoryFill"} Name={"Actividad"} url="/Profile/Activity"/>
                                    <ProfileActions Icon={"RiStarSFill"} Name={"Lista de deseos"} url="/Profile/WishList"/>
                                </>
                            }
                            {useAuth().role !== "Admin" && <ProfileActions Icon={"TbFileInvoice"} Name={"Órdenes"} url="/Profile/Orders"/>}
                            
                    </div>
                    <Link to="./Configuration" className={ classes["configurationLink"] }><HiCog/>Configuración</Link>                    
                </div>
                <div className={ classes["Profile-MainContent"] }>
                    { outlet ? 
                        <Outlet context={useOutletContext()}/> : 
                        <>
                            <div className={ classes["Profile-header"] }>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" alt="" />
                                <div className={ classes["Profile-info"] }>
                                    <h2>@testUser</h2>
                                    <span>correoelectronico_de_relleno@gmail.com</span>
                                </div>
                            </div>
                            <div className={ classes["Profile-body"] }>
                                <div className={ classes["Personal-info"] }>
                                    <h3>Informacion Personal</h3>
                                    <hr className={ classes["Line"] } />
                                </div>
                                <div className={ classes["Data-section"] }>
                                    <h4>
                                        Nombre
                                    </h4>
                                    <span>
                                        TestName TestLastName
                                    </span>
                                </div>
                                <div className={ classes["Data-section"] }>
                                    <h4>
                                        Fecha de nacimiento
                                    </h4>
                                    <span>
                                        1 de enero de 1999
                                    </span>
                                </div>
                                <div className={ classes["Data-section"] }>
                                    <h4>
                                        Sexo
                                    </h4>
                                    <span>
                                        TestGender
                                    </span>
                                </div>
                            </div>
                            <div className={ classes["Profile-footer"] }>
                                <div className={ classes["Social-media"] }>
                                    <h3>Redes sociales</h3>
                                    <hr className={ classes["Line"] } />
                                </div>
                                <div className={ classes["Social-media-container"] }>
                                    <a href="/" className={ classes["Social-media-button"] }><AiFillInstagram/>Instagram</a>
                                    <a href="/" className={ classes["Social-media-button"] }><AiFillFacebook/>Facebook</a>
                                    <a href="/" className={ classes["Social-media-button"] }><AiFillTwitterSquare/>Twitter</a>
                                </div>
                            </div>
                        </>
                    }
                    <div className={ classes["OpenMenu"]} onClick={handleClick}>
                        <IoArrowUndo/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;