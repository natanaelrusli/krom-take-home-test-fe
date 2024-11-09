import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

function App() {
  const fetchLocationData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/location");
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      await response.json();
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path='/'>
            <div></div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
