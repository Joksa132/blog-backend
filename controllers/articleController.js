const Article = require('../models/Article')
const User = require("../models/User")

exports.newArticle = async (req, res, next) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.userId
    })
    await article.save()
    const populatedArticle = await article.populate("createdBy");
    console.log("Article created successfully")
    res.json(populatedArticle)
  } catch (err) {
    return next(err)
  }
}

exports.allArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().sort({
      createdAt: "desc"
    }).populate('createdBy')
    res.json(articles)
  } catch (e) {
    console.log("Error", e)
  }
}

exports.specificArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate('createdBy')
    res.json(article)
  } catch (e) {
    console.log("Error", e)
  }
}