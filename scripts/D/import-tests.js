const admin = require('firebase-admin');
const fs = require('fs');

const serviceAccount = require('./serviceAccountKey.json'); // Replace with your Firebase service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const tests = JSON.parse(fs.readFileSync('tests.json'));

async function importTests() {
    for (const test of tests) {
        await db.collection('tests').add(test);
        console.log(`Added: ${test.Test_Name}`);
    }
    console.log('All tests imported successfully!');
}

importTests().catch(console.error);
