import * as express from "express";

export let infoRouter = express.Router();

infoRouter.get("/:uid", async function getUser(req: express.Request, res: express.Response) {
  const uid = req.params.uid;
  res.status(200).send(`You requested info with UID = ${uid}`);
});

// Useful: Let's make sure we intercept un-matched routes and notify the client with a 404 status code
infoRouter.get("*", async (req: express.Request, res: express.Response) => {
	res.status(404).send("This route does not exist.");
});