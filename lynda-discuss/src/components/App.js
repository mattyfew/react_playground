import React from 'react';
import Header from './Header';
import ThreadList from './ThreadList';
import Thread from './Thread';
import * as api  from '../api';

// this changes the url
const pushState = (obj, url) =>
    window.history.pushState(obj, '', url)

const onPopState = handler => {
    window.onpopstate = handler;
}

class App extends React.Component {
    static propTypes = {
        initialData: React.PropTypes.object.isRequired,
        fetchThread: React.PropTypes.func.isRequired,
        fetchThreadList: React.PropTypes.func.isRequired,
        fetchNames: React.PropTypes.func.isRequired,
        addName: React.PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.fetchThread = this.fetchThread.bind(this)
        this.fetchThreadList = this.fetchThreadList.bind(this)
        this.fetchNames = this.fetchNames.bind(this)
        this.addName = this.addName.bind(this)
        this.state = this.props.initialData
    };

    componentDidMount() {
        onPopState((event) => {
            this.setState({
                currentThreadId: (event.state || {}).currentThreadId
            })
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

    fetchThread(threadId) {
        pushState(
            { currentThreadId: threadId },
            `/thread/${threadId}`
        );

        api.fetchThread(threadId).then(thread => {
            this.setState({
                currentThreadId: thread._id,
                threads: {
                    ...this.state.threads,
                    [thread._id]: thread
                }
            });
        });
    };

    fetchThreadList() {
        pushState({ currentThreadId: null }, `/` );

        api.fetchThreadList().then(threads => {
            this.setState({ currentThreadId: null, threads });
        });
    };

    fetchNames(nameIds) {
        if(nameIds.length === 0) { return; }

        api.fetchNames(nameIds).then(names => {
            this.setState({names})
        })
    };

    addName (newName, threadId ) {
        api.addName(newName, threadId).then(resp =>
            this.setState({
                threads: {
                    ...this.state.threads,
                    [resp.updatedThread._id]: resp.updatedThread
                },
                names: {
                    ...this.state.names,
                    [resp.newName._id]: resp.newName
                }
            })
        ).catch(console.error);
    }

    currentThread() {
        return this.state.threads[this.state.currentThreadId];
    };

    lookupName(nameId) {
        if(!this.state.names || !this.state.names[nameId]) {
            return {name: '...'}
        }
        return this.state.names[nameId]
    }

    currentContent() {
        if (this.state.currentThreadId){
            return <Thread
                threadListClick={this.fetchThreadList}
                fetchNames={this.fetchNames}
                lookupName={this.lookupName}
                addName={this.addName}
                {...this.currentThread()} />
        }

        return <ThreadList
            onThreadClick={this.fetchThread}
            threads={this.state.threads} />;
    };


    pageHeader() {
        if(this.state.currentThreadId){
            return this.currentThread().name
        }

        return "Discuss!!"
    };

    render(){
        return (
            <div className="App">
                <Header message={this.pageHeader()} />
                {this.currentContent()}
            </div>
        )
    }
}

export default App;
