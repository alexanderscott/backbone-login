window.Session = Backbone.Model.extend({

    defaults: {
        accountID: null,
        email: null,
        authToken: null,
        user_password: null
    },
    
    url: "/api/Login.php",
    
    // Assign validation rules to attributes
    initialize: function () {
		this.validators = {};
        this.validators.email = function (value) {
            return (value!==null && value.length!==0) ? {isValid: true} : {isValid: false, message: "Please enter your email."};
        };
        this.validators.user_password = function (value) {
            return (value!==null && value.length!==0) ? {isValid: true} : {isValid: false, message: "Please enter your password."};
        };
    },
    
    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
    
    validateAll: function () {
        var messages = {};
        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }
        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }
});