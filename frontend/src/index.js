import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import 'bootstrap-material-design';

import CONST from './config';

import App from './App';
import * as serviceWorker from './serviceWorker';

// include polyfill ???
// import "formdata-polyfill";
// import "whatwg-fetch";

////  import '@babel/polyfill';

// end polyfill

// Material Design Bootstrap

import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById('root'),
    () => {
        console.log('init');
        $('body').bootstrapMaterialDesign();
    }
);

console.log(CONST.API_URL);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
