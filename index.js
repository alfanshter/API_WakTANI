const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const insertproduk = require('./route/akun')

app.use('/api/users', insertproduk);


// const docRef = db.collection('users').doc('alovelace');

// await docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });

app.listen(3000, () => {
    console.log(`server berjalan di 3000`);
});

module.exports = app;