import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from '../../actions/AuthAction';
import AuthVector from '../../images/svg/login-vector.svg';
import './Auth.css';

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading)
  const [IsSignUp, setIsSignUp] = useState(false);
  const [isConfirmPass, setConfirmPass] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPass: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (IsSignUp) {
      data.password === data.confirmPass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    }
    else {
      dispatch(logIn(data))
    }
  }

  const resetData = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPass: ""
    });
  }

  return (
    <div className="Auth">

      {/* Auth Left Side */}
      <div className="auth-left">

        <div className="auth-top-row">
          <div className="bakbak">
            {/* <div className="logo-icon flexbox">
              <UilComment />
            </div> */}
            <h1>BAKBAK</h1>
          </div>
        </div>

        <div className="auth-bottom-row">


          <form className='auth-form card' action="" method="post" onSubmit={handleSubmit} >

            <h2>{IsSignUp ? "Sign Up" : "Login"}</h2>

            {IsSignUp && (
              <div className="short-element">

                <div className="input-field -short">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name='firstname'
                    placeholder='Your first name'
                    onChange={handleChange}
                    value={data.firstname} />
                </div>

                <div className="input-field -short">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name='lastname'
                    placeholder='Your last name'
                    onChange={handleChange}
                    value={data.lastname} />
                </div>

              </div>
            )}



            <div className="input-field">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name='username'
                placeholder='abc@xyz.com'
                onChange={handleChange}
                value={data.username} />
            </div>

            <div className="input-field">
              <label htmlFor="">Password</label>
              <input
                type="Password"
                name='password'
                placeholder='*******'
                onChange={handleChange}
                value={data.password} />
            </div>

            {IsSignUp && (
              <div className="input-field">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="Password"
                  name='confirmPass'
                  placeholder='*******'
                  onChange={handleChange}
                  value={data.confirmPass} />

                <span
                  style={{
                    display: isConfirmPass ? "none" : "block",
                    fontSize: "12px",
                    color: "red",
                  }}>
                  *Confirm Password should match
                </span>
              </div>

            )}



            <button
              type='submit'
              disabled={loading}
              className='button auth-btn'>{loading? "Loading..." : IsSignUp ? "Sign In" : "Login"}
            </button>

            <span
              className='sub-text'
              onClick={() => { setIsSignUp((prev) => !prev); resetData() }}>
              {IsSignUp
                ? "Already have an account? Login"
                : "Don't have an account? SignUp"
              }

            </span>

          </form>


        </div>

      </div>


      {/* Auth Right side */}
      <div className="auth-right">
        <div className="auth-top-row"></div>
        <div className="auth-bottom-row">
          <img className='auth-vector' src={AuthVector} alt="" />
        </div>
      </div>


    </div>
  )
}


export default Auth