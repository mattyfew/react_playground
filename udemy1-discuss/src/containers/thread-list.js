// Containers is a component that has direct access to the state that is produced by Redux

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectThread } from '../actions/index';
import { bindActionCreators } from 'redux';


class ThreadList extends Component {

    renderList() {
        return this.props.threads.map((thread) => {
            return(
                <li
                    key={thread.title}
                    onClick={ () => this.props.selectThread(thread) }
                    className="list-group-item">{thread.title}</li>
            )
        })
    }


    render() {
        return(
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
    )}

}

// This is what makes containers useful.  This funciton allows us to map our state properties into the props.
function mapStateToProps(state) {
    // whatever is returned will show up as props inside of ThreadList
    return { threads: state.threads }
}

// Anything returned from this function will end up as props on the ThreadList container
function mapDispatchToProps(dispatch) {
    // this function is what makes the state flow to all the reducers. Whenever selectThread is called, the result should be passed to all of our reducers
    return bindActionCreators({ selectThread: selectThread }, dispatch);
}

// Promote ThreadList from a component to a container - it needs to know about his new dispatch method, selectThread.  Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
