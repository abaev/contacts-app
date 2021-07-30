import {
  Switch,
  Route
} from "react-router-dom";
import Login from '@/components/login/Login';
import Contacts from '@/components/contacts/Contacts';

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;

