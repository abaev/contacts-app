import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from '@/components/login/Login';
import Contacts from '@/components/contacts/Contacts';

class App extends React.Component {
  render() {
    return (
      <div>
        Ale APP
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>

        <Switch>
          <Route path="/contacts">
            <Contacts />
          </Route>
        </Switch>
      </div>);
  }
}

export default App;

