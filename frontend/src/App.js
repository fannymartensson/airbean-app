import './styles/main.scss';
import Signup from './views/Signup';
import About from './views/About';
import Menu from './views/Menu';
import { Route, Switch } from 'react-router-dom'
import Profile from './views/Profile';
import Navigation from './views/Navigation';
import Status from './views/Status';




function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Signup} exact />
        <Route path="/about" component={About} exact/>
        <Route path="/menu" component={Menu} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/navigation" component={Navigation} exact />
        <Route path="/status" component={Status} exact />
         
      </Switch>
    </div>
  );
}

export default App;
