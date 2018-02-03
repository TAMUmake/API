import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

/**
 * User API Endpoints:
 * - 
 */
export * from './users';

/**
 * Miscellaneous API Endpoints:
 * - getStats - Returns useful statistical information about the registration.
 */
export * from './misc';

