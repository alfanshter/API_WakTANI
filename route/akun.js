const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");


const db = admin.firestore()

//@route POST api/users/user/
//@desc  Create new user
//@Access ALL 
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
        message : 'Get Data berhasil',
        data : userRecord.toJSON()
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
    .then(function(){
      const res =  db.collection('users').doc(uid).delete();
      return res.status(200).json({
        status : res.statusCode,
        message : 'Delete Berhasil'
    })

    }).catch((error) => {
      return res.status(400).json({
        status : res.statusCode,
        message : 'Delete Gagal'
    })

    });
  
})

//@route POST api/users/login/
//@desc  Login user Android
//@Access ALL 
router.post('/login', async (req,res)=>{
  const {email,nama,telepon,foto,uid,token} = req.body

    const LoginRef = db.collection('users').doc(uid)
    const snapshot = LoginRef.set({
      nama : nama,
      email : email,
      telepon : telepon,
      foto : foto,
      uid : uid,
      token : token
    }).then(function(){
      return res.status(200).json({
        status : res.statusCode,
        message : 'Insert Data berhasil'
    })
    }).catch((error)=>{
      return res.status(400).json({
        status : res.statusCode,
        message : error
    })
    })
})

//@route GET api/users/login/
//@desc  Create a Produk
//@Access ALL
router.get('/login/:uid' , async (req,res)=>{

  const{uid} = req.params

  const citiesRef = db.collection('users').doc(uid);
  const snapshot = await citiesRef.get();

  if(!snapshot.exists){
    return res.status(400).json({
      status : res.statusCode,
      message : 'Tidak ada User'
  })
  }else{
    return res.status(200).json({
      status : res.statusCode,
      message : snapshot.data()
  })

  }


})


module.exports = router 