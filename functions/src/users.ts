import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserSettings, Settings } from './settings';
import { User } from './models';

const cors = require('cors')({
    origin: true
});

export const getAppliedStatus = functions.https.onRequest((req, res) => {
    cors(req, res, function () {
        const uid = req.query.uid;
        if (UserSettings.getAppliedStatus) {
            if (uid) {
                return admin.database().ref('users/' + uid).child('applied').once('value', (snapshot) => {
                    res.send(snapshot.val());
                })
            } else {
                res.status(401).send(Settings.UNAUTHORIZED_MESSAGE);
                return null;
            }
        } else {
            res.status(403).send(Settings.DISABLED_MESSAGE);
            return null;
        }
    })
})

export const createUser = functions.https.onRequest((req, res) => {
    cors(req, res, function () {
        if (UserSettings.createUserMetaData) {
            const body = req.body;
            const user = new User();
            user.created = admin.database.ServerValue.TIMESTAMP;
            user.email = body.email;
            user.name = body.name;
            user.type = User.HACKER_TYPE;
            if (!body.uid && !user.email) {
                res.status(400).send(Settings.INVALID_MESSAGE);
            } else {

                return admin.database().ref('users/' + body.uid).once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        res.status(400).send(Settings.INVALID_MESSAGE);
                    } else {
                        return admin.database().ref('users/' + body.uid).update(user.toDict()).then((value) => {
                            if (UserSettings.updateUserCount) {
                                const countRef = admin.database().ref('/stats').child('users');
                                return countRef.transaction(function (current) {
                                    res.end();
                                    return (current || 0) + 1;
                                })
                            }
                            res.end();
                            return null;
                        })
                    }
                    return null;
                })

            }
        } else {
            res.status(403).send(Settings.DISABLED_MESSAGE);
        }
        return null;
    })
})

/**
 * registerUser (POST) - Submits a user's application.
 * - Handles multiple save requests.
 * - Updates applied statistic on first time applying.
 */
export const registerUser = functions.https.onRequest((req, res) => {
    cors(req, res, function () {

        const body = req.body;
        body.applied = true;
        body.timestamp = admin.database.ServerValue.TIMESTAMP
        if (body.uid) {
            return admin.database().ref('users/' + body.uid).child('applied').once('value', (snapshot) => {

                return admin.database().ref('users/' + body.uid).update(body).then((value) => {
                    if (!snapshot.val()) {
                        const countRef = admin.database().ref('/stats').child('applied');
                        return countRef.transaction(function (current) {
                            res.end();
                            return (current || 0) + 1;
                        })
                    }
                    res.end();
                    return null;
                })
            })
        } else {
            res.status(401).send('Unauthorized');
            return null;
        }
    })
})


