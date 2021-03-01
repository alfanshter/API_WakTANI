const express = require('express');
const router = express.Router();
//import model
var admin = require("firebase-admin");

const db = admin.firestore()


router.post('/promo' , async (req,res)=>{
    const {nama,persyaratan_promo,minimal_harga,rupiah,persentase,maksimum_promo,jenis_promo} = req.body
    //@@ jenis promo 1 = rupiah
    //@@ jenis promo 2 = presentase

    //jenis promo 1 set nilai rupiah
    if(jenis_promo==1){
        //cek nilai rupiah
        if(rupiah!=null){
            if(persyaratan_promo == true){
                if(minimal_harga!=null){   
                    const promoRef = db.collection('promo').doc()
                    const snapshot = promoRef.set({
                        nama : nama,
                        jenis_promo : jenis_promo,
                        persyaratan_promo : persyaratan_promo,
                        minimal_harga : minimal_harga,
                        rupiah : rupiah,
                        id_promo : promoRef.id
                    }).then(function(){
                        return res.status(200).json({
                            status : res.statusCode,
                            message : 'Insert Promo Berhasil'
                        })
                    }).catch((error)=>{
                        return res.status(400).json({
                            status : res.statusCode,
                            message : error
                        })
                    })
            }
            else{
                return   res.status(400).json({
                    status : res.statusCode,
                    message : 'Masukan minimal atau maksimal harga'
                })
            }

            }else if(persyaratan_promo == false){
                const promoRef = db.collection('promo').doc()
                const snapshot = promoRef.set({
                    nama : nama,
                    jenis_promo : jenis_promo,
                    persyaratan_promo : persyaratan_promo,
                    rupiah : rupiah,
                    id_promo : promoRef.id
                }).then(function(){
                    return res.status(200).json({
                        status : res.statusCode,
                        message : 'Insert Promo Berhasil'
                    })
                }).catch((error)=>{
                    return res.status(400).json({
                        status : res.statusCode,
                        message : error
                    })
                })

                
            }
            
        
        }else{
            return   res.status(400).json({
                status : res.statusCode,
                message : 'Masukkan Nilai Rupiah'
            })
        }
    }else if(jenis_promo ==2){
        if(persentase!=null){
            //@@ persyaratan_promo true = jika menggunakan persyaratan promo
            //@@ persyaratan_promo false = jika  tidak menggunakan persyaratan promo
            if(persyaratan_promo == true){
                if(minimal_harga!=null){   
                        const promoRef = db.collection('promo').doc()
                        const snapshot = promoRef.set({
                            nama : nama,
                            jenis_promo : jenis_promo,
                            persyaratan_promo : persyaratan_promo,
                            minimal_harga : minimal_harga,
                            persentase : persentase,
                            maksimum_promo : maksimum_promo,
                            id_promo : promoRef.id
                        }).then(function(){
                            return res.status(200).json({
                                status : res.statusCode,
                                message : 'Insert Promo Berhasil'
                            })
                        }).catch((error)=>{
                            return res.status(400).json({
                                status : res.statusCode,
                                message : error
                            })
                        })
                }else{
                    return   res.status(400).json({
                        status : res.statusCode,
                        message : 'Masukan minimal atau maksimal harga'
                    })
                }
            }else if(persyaratan_promo == false){
                const promoRef = db.collection('promo').doc()
                const snapshot = promoRef.set({
                    nama : nama,
                    jenis_promo : jenis_promo,
                    persyaratan_promo : persyaratan_promo,
                    persentase : persentase,
                    maksimum_promo : maksimum_promo,
                    id_promo : promoRef.id
                }).then(function(){
                    return res.status(200).json({
                        status : res.statusCode,
                        message : 'Insert Promo Berhasil'
                    })
                }).catch((error)=>{
                    return res.status(400).json({
                        status : res.statusCode,
                        message : error
                    })
                })
            }
            
        }else{
            return   res.status(400).json({
                status : res.statusCode,
                message : 'Masukkan Nilai Persentase'
            })
        }
    }else{
        return   res.status(400).json({
            status : res.statusCode,
            message : 'Masukkan Jenis Promo'
        })
    }
    
   
})



module.exports = router 