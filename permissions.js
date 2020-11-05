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

  //SEARCH API
  //GET https://api.spotify.com/v1/search
 // json response

{
    "artists": {
        "href": "https://api.spotify.com/v1/search?query=tania+bowra&offset=0&limit=20&type=artist",
        "items": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q"
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/08td7MxkoHQkXnWAYD8d6Q",
                "id": "08td7MxkoHQkXnWAYD8d6Q",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/8522fc78be4bf4e83fea8e67bb742e7d3dfe21b4",
                        "width": 64
                    }
                ],
                "name": "Tania Bowra",
                "popularity": 0,
                "type": "artist",
                "uri": "spotify:artist:08td7MxkoHQkXnWAYD8d6Q"
            }
        ],
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total": 1
    }
}