import React from 'react';
import './App.css';
import Layout from './components/layout/Layout';
import { Switch } from 'react-router-dom';
import { Login } from './components/auth/login/Login';
import { AuthRoute } from './core/guards/AuthRoute';
import { NonAuthRoute } from './core/guards/NonAuthRoute';
import { Register } from './components/auth/register/Register';

function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthRoute exact path="/register" component={Register} />
        <NonAuthRoute exact path="/login" component={Login} />
        <AuthRoute path="/" component={Layout} />
      </Switch>
    </div>
  );
}

export default App;
