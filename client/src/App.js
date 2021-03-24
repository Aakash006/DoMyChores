import './App.css';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Profile } from './components/Profile/Profile';
import { History } from './components/History/History';
import { Request } from './components/Request/Request';
import { Requests } from './components/Requests/Requests';


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
                    <Route path='/history'>
                        {
                            localStorage.getItem("id") === null ? <Redirect to="/login"/> : <History/>
                        }
                    </Route>
                    <Route path='/request/:task'>
                        {
                            localStorage.getItem("id") === null ? <Redirect to="/login"/> : <Request/>
                        }
                    </Route>
                    <Route path='/requests'>
                        {
                            localStorage.getItem("id") === null ? <Redirect to="/login"/> : <Requests/>
                        }
                    </Route>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
