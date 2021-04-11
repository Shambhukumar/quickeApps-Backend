const stockdata = require("../models/StockData");
const Axios = require("axios");




exports.getallData = async (req,res) =>{

  stockdata.find({}, async (err, responce)=>{
    if(err){
      res.status(400).json({
        status: "fail",
        message: "something went wrong"
      })
    }
  
    if(responce){
      res.status(200).json({
        status: "Success",
        data: responce
      })
    }
  })
  
  }

  exports.deleteOnce = async (req,res)=>{
    console.log(req.params)
    stockdata.findByIdAndDelete({_id: req.params.id}, (err, data)=>{

    if(err){
      console.log(err)
    }else{
      console.log(data)
      res.status(200).json({
        status: "Success",
         data
      })
    }
  })
  }



exports.PushStockData = async(req,res) =>{
        try{
            const getStockFromApi = async() =>{
                const allStockSymbol = ["GOOGL", "FB", "AMZN", "MSFT", "CDLX","BCOV"]
                const fatchData = async(e)=>{
                  const data = {}
                  const ress = await Axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${e}&interval=10min&apikey=B2ZGBG6HQ2IAOIPW`)
                  const ress2 = await Axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${e}&apikey=B2ZGBG6HQ2IAOIPW`)
                  data.MCap = ress.data.MarketCapitalization;
                  data.name = ress.data.Name
                  data.symbol = ress.data.Symbol
                  data.CPrice = ress2.data["Global Quote"]["05. price"]
                    stockdata.create({...data}, (err, responce) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      if (responce) {
                        console.log(responce);
                      }
                    });
                }
                
                const interval = 30000;
                allStockSymbol.forEach(async(e, index)=>{
                    setTimeout(async()=>{
                       console.log("running")

                      await stockdata.findOne({symbol: e}, (err,result)=>{
                         console.log(result)
                         if(!result){
                           fatchData(e)
                         }
                         else {
                           return;
                         }
                       })
                   
                  }, index * interval)
                  
                })
                    }
                    
                 

            getStockFromApi();

        }catch(e){
            console.log(e)
            throw(e)
        }


}