import classes from './Activity.module.scss';

import CollectionProduct from '../../../components/Stores/Collections/CollectionProducts/CollectionProduct';
import Card from '../../../components/Card/RecentStoreCard/RecentStoreCard';

import { useAuth } from './../../../core/AuthRoleUser';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const Activity = () => {
    const user = useAuth().role;
    const handleNoAuthMessage = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(user === "Vendor" || user === "Admin") {
            handleNoAuthMessage();
            navigate('/');
        }
    }, []);
    
    return (
        <div className={ classes["Activity"] }>
            <div className={classes["Recent-Products"] }>
                <div className={ classes["Recent-Title"] }>
                    <h2>Productos recientes</h2>
                    <div className={ classes["Line"] }></div>
                </div>
                
                <div className={ classes["Recent-Products-Container"] }>
                    <div className={ classes["Recent-Products-Cards"] }>
                        <CollectionProduct/>
                        <CollectionProduct/>
                        <CollectionProduct/>
                        <CollectionProduct/>
                        <CollectionProduct/>
                    </div>                    
                </div>
            </div>
            <div className={classes["Recent-Stores"] }>
                <div className={ classes["Recent-Title"] }>
                    <h2>Tiendas Recientes</h2>
                    <div className={ classes["Line"] }></div>
                </div>                    
                <div className={ classes["Recent-Stores-Container"] }>
                    <div className={ classes["Recent-Stores-Cards"] }>
                        <Card extraclasses={["recent-stores"]} type="StoreSphere" activity={true}/>
                    </div>                    
                </div>
            </div>
        </div>        
    );
}

export default Activity;