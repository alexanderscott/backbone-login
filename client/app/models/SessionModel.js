/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @created		2013-01-22
 * @desc		model for checking and holding session info, fetched from /user
 */

define([
    'app',
    'models/UserModel'
], function(app, UserModel) {

	var Session = Backbone.Model.extend({

		initialize: function(){
		},

		defaults : {
            //id : 1,
			user_id : 1,
            auth_token : 1,
            logged_in: false,
            source: ''
		},

		urlRoot: '/user',

		reqParams: [],

		url: function(){
            return app.API + '/user/' + this.queryString();
		},


        /*
         * @desc: Check for session from API using cookies
         * @params: a callback function with success and error functions
         * @return: user or error JSON from server, and a response string for debug
         */
        checkAuth: function(opts) {
            var self = this;
            this.fetch({                                                                          // Check if there are tokens in localstorage
                success: function(mod, res){
                    //if(DEBUG) console.log('Auth check successful: ', res);
                    if(res.error) {
                        self.set({ logged_in: false, user: new UserModel() });
                        opts.error(res, 'Auth unsuccessful');
                    } else {
                        self.set({ logged_in: true, user_id: res.id, user: new UserModel(res) });        // Attach authenticated user model to session
                        opts.success(res, 'Successfully authenticated');                // Return user model on success
                        self.get('user').fetch();                                       // Fetch logged in user info
                    }
                }, error:function(mod, xhr){
                    //if(DEBUG) console.log('Auth check unsuccessful: ', res);
                    //self.set({ logged_in: false, user_id: 1, user: new UserModel() });                    // Attach authenticated user model to session
                    opts.error(res, 'Cannot authenticate tokens with server');
                }
            });
        }



	});

	return Session;
});

