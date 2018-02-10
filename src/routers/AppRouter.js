import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../components/Home';
import Poll from '../components/Poll';
import CreatePoll from '../components/CreatePoll';
import PollList from '../components/PollList';



const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/create-poll/" component={CreatePoll} />
                    <Route path="/edit-poll/" component={CreatePoll} />
                    <Route path="/past-polls/" component={PollList} />
                    <Route path="/:pollName/" exact={true} component={Poll} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;