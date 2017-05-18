var express = require('express'),
	Order = require('../models/order'),
	router = express.Router();


router.post('/admin/order', function (req, res) {
  var _order = req.body.order;
  var order = new Order(_order)

 
  order.save(function (err, orders) {
    if (err) {
      console.log(err)
    }

    res.redirect('/admin/order/list')
  })

})
// orderlist page
router.get('/admin/order/list', function (req, res) {
  
  Order.fetch(function(err, orders) {
    if (err) {
      console.log(err)
    }

    res.render('order_list', {
      title: '订单列表页',
      order: orders
    })
  })

})  
function checkLogin(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '未登入');
		return res.redirect('/login');
	}
	next();
}
function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登入');
		return res.redirect('/');
	}
	next();
}
module.exports = router;
