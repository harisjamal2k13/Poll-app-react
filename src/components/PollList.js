import React from 'react';
import PollListItems from './PollListItems';
import { Row, Col } from 'reactstrap';
import firebase from 'firebase';

class PollList extends React.Component {

    state = {
        polls: [],
    };

    componentWillMount() {
        firebase.database().ref('/polls/').on('value', (snapshot) => {

            const pollObjArr = [];

            snapshot.forEach((childSnapshot) => {
                pollObjArr.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val(),
                });
            });
            this.setState((prevState) => {
                return ({
                    polls: [...pollObjArr],
                });
            });
        });
    };

    render() {
        return (
            <Row>
                {this.state.polls.reverse().map((poll) => {
                    return (
                        <Col key={poll.id} sm="4">
                            <PollListItems poll={poll} />
                        </Col>
                    )
                })}
            </Row>
        )
    }

};


export default PollList;