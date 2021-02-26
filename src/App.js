import './App.css';
import React from "react";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Tab, Tabs, Container} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
          <Tab eventKey="login" title="Login">
            <Login/>
          </Tab>
          <Tab eventKey="register" title="Register">
            <Register/>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default App;
