import React from 'react';
import firebase from '../firebase/firebase'
import { PieChart, Legend } from 'react-easy-chart';

class Result extends React.Component {
    state = {
        options: [],
    };

    componentDidMount() {
        firebase.database().ref(`/polls/${this.props.id}/options/`).on('value', (snapshot) => {
            const optionArr = [];
            snapshot.forEach((childSnapshot) => {
                optionArr.push(childSnapshot.val());
                this.setState(() => ({
                    options: [...optionArr]
                }));
            });
        })
    };

    render() {
        
        console.log(this.state.options)
        return (
            <div className="py-5">
                <PieChart data={this.state.options}
                size={150}
                styles={{
                    '.chart_lines': {
                      strokeWidth: 0
                    },
                    '.chart_text': {
                      fontFamily: 'serif',
                      fontSize: '1.25rem',
                      fill: '#333'
                    }
                  }} />
                <Legend data={this.state.options} dataId={'key'} horizontal />
            </div>
        )
    }
};

export default Result;