/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @created     2012-12-16
 * @desc        SPOTIFY app globals
 */
define([
    "jquery",
    "underscore",
    "backbone",
    "backbone-spotify",
    "tastemakerx",
    "spotify",
    "cufon",
    "spin"
    //"opensans",
    //"entypo",
],
function($, _, Backbone, BackboneSpotify, TMX, Spotify, Cufon, Spinner) {
//function($, _, Backbone, BackboneSpotify, TMX, Spotify, Cufon, OpenSans, Entypo) {

    var app = {
        root : "/",
        URL : ((DEBUG) ? 'http://dev.tastemakerx.com' : 'https://tastemakerx.com'),
        API : (((DEBUG) ? 'http://dev.tastemakerx.com' : 'https://tastemakerx.com') + '/api/v1'),
        //URL: ((DEBUG) ? 'http://tastemakerx.dev' : 'https://tastemakerx.com'),
        //API: (((DEBUG) ? 'http://tastemakerx.dev' : 'https://tastemakerx.com') + '/api/v1'),
        SOURCE: 'spotify',
        SPOTIFY: true,

        spinnerOpts : {
          lines: 13, // The number of lines to draw
          length: 5, // The length of each line
          width: 4, // The line thickness
          radius: 8, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          color: '#463b35', // #rgb or #rrggbb
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinnerEl', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: 'auto', // Top position relative to parent in px
          left: 'auto' // Left position relative to parent in px
        },
        spinnerShow : function(){
            if('spinner' in app) app.spinner.stop();
            app.spinner = new Spinner(app.spinnerOpts).spin();
            $('.spinner').append(app.spinner.el);
            $('.spinner').show();
        },
        spinnerHide : function(){
            $('.spinner').hide();
            app.spinner.stop();
        }
    };

    // Global event aggregator
    app.eventAggregator = _.extend({}, Backbone.Events);

    // Append auth_token and user_id to every request (Spotify specific)
    Backbone.Model.prototype.queryString = Backbone.Collection.prototype.queryString = function() {
        var qryStr = '?';
        for(var i = 0; i < this.reqParams.length; i++){
            qryStr += this.reqParams[i] + '&';
        }
        return qryStr+'auth_token='+app.userSession.get('auth_token')+'&user_id='+app.userSession.get('user_id')+'&source='+app.SOURCE;
    };

    // View.close() event for garbage collection
    Backbone.View.prototype.close = function() {
        //this.remove();
        //this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    Backbone.View.prototype.showThrobber = function() {
        this.$el.prepend('<div class="throbber"><div></div></div>');
    };

    // FONTS thru cufon, include class cufon for elements which need font replacement
    //_.extend(Backbone.View.prototype, {
    Backbone.View.prototype.loadFonts = function() {
        $els = this.$el.find('.cufon');
        if ($els.length) {
            $els.each(function() {
                var $el = $(this);
                //var elID = $(this).attr('id');
                Cufon.replace($el, {
                    hover: true,
                    autoDetect: true,
                    textShadow: $el.css('text-shadow')
                });
            });
        }
    };



    return app;
});
