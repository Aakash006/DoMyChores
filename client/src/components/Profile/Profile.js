import React from "react";
import { withRouter } from "react-router-dom";
import { Jumbotron, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import NavBar from "../Navbar/Navbar";

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            userType: localStorage.getItem('userType'),
            id: localStorage.getItem('id'),
            reviewList: []
        };
        if (this.state.userType === 'Service Provider') {
            this.fetchReviews();
        }
    }

    fetchReviews() {
        fetch(`/api/review/${this.state.username}`, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        reviewList: data.reviews
                    })
                } else {
                    toast.error('Error in getting reviews');
                }
            }).catch((error) => {
                console.log("error: " + error);
            });
    }
    
    render() {
        return (
            <div>
                <NavBar />
                <ToastContainer/>
                <Jumbotron>
                    <h1>{this.state.username}</h1>
                    <p>Email: {this.state.email}</p>
                </Jumbotron>
                {localStorage.getItem('userType') === 'Service Provider' ? 
                <Table>
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
                        <tr>
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
                        </tr>
                    })}
                </Table> : ('')}
            </div>
        );
    }
}

export default withRouter(Profile);
