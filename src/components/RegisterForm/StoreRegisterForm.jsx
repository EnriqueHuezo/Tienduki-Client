import classes from './StoreRegisterForm.module.scss';
import image from '../../assets/stock_image.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

const StoreRegisterForm = (props) => {
    const { values, handleChange, nextStep } = props;
    const history = useNavigate();
    
    return (
        <main>
            <div className={classes["Form"]}>
                <div className={classes["inputs"]}>
                    <form className={classes["form-fields"]}>
                        <h2 className={classes["title"]}>Tienda - Crear cuenta</h2>

                        <label className={classes["label"]}>Usuario</label>
                        <input type="text" name="user" placeholder="Ingrese su usuario" className={classes["input"]}
                        onChange={handleChange('user')}
                        defaultValue={values.user}
                        />

                        <label className={classes["label"]}>Correo electrónico</label>
                        <input type="text" name="email" placeholder="alguien@ejemplo.com" className={classes["input"]}
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        />

                        <label className={classes["label"]}>Categoría</label>
                            <select 
                            name="category" 
                            className={classes["select-menu"]}
                            onChange={handleChange('gca')}>
                                <option value="masculino">Categoría 1</option>
                                <option value="femenino">Categoría 2</option>
                            </select>

                        <label className={classes["label"]}>Contraseña</label>
                        <input type="password" name="password" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleChange('password')}
                        defaultValue={values.password}
                        />

                        <label className={classes["label"]}>Repita la contraseña</label>
                        <input type="password" name="confirmPassword" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleChange('confirmPassword')}
                        defaultValue={values.confirmPassword}
                        />
                    
                        <input type="submit" value="CONTINUAR" className={classes["submit-button"]} onClick={() => {
                            history("/Login")
                        }}
                        />

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

export default StoreRegisterForm