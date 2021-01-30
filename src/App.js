import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import 'react-toastify/dist/ReactToastify.css';
import "axios-progress-bar/dist/nprogress.css";
import { getCurrentUserObject } from './services';
import Index from './components/home/Index';
import NavBar from './components/layouts/NavBar';
import SignIn from './components/home/SignIn'
import SignUp from './components/home/SignUp';
import CreateTicket from './components/home/CreateTicket';
import Dashboard from './components/admin/Dashboard';
// import CreateAuction from './components/CreateAuction';

loadProgressBar();
class App extends Component {

  state = {
    user: null
  };

  componentWillMount() {
    const user = getCurrentUserObject();
    this.setState({ user });
  }


  render() {
    return (
      <>
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/register" exact component={SignUp} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/create-ticket" exact component={CreateTicket} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </>
    )
  }
}

export default withRouter(App);

