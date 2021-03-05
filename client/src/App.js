import './App.css';
import React from 'react';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/dashboard' component={Dashboard} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
