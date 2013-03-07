/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @created		2012-12-16
 * @desc		bootstrap the spotify app router
 */

require([
    "app",
    "router"
],
function(app, SpotifyRouter) {

    Backbone.emulateHTTP = true;                                        // Emulate put and delete thru POST and GET requests

    Backbone.history = new BackboneSpotify.History({ debug: false });    // Debugging thru underscore
    //Backbone.history = new BackboneSpotify.History({debug: true, root: '/'});

    app.router = new SpotifyRouter();                                      // Must be between History declaration and start

    Backbone.history.start();
    //Backbone.history.start({hashChange: false, pushState: true});


     //All navigation that is relative should be passed through the navigate
     //method, to be processed by the router. If the link has a `data-bypass`
     //attribute, bypass the delegation completely.
    $('#content-app').on("click", "a:not([data-bypass]):not([href^='spotify:'])", function(evt) {
        evt.preventDefault();

        var href = $(this).attr("href").slice(1).replace(/\//g, ":");

        if(href==='login' || href==='logout'){         //Spotify router quirk, do not route for login - instead call the fxn directly
            app.router[href]();
        } else {
            app.router.navigate(href, { trigger : true, replace : false } );
        }

    });

});
