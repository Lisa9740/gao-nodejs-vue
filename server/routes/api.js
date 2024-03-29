var express = require('express');
var router = express.Router();

const computers = require("../controllers/computerController.js");
const customers = require("../controllers/customerController.js");
const attributions = require("../controllers/attributionController.js");
const auth = require("../controllers/authController.js");

router.post('/login', auth.login)

router.get('/computers', computers.findAllWithPagination)

router.get('/computers/size', computers.getTotalPage)

router.post('/computer/create', computers.create)

router.post('/computer/edit', computers.edit)

router.post('/computer/remove', computers.delete)

router.post('/customer/create',  customers.create)

router.get('/customer/search',  customers.findAll)

router.get('/attributions/all', attributions.findAll)

router.get('/attribution', attributions.findAllByComputer);

router.post('/attribution/create', attributions.create)

router.post('/attribution/remove', attributions.delete)

module.exports = router;
