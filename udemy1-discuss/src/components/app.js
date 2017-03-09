import React, { Component } from 'react';

import ThreadList from '../containers/thread-list.js';
import ThreadDetail from '../containers/thread-detail';

export default class App extends Component {
    render() {
        return(
            <div>
                <ThreadList />
                <ThreadDetail />
            </div>
        )
    }
}
