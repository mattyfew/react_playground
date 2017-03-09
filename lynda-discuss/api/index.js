import express from 'express'
import { MongoClient,ObjectID } from 'mongodb'
import assert from 'assert'
import config from '../config'

let mdb;

MongoClient.connect(config.mongodbUri, (err, db) => {
    assert.equal(null, err)
    mdb = db
})

const router = express.Router()

router.get('/threads', (req, res) => {
    let threads = {};
    mdb.collection('threads').find({}).project({category: 1, name: 1})
      .each((err, thread) => {
        assert.equal(null, err);

        if (!thread) { // no more threads
            res.send({threads});
            return;
        }

        threads[thread._id] = thread;
    });
})

router.get('/names/:nameIds', (req,res) => {
    const nameIds = req.params.nameIds.split(',').map(ObjectID)
    let names = {}
    mdb.collection('names').find({ _id: {$in: nameIds}})
        .each((err, name) => {
            assert.equal(null, err)

            if(!name) { res.send({names}); return; }

            names[name._id] = name
        })
})

router.get('/threads/:threadId', (req,res) => {
    mdb.collection('threads')
        .findOne({ _d: ObjectID(req.params.threadId) })
        .then(thread => res.send(thread))
        .catch(error => {
            console.error(error);
            res.state(404).send('Bad Request')
        })
})

router.post('/names', (req,res) => {
    const threadId = ObjectID(req.body.threadId)
    const name = req.body.newname

    mdb.collection('names').insertOne({ name }).then(result =>
        mdb.collection('threads').findAndModify(
            {_id: threadId },
            [],
            { $push: {threadIds: result.insertedId } },
            { new: true }
        ).then(doc =>
            res.send({
                updatedThread: doc.value,
                newName: { _id: result.insertedId, name }
            })
        ).catch(error => {
            console.error(error);
            res.state(404).send('Bad Request')
        })
    )
})

export default router;
