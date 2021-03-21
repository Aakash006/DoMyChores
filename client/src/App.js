import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import Logout from './components/Logout/Logout';

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route path='/dashboard'>
                        {
                            localStorage.getItem("id") === null ? <Redirect to="/login"/> : <Dashboard/>
                        }
                    </Route>
                    <Route path="/logout">
                        {
                            localStorage.getItem("id") === null ? <Redirect to="/login"/> : <Logout/>
                        }
                    </Route>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
