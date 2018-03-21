const db = require('../models');
const bcrypt = require('bcrypt');
const session = require('express-session');

try {
  ENV = require('../env');
} catch (ex) {
  ENV = process.env;
}

const login = (req, res) => {
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).send(err);
      }
      if (isMatch) {
        req.session.regenerate(() => {
						console.log('password matches');
						req.session.user = user;
						res.redirect('/');
        });
      }
    });
  });
}

const showLoginSignup = (req, res) => {
  res.render('./auth/login-signup', {
    documentTitle: 'Login Or Signup'
  });
}

const createNewUser = (req, res) => {
  let saltWorkFactor = Number(ENV.SALT_WORK_FACTOR);
  bcrypt.genSalt(saltWorkFactor, (err, salt) => {
  	bcrypt.hash(req.body.password, salt, (err, hash) => {
  		let user = new db.User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        name: req.body.name
      });
  		user.save().then((newUser) => {
  			console.log('Successfuly added to the database!')
  			req.session.regenerate(() => {
  			  req.session.user = user;
  			  console.log(req.session.user);
  			  res.redirect('/')
  			});
  		});
  	});
  });
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}


module.exports.login = login;
module.exports.showLoginSignup = showLoginSignup;
module.exports.createNewUser = createNewUser;
module.exports.logout = logout;
