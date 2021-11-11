import "./App.css";
import { HomeScreen } from "./screens/HomeScreen";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={Signin} exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
