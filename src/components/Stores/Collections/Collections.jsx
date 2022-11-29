import classes from './Collections.module.scss';

import CollectionProduct from './CollectionProducts/CollectionProduct';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';

const Collections = ({id="", Store=""}) => {
    const [collections, setCollections] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    const getCollections = () =>{
        setIsLoading(true)
        fetch(`http://localhost:4000/api/productCollection/${id}`).then(
            response => response.json().then(data => {
                setCollections(data);
                setIsLoading(false);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });
            })
        )
    }

    useEffect(() => {
        getCollections();
    }, []);    

    if(!isloading) {        
        const collectionsMap = collections.map((collection) => {
            return (
                <div key={collection._id} className={ classes["Collections"] }>
                    <div className={ classes["Collection-title"]}>
                        <h4>
                            { collection.collectionName }
                        </h4>
                        <hr />
                    </div>
                    <div className={ classes["Collection-products"] }>
                        { 
                            collection.product_collections.map(products => {                                
                                return (
                                    <CollectionProduct key={products._id} id={products._id} Store={Store} Name={products.name} Image={products.image_product[0]?.imageUrl} Price={products.price.$numberDecimal}/>
                                )
                            }) 
                        }                        
                    </div>
                </div>
            )
        });
    
        return (
            <>
                {
                    collections.length !== 0 ? collectionsMap :
                    <p>No hay productos para mostrar</p>
                }
            </>
        );
    }

    return (
        <Spinner isloading={isloading}/>
    )
}

export default Collections;