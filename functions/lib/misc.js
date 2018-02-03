"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const settings_1 = require("./settings");
const cors = require('cors')({
    origin: true
});
exports.getStats = functions.https.onRequest((req, res) => {
    cors(req, res, function () {
        if (settings_1.Settings.ROUTE_STATISTICS) {
            return admin.database().ref('/stats').once('value', (snapshot) => {
                res.send(snapshot.val());
            });
        }
        else {
            return res.status(403).send(settings_1.Settings.DISABLED_MESSAGE);
        }
    });
});
//# sourceMappingURL=misc.js.map