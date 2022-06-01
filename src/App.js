import { useState, useEffect } from "react";
import "./styles.css";

function getFormValues() {
  const storedValues = localStorage.getItem('Users');
  return JSON.parse(storedValues);
}

export default function App() {
  const [formValues, setValues] = useState(getFormValues);
  const [inputErrors, setErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const handelChange = (e) => {
    
    const {name, value} = e.target;
    setValues({ ...formValues, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setErrors(checkValide(formValues));
    setSubmit(true);
  };
  useEffect(() => {
          localStorage.setItem('Users',JSON.stringify(formValues));
    
  },[formValues])

  const checkValide = (formValues) => {
    const errors = {};
    const constaint = /^(?=.*\d)(?=.*[A-z]).{4,}$/;
    if(!formValues.username){
      errors.username = "Username is required";

    }
    if(!formValues.password){
      errors.password = "Password is required";
      
    }else if (formValues.password < 4){
      errors.password = "Password should be at least 4 character";
    }else if (!constaint.test(formValues.password)){
      errors.password = "Password should contain character and digits";
    }
    return errors;
  };
  return ( 
    <div className="container">
        <form onSubmit = {handelSubmit}>
            <h3>Login to your account</h3>

            <div className="uiForm">

            <div className="feild">
                <input type="text" name="username" placeholder="username" value = {formValues.username} onChange = {handelChange}>
                </input>
            </div>
            <p>{inputErrors.username}</p>
            <div className="feild">
                <input type="password" name="password" placeholder="password" value = {formValues.passowrd} onChange = {handelChange}>
                </input>
            </div>
            <p>{inputErrors.password}</p>
            <button className = "loginButton">Login</button>
            </div>
            <h6>@2018 Demo</h6>
        </form>
    </div>
);
}
