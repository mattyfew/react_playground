import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './src/components/App'
import axios from 'axios';
import config from './config';


const getApiUrl = threadId => {
    if (threadId) {
        return `${config.serverUrl}/api/threads/${threadId}`;
    }
    return `${config.serverUrl}/api/threads`;
}

const getInitialData = (threadId, apiData) => {
    if(threadId){
        return {
            currentThreadId: apiData._id,
            threads: {
                [apiData._id]: apiData
            }
        }
    }
    return {
        threads: apiData.threads
    }
}


const serverRender = (threadId) =>
    axios.get(getApiUrl(threadId))
        .then(resp => {
            const initialData = getInitialData(threadId, resp.data)
            return {
                initialMarkup: ReactDOMServer.renderToString(
                    <App initialData={initialData} />
                ),
                initialData: initialData
            }
        });

export default serverRender;
