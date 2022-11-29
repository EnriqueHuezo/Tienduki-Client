import classes from './Tags.module.scss';

import { AiFillTwitterSquare, AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';

const Tags = ({addTags, tags, input, removeTags, changeSocial, changeInput, selected, editing = false }) => {
    const icons = [
        {
            icon: AiFillTwitterSquare,
            social: "Twitter"
        },
        {
            icon: AiFillInstagram,
            social: "Instagram"
        },
        {
            icon: AiFillFacebook,
            social: "Facebook"
        }
    ]

    return (
        <div className={classes["Tags"]}>
            {
                editing &&
                <div className={ classes["Inputs"] }>
                    <select onChange={changeSocial} value={selected.selected}>
                        <option value={""}>Selecciona una opción</option>
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>Twitter</option>
                    </select>
                    <input type="text" placeholder="Has click para añadir otra red social" value={input} onChange={changeInput}/>
                    <button className={ `${classes["btn"]} ${classes["btn-primary"]}` } onClick={addTags}><AiOutlinePlus/></button>
                </div>
            }
            
            <ul className={ classes["Social-media-container"] }>
                {
                    tags.map((tag, index) => {
                        return(                        
                            <li key={index} className={ classes["Social-media-button"] }>                                
                                    {
                                        icons.map(icon => {
                                            if(icon.social === tag.social) {
                                                return (
                                                    <div key={`${tag.url} ${icon.icon}`}>
                                                        <a href={tag.url} target="_blank" key={`${tag.social} link`}>
                                                            <icon.icon/><span>{tag.social}</span>                                                            
                                                        </a>
                                                        { editing ? <MdOutlineCancel onClick={() => removeTags(index)}/> : "" }
                                                        
                                                    </div>
                                                )
                                            }
                                        })
                                    }                                
                            </li>
                        )
                    })
                }
            </ul>                       
        </div>
    )
}

export default Tags;