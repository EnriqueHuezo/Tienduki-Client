import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import classes from './RegisterForm.module.scss';
import image from '../../assets/stock_image.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdNextPlan } from 'react-icons/md';

const RegisterForm = (props) => {
    const history = useNavigate();
    const { values, handleInputChange, handleChange, nextStep } = props;
    /* const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const errors = {
        "user": !user,
        "name": !name,
        "lastname": !lastName,
        "email": !email
    }

    const hasErrors = () => Object.values(errors).some(error => error);
    console.log(hasErrors());*/

    return (
        <main>
            {/* <ToastContainer/> */}
            <div className={classes["Form"]}>
                <div className={classes["inputs"]}>
                    <form className={classes["form-fields"]} onSubmit={handleChange}>
                        <h2 className={classes["title"]}>Cliente - Crear cuenta</h2>

                        <label className={classes["label"]}>Usuario</label>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder="Ingrese su usuario" className={classes["input"]}
                        onChange={handleInputChange}
                        //onInput={({ target }) => { setUser(target.value) }}
                        defaultValue={values.username}
                        />

                        <label className={classes["label"]}>Nombre</label>
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="Ingrese su nombre" 
                        className={classes["input"]}
                        onChange={handleInputChange}
                        //onInput={({ target }) => { setName(target.value) }}
                        defaultValue={values.name}
                        />

                        <label className={classes["label"]}>Apellido</label>
                        <input 
                        type="text" 
                        name="lastname" 
                        placeholder="Ingrese su apellido" 
                        className={classes["input"]}
                        onChange={handleInputChange}
                        //onInput={({ target }) => { setLastName(target.value) }}
                        defaultValue={values.lastname}
                        />

                        <label className={classes["label"]}>Correo electrónico</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="alguien@ejemplo.com" 
                        className={classes["input"]}
                        onChange={handleInputChange}
                        //onInput={({ target }) => { setEmail(target.value) }}
                        defaultValue={values.email}
                        />
                    
                        <input 
                        type="submit" 
                        value="CONTINUAR" 
                        className={classes["submit-button"]} 
                        onClick={nextStep}
                        /* onClick={() => {
                            if(hasErrors()){
                                toast.error("¡Complete los campos!");
                            } else {
                                console.log("hola");
                                nex
                            }
                        }} */ />

                        <hr className={classes["line"]}/>

                        <div className={classes["new-user-div"]}>
                            <span className={classes["Span"]}>¿Ya tienes una cuenta?</span>
                            <a className={ classes["linked-text"] } onClick = {() => {
                                history("/Login");
                            }}>
                                Inicia sesión
                            </a>
                        </div>
                    </form>
                </div>

                <div className={classes["logo"]}>
                    <div className={classes["contenedor"]}>
                        <img src={image} alt="logo" className={classes["image"]}/>
                    </div>
                </div>
            </div>
        </main>
    ) 
}

export default RegisterForm;