const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");


const db = admin.firestore()

//@route POST api/kategori/kategori/
//@desc  POST kategori 
//@Access ALL
router.post('/kategori' , async(req,res)=>{
    const {nama} = req.body
    const docRef = db.collection('kategori').doc()
    docRef.set({
        nama : nama,
        id_kategori : docRef.id
    }).then(function(err){
        return   res.status(200).json({
            status : res.statusCode,
            message : 'Kategori Berhasil di Insert'
        })
    }).catch((error)=>{
        return   res.status(400).json({
            status : res.statusCode,
            message : 'Kategori gagal di insert'
        })
    })
})

//@route GET api/kategori/kategori/
//@desc  GET kategori 
//@Access ALL
router.get('/kategori' , async(req,res)=>{

    const kategoriRef = db.collection('kategori')
    const snapshot = await kategoriRef.get()

    let getsnapshot = snapshot.docs.map((doc)=>{
        return doc.data()
    })

    return res.status(200).json({
        status : res.statusCode,
        message : getsnapshot
    })

})


//@route PUT api/kategori/kategori/
//@desc  PUT kategori 
//@Access ALL

router.put('/kategori' , async(req,res)=>{
    const {nama,id_kategori} = req.body
    const kategoriref = db.collection('kategori').doc(id_kategori)
    const snapshot = await kategoriref.update({
      nama : nama  
    }).then(function(){
        return res.status(200).json({
            status : res.statusCode,
            message : 'Update Berhasil'
        })
      
    }).catch((error) => {
        return res.status(400).json({
            status : res.statusCode,
            message : error
        })
    });;

})

//@route Delete api/kategori/kategori/
//@desc  Delete kategori 
//@Access ALL

router.delete('/kategori/:id_kategori', async (req,res)=>{

    const {id_kategori} = req.params
    const kategoriref= db.collection('kategori').doc(id_kategori)
    const snapshot = kategoriref.delete().then(function(){
        return res.status(200).json({
            status : res.statusCode,
            message : 'Delete Berhasil'
        })
      
    }).catch((error) => {
        return res.status(400).json({
            status : res.statusCode,
            message : error
        })
    });;

})




module.exports = router 