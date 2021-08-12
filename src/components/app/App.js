import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from '@/components/login/Login';
import ContactsList from '@/components/contacts/ContactsList';
import React from "react";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>

      <Switch>
        <Route path="/contacts/:userID">
          <ContactsList />
        </Route>

        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>

      <Switch>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>

      {/* <Switch>
        <Route path="/contacts">
          <Redirect to="/contacts/:userID" />
        </Route>
      </Switch> */}
    </React.Fragment>
  );
}

export default App;

