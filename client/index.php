<? $random = rand(); ?>
<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
	
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  
	<title>Backbone-Login : Authentication Framework</title>
	<meta name="description" content="backbone-login sample app">
	<meta name="author" content="ehrndog">
	  
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	  
	<link rel="shortcut icon" href="./favicon.ico">
	<link rel="stylesheet" href="./assets/css/index.css?v=<?= $random ?>">

	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!--[if !IE 7]>
	<style type="text/css">
		#wrap {display:table;height:100%}
	</style>
	<![endif]-->
</head>

<body>
	<div id="wrap">
		<div class="header"></div>
	
		<div id="content"></div>
	</div>
	
	
	<div id="footer">
		<hr>
	    <p class="pull-left"><a href="http://alexehrnschwender.com/">&copy; 2012 Alex Ehrnschwender</a></p>
	    <p class="pull-right">Powered by <a href="http://backbonejs.org/">Backbone</a> and <a href="http://twitter.github.com/bootstrap/">Bootstrap</a>.</p>
	</div>
	


	<script src="./assets/libs/jquery-1.7.2.min.js?v=<?= $random ?>"></script>
	<script src="./assets/libs/underscore-min.js?v=<?= $random ?>"></script>
	<script src="./assets/libs/backbone-min.js?v=<?= $random ?>"></script>
	<script src="./assets/libs/vendor/bootstrap/js/bootstrap-min.js?v=<?= $random ?>"></script>
	<script src="./assets/libs/vendor/bootstrap/js/bootstrap-datepicker.js?v=<?= $random ?>"></script>
	
	<script src="./app/utils.js?v=<?= $random ?>"></script>
	<script src="./app/modules/session.js?v=<?= $random ?>"></script>
	<script src="./app/views/login.js?v=<?= $random ?>"></script>
	<script src="./app/views/header.js?v=<?= $random ?>"></script>
	<script src="./app/main.js?v=<?= $random ?>"></script>
</body>
</html>