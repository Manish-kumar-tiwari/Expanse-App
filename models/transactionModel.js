const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },

  type: {
    type: String,
    required: [true, "Type is require"],
  },

  category: {
    type: String,
    required: [true, "Category is required"],
  },

  reference: {
    type: String,
  },
  
  date: {
    type: Date,
    require: [true, "Date is require"],
  },
},{timestamps:true});

const transactionModel = mongoose.model("transaction", TransactionSchema);

module.exports = transactionModel;
