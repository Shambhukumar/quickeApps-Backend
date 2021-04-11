const express = require("express")
const app = express();
const port = 4000;
const cors = require("cors");
require("dotenv").config();
const StockData = require("./controllers/StockData");
app.options("*",cors())
app.use(express.json());
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin, x-Requested-With, Content-Type, Accept")
  next();
});

const mongoose = require('mongoose');
process.env.DATABASE
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("Connected To the DataBase")
});
app.get("/getdata", StockData.getallData)
app.delete("/delete/:id", StockData.deleteOnce)


StockData.PushStockData();

app.listen(process.env.PORT || port,()=>{
  console.log(`Server is Running on PORT: ${port}`)
})