const express = require("express");
const { addTransaction, getTransaction, editTransaction, deleteTransaction } = require("../controllers/transactionControler");

const router = express.Router();

// add transaction

router.post('/add-transaction',addTransaction)


//get transaction

router.post('/get-transaction',getTransaction)

// edit transaction

router.post('/edit-transaction',editTransaction)

// delete transaction

router.post('/delete-transaction',deleteTransaction)

module.exports=router
