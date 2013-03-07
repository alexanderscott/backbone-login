            






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

