import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Card, Figure, Container } from "react-bootstrap";

import NavBar from "../Navbar/Navbar";

/* Class to render custom profiles */
export class CustomProfile extends React.Component {
    /* class constructor to initialize the props and states */
    constructor(props) {
        super(props);
        if (localStorage.getItem("id") === null) {
            window.location.replace(`${window.location.protocol + '//' + window.location.host}/login`);
        }
        this.state = {
            username: this.props.match.params.username,
            email: '',
            userType: '',
            id: '',
            reviewList: []
        };

    }

    /* This will run methods immediately after a component is mounted */
    componentDidMount() {
        this.fetchAccountDetails()
        .then(e => {
            if (this.state.userType === 'Service Provider') {
                console.log(this.state.userType)
                this.fetchReviews();
            }
        })
    }

    /* This method will fetch account details */
    fetchAccountDetails() {
        return fetch(`/api/profile/${this.state.username}`)
            .then(res => res.json())
            .then(dat => {
                this.setState({ email: dat.email, userType: dat.userType, id: dat.id })
            })
    }

    /* This method will fetch all the reviews associated to the suer */
    fetchReviews() {
        fetch(`/api/review/${this.props.match.params.username}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        reviewList: data.reviews
                    })
                    console.log(data)
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
                    this.state.reviewList.length > 0 ?
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
                        <h1>No reviews</h1>}
            </>
        );
    }
}

export default withRouter(CustomProfile);
