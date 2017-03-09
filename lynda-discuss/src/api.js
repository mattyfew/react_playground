import axios from "axios";

export const fetchThread = threadId => {
    return axios.get(`/api/threads/${threadId}`)
                .then(resp => resp.data)
}

export const fetchThreadList = () => {
    return axios.get(`/api/threads`)
                .then(resp => resp.data.threads)
}

export const fetchNames = nameIds => {
    return axios.get(`/api/names/${nameIds.join(',')}`)
                .then(resp => resp.data.names)
}

export const addName = (newName, threadId) => {
    return axios.post(`/api/names`, {newName, threadId })
                .then(resp => resp.data)
}
