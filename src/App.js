import './App.scss';
import React from 'react'
import { useUserDataLayer } from './contexts/userContext';
import UserTable from './components/Table/UserTable';
import Error from './components/Error/Error';
import UserView from './components/UserView/UserView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  const [{ users }, dispatch] = useUserDataLayer();

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/'>
            {users.length > 0 && <UserTable />}
          </Route>
          <Route path='/:id' children={<UserView />}></Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
