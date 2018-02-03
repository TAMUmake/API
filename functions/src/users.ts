import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserSettings , Settings } from './settings';

const cors = require('cors')({
    origin: true
});

export const createUserMetaData = functions.auth.user().onCreate( (event) => {
    if (UserSettings.createUserMetaData) {
        const user = event.data;
        const fullName = user.displayName || 'Anonymous';
        return admin.database().ref('users/'+user.uid).update({
          'name': fullName,
          'applied': false,
          'email': user.email,
          'created': admin.database.ServerValue.TIMESTAMP
        })
    }

    
    return null;
})

export const updateUserCount = functions.auth.user().onCreate ( (event) => {

    if (UserSettings.updateUserCount) {
        const countRef = admin.database().ref('/stats').child('users');
        return countRef.transaction(function(current) {
            return (current || 0) + 1;
        })
    }

    return null;
})