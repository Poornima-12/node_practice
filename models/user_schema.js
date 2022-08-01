const mongoose=require("mongoose")
const data=require('../config/dataconfig')

let Schema=mongoose.Schema
//Schema
const movie=new Schema({
    mov_name: String,
    Actor_name:String,  
    Release_date:Date,
    Renumeration:Number
})
//model and collection
module.exports=mongoose.model('movies',movie)

