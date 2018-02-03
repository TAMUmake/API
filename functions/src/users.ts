import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { MiscRoutes, Settings } from './settings';

const cors = require('cors')({
    origin: true
});

