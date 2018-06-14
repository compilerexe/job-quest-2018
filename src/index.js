import React from 'react';
import ReactDOM from 'react-dom';
import 'spectre.css/dist/spectre.min.css'
import 'spectre.css/dist/spectre-icons.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
