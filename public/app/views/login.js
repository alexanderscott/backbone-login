window.LoginView = Backbone.View.extend({
    
    initialize: function(options) {
      	this.render(); 	
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    events: {
        "change"        : "change",
        "click .loginBtn"  : "beforeLogin"
    },
    
    change: function (event) {
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },
    
    beforeLogin: function(){
        // Validate all login fields before saving thru POST
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        } else {
        	this.login();
        }
        return false;
    },
    
    login: function(){
    	// POST the validated credentials model to the server
    	this.model.save(null, {
            success: function (model, response) {
                if ((response.jsonCode === 200) && (response.httpCode === 200)) {

			        // set authToken cookie when response includes one
			        if ((typeof(response.authToken) !== 'undefined') && response.authToken.length) {
			        	utils.setCookie('authToken', response.authToken, 1);
			        };
			        //Redirect to transactions page
			  		app.go("user/" + response.user);
			    } else {
			        // If token has expired, reset app and goto login
			    	if (response.jsonCode == 408) {
			    		app.reset();
			    	} else {
			    		utils.showAlert('Error!', 'Incorrect email or password.', 'alert-error');
			    		if ("console" in window) {
			            	console.log("Login error: " + utils.jsonResponse(response.jsonCode));
			        	};
			    	}
				};
            },
            error: function () {
                console.log("Error thrown when logging in.");
            }
        });
    }
});