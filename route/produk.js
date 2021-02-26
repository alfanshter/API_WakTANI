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
        uid : uid
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

//@route GET api/produk/produk/
//@desc  Create a Produk
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



module.exports = router 