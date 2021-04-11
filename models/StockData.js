const mongoose = require('mongoose');
const StockDataSchema = new mongoose.Schema({
    name: {type: String},
    symbol: {type: String, unique: true},
    MCap: {type: Number},
    CPrice: {type: Number}
})

module.exports = mongoose.model("StockData", StockDataSchema)