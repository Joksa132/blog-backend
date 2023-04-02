const router = require('express').Router();
const userController = require('../controllers/userController')
const verifyToken = require("../config/verifyToken");

router.post('/login', userController.login)

router.post('/register', userController.register)

router.get('/info', verifyToken, userController.info)

module.exports = router;