import classes from './CollectionProduct.module.scss';

import { Link } from 'react-router-dom';
import { RiStarSFill } from 'react-icons/ri';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CollectionProduct = ( {id, Name = "", Price = "", Image = "", Store = ""} ) => {

    const [favorite, setFavorite] = useState(false);

    const handleClick = () => {
        if(favorite){
            setFavorite(false);
            toast.warn("Eliminado de favoritos.");
            return;
        }
        setFavorite(true);
        toast.success("Añadido a favoritos.");
    }

    return (
        <div className={ classes["CollectionProduct-container"] }>
            <div className={ classes["Add-to-favorite"] } onClick={handleClick}><RiStarSFill className={favorite ? classes["favorite"]  : ""}/></div>
            <Link to={Name ? `./Product/${id}/${Name}` : ``} className={ classes["CollectionProduct"] }>
                
                <div className={ classes["Product-image"] }>
                    {Image !== "" ? <img src={Image} alt={`${Name}`} /> : <div className={ classes["Empty"] }></div> }
                    <div className={ classes["Store-Name"] }>
                        <h5>
                            {Store ? Store : ""}
                        </h5>
                    </div>
                </div>
                <div className={ classes["Product-details"] }>
                    <h5 className={ classes["Product-name"] }>
                        {Name ? Name : ""}
                    </h5>
                    <div className={ classes["Product-price"]}>                    
                        <p>
                        { Price ? Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(Price)
                            : 
                            ""
                        }  
                        </p>              
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CollectionProduct;