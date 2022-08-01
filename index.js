const express=require("express")
const app = express();
const UserRoutes=require('./Routes/users')

app.use(express.json());
app.use("/user",UserRoutes);

app.listen(3000, (err) => {
  if(err){
    errorHandler(err);
  }
  else{
    console.log('listening on port 3000');
  }
  })
  