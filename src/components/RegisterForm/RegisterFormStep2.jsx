import classes from './RegisterForm.module.scss';
import image from './../../assets/stock_image.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown, MdCalendarToday } from 'react-icons/md';

const RegisterFormStep2 = (props) => {
    const history = useNavigate();
    const { values, handleInputChange, handleChange, nextStep, prevStep } = props;

    return (
        <main>
            <div className={classes["Form"]}>
                <div className={classes["inputs"]}>
                    <form className={classes["form-fields"]} onSubmit={handleChange}>
                        <h2 className={classes["title"]}>Cliente - Crear cuenta</h2>

                        <div className={ classes["side-inputs"] }>
                            <div>
                                <label className={classes["label"]}>F. Nacimiento</label>
                                <div className={ classes["side-input-text"] }>
                                    <input type="date" name="datebirth" placeholder="mm/dd/yyyy" className={classes["input"]}
                                    onChange={handleInputChange}
                                    defaultValue={values.datebirth}
                                    />
                                    {/* <span><MdCalendarToday className={ classes["calendar"] }/></span> */}
                                </div>
                            </div>

                            <div>
                                <label className={classes["label"]}>Gender</label>
                                <div className={ classes["side-input-text"] }>
                                        <select 
                                        name="gender" 
                                        className={classes["select-menu"]}
                                        onChange={handleInputChange}>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                        <span><MdKeyboardArrowDown className={ classes["arrow"] }/></span>
                                </div>
                            </div>
                        </div>

                        <label className={classes["label"]}>Contraseña</label>
                        <input type="password" name="password" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleInputChange}
                        autoComplete="on"
                        defaultValue={values.password}
                        />

                        <label className={classes["label"]}>Repita la contraseña</label>
                        <input type="password" name="confirmPassword" placeholder="Mínimo 8 caracteres" className={classes["input"]}
                        onChange={handleInputChange}
                        autoComplete="on"
                        defaultValue={values.confirmPassword}
                        />
                    
                        <div className={classes["buttons-container"]}>
                            <input type="submit" value="REGRESAR" className={classes["submit-button"]} onClick={prevStep}
                            />
                            
                            <input type="submit" value="CONTINUAR" className={classes["submit-button"]}
                            />
                        </div>

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

export default RegisterFormStep2;