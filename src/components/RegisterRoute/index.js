import { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (data) => {
    const { navigate } = this.props;
    console.log(data);
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
        />
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
        </form>
      </div>
    );
  }
}

export default withNavigate(RegisterRoute);
