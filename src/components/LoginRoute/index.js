import { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";

import "./index.css";

function withNavigate(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class LoginRoute extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    console.log("at Login jwtToken", jwtToken);
    const { navigate } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    navigate("/", { replace: true });
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://nxttrendz-backend-irmx.onrender.com/login/";
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
    console.log(data);

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwtToken);
    } else {
      this.onSubmitFailure(data.message);
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className='input-label' htmlFor='password'>
          PASSWORD
        </label>
        <input
          type='password'
          id='password'
          className='password-input-field'
          value={password}
          onChange={this.onChangePassword}
          placeholder='Password'
        />
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
        <input
          type='text'
          id='username'
          className='username-input-field'
          value={username}
          onChange={this.onChangeUsername}
          placeholder='Username'
        />
      </>
    );
  };

  onClickRegister = () => {
    this.props.navigate("/register", { replace: true });
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Navigate to='/' replace />;
    }

    return (
      <div className='login-form-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
          className='login-website-logo-mobile-img'
          alt='website logo'
        />
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png'
          className='login-img'
          alt='website login'
        />
        <form className='form-container' onSubmit={this.submitForm}>
          <img
            src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
            className='login-website-logo-desktop-img'
            alt='website logo'
          />
          <div className='input-container'>{this.renderUsernameField()}</div>
          <div className='input-container'>{this.renderPasswordField()}</div>
          <button type='submit' className='login-button'>
            Login
          </button>
          {showSubmitError && <p className='error-message'>*{errorMsg}</p>}
          <p>
            Don't have an account?
            <span className='suggest-msg' onClick={this.onClickRegister}>
              Register Here
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default withNavigate(LoginRoute);