import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userSignInSuccess, showAuthLoader, clearSignInError } from '../actions/Auth';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordError: '',
      emailError: ''
    }
  }


  handleFieldInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  
  resetError = (e) => {
    const { clearSignInError: clearError } = this.props;

    this.setState({
      passwordError: '',
      emailError: ''
    });

    clearError();
  }
  
  checkEmailInput = e => {
    const { value } = e.target;
    const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!validEmailRegex.test(value)) {
      this.setState({
        emailError: 'Email is invalid',
      });
    } else {
      this.setState({
        emailError: '',
      });
    }
  }

  checkPasswordInput = e => {
    const { value } = e.target;
    const validPasswordRegex = /^([a-zA-Z0-9]){8}/;
    if (!validPasswordRegex.test(value)) {
      this.setState({
        passwordError: 'Should be alphanumeric and at least 8 characters long',
      });
    } else {
      this.setState({
        passwordError: '',
      });
    }
  }

  handleFormSubmission = e => {
    e.preventDefault();
    const { email, password, emailError, passwordError } = this.state;
    const { userSignInSuccess: signin, showAuthLoader: showLoader } = this.props;

    if(emailError === '' && passwordError === '') {
      showLoader();
      signin({ email, password });
    }
  }

  render() {
    const {showMessage, alertMessage, errors: { error }, history, isAuthLoading, isSignedOutForToken } = this.props;
    const { passwordError, emailError, password, email } = this.state;

    if(JSON.parse(localStorage.getItem('user'))) {
      history.push('/app/dashboard');
    }

    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="CrowdFund">
              <img src={require("assets/images/logo.png")} alt="CrowdFund" title="CrowdFund"/>
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1 className="marineLoginHead"><IntlMessages id="appModule.signinFormHead"/></h1>
              <p className="marineAlertdanger">{error}</p>
              {isSignedOutForToken && <p className="marineAlertdanger">Your session has expired, please login again to continue.</p>}
            </div>

            <div className="app-login-form">
              <form onSubmit={this.handleFormSubmission}>
                <fieldset>
                  <TextField
                    id="email"
                    type="email"
                    label={<IntlMessages id="appModule.email"/>}
                    fullWidth
                    onChange={this.handleFieldInput}
                    onKeyUp={this.checkEmailInput}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    value={email}
                  />
                  <p className="marineAlertdanger">{emailError}</p>

                  <TextField
                    id='password'
                    type="password"
                    label={<IntlMessages id="appModule.password"/>}
                    fullWidth
                    onChange={this.handleFieldInput}
                    onKeyUp={this.checkPasswordInput}
                    margin="normal"
                    className="mt-1 my-sm-3"
                    autoComplete='off'
                    value={password}
                  />
                  <br />
                  <p className="marineAlertdanger">{passwordError}</p>

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button className="marineButton" type="submit" variant="contained">
                      <IntlMessages id="appModule.signIn"/>
                    </Button>
                    </div>
                </fieldset>
              </form>
            </div>
          </div>

        </div>
        {
          isAuthLoading &&
          <div className="loader-view">
            <CircularProgress/>
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userSignInSuccess,
  showAuthLoader,
  clearSignInError
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuthLoading: auth.isAuthLoading,
    isSignedIn: auth.isSignedIn,
    errors: auth.signinErrors,
    isSignedOutForToken: auth.isSignedOutForToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
