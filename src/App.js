import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import BasePage from './components/BasePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={BasePage}/>
      </Switch>
    </Router>
  );
}

export default App;
