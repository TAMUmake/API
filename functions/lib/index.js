"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const usersApi = require("./usersApi/users");
const infoApi = require("./infoApi/info");
admin.initializeApp(functions.config().firebase);
// const app = express();
// // https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
// app.disable("x-powered-by");
// // Any requests to /api/users will be routed to the user router!
// app.use("/users", usersApi.userRouter);
// // Again, lets be nice and help the poor wandering servers, any requests to /api
// // that are not /api/users will result in 404.
// app.get("*", async (req: express.Request, res: express.Response) => {
// 	res.status(404).send("This route does not exist.");
// });
// exports.api = functions.https.onRequest(app);
const userApp = express();
const infoApp = express();
userApp.disable('x-powered-by');
userApp.use('/', usersApi.userRouter);
infoApp.disable('x-powered-by');
infoApp.use('/', infoApi.infoRouter);
exports.usersApi = functions.https.onRequest(userApp);
exports.infoApi = functions.https.onRequest(infoApp);
//# sourceMappingURL=index.js.map