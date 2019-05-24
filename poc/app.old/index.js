// include polyfill
import "formdata-polyfill";
import "whatwg-fetch";

// import '@babel/polyfill';

// end polyfill

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {default as App} from './components/app/App';

// Material Design Bootstrap
import 'bootstrap-material-design';

import './styles/main.scss';

ReactDOM.render(<App />, document.getElementById('app'),
    () => {
        console.log('init');
        $('body').bootstrapMaterialDesign();
    }
);    
