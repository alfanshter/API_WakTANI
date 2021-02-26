const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");

const db = admin.firestore()

router.post('/produk' , async (req,res)=>{
    const {foto,nama_produk,deskripsi,manfaat,penyimpanan,nama_supplier,harga,stok_produk,promo_produk,satuan_produk,kategori_produk,status_produk,waktu_preorder,uid} = req.body

    const docRef = db.collection('produk').doc(uid);
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



module.exports = router 