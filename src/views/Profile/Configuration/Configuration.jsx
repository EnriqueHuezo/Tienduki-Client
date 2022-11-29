import classes from './Configuration.module.scss';

import Tags from '../../../components/Tags/Tags';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const Configuration = () => {
    const [tags, setTags] = useState([]);
    const [social, setSocial] = useState("");
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState({selected: ""});
    const [editing, setEditing] = useState(false);
    const [editingText, setEditingText] = useState("Editar");
    const [newPassWord, setNewPassword] = useState("");
    const [newPassWordConfirm, setNewPassWordConfirm] = useState("");
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg");

    const inputref = useRef(null);    
    const inputConfirmref = useRef(null); 
    const imageInput = useRef(null);
    
    const startEditing = (e) => {
        if (!editing) {
            setEditing(true);
            setEditingText("Cancelar");
            return;
        }
        setEditingText("Editar");
        setEditing(false);
        setInput("");
        setSocial("");
        setSelected({selected: ""});
    }

    const removeTags = (indextToRemove) => {
        setTags(tags.filter((_, index) => index !== indextToRemove));
    };

    const urlPatternValidation = URL => {
        const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
        return regex.test(URL);
    };

    const changeSocial = (e) => {
        setSelected({selected: e.target.value});
        setSocial(e.target.value);

        console.log(e.target.value);
    };

    const changeInput = (e) => {
        setInput(e.target.value);
    };

    const changeInputPassword = (e) => {
        if (inputref.current.contains(e.target)) {
            setNewPassword(e.target.value);
        }else if (inputConfirmref.current.contains(e.target)) {
            setNewPassWordConfirm(e.target.value)
        }        
    }

    const saveChanges = () => {
        if (newPassWord !== "" && newPassWordConfirm !== "") {
            if (newPassWord === newPassWordConfirm) {
                toast.success("Contraseña actualizada correctamente");
            }else{
                toast.warn("Asegurese que la nueva contraseña y su confirmación sean iguales");
                return;
            }            
        }
        setEditing(false);
        setEditingText("Editar");
        toast.success("Cambios guardados correctamente");
        setInput("");
        setSocial("");
        setSelected({selected: ""}); 
    }

    const addTags = () => {
        if (tags.length < 5) {
            if (input !== "" && urlPatternValidation(input)) {
                if (selected.selected === "") {
                    toast.warn("Debes seleccionar una red social.");
                    return;
                }
                setTags([...tags, {social:social,url:input}]);
                setInput("");
                setSelected({selected: ""});
                setSocial("");
                toast.success("Red social añadida correctamente");
            }else {
                toast.warn("Debes ingresar la url de la red social.");
            }
            return;
        }
        toast.warn("El limite de redes sociales que puedes agregar son 5.");
    };

    const changeImage = () => {
        imageInput.current.click();
    };

    const handleImageChange = (e) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
    
        e.target.value = null;
        const objectUrl = URL.createObjectURL(fileObj);
        setImage(objectUrl);
        console.log(fileObj);
        console.log(fileObj.name);
    }

    return (
        <div className={ classes["Configuration"] }>
            <div className={ classes["Profile-header"] }>
                <img src={image} className={editing ? classes["imageEdit"] : undefined} onClick={editing ? changeImage : undefined} alt="" />
                <input ref={imageInput} onChange={handleImageChange} type="file" accept="image/*"  />
                <div className={ classes["Profile-info"] }>
                    <h2>@testUser</h2>
                    <input type="text" className={editing ? classes["active-input"] : undefined} defaultValue={"correoelectronico_de_relleno@gmail.com"} readOnly={editing ? false : true}/>
                </div>
            </div>
            <div className={ classes["Profile-body"] }>
                <div className={ classes["Personal-info"] }>
                    <h3>Informacion Personal</h3>
                    <hr className={ classes["Line"] } />
                </div>                
                
                {
                    editing ?
                    <>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Contraseña
                            </h4>                    
                            <input type="password" className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Nueva contraseña
                            </h4>                    
                            <input ref={inputref} type="password" onChange={changeInputPassword} className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>   
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Confirmar contraseña
                            </h4>                    
                            <input ref={inputConfirmref} type="password" onChange={changeInputPassword} className={editing ? classes["active-input"] : undefined} readOnly={editing ? false : true} placeholder="••••••••••••"/>
                        </div>   
                    </>
                    :
                    <>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Nombre
                            </h4>
                            <span>
                                TestName TestLastName
                            </span>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Fecha de nacimiento
                            </h4>
                            <span>
                                1 de enero de 1999
                            </span>
                        </div>
                        <div className={ classes["Data-section"] }>
                            <h4>
                                Sexo
                            </h4>
                            <span>
                                TestGender
                            </span>
                        </div>
                    </>
                }
            </div>
            <div className={ classes["Profile-footer"] }>
                <div className={ classes["Social-media"] }>
                    <h3>Redes sociales</h3>
                    <hr className={ classes["Line"] } />
                </div>
                <div className={ classes["Social-media-container"] }>
                    <Tags addTags={addTags} tags={tags} input={input} removeTags={removeTags} changeSocial={changeSocial} changeInput={changeInput} selected={selected} editing={editing}/>
                </div>
            </div>

            <div className={classes["Buttons"]}>
                {editing && <button className={`${classes["btn"]} ${classes["btn-primary"]}`} disabled={editing ? false : true} onClick={saveChanges}>Guardar Cambios</button>}                
                <button className={`${classes["btn"]} ${classes["btn-secondary"]}`} onClick={startEditing}>{editingText}</button>
            </div>
            
        </div>
    )    
}

export default Configuration;