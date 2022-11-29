import classes from './WishList.module.scss';

import CollectionProduct from './../../../components/Stores/Collections/CollectionProducts/CollectionProduct';

import { useAuth } from './../../../core/AuthRoleUser';
import { useNavigate, useOutletContext} from 'react-router-dom';
import { useEffect } from 'react';

const WishList = () => {
    const user = useAuth().role;
    const handleNoAuthMessage = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(user === "Vendor" || user === "Admin") {
            handleNoAuthMessage();
            navigate('/Profile');
        }
    }, []);
    
    return (
        <div className={ classes["WishList"] } >
            <div className={ classes["WishList-Title"] }>
                <h2>Lista de deseados</h2>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["WishList-Products"] }>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                <CollectionProduct/>
                
            </div>
        </div>
    );
}

export default WishList;