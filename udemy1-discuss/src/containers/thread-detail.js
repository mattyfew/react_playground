import React, { Component } from 'react';
import { connect } from 'react-redux';

class ThreadDetail extends Component {
    render() {
        if (!this.props.thread) {
            return (<div>Select a thread to get started</div>);
        }

        return (
            <div>
                <h3>Details for:</h3>
                <div>Title: {this.props.thread.title}</div>
                <div>Text: {this.props.thread.text}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { thread: state.activeThread }
}

export default connect(mapStateToProps)(ThreadDetail)
