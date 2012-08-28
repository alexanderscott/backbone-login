window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.model.on("change:authToken", this.render, this); 
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    
    // Show user dropdown menu when show var is true, hide when false
    toggleMenu: function(show) {
    	this.$el.find("#userMenu").toggle(show);
    },
    
    events: {
        "click .brand"  : "refresh",
        "click .logoutBtn" : "logout"
    },

    refresh: function() {
        app.go("");
    },
  
    logout: function() {
        app.reset();
    }
    
});