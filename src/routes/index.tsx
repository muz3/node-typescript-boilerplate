import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';

const routes = (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
);

export default routes;
