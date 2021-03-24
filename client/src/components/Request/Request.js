import { React, Component } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { NavBar } from '../Navbar/Navbar';

export class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            requestDate: ""
        }
    }

    submitRequest = (event) => {
        event.preventDefault();
        fetch(`/api/createRequest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'address': this.state.address,
                'requestDate': this.state.requestDate,
                'requestorId': localStorage.getItem('id')
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    console.log('Success!');
                } else {
                    console.log('Error: ' + data.message);
                }
            }).catch((error) =>{
                console.log('error: ' + error);
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <NavBar />
                {/* <h2>{this.props.match.params.task}</h2> */}
                <Container>
                    <Form onSubmit={this.submitRequest}>
                        <Form.Row>
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="address" name="address" value={this.state.address} onChange={this.handleChange} />
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Date for task</Form.Label>
                            <Form.Control type="date" placeholder="requestDate" name="requestDate" value={this.state.requestDate} onChange={this.handleChange} />
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <Button variant="primary" type="submit" >Submit</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default Request;