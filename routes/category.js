var mongoose = require('mongoose'),

express = require('express')
router = express.Router()  
//Category = require('../models/category.js')
var Category = mongoose.model('Category')
//User = require('../routes/user.js')


// router.get("/admin/category/new", User.signinRequired);
// router.get("/admin/category/new", User.adminRequired);
    
// admin new category page    

router.get("/admin/category/new",function(req,res) {
	res.render("category_admin",{
    title: "后台分类录入页",
    category: {}
	});
});



// admin post movie

router.post("/admin/category",function(req,res) {
  var _category = req.body.category
  var category = new Category(_category)

  category.save(function(err, categories) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/category/list')
  })
})


// catelist page
router.get('/admin/category/list', function (req, res) {
  
  Category.fetch(function(err, categories) {
    if (err) {
      console.log(err)
    }

    res.render('category_list', {
      title: '分类列表页',
      categories: categories
    })
  })

})
function signinRequired (req, res, next) {
  var user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }

  next()
}

 function adminRequired(req, res, next) {
  var user = req.session.user

  if (user.role == 0) {
    return res.redirect('/signin')
  }

  next()
}

module.exports = router;