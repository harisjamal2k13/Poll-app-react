import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, FormText } from 'reactstrap';
import firebase from '../firebase/firebase';

export default class CreatePoll extends React.Component {
    state = {
        fromEdit: false,
        loaded: false,
        pollData: {
            questionName: '',
            question: '',
            options: {
                option1: {
                    key: '',
                    value: 0,
                },
                option2: {
                    key: '',
                    value: 0,
                },
                option3: {
                    key: '',
                    value: 0,
                },
                option4: {
                    key: '',
                    value: 0,
                },
            },
        },
    };

    componentDidMount() {
        const key = this.props.location.state;
        if (key) {
            firebase.database().ref(`/polls/${key}`).on('value', (snapshot) => {
                const pollDataFromFB = snapshot.val();
                this.setState(() => ({
                    fromEdit: true,
                    loaded: true,
                    pollData: {
                        ...pollDataFromFB
                    },
                }));
            });
        }
        else {
            this.setState(() => ({
                loaded: true,
            }));
        }
    };

    handleEdit = (e) => {
        e.preventDefault();
        const key = this.props.location.state;
        const objToUpdate = {
            question: this.state.pollData.question,
            questionName: this.state.pollData.questionName,
            options: this.state.pollData.options,
        };
        firebase.database().ref(`/polls/${key}`).update(objToUpdate);
        this.props.history.push(`/past-polls`);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const questionName = this.state.pollData.questionName.replace(/\s+/g, '-').toLowerCase();
        const poll = {
            question: this.state.pollData.question,
            questionName,
            options: {
                option1: {
                    key: this.state.pollData.options.option1.key,
                    value: this.state.pollData.options.option1.value,
                },
                option2: {
                    key: this.state.pollData.options.option2.key,
                    value: this.state.pollData.options.option1.value,
                },
                option3: this.state.pollData.options.option3.key !== ''
                    ? (
                        {
                            key: this.state.pollData.options.option3.key,
                            value: this.state.pollData.options.option1.value,
                        }) : null,

                option4: this.state.pollData.options.option4.key ? (
                    {
                        key: this.state.pollData.options.option4.key,
                        value: this.state.pollData.options.option1.value,
                    }) : null,
            },
            changeable : true,
        };

        firebase.database().ref('polls').push(poll)
            .then((snapshot) => {
                firebase.database().ref('recent').update({
                    id: snapshot.key,
                });
            });

        firebase.database().ref('recent').update({
            questionName,
            question: this.state.pollData.question,
        });

        this.props.history.push(`/past-polls`);
    };

    render() {
        console.log(this.state);
        
        return (
            <Container className="p-5">
                {this.state.loaded ? (
                    <Form onSubmit={this.state.fromEdit ? this.handleEdit : this.handleSubmit}>
                        <FormGroup>
                            <Label for="questionName">Poll Name :</Label>

                            <Input
                                type="text"
                                name="questionName"
                                id="questionName"
                                value={this.state.pollData.questionName}
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;

                                    pollData.questionName = changedValue;

                                    this.setState({pollData});
                                }}
                                placeholder="Enter Poll Name"
                                required />

                            <FormText color="muted">
                                This is the name that will appear in the URL.
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="question">Poll Question : </Label>

                            <Input
                                type="textarea"
                                name="question"
                                id="question"
                                value={this.state.pollData.question}
                                placeholder="Enter the question."
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;

                                    pollData.question = changedValue;

                                    this.setState(pollData);
                                }}
                                required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="option1">Option One :</Label>

                            <Input
                                type="text"
                                name="option1"
                                id="option1"
                                value={this.state.pollData.options.option1.key}
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;
                                    pollData.options[e.target.name].key = changedValue;

                                    this.setState(pollData);
                                }}
                                placeholder="Enter First Option" required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="option2">Option Two :</Label>
                            <Input
                                type="text"
                                name="option2"
                                id="option2"
                                value={this.state.pollData.options.option2.key}
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;
                                    pollData.options[e.target.name].key = changedValue;

                                    this.setState(pollData);
                                }}
                                placeholder="Enter Second Option"
                                required />
                        </FormGroup>

                        <FormGroup>
                            <Label for="option3">Option Three :</Label>
                            <Input
                                type="text"
                                name="option3"
                                id="option3"
                                value={this.state.pollData.options.option3 ? this.state.pollData.options.option3.key : ' '}
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;

                                    if (pollData.options[e.target.name]) {
                                        pollData.options[e.target.name].key = changedValue;
                                    }
                                    else {
                                        pollData.options[e.target.name] = {
                                            key: changedValue,
                                            value: 0,
                                        }
                                    };
                                    this.setState(pollData);
                                }}

                                placeholder="Enter Third Option (Optional)" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="option4">Option Four :</Label>
                            <Input
                                type="text"
                                name="option4"
                                id="option4"
                                value={this.state.pollData.options.option4 ? this.state.pollData.options.option4.key : ' '}
                                onChange={(e) => {

                                    const pollData = this.state.pollData;
                                    const changedValue = e.target.value;

                                    if (pollData.options[e.target.name]) {
                                        pollData.options[e.target.name].key = changedValue;
                                    }
                                    else {
                                        pollData.options[e.target.name] = {
                                            key: changedValue,
                                            value: 0,
                                        }
                                    };
                                    this.setState(pollData);
                                }}
                                placeholder="Enter Fourth Option (optional)" />
                        </FormGroup>
                        {this.state.fromEdit ? (<Button color="success" size="lg">Edit Poll</Button>) : (<Button color="primary" size="lg">Create Poll</Button>)}
                    </Form>
                ) :
                    <div className="align-content-middle">
                        <h1 className="display-4">Loading....</h1>
                        <p className="lead">Pleae wait</p>
                    </div>
                }
            </Container >
        );
    }
}