import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import App from './App';
import AutoComplete from './AutoComplete';

const AppRouter = () => (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/search" component={AutoComplete} />
          </Switch>
        </div>
      </Router>
);

export default AppRouter;
