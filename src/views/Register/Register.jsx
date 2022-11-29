import RegisterForm from './../../components/RegisterForm/RegisterForm';
import RegisterFormStep2 from '../../components/RegisterForm/RegisterFormStep2';
import SelectRole from '../../components/RegisterForm/SelectRole';
import StoreRegisterForm from '../../components/RegisterForm/StoreRegisterForm';
import React, { useState } from 'react';

const Register = () => {
    const [state, setState] = useState({
        step: 1,
        username: "",
        name: "",
        lastname: "",
        email: "",
        datebirth: "",
        gender: "",
        password: ""
    });

    const handleInputChange = (e) => {

        setState({
          ...state,
          [e.target.name] : e.target.value
        })
      }
    
       // Handle fields change
    const handleChange = (e) => {
        e.preventDefault();
  
        const { username, name, lastname, email, datebirth, gender, password, confirmPassword} = state;

        fetch("http://localhost:4001/api/auth/signup/client", {
            method:"POST",
            crossDomain:true,
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Acces-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                username, 
                name, 
                lastname, 
                email, 
                datebirth, 
                gender, 
                password
            }),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
            })
    }

    const [step, setStep] = useState(1);
    const {username, name, lastname, email, birthdate, gender, password, confirmPassword} = state;
    const values = {username, name, lastname, email, birthdate, gender, password, confirmPassword};

    // Next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Previous step
    const prevStep = () => {
        setStep(step - 1);
    }

    // Plus two steps
    const threeSteps = () => {
        setStep(step + 3);
    }


    switch(step) {
        case 1:
            return (
                <SelectRole 
                    nextStep={nextStep}
                    threeSteps={threeSteps}
                />
            )
        case 2:
            return (
                <RegisterForm 
                    nextStep={nextStep}
                    handleInputChange={handleInputChange}
                    handleChange={handleChange}
                    values={values}
                />
            )
        case 3:
            return (
                <RegisterFormStep2 
                    prevStep={prevStep}
                    handleInputChange={handleInputChange}
                    handleChange={handleChange}
                    values={values}
                />
            )
        case 4:
            return (
                <StoreRegisterForm 
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            )
    }
}

export default Register;

/*

const Register = () => {
    const [state, setState] = useState({
        step: 1,
        user: "",
        name: "",
        lastname: "",
        email: "",
        birthdate: "",
        gender: "",
        password: "",
        confirmPassword: ""
    });

    const [step, setStep] = useState(1);
    const {user, name, lastname, email, birthdate, gender, password, confirmPassword} = state;
    const values = {user, name, lastname, email, birthdate, gender, password, confirmPassword};

    // Next step
    const nextStep = () => {
        setStep(step + 1);
    }

    // Previous step
    const prevStep = () => {
        setStep(step - 1);
    }

    // Plus two steps
    const threeSteps = () => {
        setStep(step + 3);
    }

    // Handle fields change
    const handleChange = (input) => (e) => {
        //console.log(e.target);
        state[input] = e.target.value;
        console.log({state});
    }

    switch(step) {
        case 1:
            return (
                <SelectRole 
                    nextStep={nextStep}
                    threeSteps={threeSteps}
                />
            )
        case 2:
            return (
                <RegisterForm 
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            )
        case 3:
            return (
                <RegisterFormStep2 
                    prevStep={prevStep}
                    handleChange={handleChange}
                    values={values}
                />
            )
        case 4:
            return (
                <StoreRegisterForm 
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            )
    }
}

export default Register;

*/