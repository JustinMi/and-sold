// app/index.js
module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE ===========================
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.pug', { title : 'Node Authentication'});
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.pug', { title : 'Node Authentication', 
                              message : req.flash('loginMessage') }); 
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true,
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.pug', { title : 'Node Authentication', 
                               message : req.flash('signupMessage') });
  });

  // use the 'local-signup' strategy to process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true,
  }));

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.pug', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
