const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");


const db = admin.firestore()

router.post('/user' , async (req,res) =>{
    const {email,telepon,password,nama} = req.body
    admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      phoneNumber: telepon,
      password: password,
      displayName: nama,
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    })
    .then((userRecord) => {
      const docRef = db.collection('users').doc(userRecord.uid);

       docRef.set({
        nama: nama,
        email: email,
        telepon: telepon,
        password : password,
        photoURL : 'http://www.example.com/12345678/photo.png'
      });

      return res.status(200).json({
        status : res.statusCode,
        message : 'Pendafataran Berhasil',
        uid : userRecord.uid
    })

      
    })
    .catch((error) => {
        return res.status(400).json({
            status : res.statusCode,
            message : error
        })
    });
  
})

router.get('/user/:uid' ,async (req,res)=>{
        const {uid} = req.params
    admin
  .auth()
  .getUser(uid)
  .then((userRecord) => {
    return res.status(200).json({
        status : res.statusCode,
        message : userRecord.toJSON()
    })

  })
  .catch((error) => {
    return res.status(400).json({
        status : res.statusCode,
        message : error
    })

  });

})

router.put('/user', async (req,res)=>{
    const {email,telepon, password, nama,foto,uid} = req.body
    admin
  .auth()
  .updateUser(uid, {
    email: email,
    phoneNumber: telepon,
    emailVerified: true,
    password: password,
    displayName: nama,
    photoURL: foto,
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.

    async function updateDocument(db) {
        const cityRef = db.collection('users').doc(userRecord.uid);
        const res = await cityRef.update(
            {email: email,
            nama : nama,
            password : password,
            photoURL : foto,
            telepon: telepon
            });
      }
      updateDocument(db)
      res.status(200).json({
        status : res.statusCode,
        message : 'Update data Berhasil'
    })

  })
  .catch((error) => {
    return res.status(400).json({
        status : res.statusCode,
        message : 'Update data gagal'
    })
  });

})

router.delete('/user/:uid' ,async (req,res)=>{
    const{uid} = req.params

    admin
    .auth()
    .deleteUser(uid)
    .then(() => {
        async function deleteDocument(db) {
        const res = await db.collection('users').doc(uid).delete();
        return res.status(200).json({
            status : res.statusCode,
            message : 'Delete data berhasil'
        })
        }
        deleteDocument(db)
    })
    .catch((error) => {
        return res.status(400).json({
            status : res.statusCode,
            message : 'Hapus Data Gagal'
        })
    });
  
})

module.exports = router 