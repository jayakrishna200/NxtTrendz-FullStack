import { Component } from "react";
import {useNavigate } from "react-router-dom";
import "./index.css";

import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

function withNavigate(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class RegisterRoute extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    showPassword: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (data) => {
    const { navigate } = this.props;
    navigate("/login");
  };

  onSubmitFailure = (data) => {
    const errorMsg = data.message;
    this.setState({ showSubmitError: true, errorMsg });
    console.log(data);
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    console.log(userDetails);
    const url = "https://nxttrendz-backend-irmx.onrender.com/register/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(response);
    if (response.ok === true) {
      this.onSubmitSuccess(data);
    } else {
      this.onSubmitFailure(data);
    }
  };

  changeShowPasswordStatus = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  renderPasswordField = () => {
    const { password, showPassword } = this.state;
    const passwordType = showPassword ? "text" : "password";
    return (
      <>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <div className='password-input-container'>
          <input
            type={passwordType}
            id='password'
            className='password-input-field'
            value={password}
            onChange={this.onChangePassword}
            placeholder='Password'
          />
          <button
            className='show-password-btn'
            onClick={this.changeShowPasswordStatus}
            type='button'
          >
            {!showPassword && <IoMdEyeOff size='25' color='#64748b' />}
            {showPassword && <IoEye size='25' color='#64748b' />}
          </button>
        </div>
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className='input-label' htmlFor='username'>
          USERNAME
        </label>
        <div className='username-input-container'>
          <input
            type='text'
            id='username'
            className='username-input-field'
            value={username}
            onChange={this.onChangeUsername}
            placeholder='Username'
          />
        </div>
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;

    return (
      <div className='login-form-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
          className='login-website-logo-mobile-image'
          alt='website logo'
        />
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
          className='login-image'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.submitForm}>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
            className='login-website-logo-desktop-image'
            alt='website logo'
          />
          <div className='input-container'>{this.renderUsernameField()}</div>
          <div className='input-container'>{this.renderPasswordField()}</div>
          <button type='submit' className='login-button'>
            Register
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
          <p>
            Already Registered?
            <span className='redirect-to-login' type='button' onClick={this.onSubmitSuccess} >
              Login
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default withNavigate(RegisterRoute);
