import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Card, Figure } from "react-bootstrap";

import NavBar from "../Navbar/Navbar";

export class Profile extends React.Component {
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

    componentDidMount() {
        if (this.state.userType === 'Service Provider') {
            this.fetchReviews();
        }
    }

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

    render() {
        return (
            <>
                <NavBar />
                <Jumbotron style={{textAlign: 'center'}}>
                    <h1>{this.state.username}</h1>
                    <p>Email: {this.state.email}</p>
                </Jumbotron>
                {
                    localStorage.getItem('userType') === 'Service Provider' && this.state.reviewList.length > 0 ?
                        <div style={{padding: '10px', textAlign: 'initial'}}>
                            <h1 style={{borderBottom: '1px solid rgb(199, 205, 209)'}}>Reviews</h1>
                            {
                                this.state.reviewList.map((rev, id) => {
                                    return <Card key={id} style={{marginTop: '20px'}}>
                                        <Card.Body>
                                            <Card.Title>Review</Card.Title>
                                            <Card.Text>From: {rev.fromUsername}</Card.Text>
                                            <Card.Text>Ratings: {rev.ratings}</Card.Text>
                                            <Card.Text>Date Posted: {rev.datePosted}</Card.Text>
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
                        :
                        <h1>No reviews</h1>

                }
            </>
        );
    }
}

export default withRouter(Profile);
