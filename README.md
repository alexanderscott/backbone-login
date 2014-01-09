backbone-login
==============
Best practices & [demo app](http://backbone-login.crunchdevelopment.com) for client-side authentication via Backbone.js AJAX.

Blog article with further details and explanation can be found [here](http://alexehrnschwender.com/2013/07/client-side-auth-session-mgmt-backbone-node/).


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
	git clone https://github.com/alexanderscott/backbone-login.git
	cd backbone-login
	npm install
	node server.js
	
Then visit [http://localhost:3000](http://localhost:3000) in a browser.


Contribute
------------
Please fork and submit a pull request with adequate details.


License
------------
The MIT License (MIT)

Copyright (c) 2013 Alex Ehrnschwender

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/e0049dba8ba4d8ba83ea100757ce0630 "githalytics.com")](http://githalytics.com/alexanderscott/backbone-login)
