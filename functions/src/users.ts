// import * as functions from 'firebase-functions';
// import * as express from 'express';
// import * as admin from 'firebase-admin';

// admin.initializeApp(functions.config().firebase);

// const app = express();
// app.disable("x-powered-by");
// app.get("/users/:uid", async function getUser(req: express.Request, res: express.Response) {
//     // Guess what, uid will NEVER be null in this context because of the Express router.
//     const uid = req.params.uid;
//     res.status(200).send(`You requested user with UID = ${uid}`);
// });

const routes = require('express').Router();

routes.get('/users', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
})

module.exports = routes;