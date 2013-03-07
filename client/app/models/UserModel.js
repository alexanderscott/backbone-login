/**
 * @author      Alex Ehrnschwender
 * @desc		stores the POST state and response state of authentication for user
 */


var UserModel = Backbone.Model.extend({
    initialize: function(){},

    defaults: {
        id: 0,
        username: '',
        name: '',
        email: ''
    },

    url: '/api/user'

});
