import './App.css';
import { Route, Switch } from 'react-router-dom'

import Auth from './components/auth/auth';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './utils/privateRoute';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route 
          exact path='/register'
          render={props => <Auth method="register" {...props}/>}
        />
        <Route 
          exact path='/login'
          render={props => <Auth method="login" {...props}/>}
        />
        <PrivateRoute 
          exact path='/dashboard'
          component={Dashboard}
        />
      </Switch>
      
    </div>
  );
}

export default App;
