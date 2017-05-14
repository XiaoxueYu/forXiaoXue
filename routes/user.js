var express = require('express');
var router = express.Router(),
 	crypto = require('crypto'),
 	mongoose = require('mongoose'),
 	_ = require('underscore');

/* GET home page. 
router.get('/', function(req, res) {
	//b不太懂pPost.get
	Post.get(null, function(err, posts) {
		if (err) {
			posts = [];
		}
		res.render('index', {
			title: '余慧',
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
		});
	});
});
*/

//signup
router.post('/user/signup',function(req,res){
    var _user = req.body.user 
    //console.log(_user)
    var user = new User(_user)
    user.save(function(err,user){
        if(err){
            console.log(err)
        }
       console.log(user)
    })
})


module.exports = router;
