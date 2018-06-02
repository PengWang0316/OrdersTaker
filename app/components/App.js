
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Loadable from 'react-loadable'; Does not work with react-hot-loader very well.
// import universal from 'react-universal-component'; Does not work with react-hot-loader very well.
import importedComponent from 'react-imported-component';
// import { CSSTransitionGroup } from 'react-transition-group';

import Navbar from './Navbar';
import LoadingAnimation from './SharedComponents/LoadingAnimation';

/* istanbul ignore next */
const HomePage = importedComponent(() => import(/* webpackChunkName: "LoginContainer" */ './containers/HomePageContainer'), { LoadingComponent: LoadingAnimation });

const App = props => (
  <Router>
    <div>
      <Navbar />
      <main>
        {/*
            <CSSTransitionGroup
            transitionName="csstransition-fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route render={() => <p>Not Fount!</p>} />
        </Switch>
        {/* </CSSTransitionGroup> */}

      </main>
    </div>
  </Router>
);

export default App;
