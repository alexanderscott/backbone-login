define([
    "app",
    "text!templates/header.html",
    "bootstrap"
], function(app, HeaderTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(HeaderTpl),

        initialize: function () {
            _.bindAll(this);

            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.onLoginStatusChange);
        },
        
        events: {
            "click #logout-link"         : "onLogoutClick",
            "click #remove-account-link" : "onRemoveAccountClick"
        },
      
        onLoginStatusChange: function(evt){
            this.render();
            if(app.session.get("logged_in")) app.showAlert("Success!", "Logged in as "+app.session.user.get("username"), "alert-success");
            else app.showAlert("See ya!", "Logged out successfully", "alert-success");
        },

        onLogoutClick: function(evt) {
            evt.preventDefault();
            app.session.logout({});  // No callbacks needed b/c of session event listening
        },

        onRemoveAccountClick: function(evt){
            evt.preventDefault();
            app.session.removeAccount({});
        },


        render: function () {
            if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({ 
                logged_in: app.session.get("logged_in"),
                user: app.session.user.toJSON() 
            }));
            return this;
        },

    });

    return HeaderView;
});
