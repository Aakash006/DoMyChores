import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Card, Figure, Container } from "react-bootstrap";

import NavBar from "../Navbar/Navbar";

/* Class to render User profile page */
export class Profile extends React.Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }

        this.state = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            userType: localStorage.getItem('userType'),
            id: localStorage.getItem('id'),
            reviewList: []
        };

    }

    /* This will run methods immediately after a component is mounted */
    componentDidMount() {
        if (this.state.userType === 'Service Provider') {
            this.fetchReviews();
        }
    }

    /* Fetch user reviews and update review list state */
    fetchReviews() {
        fetch(`/api/review/${this.state.username}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        reviewList: data.reviews
                    })
                }
            }).catch((error) => {
                console.log("error: " + error);
            });
    }

    /* Render the component */
    render() {
        return (
            <>
                <NavBar />
                <Jumbotron style={{ textAlign: 'center', background: '#2b2c2b' }}>
                    <h1>{this.state.username}</h1>
                    <p style={{ color: 'white' }}><b>Email:</b> {this.state.email}</p>
                    <p style={{ color: 'white' }}><b>User Type:</b> {this.state.userType}</p>

                </Jumbotron>
                {
                    localStorage.getItem('userType') === 'Service Provider' ? (this.state.reviewList.length > 0 ?
                        <Container className="cards">
                            <div style={{ padding: '10px', textAlign: 'initial' }}>
                                <h1 style={{ borderBottom: '1px solid rgb(199, 205, 209)' }}>Reviews</h1>
                                {
                                    this.state.reviewList.map((rev, id) => {
                                        return <Card key={id} style={{ marginTop: '20px' }} bg="dark" text="white">
                                            <Card.Body>
                                                <Card.Title style={{ borderBottom: '0.2px solid gray' }}>Review {id + 1}</Card.Title>
                                                <Card.Text><b>From:</b> {rev.fromUsername}</Card.Text>
                                                <Card.Text><b>Comment:</b> {rev.comment}</Card.Text>
                                                <Card.Text><b>Ratings:</b> {rev.ratings}</Card.Text>
                                                <Card.Text><b>Date Posted:</b> {rev.datePosted}</Card.Text>
                                                {
                                                    rev.pictureLinks.map((pic, pid) => {
                                                        return <Figure key={pid}>
                                                            <Figure.Image
                                                                width={171}
                                                                height={180}
                                                                alt="171x180"
                                                                src={pic}
                                                            />
                                                        </Figure>
                                                    })
                                                }
                                            </Card.Body>
                                        </Card>
                                    })
                                }
                            </div>
                        </Container>
                        :
                        <h1>No reviews</h1>) : ('')}
            </>
        );
    }
}

export default withRouter(Profile);
