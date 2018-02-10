import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css'


ReactDOM.render(<AppRouter/>, document.getElementById('root'));
registerServiceWorker();
