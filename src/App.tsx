import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicationListPage from "./pages/ApplicationListPage";
import "./App.css";
import CreateApplicationPage from "./pages/CreateApplicationPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/create'>
          <CreateApplicationPage />
        </Route>
        <Route path='/'>
          <ApplicationListPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
