import 'react-toastify/dist/ReactToastify.css';

import Quantity from '../../components/Cart/Quantity';
import classes from './Cart.module.scss';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {

    let CartLocalStorage = JSON.parse(localStorage.getItem('Cart')) || [];

    const handleClick = (e) => {
        const id = e.target.id.split(" ");
        
        if (CartLocalStorage.find((element) => element.id === id[0])) {                
            const StoreProducts = CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product);
            
            if(StoreProducts.find(element => element.id === id[1])){
                const ProductInStoreCart = StoreProducts.find(element => element.id === id[1]);
                const ProductInStoreCartIndex = StoreProducts.findIndex(element => element.id === id[1]);
                if (id[2] === "add"){
                    CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity++;
                    toast.success("Producto agregado al carrito");
                }else{
                    CartLocalStorage.find((element) => element.id === id[0]).Products.map(element => element.Product)[ProductInStoreCartIndex] = ProductInStoreCart.quantity--;

                    if(ProductInStoreCart.quantity === 0){
                        CartLocalStorage.find((element) => element.id === id[0]).Products = CartLocalStorage.find((element) => element.id === id[0]).Products.filter(element => element.Product.id !== id[1]);
                        
                        if(CartLocalStorage.find((element) => element.id === id[0]).Products.length === 0) {
                            CartLocalStorage = CartLocalStorage.filter((element) => element.id !== id[0]);                            
                        }                        
                    }                    
                    toast.warn("Producto eliminado del carrito");                    
                }
            }                
            setData(CartLocalStorage);
        }

        localStorage.setItem("Cart", JSON.stringify(CartLocalStorage));
    }
    
    const [data, setData] = useState([]);
    
    if (CartLocalStorage.length !== 0 && data.length === 0) {
        setData(CartLocalStorage);
    }     

    const dataMap = data.map((element) => {
        let total = 0;
        element.Products.forEach((products) => total += products.Product.price * products.Product.quantity)

        return (
            <div key={ element.id } className={ classes["Store"]}>
                <div className={ classes["Store-Name"] }>
                    <h3>
                        {element.Store}
                    </h3>
                </div>
                <div className={ classes["Store-Cart-Details"] }>
                    <div className={ classes["Store-Products"] }>
                        { element.Products.map(
                            product => {
                                return (
                                    <div key={ product.Product.id } className={ classes["Store-Product"] }>
                                        <div className={ classes["Product-Quantity"] }>
                                            <button id={`${element.id} ${product.Product.id} add`} onClick={ handleClick }>+</button>
                                                <Quantity Quantity={product.Product.quantity}/>
                                            <button id={`${element.id} ${product.Product.id} remove`} onClick={ handleClick }>-</button>
                                        </div>
                                        <div className={ classes["Product-Name"] }>
                                            <span>{ product.Product.name }</span>
                                            &nbsp;
                                            <span>{ 
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format((product.Product.price * product.Product.quantity))
                                            }</span>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className={ classes["Store-extras"] }>
                        <span>
                            <h4>Subtotal:</h4>
                            { 
                                Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(total) 
                            }
                        </span>
                    </div>
                </div>
                <hr />
            </div>
        );
    });

    return (
        <div className={ classes["Cart"] }>
            <div className={ classes["Header"] }>
                <div className={ classes["Title"] }>
                    <h2>
                        Carrito
                    </h2>
                </div>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["Cart-Card"] }>
                { dataMap }
            </div>            
        </div>
    );
}

export default Cart;