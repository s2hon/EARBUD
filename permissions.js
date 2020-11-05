const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:8888/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

//Authenticates requests: route middleware in an express app
app.get('/auth/spotify', passport.authenticate('spotify', {
    scope: ["user-read-recently-played", "user-read-currently-playing", "user-top-read"]
}), function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  });
  
  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    }
  );


  // Using spotify access scopes we want the user to be able to see their recently played tracks as well
  // as their currently playing track. Getting their top tracks/artists can be a redirect from navbar if they
  // want to see and review those. Saving albums or tracks can be an add on if time allows