import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const initialVal = {username:"",password:""};
  const [Values, setValues] = useState(initialVal);
  const [Errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const getChange = (e) => {
    
    const {name, value} = e.target;
    setValues({ ...Values, [name]: value });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setErrors(checkValide(Values));
    setSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(Errors).length === 0 && submit ){
    }
  },[Errors])

  const checkValide = (values) => {
    const errors = {};
    const constaint = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/;
    if(!values.username){
      errors.username = "Username is required";

    }
    if(!values.password){
      errors.password = "Password is required";
      
    }else if (Values.password < 4){
      errors.password = "Password should be at least 4 character";
    }else if (!constaint.test(Values.password)){
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
                <input type="text" name="username" placeholder="username" value = {Values.username} onChange = {getChange}>
                </input>
            </div>
            <p>{Errors.username}</p>
            <div className="feild">
                <input type="password" name="password" placeholder="password" value = {Values.passowrd} onChange = {getChange}>
                </input>
            </div>
            <p>{Errors.password}</p>
            <button className = "loginButton">Login</button>
            </div>
            <h6>@2018 Demo</h6>
        </form>
    </div>
);
}
