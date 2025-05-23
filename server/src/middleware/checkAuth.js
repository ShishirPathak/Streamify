const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Middleware for checking Firebase ID token
const checkAuth = async (req, res, next) => {
      // Check if the authorization header is present
      // console.log("req.headers: "+ String(req.headers.authorization));
    try{
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
      } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(401).send('Unauthorized');
      }
    }
    catch (error) {
      console.error('Error in checkAuth middleware:', error);
      res.status(500).send('Internal Server Error');
    }
};

module.exports = checkAuth;