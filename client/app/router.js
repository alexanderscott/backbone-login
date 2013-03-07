/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @desc        
 */


    var SpotifyRouter = BackboneSpotify.Router.extend({

        initialize: function(options){
            //if (DEBUG) console.log('Router init, online status: '+Spotify.isOnline());

            if (Spotify.isOnline()){
                $('#content-app').html( MainTpl() );
            } else {
                $('#content-app').html( OfflineTpl() );
                return false;
            }


            if (DEBUG) console.log('App globals registered: ', app);

            app.userSession = new SessionModel({ id : 1, logged_in: false, source: 'spotify'});       // Instantiate a user session (id must be set initially)

            var self = this;
            app.userSession.checkAuth({                                             // Check if user is already authenticated thru localstorage
                success: function(user, msg){
                    if (DEBUG) console.log(msg, user);
                    app.eventAggregator.trigger('LOGGED_IN');

                    //app.userSession.set({ user : new UserModel(user) });
                    //self.navigate('me', { trigger: true });                         // Navigate to user home
                }, error: function(res, msg){
                    if (DEBUG) console.log(msg, res);
                    app.eventAggregator.trigger('LOGGED_OUT');
                }
            });

            this.navigateInit();

        },

        navigateInit: function(){
            var playingTrack = Spotify.getPlayingTrack();
            if(!playingTrack){
                this.navigate('artists', { trigger: true, replace: false });                    // Default navigation to trending artists page
            } else {
                var playingArtistName = playingTrack.data.artists[0].name;

                var self = this;
                this.searchInit = new SearchModel();
                this.searchInit.reqParams = ['query='+playingArtistName, 'limit=1', 'filter=artist'];
                this.searchInit.fetch({
                    success: function(mod, res){
                        if('artists' in res && res.artists.length > 0){
                            self.navigate('artists:ticker:'+res.artists[0].ticker, { trigger : true, replace: false });
                        } else {
                            if(DEBUG) console.log('No results found for '+playingArtistName);
                            self.navigate('artists', { trigger: true, replace: false });                    // Default navigation to trending artists page
                        }
                    }, error: function(mod, xhr){
                        if(DEBUG) console.log('Error searching for '+playingArtistName);
                        self.navigate('artists', { trigger: true, replace: false });                    // Default navigation to trending artists page
                    }
                });
            }
        },

        routes: {
            "": "index",

            "me": "me",
            "artists": "artists",
            "artists:ticker:<ticker>": "artistByTicker",
            "artists:ticker:<ticker>:playlist": "artistPlaylist",
            "players": "players",
            "players:in:<username>": "playerByUsername",
            "players:in:<username>:playlist": "playerPlaylist",
            //"players:in:<username>:*subpath": "playerByUsername",
            "charts": "charts",
            "feed": "activity",
            "about": "about",

            "tour" : "tour"
        },


        index: function() { },                                                      //TODO SCROLL CAPTURES AND SAVE STATE TO LOCALSTORAGE

        restore: function(view) {

            if(!Spotify.isOnline()){                                                // Check if online
                $('#content-app').html( OfflineTpl() );
            } else {
                $('#content-app').html( MainTpl() );

                //if(!this.navbarView){                                               // Render the header navbar if we havent already
                    this.navbarView = new NavbarView({ user : app.userSession.user });
                    $("#header-main").html( this.navbarView.$el );
                    this.navbarView.render();
                //}

                if(this.view && _.isFunction(this.view.onClose)) this.view.onClose();
                this.view = view;

                $('#content-main').html(this.view.$el);                             // Replace the DOM
            }
        },


        me: function() {
            this.restore(new ProfilePageView());
            this.view.render();
        },

        artists: function() {
            this.restore(new ArtistsView());
            this.view.render();
        },

        artistByTicker: function(ticker){
            this.restore(new ArtistView( { ticker : ticker } ));
            this.view.render();
        },

        artistPlaylist: function(ticker){
            this.restore(new PlaylistView({ type : "artist", artistID : ticker }));
            this.view.render();
        },

        players: function() {
            this.restore(new PlayersPageView());
            this.view.render();
        },

        playerByUsername: function(username){
            this.restore(new PlayersMainView({ playerUsername : username, subpath : 'collection' }));
            this.view.render();
        },

        playerPlaylist: function(username){
            this.restore(new PlaylistView({ type: "player", userID : username }));
            this.view.render();
        },

        charts: function() {
            this.restore(new ChartsView());
            this.view.render();
        },

        activity: function() {
            this.restore(new ActivityPageView( { player: (app.userSession.get('logged_in') ? app.userSession.get('user') : new UserModel({ id : 'ruxputin' })) } ));
            this.view.render();
        },

        about: function() {
            this.restore(new AboutView());
            this.view.render();
        },

        tour: function(){
            this.restore(new TourView());
            this.view.render();
        },

        login: function(){
            var self = this;
            Spotify.showAuthenticationDialog(app.URL + '/auth/login/app', {
                success:function(res, msg){
                    app.userSession.save({
                        user_id : TMX.utils.getQueryParam('user_id', res),
                        auth_token: TMX.utils.getQueryParam('auth_token', res)
                    }, {
                        success:function(mod, res){
                            if(DEBUG) console.log('User session saved: ', mod);
                            app.userSession.checkAuth({                                             // Check if user is already authenticated thru localstorage
                                success: function(user, msg){
                                    if (DEBUG) console.log(msg, user);
                                    //app.userSession.set({ user : new UserModel(user) });               // Attach authenticated user model to session
                                    app.eventAggregator.trigger('LOGGED_IN');
                                    //self.navigate('me', { trigger: true });                         // Navigate to user home
                                }, error: function(res, msg){
                                    if (DEBUG) console.log(msg, res);
                                    app.eventAggregator.trigger('LOGGED_OUT');
                                    //self.navigate('artists', { trigger: true });                    //Navigate to trending artists page
                                }
                            });
                        }, error: function(mod, xhr){
                            if(DEBUG) console.log('User session could not be saved', xhr);
                        }
                    });
                }, error: function(res, msg){
                    if(DEBUG) console.log('Spotify showAuth returned error: ', res);
                }
            });
        },

        logout: function(){
            app.userSession.destroy();
            app.userSession = new SessionModel({ id : 1, logged_in: false, source: 'spotify'});       // Instantiate a user session (id must be set initially)

            app.eventAggregator.trigger('LOGGED_OUT');
        },

        offline: function(){
            $('#content-app').html( OfflineTpl() );
        }

    });


    return SpotifyRouter;

});
