"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
exports.userRouter = express.Router();
// userRouter.get("/:uid", async function getUser(req: express.Request, res: express.Response) {
//   const uid = req.params.uid;
//   res.status(200).send(`You requested user with UID = ${uid}`);
// });
// // userRouter.post('/test', async function postTest(req: express.Request, res: express.Response) {
// // }) 
// userRouter.post("/login", async function getUser(req: express.Request, res: express.Response) {
//   const login: Login = req.body;
// });
// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
exports.userRouter.get("*", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(404).send("This route does not exist.");
}));
exports.onUserCreate = functions.auth.user().onCreate((event) => {
    const user = event.data;
    const fullName = user.displayName || 'Anonymous';
    return admin.database().ref('users/' + user.uid).update({
        'name': fullName,
        'applied': false,
        'email': user.email,
        'data': admin.database.ServerValue.TIMESTAMP
    });
});
//# sourceMappingURL=users.js.map