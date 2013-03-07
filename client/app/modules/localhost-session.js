/**
 * @author      Alex Ehrnschwender
 * @desc		stores the POST state and response state of authentication for user
 */


require('libs/backbone-localstorage', 'models/UserModel');


var LocalSession = Backbone.Model.extend({

    initialize: function(options){ },

    localStorage: new Backbone.LocalStorage("BB-AUTH-TOKEN"),                                // Unique app token namespace

    defaults : {
        id         : 1,             // Has to be instantied and not 0
        user_id    : 1,
        auth_token : 1,
        logged_in  : false,
        source     : ''             // For logging
    },


    /*
     * @desc: Check localstorage for session tokens, and if found validate them against server
     * @params: a callback function with success and error functions
     * @return: user or error JSON from server, and a response string for debug
     */
    checkAuth: function(opts) {
        var self = this;
        this.fetch({                                                                          // Check if there are tokens in localstorage
            success: function(mod, res){
                if(DEBUG) console.log('Fetched tokens from localstorage', res);

                var userAuthData = {
                    auth_token: res.auth_token,
                    user_id: res.user_id,
                    source: app.SOURCE
                };

                $.ajax({                                                                     // Check if tokens are valid by making a call to /user API endpoint
                    type: 'GET',
                    cache: false,
                    url: app.API + '/user',
                    data: userAuthData,
                    dataType: 'json',
                    success: function(res, xhr){
                        if(DEBUG) console.log('Auth against server returned: ', res);
                        if(res.error) {
                            self.set({ logged_in: false, user: new UserModel() });
                            opts.error(res, 'Auth unsuccessful');
                        } else {
                            self.set({ logged_in: true, user_id: res.id, user: new UserModel(res) });        // Attach authenticated user model to session
                            opts.success(res, 'Successfully authenticated using localstorage token');        // Return user model on success
                            self.get('user').fetch();                                       // Fetch logged in user info
                        }
                    }, error:function(res, xhr){
                        if(DEBUG) console.log('ERROR: ', res, xhr);
                        opts.error(res, 'Cannot authenticate tokens with server');
                    }
                });

            }, error: function(mod, res){
                if(DEBUG) console.log('No tokens in localstorage', res);
                self.set({ logged_in: false, user: new UserModel() });                      // Create and attach a new, empty UserModel
                opts.error(res, 'No tokens in localstorage');
            }
        });
   },


    saveSession: function(user_id, auth_token, callback, args){
        this.save({ user_id: user_id, auth_token : auth_token }, {
            success:function(mod, res){
                if(DEBUG) console.log('user session saved: ', mod);
                if(callback) callback(res);
            }, error: function(mod, xhr){
                if(DEBUG) console.log('user session could not be saved');
                if(callback) callback(res);
            }
        });
    }

});

