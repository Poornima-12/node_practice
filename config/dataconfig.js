const mongoose=require("mongoose")

module.exports = mongoose.connect("mongodb+srv://Mydb1:gyroit@cluster1.nzliemk.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    try{
        console.log("Connected to database")
    }
    catch(err)
    {
        errorHandler(err);
    }
})
