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
import Review from './components/ReviewRequest/Review';


function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/dashboard" />
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/history' component={History}/>
                    <Route path='/request/:task' component={Request}/>
                    <Route path='/review/:requester/:provider' component={Review} />
                    <Route path='/requests' component={Requests}/>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/profile' component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
