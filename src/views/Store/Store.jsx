import classes from './Store.module.scss';

import { useState, useEffect } from 'react';
import { useOutlet, Outlet, Link, useOutletContext, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../../core/AuthRoleUser';

import StoreSphere from './../../components/Stores/StoreSections/StoreSpheres/StoreSphere';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { IoPencil, IoTrash } from 'react-icons/io5';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-toastify';

const StoreV = () => {    
    const outlet = useOutlet();
    const [store, setStore] = useState("Lua");
    const user = useAuth().role;
    const navigate = useNavigate();

    const handleNoAuthMessage = useOutletContext();

    const GetStores = () => {
        fetch("https://jsonplaceholder.typicode.com/posts").then(
            response => response.json().then(data => {
                setOrders(data);
            })
        );
    }    
    
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if(user !== "Vendor") {
            handleNoAuthMessage();     
            navigate('/');
            return;
        }else {
            GetStores();
        }
    }, []);
    
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        const endOffset = Number(itemOffset) + Number(itemsPerPage);
        setCurrentItems(orders.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(orders.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, orders]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % orders.length;        
        setItemOffset(newOffset);
    };

    const handleSelectChange = (e) => {
        toast.info("Productos cargados nuevamente.");
        setItemsPerPage(e.target.value);
    }

    const data = {
        "_id": "637d214243311e1bfa18b7b8",
        "username": "Turtwig",
        "name": "Paola",
        "lastname": "Marroquin",
        "datebirth": "2003-03-06T06:00:00.000Z",
        "gender": "Postulado",
        "email": "pao69@gmail.com",
        "socials": [
            "637d21ed43311e1bfa18b7c0"
        ],
        "image_user": [
            {
                "_id": "637d21b243311e1bfa18b7bc",
                "imageUrl": "https://picsum.photos/1200/900",
                "id_image_type": {
                    "_id": "637c756b51caf2f6a574fb77",
                    "category": "Profile",
                    "visible": false,
                    "createdAt": "2022-11-22T07:08:27.581Z",
                    "updatedAt": "2022-11-22T07:08:27.581Z",
                    "__v": 0
                },
                "id_user": "637d214243311e1bfa18b7b8",
                "visible": false,
                "createdAt": "2022-11-22T19:23:30.364Z",
                "updatedAt": "2022-11-22T19:23:30.364Z",
                "__v": 0
            }
        ],
        "store_rating": [],
        "id_rol": "637d209f43311e1bfa18b7b2",
        "visible": false,
        "createdAt": "2022-11-22T19:21:38.221Z",
        "updatedAt": "2022-11-22T19:24:30.005Z",
        "__v": 2
    }

    return (
        <div className={ classes["Store"] }>
            <div className={ classes["Store-Header"] }>
                <div className={ classes["Store-Logo"] }>
                    <StoreSphere extraClass="small" Store={data} user={user}/>
                </div>
                <div className={ classes["Store-Banner"] }>
                    <img src="https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/273045688_600086077732549_5563611425861614705_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=5iCCczuM2n0AX8rXwin&_nc_ht=scontent-mia3-1.xx&oh=00_AfAb9cR7p_drIwPQWhRMnunsjsMTqnzCHQYhXPJVEKtFfw&oe=637689BE" alt={`${store} Banner`} />
                    <h3>{ store }</h3>
                </div>
            </div>
            <div className={ classes["Store-Products-container"] }>
                <div className={ classes["Product-options-main-header"] }>
                    <h4>Lista de productos</h4>
                    <div className={ classes["Product-options-main-actions"] }>
                        <select defaultValue={5} onChange={handleSelectChange}>
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <button className={ `${classes["btn"]} ${classes["btn-primary"]}` }>Agregar</button>
                    </div>
                </div>
                <div className={ classes["Table-container"] }>
                    <table className={ classes["Table"] }>
                        <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(post => {
                                return (
                                    <tr key={post.id}>
                                        <td data-label="Codigo">{post.id}</td>
                                        <td data-label="Producto"><div><p>{post.title}</p></div></td>
                                        <td data-label="Precio">
                                            <div>
                                                <p>{
                                                    Intl.NumberFormat("en-US", {
                                                        style: "currency",
                                                        currency: "USD",
                                                    }).format(post.id)}
                                                </p>
                                            </div>
                                        </td>
                                        <td data-label="Imagen"><img src="https://scontent.fsal2-1.fna.fbcdn.net/v/t39.30808-6/271798148_586987425709081_7041513597468881683_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xcI_4yznK0AAX_2vL0E&_nc_ht=scontent.fsal2-1.fna&oh=00_AfBZzF1XAAM77DMktug_GZ6lSZjwiawRmRlJaMdbzgxJWA&oe=637D299F" alt="" /></td>
                                        
                                        <td data-label="Acciones" className={ classes["actions-buttons"] }>
                                            <div>
                                                <button className={ `${classes["btn"]} ${classes["btn-success"]}` }><AiFillEye/></button>
                                                <Link to={`./Product/${post.id}`} className={ `${classes["btn"]} ${classes["btn-primary"]}` }><IoPencil/></Link>
                                                <button className={ `${classes["btn"]} ${classes["btn-primary"]}` }><IoTrash/></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
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

export default StoreV;