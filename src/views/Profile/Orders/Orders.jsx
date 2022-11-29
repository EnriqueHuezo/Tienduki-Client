import classes from './Orders.module.scss';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useAuth } from './../../../core/AuthRoleUser';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import { MdOutlineCancel, MdOutlinedFlag } from 'react-icons/md';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const user = useAuth().role;
    const handleNoAuthMessage = useOutletContext();

    const GetOrders = () => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(
            response => response.json().then(data => {
                setOrders(data);
            })
        )
    }    
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, orders]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;
        setItemOffset(newOffset);
    };

    const handleFinishClick = orderid => (e)=> {
        console.log(orderid);
    }

    useEffect(() => {
        if(user === "Admin") {
            handleNoAuthMessage();
            navigate('/Profile');
        }else {
            GetOrders();
        }
    }, [])
    
    return (
        <div className={ classes["Orders"] }>
            <div className={ classes["Orders-Title"] }>
                <h2>Órdenes</h2>
                <div className={ classes["Line"] }></div>
            </div>
            <div className={ classes["Orders-container"] }>
                <div className={ classes["Table-container"] }>
                    <table className={ classes["Table"] }>
                    {user === "Client" ? 
                        <>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Tienda</th>
                                    <th>Productos</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(post => {
                                    return (
                                        <tr key={post.id}>
                                            <td data-label="Fecha">{post.userId}</td>
                                            <td data-label="Tienda"><Link><img src="https://scontent.fsal2-1.fna.fbcdn.net/v/t39.30808-6/271798148_586987425709081_7041513597468881683_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xcI_4yznK0AAX_2vL0E&_nc_ht=scontent.fsal2-1.fna&oh=00_AfBZzF1XAAM77DMktug_GZ6lSZjwiawRmRlJaMdbzgxJWA&oe=637D299F" alt="" /></Link></td>
                                            <td data-label="Productos"><div><p>{post.title}</p><p>{post.title}</p><p>{post.title}</p></div></td>
                                            <td data-label="Subtotal">
                                                {
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(post.id)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </>
                        :
                        <>
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Comprador</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(post => {
                                    return (
                                        <tr key={post.id}>
                                            <td data-label="Productos"><div><p>{post.title}</p><p>{post.title}</p><p>{post.title}</p></div></td>
                                            <td data-label="Comprador">Carlos Alfredo</td>
                                            <td data-label="Estado">Finalizado</td>
                                            <td data-label="Total">
                                                {
                                                Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                }).format(post.id)}
                                            </td>
                                            <td data-label="Acciones" className={ classes["actions-buttons"] }>
                                                <div>
                                                    <button className={ `${classes["btn"]} ${classes["btn-success"]}` } onClick={handleFinishClick(post.id)}><MdOutlinedFlag/></button>                                                    
                                                    <button className={ `${classes["btn"]} ${classes["btn-error"]}` }><MdOutlineCancel/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </>
                    }
                        
                    </table>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<IoIosArrowForward/>}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={<IoIosArrowBack/>}
                    renderOnZeroPageCount={null}
                    containerClassName={classes["pagination"]}
                    previousClassName={classes["action-button-container"]}    
                    nextClassName={classes["action-button-container"]}
                    pageLinkClassName={classes["page-num"]}
                    previousLinkClassName={classes["action-button-pagination"]}
                    nextLinkClassName={classes["action-button-pagination"]}
                    activeClassName={classes["active-page"]}
                    breakLinkClassName={classes["page-num"]}
                />
            </div>
        </div>
    );

}

export default Orders;