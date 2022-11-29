import classes from './Product.module.scss';

import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { MdShoppingCart } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useAuth } from '../../../core/AuthRoleUser';
import Spinner from '../../Spinner/Spinner';

const Product = () => {
    const [mainImage, setMainImage] = useState("");
    const [product, setProduct] = useState({})
    const [isloading, setIsLoading] = useState(true);
    const {id, Store, idProduct} = useParams();
    const navigate = useNavigate();

    const GetProduct = () => {
        setIsLoading(true)
        fetch(`http://localhost:4000/api/storeProduct/id/${idProduct}`).then(
            response => response.json().then(data => {
                setProduct(data);
                setIsLoading(false);
            })
        )
    }

    useEffect(() => {
        if ( useAuth().role === 'Admin'){
            navigate('/');
            return;
        }
        GetProduct();
    }, [])

    if(!isloading){
        if (!mainImage && product.image_product.length !== 0) {
            setMainImage(product.image_product[0]?.imageUrl);
        }
    
        const handleClickImages = (e) => {
            if(mainImage === e.target.src){
                return;
            }
            setMainImage(e.target.src);
            return;
        }
    
        const getCartFromLocalStorage = () => {
            const Cart = JSON.parse(localStorage.getItem("Cart")) || [];
            return Cart;
        }
    
        const handleClickCart = () => {
            const Cart = getCartFromLocalStorage();
            
            const StoreInCart = Cart.find((element) => element.id === id) || [];      
    
            let Product = {
                id: product._id,
                name: product.name,
                price: product.price.$numberDecimal,
                quantity: 1
            }
    
            const StoreCart = {
                Store: Store,
                id: id,            
                Products: StoreInCart.length === 0 ? [{Product}] : [...StoreInCart.Products, {Product}],            
            }
            if (Cart.find((element) => element.id === id)) {
                const StoreProducts = Cart.find((element) => element.id === id).Products.map(element => element.Product);
                
                if(StoreProducts.find(element => element.id === Product.id)){
                    const ProductInStoreCart = StoreProducts.find(element => element.id === Product.id);
                    const ProductInStoreCartIndex = StoreProducts.findIndex(element => element.id === Product.id);
                    
                    Cart.find((element) => element.id === id).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity++;                
                }else {
                    Cart.find((element) => element.id === id).Products = StoreCart["Products"];
                }
            }else {
                Cart.push(StoreCart);
            }        
    
            toast.success("Producto agregado al carrito", {
            });
            
            localStorage.setItem("Cart", JSON.stringify(Cart));
        }
    
        const imagesMap = product.image_product.map((image) => {
            return (
                <div key={image._id}>
                    <img src={image.imageUrl} onClick={handleClickImages} alt="Product Image" />
                </div>
            );
        });   
    
        return (
            <div className={ classes["Product"] }>
                <div className={ classes["Product-images"] }>
                    <div className={ classes["Product-Main-image"] }>
                        <img src={mainImage} alt="Product Image" />
                    </div>
                    <div className={ classes["Product-Extra-images"] }>
                        { imagesMap }
                    </div>
                </div>
                <div className={ classes["Product-Details"] }>
                    <div className={ classes["Product-header"] }>
                        <div className={ classes["Product-header-info"] }>
                            <h4>{ product.name }</h4>
                            <h4>#{ idProduct }</h4>
                        </div>
                        <div className={ classes["Line"] }></div>
                        <div className={ classes["Product-price"] }>
                        { product.price.$numberDecimal && Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price.$numberDecimal)
                        }
                        </div>
                    </div>
                    <div className={ classes["Product-body"] }>
                        <p>{ product.description }</p>
                    </div>
                    {
                        useAuth().role === "Client" && 
                        <div className={ classes["Product-actions"] }>
                            <button className={ `${classes["btn"]} ${classes["btn-primary"]}` }>Ordenar Producto</button>
                            <button className={ `${classes["btn"]} ${classes["btn-secondary"]} ${classes["btn-medium-font"]}` } onClick={handleClickCart}><MdShoppingCart/></button>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }

    return (
        <Spinner isloading={isloading}/>
    ) 
    
}

export default Product;