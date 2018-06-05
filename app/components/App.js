
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import Loadable from 'react-loadable'; Does not work with react-hot-loader very well.
// import universal from 'react-universal-component'; Does not work with react-hot-loader very well.
import importedComponent from 'react-imported-component';
import CssBaseline from '@material-ui/core/CssBaseline';

// import { CSSTransitionGroup } from 'react-transition-group';

import Navbar from './Navbar';
import LoadingAnimation from './SharedComponents/LoadingAnimation';

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
const HomePage = importedComponent(() => import(/* webpackChunkName: "HomePageContainer" */ './containers/HomePageContainer').catch(err => {}), { LoadingComponent: LoadingAnimation });

const App = props => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <CssBaseline />
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route render={() => <p>Not Fount!</p>} />
          </Switch>
        </main>
      </div>
    </Router>
  </MuiThemeProvider>
);

export default App;
