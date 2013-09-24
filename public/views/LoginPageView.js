define([
    "app",

    "text!templates/logged-in-page.html",
    "text!templates/login-page.html",

    "parsley",
    "utils"
], function(app, LoggedInPageTpl, LoginPageTpl){

    var LoginView = Backbone.View.extend({

        initialize: function () {
            _.bindAll(this);

            // Listen for session logged_in state changes and re-render
            app.session.on("change:logged_in", this.render);
        },

        events: {
            'click #login-btn'                      : 'onLoginAttempt',
            'click #signup-btn'                     : 'onSignupAttempt',
            'keyup #login-password-input'           : 'onPasswordKeyup',
            'keyup #signup-password-confirm-input'  : 'onConfirmPasswordKeyup'
        },

        // Allow enter press to trigger login
        onPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#login-password-input').val() === ''){
                evt.preventDefault();    // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onLoginAttempt();
                return false;
            }
        },

        // Allow enter press to trigger signup
        onConfirmPasswordKeyup: function(evt){
            var k = evt.keyCode || evt.which;

            if (k == 13 && $('#confirm-password-input').val() === ''){
                evt.preventDefault();   // prevent enter-press submit when input is empty
            } else if(k == 13){
                evt.preventDefault();
                this.onSignupAttempt();
                return false;
            }
        },

        onLoginAttempt: function(evt){
            if(evt) evt.preventDefault();

            if(this.$("#login-form").parsley('validate')){
                app.session.login({
                    username: this.$("#login-username-input").val(),
                    password: this.$("#login-password-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log(mod, res);

                    },
                    error: function(mod, res){
                        if(DEBUG) console.log("ERROR", mod, res);

                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },
        

        onSignupAttempt: function(evt){
            if(evt) evt.preventDefault();
            if(this.$("#signup-form").parsley('validate')){
                app.session.signup({
                    username: this.$("#signup-username-input").val(),
                    password: this.$("#signup-password-input").val(),
                    name: this.$("#signup-name-input").val()
                }, {
                    success: function(mod, res){
                        if(DEBUG) console.log(mod, res);

                    },
                    error: function(mod, res){
                        if(DEBUG) console.log("ERROR", mod, res);

                    }
                });
            } else {
                // Invalid clientside validations thru parsley
                if(DEBUG) console.log("Did not pass clientside validation");

            }
        },

        render:function () {
            if(app.session.get('logged_in')) this.template = _.template(LoggedInPageTpl);
            else this.template = _.template(LoginPageTpl); 

            this.$el.html(this.template({ 
                user: app.session.user.toJSON() 
            }));
            return this;
        }


    });

    return LoginView;
});

