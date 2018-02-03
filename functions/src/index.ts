import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import * as usersApi from "./usersApi/users";
import * as infoApi from "./infoApi/info";

admin.initializeApp(functions.config().firebase);

const userApp = express();
const infoApp = express();

userApp.disable('x-powered-by');
userApp.use('/', usersApi.userRouter);

infoApp.disable('x-powered-by');
infoApp.use('/', infoApi.infoRouter);

exports.usersApi = functions.https.onRequest(userApp);
exports.infoApi = functions.https.onRequest(infoApp);