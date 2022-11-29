import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import classes from "./LoginForm.module.scss";
import image from "../../assets/stock_image.jpeg";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const errors = {
    user: !user,
    password: !password,
  };

  const hasErrors = () => Object.values(errors).some((error) => error);

  const [state, setState] = useState({
    identifier: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { identifier, password } = state;
    console.log(identifier, password);

    fetch("http://localhost:4000/api/auth/signin/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acces-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          if (data.data.role == "Client") {
            
            Swal.fire({
              icon: "success",
              title: "Felicidades cliente",
              text: "Entraste con exito uwu",
              timer: 10000
            });
  
            window.localStorage.setItem("dataStorage", JSON.stringify(data.data));
            window.location.href = "./"
          }

          if (data.data.role == "Vendor") {

            Swal.fire({
              icon: "success",
              title: "Felicidades vendedor",
              text: "Entraste con exito uwu",
              timer: 10000
            });

            window.localStorage.setItem("dataStorage", JSON.stringify(data.data));
            window.location.href = "./"
          }

          if (data.data.role == "Admin") {
            
            Swal.fire({
              icon: "success",
              title: "Felicidades admin",
              text: "Entraste con exito uwu",
            });

            window.localStorage.setItem("dataStorage", JSON.stringify(data.data));
            window.location.href = "./"

          }

        } else {

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });

        }
      });
  };

  return (
    <main>
      <ToastContainer />
      <div className={classes["Form"]}>
        <div className={classes["inputs"]}>
          <form className={classes["form-fields"]} onSubmit={handleSubmit}>
            <h2 className={classes["title"]}>Inicio de sesión</h2>

            <label className={classes["label"]}>Cuenta</label>
            <input
              type="text"
              name="identifier"
              placeholder="Ingrese su correo o usuario"
              className={classes["input"]}
              onChange={handleInputChange}
              onInput={({ target }) => {
                setUser(target.value);
              }}
            />

            <label className={classes["label"]}>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              className={classes["input"]}
              autoComplete="on"
              onChange={handleInputChange}
              onInput={({ target }) => {
                setPassword(target.value);
              }}
            />

            <div className={classes["forgot-pass"]}>
              <a
                className={classes["Span"]}
                onClick={() => {
                  history("/"); // *! Create forgot password view asking for email and new view to change password
                }}
              >
                ¿Olvidaste la contraseña?
              </a>
            </div>

            <input
              type="submit"
              value="INGRESAR"
              className={classes["submit-button"]}
              onClick={() => {
                if (hasErrors()) {
                  toast.error("¡Complete los campos!");
                } else {
                }
              }}
            />

            <hr className={classes["line"]} />

            <div className={classes["new-user-div"]}>
              <span className={classes["Span"]}>¿Eres un nuevo usuario?</span>
              <a
                className={classes["linked-text"]}
                onClick={() => {
                  history("/Register");
                }}
              >
                Crea una cuenta
              </a>
            </div>
          </form>
        </div>

        <div className={classes["logo"]}>
          <div className={classes["contenedor"]}>
            <img src={image} alt="logo" className={classes["image"]} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

/*
export default class Login extends Component {

    constructor(props){
      super(props)
      this.state = {
        identifier: "",
        password: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) { 
       e.preventDefault();
       const { identifier, password } = this.state;
       console.log(identifier, password);

       fetch("http://localhost:4000/api/auth/signin", {
        method:"POST",
        crossDomain:true,
        headers:{
          "Content-Type" : "application/json",
          Accept: "application/json",
          "Acces-Control-Allow-Origin": "*",
        },
        body:JSON.stringify({
          identifier,
          password
        }),
      }).then((res) => res.json())
        .then((data) => {
          window.localStorage.setItem("dataStorage", JSON.stringify(data.data));
      })
    }

    render(){
      return(
            <main>
                <div className={classes["Form"]}>
                    <div className={classes["inputs"]}>
                        <form className={classes["form-fields"]} onSubmit={this.handleSubmit}>
                            <h2 className={classes["title"]}>Inicio de sesión</h2>
    
                            <label className={classes["label"]}>Cuenta</label>
                            <input 
                            type="text" 
                            name="user" 
                            placeholder="Ingrese su correo o usuario" 
                            className={classes["input"]}
                            onChange={(e) => this.setState({identifier: e.target.value})}/>
    
                            <label className={classes["label"]}>Contraseña</label>
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Ingrese su contraseña" 
                            autoComplete='on'
                            className={classes["input"]} 
                            onChange={(e) => this.setState({password: e.target.value})}/>
                        
                            <div className={classes["forgot-pass"]}>
                                <a className={classes["Span"]} onClick = {() => {
                                    useNavigate("/"); // *! Create forgot password view asking for email and new view to change password
                                }}>
                                    ¿Olvidaste la contraseña?
                                </a>
                            </div>
                            
                            <input 
                            type="submit" 
                            value="INGRESAR" 
                            className={classes["submit-button"]} 
                            />
    
                            <hr className={classes["line"]}/>
    
                            <div className={classes["new-user-div"]}>
                                <span className={classes["Span"]}>¿Eres un nuevo usuario?</span>
                                <a className={classes["linked-text"]} onClick = {() => {
                                    useNavigate("/Register");
                                }}>
                                    Crea una cuenta
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
}

*/
