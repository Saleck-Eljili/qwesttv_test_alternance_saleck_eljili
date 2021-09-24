import "./App.css";
import PersonDetail from "./components/PersonDetail";
import EditPerson from "./components/EditPerson";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PersonDetail} />
          <Route exact path="/EditPerson/editID/:id" component={EditPerson} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
