import React from 'react'
import ThreadPreview from './ThreadPreview'

const ThreadList = ({threads, onThreadClick}) => (

    <div className="ThreadList">
        {Object.keys(threads).map(threadId =>
            <ThreadPreview
                key={threadId}
                onClick={onThreadClick}
                {...threads[threadId]} />
        )}
    </div>
)

ThreadList.propTypes = {
    threads: React.PropTypes.object,
    onThreadClick: React.PropTypes.func.isRequired
}

export default ThreadList;
