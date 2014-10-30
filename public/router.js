/**
 * @desc        backbone router for pushState page routing
 */

define([
    "app",

    "models/SessionModel",
    "models/UserModel",

    "views/HeaderView",
    "views/LoginPageView"
], function(app, SessionModel, UserModel, HeaderView, LoginPageView){

    var WebRouter = Backbone.Router.extend({

        initialize: function(){
            _.bindAll(this);
        },

        routes: {
            "" : "index"
        },

        show: function(view, options){

            // Every page view in the router should need a header.
            // Instead of creating a base parent view, just assign the view to this
            // so we can create it if it doesn't yet exist
            if(!this.headerView){
                this.headerView = new HeaderView({});
                this.headerView.setElement($(".header")).render();
            }

            // Close and unbind any existing page view
            if(this.currentView) this.currentView.close();

            // Establish the requested view into scope
            this.currentView = view;

            // Need to be authenticated before rendering view.
            // For cases like a user's settings page where we need to double check against the server.
            if (typeof options !== 'undefined' && options.requiresAuth){        
                var self = this;
                app.session.checkAuth({
                    success: function(res){
                        // If auth successful, render inside the page wrapper
                        $('#content').html( self.currentView.render().$el);
                    }, error: function(res){
                        self.navigate("/", { trigger: true, replace: true });
                    }
                });

            } else {
                // Render inside the page wrapper
                $('#content').html(this.currentView.render().$el);
                //this.currentView.delegateEvents(this.currentView.events);        // Re-delegate events (unbound when closed)
            }

        },

        index: function() {
            // Fix for non-pushState routing (IE9 and below)
            var hasPushState = !!(window.history && history.pushState);
            if(!hasPushState) this.navigate(window.location.pathname.substring(1), {trigger: true, replace: true});
            else this.show(new LoginPageView({}));
        }

    });

    return WebRouter;

});
