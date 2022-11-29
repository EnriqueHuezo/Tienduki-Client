import classes from './StoreSphere.module.scss';

import { Link } from 'react-router-dom';

const StoreSphere = ( {store = []} ) => {    
    return (
        
        <Link to={(store && store.store !== "none") ? `/Stores/Store/${store.id}/${store.store}` : ""} className={ classes["StoreSphere"] }>
        {store.store !== "" && store.store !== "none" ? 
            <img src="https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/271798148_586987425709081_7041513597468881683_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3deWw_0FPU8AX9gfilt&_nc_ht=scontent-mia3-1.xx&oh=00_AfB7g1J_k1UGAXPT8clsjNVrANUoeaaksLAEEjxhqNcaig&oe=63714C1F" alt={store} />
            :
            <div className={ classes["empty"] }></div>
        }        
        </Link>
    );
};

export default StoreSphere;