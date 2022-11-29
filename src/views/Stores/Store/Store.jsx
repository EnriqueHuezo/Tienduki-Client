import classes from './Store.module.scss';

import { useState, useEffect } from 'react';
import { useParams, useOutlet, Outlet, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

import StoreSphere from '../../../components/Stores/StoreSections/StoreSpheres/StoreSphere';
import Collections from '../../../components/Stores/Collections/Collections';
import { toast } from 'react-toastify';
import Spinner from './../../../components/Spinner/Spinner';

import { useAuth } from '../../../core/AuthRoleUser';

const Store = () => {
    const {id, Store} = useParams();
    const outlet = useOutlet();

    const [data, setData] = useState([]);
    const [rating, setRating] = useState([]);
    const [ratingValue, setRatingValue] = useState(0);
    const [isloading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    const fetchData = () => {
        setIsLoading(true);     
        fetch(`http://localhost:4000/api/storeCategory/byId/${id}`)
        .then(
            response => {                
                if (response.ok) {
                    return response.json().then(data => {
                        setData(data);
                        toast.success("Datos cargados satisfactoriamente.", {
                            toastId: "Exito"
                        });
                        setIsLoading(false);                        
                    })
                }
                throw new Error('Something went wrong');
            }
        ).catch((error) => {
            toast.error("No se pudieron cargar los datos de las tienda.", {
                toastId: "Error"
            });
            setIsLoading(false);
        })
    }

    const fetchRatingData = () => {        
        fetch(`http://localhost:4000/api/storeRating/${id}`)
        .then(
            response => response.json().then(data => {
                setRating(data);
                toast.success("Datos cargados satisfactoriamente.", {
                    toastId: "Exito"
                });                
            }).catch(() => {
                toast.error("No se pudieron cargar los datos.", {
                    toastId: "Error"
                });                
            })
        )
    }

    const handleSetRatingValue = () => {
        const ratings = rating.map((rating) => {
            return rating.rating.$numberDecimal;
        });
        let ratingtotal = 0;
        ratings.forEach((rating) => {
            ratingtotal += Number(rating);
        });

        setRatingValue((ratingtotal/ratings.length));
    }

    useEffect(() => {      
        fetchData();        
    }, []);

    useEffect(() =>{
        fetchRatingData();        
    }, []);

    useEffect(() => {        
        handleSetRatingValue();
    }, [rating]); 

    useEffect(() => {
        if (data.length === 0 && !isloading) {
            navigate('/Stores');
            toast.error("No se pudo obtener informacion de esta tienda", {
                toastId: "Error"
            });
            return;
        }
    }, [isloading]);

    const handleClickRating = () => {
        toast.info("Clasificacion de tienda realizada");
    };

    if(!isloading && data.length !== 0){        
        const banner = data[0].stores[0].image_user.findIndex(image => image.id_image_type.category === "Banner");

        const StoreImageMap = data.map(data => {            
            return <StoreSphere key={data.stores[0]._id} extraClass="small" Store={data.stores[0]}/>;
        });                

        return (
            <div className={ classes["Store"] }>
                <div className={ classes["Store-Header"] }>
                    <div className={ classes["Store-Logo"] }>
                        { StoreImageMap }                        
                    </div>
                    <div className={ classes["Store-Banner"] }>
                        {banner === -1 ? "" : <img src={banner !== -1 ? data[0].stores[0].image_user[banner].imageUrl : ""} alt={`${Store} Banner`} />}                        
                        <div>
                            <h3>{ data[0].stores[0].username }</h3>
                            {
                                useAuth().role === "Client" &&
                                <Rating
                                size={25}
                                onClick={handleClickRating}
                                readonly={false}
                                emptyColor="#2B4D71"                            
                            />
                            }                            
                        </div>  
                        <Rating
                            size={25}
                            onClick={handleClickRating}
                            readonly={true}
                            initialValue={!isNaN(ratingValue) ? ratingValue : 0}
                            emptyColor="#2B4D71"
                        />                      
                    </div>
                </div>
                { outlet ? <Outlet/> : 
                    <Collections id={id} Store={Store}/>
                }
            </div>
        );
    }
    return (
        <Spinner isloading={isloading}/>
    )
}

export default Store;