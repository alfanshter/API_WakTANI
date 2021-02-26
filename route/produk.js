const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");

const db = admin.firestore()


module.exports = router 