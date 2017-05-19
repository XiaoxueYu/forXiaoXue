var express = require('express')
var mongoose = require('mongoose')
var Meal = require('../models/meal.js')
var router = express.Router()
var Category = require('../models/category')
var Comment = require('../models/comment')
var _ = require('underscore')
// var fs = require('fs')
// var path = require('path')
// var formidable = require('formidable')
// var http = require('http')
// var util = require('util')
//var User = require('../routes/user')

router.get("/meal",function(req,res){
	 Meal.fetch(function(err,meal){
        if(err){
            console.log(err)
        }
        res.render('list',{
        title:"listpage",
        meal:meal
      })
    
    })  
})

// detail page

router.get('/meal/:id',function(req, res) {
  var id = req.params.id

  Meal.update({_id: id}, {$inc: {pv: 1}}, function(err) {
    if (err) {
      console.log(err)
    }
  })

  Meal.findById(id, function(err, meal) {
    Comment
      .find({meal: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments) {
        res.render('detail', {
          title: '详情页',
          meal: meal,
          comments: comments
        })
      })
  })
})

// admin new page

// router.get("/admin/meal/new", signinRequired);
// router.get("/admin/meal/new", adminRequired);
router.get('/admin/meal/new',function(req, res) {
  Category.find({}, function(err, categories) {
    res.render('admin', {
      title: '后台录入页',
      categories: categories,
      meal: {}
    })
  })
})

// admin update page
// router.get("/admin/movie/update/:id",signinRequired)
// router.get("/admin/movie/update/:id",adminRequired)
router.get('/admin/meal/update/:id',function(req, res) {
  var id = req.params.id

  if (id) {
    Meal.findById(id, function(err, meal) {
      Category.find({}, function(err, categories) {
        res.render('admin', {
          title: '后台更新页',
          meal: meal,
          categories: categories
        })
      })
    })
  }
})

// admin poster
// router.post('/admin/meal', signinRequired)
// router.post('/admin/meal', adminRequired)

// router.post('/admin/meal', function (req, res, next) {
//   if (req.url === '/admin/meal' && req.method.toLowerCase() === 'post') {
//     //创建表单上传
//     var form = new formidable.IncomingForm();
//     //设置编辑
//     form.encoding = 'utf-8';
//     //设置文件存储路径
//     form.uploadDir = "/public/upload/"
//     //保留后缀
//     form.keepExtensions = true;
//     //设置单文件大小限制    
//     form.maxFieldsSize = 2 * 1024 * 1024;
//     // 设置文件的大小总和
//     var action = req.pathname;
//     console.log(action)
//     form.parse(req, function (err, fields, files) {
//        if (action !== '/'&& fs.existsSync('.'+action)) {
//         var img = fs.readFileSync('.'+action);
//         res.writeHead(200, {'Content-Type': 'image/gif' });
//         res.write('received upload:\n\n');
//         res.end(util.inspect({ fields: fields, files: files }));
//      } else { 
//         res.writeHead(200, { 'content-type': 'text/plain' });
//       res.write('received upload:\n\n');
//       res.end(util.inspect({ fields: fields, files: files }));
//      }

//     });
//     next()
//   } else {
//     next()
//   }
// })

// admin post movie
// router.post('/admin/meal', signinRequired)
// router.post('/admin/meal', adminRequired)
router.post('/admin/meal',function (req, res) {
  var id = req.body.meal._id
  var nmeal = req.body.meal
  //console.log(nmeal)
  var _meal 

  // if (req.poster) {
  //   mealObj.poster = req.poster
  // }
  
  if (id) {
    Meal.findById(id, function(err, meal) {
      if (err) {
        console.log(err)
      }

      _meal = _.extend(meal, nmeal)

        _meal.save(function (err, meal) {
          if (err) {
            console.log(err)
          }

          res.redirect('/meal/' + meal._id)
        })
      

    })
  }
  else {
      _meal = new Meal(nmeal)

    var categoryId = nmeal.category
    var categoryName = nmeal.categoryName

    _meal.save(function(err, meal) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.meals.push(meal._id)

          category.save(function(err, category) {
            res.redirect('/meal/' + meal._id)
          })
        })
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          meal: [meal._id]
        })

        category.save(function(err, category) {
          meal.category = category._id
          meal.save(function(err, meal) {
            res.redirect('/meal/' + meal._id)
          })
        })
      }
    })
  }
})

// list page
// router.post('/admin/meal/list', signinRequired)
// router.post('/admin/meal/list', adminRequired)
router.get('/admin/meal/list' ,function(req, res) {
  Meal.find({})
    .populate('category', 'name')
    .exec(function(err, meal) {
      if (err) {
        console.log(err)
      }

      res.render('list', {
        title: '列表页',
        meal: meal,
        user:req.session.user
      })
    })
})

// list page
// router.delete('/admin/meal/list', signinRequired)
// router.delete('/admin/meal/list', adminRequired)
router.delete('/admin/list',function(req, res) {
  var id = req.query.id

  if (id) {
    Meal.remove({_id: id}, function(err, meal) {
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    })
  }
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

module.exports = router