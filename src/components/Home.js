import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import firebase from '../firebase/firebase';

class Home extends React.Component {

    state = {
        question: 'Loading....',
        exists : false,
    };

    componentWillMount() {
        firebase.database().ref('recent').on('value', (snapshot) => {
            const questionObj = snapshot.val();
            this.setState(() => ({
                question: questionObj? questionObj.question : `The most recent poll seems to have been deleted!`,
                questionName : questionObj ? questionObj.questionName : ``,
                exists: questionObj ? true : false,
                id :questionObj ? questionObj.id : '/',
            }));
        });
    };

    render() {
        return (
            <Container>
                <Row className="m-5">
                    <Col xs="12" sm="8" className="align-self-center text-center">
                        <h3 className="display-4">Recent Poll!</h3>
                        <p>{this.state.question}</p>
                        {this.state.exists === true ? (<Button color="primary" to={{pathname : this.state.questionName, state: this.state.id}} size="lg"  tag={Link} >
                            Go to Poll
                        </Button> ): undefined}
                    </Col>
                    <Col xs="12" sm="4">
                        <Row className="my-5">
                            <Col className="align-self-center text-center">
                                <Button color="primary" size="lg" className="py-4" to="/create-poll" block tag={Link}>
                                    Create Poll
                                </Button>
                            </Col>
                        </Row>

                        <Row className="my-5">
                            <Col className="align-self-center text-center">
                                <Button color="primary" className="py-4" to="/past-polls" size="lg" block tag={Link} >
                                    View Polls
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </Container>
        );
    }
};

export default Home;