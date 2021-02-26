const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
var admin = require("firebase-admin");
var serviceAccount = require("./wak-tani-firebase-adminsdk-2puv4-b86c48bc92.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const autentifikasi = require('./route/akun')
const insertproduk = require('./route/produk')
const kategori = require('./route/kategori')

app.use('/api/users', autentifikasi);
app.use('/api/produk', insertproduk);
app.use('/api/kategori', kategori);


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