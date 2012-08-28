var AppRouter = Backbone.Router.extend({

    routes: {
        ""                         	: "index",
        "user/:user"  				: "loggedIn"
    },
	
	// Create a new session and bind browser cookie (if exists)
    initialize: function () {
   		this.sesh = new Session();
   		this.sesh.set("authToken", utils.getCookie("authToken"));
        this.headerView = new HeaderView({model: this.sesh});
        $('.header').html(this.headerView.el);
   	},
    
    // Check if there is an authToken and route accordingly
    index: function(){
        var self = this;
        
        if (this.sesh.get("authToken")){
        	// Previous session found, fetching session vars
        	console.log("authToken cookie found, loading session");
        	
        	$("#content").html("<img src='/assets/img/spinner.gif'>");
        	
        	this.sesh.fetch({success: function(){
        		console.log("previous session fetched");
        		// ROUTE TO LOGGED-IN
        	}, error: function(){
        		console.log("error fetching prev session");
        		self.promptLogin();
        	}});
        } else { 
        	// No authToken found
            this.promptLogin();
        };
    },
    
    promptLogin: function () {
		this.headerView.toggleMenu(false);
        // Create new login view, pass in current session
        $('#content').html(new LoginView({model: this.sesh}).el);
        
    },
    
    // Destroy the session and prompt for login
    reset: function() {
        this.active = false;
        //this.headerView.remove();
        this.sesh.set("authToken", null);
        this.sesh.set("user_password", null);
        utils.setCookie('authToken', null);
        utils.showAlert('See ya!', 'Successfully logged out.', 'alert-success');
        this.promptLogin();
    }

});

// Load all views with corresponding templates, bringing them into the DOM with render()
utils.loadTemplate(['HeaderView', 'LoginView', 'LoggedInView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});