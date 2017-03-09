import config from './config'
import apiRouter  from './api'
import sassMiddleware from 'node-sass-middleware'
import path from 'path'
import bodyParser from 'body-parser'
import express from 'express'
const server = express()

server.use(bodyParser.json)

server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}))

server.set('view engine', 'ejs')

import serverRender from './serverRender'

server.get( [ '/', '/thread/:threadId' ], (req,res) => {
    serverRender(req.params.threadId)
        .then(({ initialMarkup, initialData } ) => {
            res.render('index', {initialMarkup, initialData})
        })
        .catch(error => {
            console.error(error);
            res.send(404).send('Bad Request')
        })
})

server.use('/api', apiRouter)
server.use(express.static('public'))

server.listen(config.port, config.host, () => {
    console.log('Express listening on port '  + config.port);
})
