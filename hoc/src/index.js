import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { EnhanceDemo1, EnhanceDemo2, EnhanceDemo3 } from './HOC/hoc';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    render() {
        return(
            <Fragment>
                <EnhanceDemo1 color='blue' />
                <EnhanceDemo2 />
                <EnhanceDemo3 />
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
