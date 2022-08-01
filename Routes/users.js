const express=require("express")
const router=express.Router()

const  movienamesController = require("../controllers/movienames");
//post data
router.post("/addmovie/names",movienamesController.newmovienames);
// get
router.get('/getmovie/names',movienamesController.getmovienames);
// put
router.put("/updatemovie/names/:id",movienamesController.getupdatedmovies);
//Delete
router.delete('/del/names/:id',movienamesController.deletedmovies);

module.exports=router;