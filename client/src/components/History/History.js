import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { NavBar } from '../Navbar/Navbar';
import RequesterHistory from '../HistoryCards/RequesterHistory';
import ProviderHistory from '../HistoryCards/ProviderHistory';
import { ToastContainer } from 'react-toastify';

/* Class to render custom profiles */
export class History extends Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        super(props);
        this.state = {
            requests: []
        };
    }

    /* This will run methods immediately after a component is mounted */
    componentDidMount() {
        this.fetchRecents()
    }

    /* Fetch recent request from the server and update state*/
    fetchRecents() {
        const userType = localStorage.getItem('userType') === 'Customer' ? 'requesterUserName' : 'taskerUserName';
        fetch(`/api/service-requests/get-user?${userType}=${localStorage.getItem('username')}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ requests: data });
            });
    }

    /* Complete a request and update action on the server */
    completeRequest = (id, e) => {
        fetch(`/api/service-requests/tasker-complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'id': id,
                'taskerUserName': localStorage.getItem('username')
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    console.log('Success!');
                    window.location.reload(false);
                } else {
                    console.log('Error: ' + data.message);
                }
            }).catch((error) => {
                console.log('error: ' + error);
            });
    }

    /* Render the component */
    render() {
        return (
            <>
                <NavBar />
                <div>
                    <Container className="cards">
                        {localStorage.getItem('userType') === 'Customer' ? <RequesterHistory requests={this.state.requests} /> : <ProviderHistory requests={this.state.requests} />}
                    </Container>
                </div>
                <ToastContainer />
            </>
        );
    }
}

export default withRouter(History);