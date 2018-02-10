import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { Link } from 'react-router-dom';
import firebase from '../firebase/firebase';
import Result from './Result';

class Poll extends React.Component {
    state = {
        loaded: false,
    };

    id = this.props.location.state;

    componentDidMount() {
        firebase.database().ref(`/polls/${this.id}`).on('value', (snapshot) => {
            this.setState((prevState) => {
                return {
                    loaded: true,
                    id : snapshot.key,
                    ...snapshot.val(),
                }
            });
        });
    };

    onChange = (selectedOption) => {
        this.setState(() => ({
            selectedOption,
        }));
    };

    handleSubmitVote = (e) => {
        const updatedValue = this.state.options[this.state.selectedOption].value + 1;
        firebase.database().ref(`/polls/${this.id}/options/${this.state.selectedOption}`).update({ value: updatedValue });
        firebase.database().ref(`/polls/${this.id}/`).update({changeable : false});
    };

    handleDelete = (e) => {
        firebase.database().ref(`/polls/${this.id}`).remove();
        firebase.database().ref('/recent/').remove();
        this.props.history.push('/');
    };

    render() {
        console.log(this.state)
        return (
            <Container className="my-3 px-5">
                {this.state.loaded ? (
                    <Row className="m-5">
                        <Col md="12" lg="6" >
                            <span className="lead">{this.state.question}</span>
                            <RadioGroup onChange={this.onChange} >
                                <ReversedRadioButton rootColor="#616161" value="option1" iconSize={20} >
                                    {this.state.options.option1.key}
                                </ReversedRadioButton>
                                <ReversedRadioButton rootColor="#616161" value="option2" iconSize={20} >
                                    {this.state.options.option2.key}
                                </ReversedRadioButton>

                                {this.state.options.option3 ? (
                                    <ReversedRadioButton rootColor="#616161" value="option3" iconSize={20} >
                                        {this.state.options.option3.key}
                                    </ReversedRadioButton>
                                ) : (
                                        <ReversedRadioButton rootColor="#616161" disabled value="option3" iconSize={20} >
                                            This option is not available
                                    </ReversedRadioButton>
                                    )
                                }

                                {this.state.options.option4 ? (
                                    <ReversedRadioButton rootColor="#616161" value="option4" iconSize={20} >
                                        {this.state.options.option4.key}
                                    </ReversedRadioButton>
                                ) : (
                                        <ReversedRadioButton rootColor="#616161" disabled value="option4" iconSize={20} >
                                            This option is not available
                                    </ReversedRadioButton>
                                    )
                                }


                            </RadioGroup>

                            <Button block color="primary" onClick={this.handleSubmitVote}>Vote!</Button>

                            <Row className="py-3">
                                <Col>
                                    <Button 
                                        color="info" 
                                        tag={Link}
                                        to={{
                                            pathname: '/edit-poll/',
                                            state: this.state.id,
                                        }}
                                        disabled={!this.state.changeable}
                                        block>Edit!</Button>
                                </Col>
                                <Col>
                                    <Button color="danger" disabled={!this.state.changeable} block onClick={this.handleDelete}>Delete!</Button>
                                </Col>
                            </Row>
                        </Col>

                        <Col md="12" lg="6" className="align-self-center text-center">
                            <Result id={this.id} />
                        </Col>

                    </Row>
                ) : <h1 className="display-2 p-5 text-center">Loading....</h1>}
            </Container>
        )
    }
};

export default Poll;