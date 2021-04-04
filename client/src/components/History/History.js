import { React, Component } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { NavBar } from '../Navbar/Navbar';
import RequesterTable from '../HistoryTable/RequesterTable';
import ProviderTable from '../HistoryTable/ProviderTable';

export class History extends Component {
    constructor(props) {
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        super(props);
        this.state = {
            requests: []
        };
    }

    componentDidMount() {
        this.fetchRecents()
    }

    fetchRecents() {
        const userType = localStorage.getItem('userType') === 'Customer' ? 'requesterUserName' : 'taskerUserName';
        fetch(`/api/service-requests/get-user?${userType}=${localStorage.getItem('username')}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({requests: data});
            });
    }

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
            }).catch((error) =>{
                console.log('error: ' + error);
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div>
                <Container>
                    {localStorage.getItem('userType') === 'Customer' ? <RequesterTable requests={this.state.requests} /> : <ProviderTable requests={this.state.requests} />}
                </Container>
            </div>
            </div>
        );
    }
}

export default withRouter(History);