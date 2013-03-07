/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @created		2013-01-03
 * @desc		stores the POST state and response state of authentication for user
 */

define([
    'app',
    'backbone-localstorage',
    'models/UserModel'

], function(app, LocalStorage, UserModel) {

	var Session = Backbone.Model.extend({

        initialize: function(options){

        },

        localStorage: new Backbone.LocalStorage("TMX_USER_TOKEN"),                                // Unique app token namespace

		defaults : {
            id : 1,
			user_id : 1,
            auth_token : 1,
            logged_in: false,
            source: ''
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
                                opts.success(res, 'Successfully authenticated');                // Return user model on success
                                //self.get('user').fetch();                                       // Fetch logged in user info
                            }
                        }, error:function(res, xhr){
                            if(DEBUG) console.log('ERROR: ', res, xhr);
                            opts.error(res, 'Cannot authenticate tokens with server');
                        }
                    });

                }, error: function(mod, res){
                    if(DEBUG) console.log('No tokens in localstorage', res);
                    self.set({ logged_in: false, user: new UserModel() });
                    opts.error(res, 'No tokens in localstorage');
                }
            });
       },


        // Currently not used from anywhere
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

	return Session;
});

