import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { MiscSettings, Settings } from './settings';

const cors = require('cors')({
    origin: true
});

export const getStats = functions.https.onRequest((req, res) => {
    cors(req, res, function () {

        if (MiscSettings.getStats) {
            return admin.database().ref('/stats').once('value', (snapshot) => {
                res.send(snapshot.val());
            })
        } else {
            return res.status(403).send(Settings.DISABLED_MESSAGE);
        }
    })
})
