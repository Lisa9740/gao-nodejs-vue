/** Routes to auth
 * @module routers/auth
 * @requires express express.Router()
 */
const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');

router.post("/login", authController.login);

module.exports = router;
