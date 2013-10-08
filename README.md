backbone-login
==============
Best practices & [demo app](http://backbone-login.crunchdevelopment.com) for client-side authentication via Backbone.js AJAX.

Blog article with further details and explanation can be found [here](http://alexehrnschwender.com/2013/07/client-side-auth-session-mgmt-backbone-node/)


The app demos the following:
  * CSRF headers in authentication requests to prevent forgery
  * Auth state persistence through signed cookies
  * Global (singleton) session model whose state changes can be listened to 
  * Client-side validations through ParsleyJS
  * Salt/hashing of passwords for back-end storage



Client-Side
---------------
Uses a persistent global Backbone.js SessionModel to manage state.
Views and other models all can:
  * subscribe to changes in session state
  * extract current user data
  * trigger auth events (login, logout, etc)



Server-Side
--------------
A lightweight, single-file [Express.js](http://expressjs.com) server and SQLLite3 db.
Responds to API routes, as well as initial index.html page render to plant the session CSRF token.



Install & Run
--------------
`git clone https://github.com/alexanderscott/backbone-login.git`
`cd backbone-login`
`npm install`
`node server.js`
Then visit [http://localhost:3000](http://localhost:3000) in a browser.


Contribute
------------
Please fork and submit a pull request with adequate details.
