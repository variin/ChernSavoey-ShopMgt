// -- Router
var express = require("express");
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

const user = require('../model/user');
const { check, validationResult } = require("express-validator");

/* GET users listing. */
// register fn
router.get("/register", async function (req, res, next) {
  res.render("register");
});


router.post('/register', [
  check('email', 'Please Input Your E-mail').isEmail(),
  check('name', 'Please Input Username').not().isEmpty(),
  check('password', 'Please Input Your Password').not().isEmpty()
], async function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  //Validation Data
  if (!result.isEmpty()) {
    //Return error to views
    res.render('register', {
      errors: errors
    })
  } else {
    //Insert  Data
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    const userRegis = await user.userRegister(name, password, email);
    if (!userRegis) {
      res.render('register', {
        errors: [{ msg: "can't register" }]
      })
    }
    res.redirect('/shops');
  }
});

// login fn
router.get("/", async function (req, res, next) {
  // req.login(user, function(err) {
  //   if (err) { return next(err); }
  //   return res.redirect('/shops' + req.user.name);
  // });
  res.render("login");
});

router.get('/logout', async function (req, res) {
  req.logout();
  res.redirect('/');
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/',
  failureFlash: true
}),
async function (req, res) {
    req.flash("success", "ลงชื่อเข้าใช้เรียบร้อยแล้ว");
    res.redirect('/shops');
  });

passport.serializeUser(async function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  User.getUserById(id, async function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(async function (name, password, done) {
  User.getUserByName(name, async function (err, user) {
    if (err) throw error;
    if (!user) {
      return done(null, false);
    } else {
      return done(null, user);
    }
    User.comparePassword(password, user.password, async function (err, isMatch) {
      if (err) return err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));


module.exports = router;