import React from 'react';
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const PollListItems = (props) => {
    return (
        <Card body outline color="primary" className="m-4 p-5">
            <CardText className="lead">{props.poll.question}</CardText>
            <Button color="primary" size="md" block tag={Link}
                to={{
                    pathname: props.poll.questionName,
                    state: props.poll.id
                }} >Open Poll</Button>
        </Card>
    );
};

export default PollListItems;