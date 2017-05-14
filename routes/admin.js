var express = require('express');
var router = express.Router(),
 	crypto = require('crypto'),
 	mongoose = require('mongoose'),
 	_ = require('underscore');

/* GET home page. */
router.get('/admin/meal', function(req, res) {

    res.render('index', {
        title: '稍微麻辣火锅外卖点餐',
        success : req.flash('success').toString(),
        error : req.flash('error').toString(),
        meal:{
          name:'',
          category:'',
          poster:'',
          money:'',
        }
    });
});

//admin update movie
// router.get('/admin/update/:id',function(req,res){
//     var id = req.params.id
//     if(id){
//         Movie.findById(id,function(err,movie){
//             res.render('admin',{
//                 title:'imooc updatepage',
//                 movie:movie
//             })
//         })
//     }
// })

//admin post movie
// router.post('/admin/meal/new',function(req,res){
//     var id = req.body.movie._id
//     var mealObj = req.body.meal
//     var _meal
//     if(id!=='undefined'){
//         Meal.findById(id,function(err,meal){
//             if(err){
//                 console.log(err)
//             }
//             _meal = _.extend(meal,mealObj)
//             _meal.save(function(err,meal){
//                 if(err){
//                     console.log(err)
//                  }
//                  res.redirect('/meal/'+meal._id)
//             })
//         })
//     }
//     else{
//         _meal = new Meal({
//             name:mealObj.name,
//             category:mealObj.category,
//             poster:mealObj.poster,
//             money:mealObj.money
//         })
//         _meal.save(function(err,meal){
//             if(err){
//                 console.log(err)
//                 }
//             res.redirect('/admin/list')
//         })
//     }
// });

module.exports = router;


//主页面路由