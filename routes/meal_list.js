var express = require('express'),
	router = express.Router();

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

//list delete movie
// router.delete('/admin/list',function(req,res){
//     var id = req.query.id
//     if(id){
//         Meal.remove({_id:id},function(err,movie){
//             if(err){
//                 console.log(err)
//             }else{
//                 res.json({success:1})
//             }
//         })
//     }
// })
module.exports = router;