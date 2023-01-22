import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import Create from './components/create/create';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/create" component={Create}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
