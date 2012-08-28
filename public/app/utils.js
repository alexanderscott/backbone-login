window.utils = {

    /*
     * TEMPLATE LOADER
     */
    loadTemplate: function(views, callback) {
        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
    
    
    /*
     * COOKIE HELPERS
     */
	getCookie: function(c_name) {
    	var i, x, y, ARRcookies = document.cookie.split(";");
        
        for (i = 0; i < ARRcookies.length; i++) {
	        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
	        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
	        x = x.replace(/^\s+|\s+$/g,"");
	        if (x === c_name) {
	        	return unescape(y);
	        };
        };
	},
    
	setCookie: function(c_name, value) {
		var exdate = new Date();
        exdate.setHours(exdate.getHours() + 1);
        var c_value = escape(value) + "; expires=" + exdate.toUTCString();
        document.cookie=c_name + "=" + c_value;
     },
      

    /*
     * ERRORS and ALERT HANDLING
     */ 
     
	// Default alert when there is a validation error
	displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Uh oh...', 'Please fix validation errors and try again.', 'alert-error');
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-block', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-block', controlGroup).html('');
    },
    
	// Show alert classes and hide after specified timeout
    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<button class="close" data-dismiss="alert">×</button><strong>' + title + '</strong> ' + text);
        $('.alert').show('fast');
        setTimeout(function() {
        	$('.alert').hide();
        }, 7000 );
    },
    
    jsonResponse: function(code){
    	jsonCodes = [],
    	jsonCodes[400] = 'Unrecognized command',
    	jsonCodes[401] = 'Permission denied',
    	jsonCodes[402] = 'Missing argument',
    	jsonCodes[401] = 'Incorrect password',
    	jsonCodes[404] = 'Account not found',
    	jsonCodes[405] = 'Email not validated',
    	jsonCodes[408] = 'Token expired',
    	jsonCodes[411] = 'Insufficient privileges',
    	jsonCodes[500] = 'Internal server error';
    	return jsonCodes[code];
    },
    
	
};