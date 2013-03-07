/**
 * @author      Alex Ehrnschwender <alex@tastemakerx.com>
 * @created     2012-12-16
 * @desc        configure SPOTIFY aliases and dependencies
 */

if (typeof DEBUG === 'undefined') {                // removed in production by uglify
    DEBUG = true;

    //require.config({                             // cache busting for development
        //urlArgs: "bust=" +  (new Date()).getTime()
    //});
}

require.config({

    baseUrl: '/',

    paths: {

        // SHARED
        // will be pulled into the Spotify dist folder by r.js optimization
        // for dev, symlinked thru ln -s src/client/app/shared src/client/app/spotify/shared

        'models'                : 'shared/models',
        'collections'           : 'shared/collections',
        'helpers'               : 'shared/helpers',

        // LIBS
        'jquery'                : 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min',
        //'jquery'              : 'assets/libs/jquery/jquery',
        'handlebars'            : 'assets/libs/require/plugins/Handlebars',
        'hbs'                   : 'assets/libs/require/plugins/hbs',
        'json2'                 : 'assets/libs/require/plugins/json2',
        'i18nprecompile'        : 'assets/libs/require/plugins/i18nprecompile',
        'underscore'            : 'assets/libs/underscore/lodash',         // load lodash instead of underscore (faster + bugfixes)
        //'domReady'            : 'assets/libs/require/plugins/domReady',

        'backbone'              : 'assets/libs/backbone/backbone',
        'backbone-spotify'      : 'assets/libs/backbone-spotify/backbone-spotify',
        'backbone-localstorage' : 'assets/libs/backbone/backbone-localstorage',

        'bootstrap'             : 'assets/libs/bootstrap/tmx-bootstrap',
        //'bootstrap-modal'     : 'assets/vendor/bootstrap/js/bootstrap-modal',

        'tastemakerx'           : 'assets/libs/tastemakerx/tastemakerx',
        'echonest'              : 'assets/libs/tastemakerx/echonest',
        'songkick'              : 'assets/libs/tastemakerx/songkick',
        'spotify'               : 'assets/libs/tastemakerx/spotify-sdk',
        //'spotify-api'         : 'assets/libs/spotify/spotify-api',
        'highcharts'            : 'assets/libs/highcharts/highstock',

        //'twitter'             : 'assets/libs/tastemakerx/twitter',
        //'facebook'            : 'assets/libs/tastemakerx/facebook'

        'cufon'                 : 'assets/libs/cufon/cufon-yui',
        'opensans'              : 'assets/libs/cufon/OpenSans',
        'entypo'                : 'assets/libs/cufon/Entypo',
        'moment'                : 'assets/libs/moment/moment',
        'spin'                  : 'assets/libs/spin/spin-min',

        'jquery-drag'           : 'assets/libs/jquery/plugins/jquery-event-drag',
        'jquery-drop'           : 'assets/libs/jquery/plugins/jquery-event-drop'

    },

    // non-AMD libs
    shim: {
        //'jquery'                : { exports  : '$' },
        'underscore'            : { exports  : '_' },
        'backbone'              : { deps : ['underscore', 'jquery'], exports : 'Backbone' },
        'backbone-spotify'      : { deps : ['underscore', 'jquery', 'backbone'], exports : 'BackboneSpotify' },
        'backbone-localstorage' : { deps : ['underscore', 'jquery', 'backbone'], exports : 'LocalStorage' },

        'bootstrap'             : { deps : ['jquery'], exports : 'Bootstrap' },
        //'tastemakerx'         : { deps : ['jquery'], exports : 'TMX' },
        'echonest'              : { deps : ['jquery'], exports : 'Echonest' },
        'songkick'              : { deps : ['jquery'], exports : 'Songkick' },
        'spotify'               : { deps : ['jquery'], exports : 'Spotify' },
        'highcharts'            : { deps : ['jquery'], exports : 'Highcharts' },
        //'twitter'             : { deps : ['jquery'], exports : 'Twitter' },
        //'facebook'            : { deps : ['jquery'], exports : 'Facebook' }


        'cufon'                 : { exports : 'Cufon' },
        'opensans'              : { deps : ['cufon'], exports : 'OpenSans' },
        'entypo'                : { deps : ['cufon'], exports : 'Entypo' },
        'spin'                  : { exports : 'Spinner' },

        'jquery-drag'           : { deps : ['jquery'] },
        'jquery-drop'           : { deps : ['jquery'] }


    },

    hbs: {
        templateExtension: "html",
        disableI18n: true,
        helperDirectory: 'helpers/'
    }

});

require(['main']);           // Initialize the application with the main application file.
