/**
 * @desc		stores the POST state and response state of authentication for user
 */
define([
    "app",
    "utils"
    //"jquery-cookie"
], function(app){

    var UserModel = Backbone.Model.extend({

        initialize: function(){
            _.bindAll(this);
        
        },

        defaults: {
            id: 0,
            username: '',
            name: ''
        },

        url: function(){
            return app.API + '/user';
        }

    });
    
    return UserModel;
});

