import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Table } from "react-bootstrap";

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
            <div>
                <NavBar />
                <Jumbotron>
                    <h1>{this.state.username}</h1>
                    <p>Email: {this.state.email}</p>
                </Jumbotron>
                {localStorage.getItem('userType') === 'Service Provider' && this.state.reviewList.length > 0 ?
                    (<Table>
                        <thead>
                            <tr>
                                <td colSpan="4">
                                    <h2>Reviews</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    From
                            </td>
                                <td>
                                    Ratings
                            </td>
                                <td>
                                    Date Posted
                            </td>
                                <td>
                                    Pictures
                            </td>
                            </tr>
                        </thead>
                        {this.state.reviewList.map((review) => {
                            return (<tr>
                                <td>
                                    {review.fromUsername}
                                </td>
                                <td>
                                    {review.ratings}
                                </td>
                                <td>
                                    {review.datePosted}
                                </td>
                                <td>
                                    {review.pictureLinks}
                                </td>
                            </tr>)
                        })}
                    </Table>) : (<h1>No reviews</h1>)}
            </div>
        );
    }
}

export default withRouter(Profile);
