import "./App.css";
import React from "react";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} />}
                    />
                    <Route
                        exact
                        path="/dashboard"
                        render={(props) => <Dashboard {...props} />}
                    />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
