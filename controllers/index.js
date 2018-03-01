const db = require('../models');
const bcrypt = require('bcrypt');

const index = (req, res) => {
  res.render('./index', {
    documentTitle: "play strings",
  })
}

const signup = (req, res) => {
  let newUsername = req.body.username;
  let password = req.body.password;
  db.User.find({username: newUsername}).then((searchResults) => {
    if (searchResults.length > 0) {
      res.redirect('/')
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          let user = new User({username: newUsername, passwordDigest:hash})
          user.save().then((newUser) => {
						console.log(newUsername + ' was successfully added to the database!')
						req.session.regenerate(() => {
							req.session.user = user;
							console.log(req.session.user);
							res.redirect('/')
						})
					})
        })
      })
    }
  })
}

const login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.User.find({username: username}).then((searchResults) => {
    if (searchResults.length > 0) {
      let user = searchResults[0]
      bcrypt.compare(password, searchResults[0].passwordDigest, (err, res) => {
        if (res) {
          req.session.regenerate(() => {
            req.session.user = user;
            res.redirect('/');
          })
        } else {
          console.log('password did not match');
          res.redirect('/login')
        }
      })
    } else {
      console.log('username did not match');
      res.redirect('/login')
    }
  })
}

module.exports.index = index;
module.exports.signup = signup;
module.exports.login = login;
