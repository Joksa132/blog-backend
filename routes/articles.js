const router = require('express').Router();
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const verifyToken = require("../config/verifyToken");

router.post('/new', verifyToken, articleController.newArticle)

router.get('/all', articleController.allArticles)

module.exports = router;