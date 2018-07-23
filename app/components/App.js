
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import Loadable from 'react-loadable'; Does not work with react-hot-loader very well.
// import universal from 'react-universal-component'; Does not work with react-hot-loader very well.
import importedComponent from 'react-imported-component';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginDialog from './LoginDialog/';
import LoginDialogSnackbar from './snackbars/LoginDialogSnackbar';
import LogoutSnackbar from './snackbars/LogoutSnackbar';
import Navbar from './Navbar';
import { parserUserFromJwt } from '../actions/UserActions';
import LoginDialogContext from '../contexts/LoginDialogContext';

import { JWT_MESSAGE, HOME_PAGE_URL, LOGIN_REDIRECT_RUL, ORDER_PAGE_URL, ORDER_STATUS_PAGE_URL, ORDERS_PAGE_URL } from '../config';
import LoadingAnimation from './SharedComponents/LoadingAnimation';

// import { CSSTransitionGroup } from 'react-transition-group';

// import BackgroundMainPager from './BackgroundMainPager';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9ecde7',
      main: '#6d9cb5',
      dark: '#3e6e85',
      contrastText: '#fff',
    },
    secondary: {
      light: '#497ca4',
      main: '#105075',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
});

/* istanbul ignore next */
const HomePage = importedComponent(() => import(/* webpackChunkName: "HomePageContainer" */ './containers/HomePageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/* istanbul ignore next */
const LoginRedirect = importedComponent(() => import(/* webpackChunkName: "LoginRedirect" */ './LoginRedirect').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/* istanbul ignore next */
const OrderPage = importedComponent(() => import(/* webpackChunkName: "OrderPageContainer" */ './containers/OrderPageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/* istanbul ignore next */
const OrderStatusPage = importedComponent(() => import(/* webpackChunkName: "OrderStatusPageContainer" */ './containers/OrderStatusPageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/* istanbul ignore next */
const OrdersPage = importedComponent(() => import(/* webpackChunkName: "OrdersPageContainer" */ './containers/OrdersPageContainer').catch(err => console.log(err)), { LoadingComponent: LoadingAnimation });

/**
 * The root component that contains the theme, routers, navbar, and login dialog
 */
export class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    parserUserFromJwt: PropTypes.func.isRequired
  };

  /**
   * If Redux does not have user and local storage has jwt, use jwt to parser the user.
   * @param {object} props contains the component's prop value.
   * @return {null} No return.
   */
  constructor(props) {
    super(props);
    if (!props.user._id) {
      const jwtMessage = localStorage.getItem(JWT_MESSAGE);
      if (jwtMessage) props.parserUserFromJwt(jwtMessage);
    }
  }

  state = {
    isLoginDialogOpen: false,
    isLogoutSnackBarOpen: false,
    isLoginSnackbarOpen: false,
    snackbarMessage: ''
  };

  /**
   * Setting the open state to an opposite value.
   * @return {null} No return.
   */
  handleToggleDialog = () => this.setState(({ isLoginDialogOpen }) => ({ isLoginDialogOpen: !isLoginDialogOpen }));

  /**
   * Setting the snackbarOpen state to true in order to open the snackbar.
   * If message paramter is a string, set it to message state. Otherwise, set a empty message.
   * @param {string} message will be showed in the snackbar.
   * @return {null} No return.
   */
  handleToggleSnackbar = message => this.setState(({ isLoginSnackbarOpen }) =>
    ({ isLoginSnackbarOpen: !isLoginSnackbarOpen, snackbarMessage: typeof message === 'string' ? message : '' }));

  /**
   * Set the logoutSnackbarOpen state to an opposite value.
   * @return {null} No return.
   */
  handleToggleLogoutSnackbar = () => this.setState(({ isLogoutSnackBarOpen }) =>
    ({ isLogoutSnackBarOpen: !isLogoutSnackBarOpen }));

  /**
   * It will be pass down in a context in order to make it available for all component.
   * This method will be used when logout action is performed.
   * Clear the state isLoginDialogOpen in order to prevent the LoginDialog shows up.
   * @return {null} No return.
   */
  handleLogoutAction = () => this.setState({ isLoginDialogOpen: false, isLogoutSnackBarOpen: true });

  /**
   * The render method for the component
   * @return {jsx} Return jsx
   */
  render() {
    const { user } = this.props;
    const { isLogoutSnackBarOpen, isLoginDialogOpen, isLoginSnackbarOpen, snackbarMessage } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          {/* Using a context to give children components access to login dialog */}
          <LoginDialogContext.Provider value={{ handleLogoutAction: this.handleLogoutAction, handleToggleLoginDialog: this.handleToggleDialog }}>
            <div>
              <CssBaseline />
              <Navbar />
              <main>
                <Switch>
                  <Route exact path={HOME_PAGE_URL} component={HomePage} />
                  <Route exact path={ORDER_PAGE_URL} component={OrderPage} />
                  <Route exact path={LOGIN_REDIRECT_RUL} component={LoginRedirect} />
                  <Route path={`${ORDER_STATUS_PAGE_URL}/:orderId`} component={OrderStatusPage} />
                  <Route path={ORDERS_PAGE_URL} component={OrdersPage} />
                  <Route render={() => <p>Not Fount!</p>} />
                </Switch>
              </main>
              {!user._id && ( // If a user has already login, do not need to load componnets below.
                <Fragment>
                  <LoginDialog open={isLoginDialogOpen} onClose={this.handleToggleDialog} onToggleSnackbar={this.handleToggleSnackbar} />
                  <LoginDialogSnackbar open={isLoginSnackbarOpen} onClose={this.handleToggleSnackbar} message={snackbarMessage} />
                </Fragment>
              )}
              <LogoutSnackbar open={isLogoutSnackBarOpen} onClose={this.handleToggleLogoutSnackbar} />
            </div>
          </LoginDialogContext.Provider>
        </Router>
      </MuiThemeProvider>
    );
  }
}
/* istanbul ignore next */
const mapStateToProps = state => ({
  user: state.user
});
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  parserUserFromJwt: jwtMessage => dispatch(parserUserFromJwt(jwtMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
