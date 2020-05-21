import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import "assets/vendors/style"
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from 'app/routes';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import SignIn from './SignIn';
import { tokenExpired } from '../util/utils';


const RestrictedRoute = ({component: Component, authUser, isTokenExpired, token, ...rest}) =>
  <Route
    {...rest}
    render={props => {
       if (authUser) {
          return <Component {...props} />
      } else {
        return (<Redirect
            to={{
              pathname: '/signin',
              state: {from: props.location}
            }}
          />)
        }
    }
  }
  />;

class App extends Component {

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

  render() {
    const {match, location, locale, isDirectionRTL, authUser } = this.props;
    const token = localStorage.getItem('token');
    const isTokenExpired = token && tokenExpired(token);
    
    if (location.pathname === '/') {
      if (authUser === null) {
        return ( <Redirect to={'/signin'}/> );
      } else {
        return ( <Redirect to={'/app/dashboard'}/> );
      }
    }

    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <MuiThemeProvider theme={applyTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}>
            <RTL>
              <div className="app-main">

              <Switch>
                  <RestrictedRoute path={`${match.url}app`} authUser={authUser}
                                   component={MainApp} isTokenExpired={isTokenExpired} token={token} />
                    <Route path='/signin' component={SignIn}/>
                    <Route
                    component={asyncComponent(() => import('components/Error404'))}/>
                </Switch>

                {/* <Switch>
                  <Route path='/signin' component={SignIn}/>
                  <Route path={`${match.url}app`} component={MainApp}/>
                  <Route
                    component={asyncComponent(() => import('components/Error404'))}/>
                </Switch> */}
              </div>
            </RTL>
          </IntlProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {sideNavColor, locale, isDirectionRTL} = settings;
  const { authUser } = auth
  return {sideNavColor, locale, isDirectionRTL, authUser}
};

export default connect(mapStateToProps)(App);

