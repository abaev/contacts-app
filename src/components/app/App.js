import {
  Switch,
  Route
} from "react-router-dom";
import Login from '@/components/login/Login';
import ContactsList from '@/components/contacts/ContactsList';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>

      <Switch>
        <Route path="/contacts/:userID">
          <ContactsList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

