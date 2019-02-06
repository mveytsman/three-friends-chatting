import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withAuth, withoutAuth } from '../../contexts/auth';
import Dashboard from '../../containers/Dashboard';
import Login from '../../containers/Login';
import Messages from '../../containers/Messages';

const Router = () => (
  <Switch>
    <Route exact path="/login" component={withoutAuth(Login)} />
    <Route exact path="/messages" component={Messages} />
    <Route exact path="/dashboard" component={withAuth(Dashboard)} />

    {/* Redirect all unmatched routes to login */}
    <Redirect to="/messages" />
  </Switch>
);

export default Router;
