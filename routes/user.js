var express = require('express');
var router = express.Router(),
	  User = require('../models/user.js')
	
// 登录页路由
router.get("/signin",function(req,res) {
	res.render("signin",{
		title:"用户登入",
	});
});

router.post('/user/signin',function(req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findByName(name, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (!user) {
      console.info('用户不存在！')      
      return res.redirect('/signup')
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.info(err)
      }

      if (isMatch) {
        req.session.user = user;
	    	console.info(req.session.user + 'there is succeed')
        return res.redirect('/')
      } else {
        console.info('mimacuowu');
        return res.redirect('/signin')
      }
    })
  })
})


// 注册页路由
router.get("/signup",function(req,res) {
	res.render("signup",{
		title:"用户注册",
	});
});

router.post('/user/signup',function(req, res) {
  var _user = req.body.user
  var name = _user.name;

  User.findByName(name,  function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      console.log('用户已经存在')
      return res.redirect('/signin')
    }
    else {
      var user = new User(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        res.redirect('/signin')
      })
    }
  })
})
// userlist page
router.get('/admin/user/list',function (req, res) {
  var user = req.session.user;
	console.log(user);
	if(!user){
		return res.redirect('/login');
	}
  if (user.role === 0) {
    console.log('权限不足！')
  } else {
    User.fetch(function (err, users) {
      if (err) {
        console.log(err)
      }

      res.render('user_list', {
        title: '用户列表页',
        users: users,
        user:req.session.user
      })
    })
  }
})

//登出
router.get("/logout",checkLogin);
router.get("/logout",function(req,res) {
	req.session.user = null;
	res.redirect('/');
});

function checkLogin(req, res, next) {
	if (!req.session.user) {
		return res.redirect('/');
	}
	next();
}

// midware for user

function signinRequired (req, res, next) {
  var user = req.session.user

  if (user) {
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
