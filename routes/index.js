var express = require('express');
var router = express.Router(),
 	crypto = require('crypto'),
 	mongoose = require('mongoose'),
	Post = require("../models/post"),
 	_ = require('underscore');


 // mongoose连接本地数据库
mongoose.connect('mongodb://localhost/graduate');

/* GET home page. */
router.get('/', function(req, res) {
	Post.get(null, function(err, posts) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: '稍微麻辣火锅外卖点餐',
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

module.exports = router;


//主页面路由