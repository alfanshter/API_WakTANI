const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");

const db = admin.firestore()

router.post('/produk' , async (req,res)=>{
    const {foto,nama_produk,deskripsi,manfaat,penyimpanan,nama_supplier,harga,stok_produk,promo_produk,satuan_produk,kategori_produk,status_produk,waktu_preorder,uid} = req.body

    const docRef = db.collection('produk').doc();
    docRef.set({
        foto : foto,
        nama_produk : nama_produk,
        deskripsi, deskripsi,
        manfaat : manfaat,
        penyimpanan, penyimpanan,
        nama_supplier, nama_supplier,
        harga : harga,
        stok_produk: stok_produk,
        promo_produk: promo_produk,
        satuan_produk: satuan_produk,
        kategori_produk: kategori_produk,
        status_produk: status_produk,
        waktu_preorder: waktu_preorder,
        uid : uid,
        id_produk : docRef.id
    })

    if(!docRef){
        return   res.status(400).json({
            status : res.statusCode,
            message : 'produk gagal di insert'
        })
    }else{
        res.status(200).json({
            status : res.statusCode,
            message : 'produk berhasil di insert'
        })

    }
})

//@route GET api/produk/produk/
//@desc  Create a Produk
//@Access ALL
router.get('/produk' , async (req,res)=>{

        const citiesRef = db.collection('produk');
        const snapshot = await citiesRef.get();

        let getCoffee = snapshot.docs.map((doc) => {
            return doc.data();
      });

      return res.status(200).json({
          status : res.statusCode,
          message : getCoffee
      })

})

//@route GET api/produk/produk/:uid
//@desc  GET produk sesuai uid
//@Access ALL
router.get('/produk/:uid' , async (req,res)=>{

    const {uid} = req.params

    const citiesRef = db.collection('produk');
    const snapshot = await citiesRef.where('uid', '==', uid).get() ;

    let getCoffee = snapshot.docs.map((doc) => {
        return doc.data();
  });

  return res.status(200).json({
      status : res.statusCode,
      message : getCoffee
  })

})

//@route GET api/produk/produk/:uid
//@desc  GET produk sesuai uid
//@Access ALL
router.put('/produk' , async (req,res)=>{
const {foto,nama_produk,deskripsi,manfaat,penyimpanan,nama_supplier,harga,stok_produk,promo_produk,satuan_produk,kategori_produk,status_produk,waktu_preorder,id_produk} = req.body

const cityRef = db.collection('produk').doc(id_produk);
        const snapshot = await cityRef.update(
            {   foto : foto,
                nama_produk : nama_produk,
                deskripsi, deskripsi,
                manfaat : manfaat,
                penyimpanan, penyimpanan,
                nama_supplier, nama_supplier,
                harga : harga,
                stok_produk: stok_produk,
                promo_produk: promo_produk,
                satuan_produk: satuan_produk,
                kategori_produk: kategori_produk,
                status_produk: status_produk,
                waktu_preorder: waktu_preorder
            }).then(function(){
                return res.status(200).json({
                    status : res.statusCode,
                    message : 'Update Berhasil'
                })
              
            }) .catch((error) => {
                return res.status(400).json({
                    status : res.statusCode,
                    message : error
                })
            });;


            
})

//@route DELETE api/produk/produk/:uid
//@desc  DELETE produk sesuai id_produk
//@Access ALL
router.delete('/produk/:id_produk' , async (req,res)=>{
    const {id_produk} = req.params
    const del = await db.collection('produk').doc(id_produk).delete().then(function(){
        return res.status(200).json({
            status : res.statusCode,
            message : 'Delete Berhasil'
        })
    }).catch((error)=>{
        return res.status(400).json({
            status : res.statusCode,
            message : error
        })
    })
})


module.exports = router 