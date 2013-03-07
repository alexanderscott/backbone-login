<?
/** SAMPLE REST API HANDLER IN PHP **/

	set_include_path ( get_include_path () . PATH_SEPARATOR . '../../src');
	
	// Curl helper and app credentials included from server
	include_once('curlhelper.inc');
	include_once('creds.inc');
	
	date_default_timezone_set('UTC');
	
	// Root URL of API
	$api_root = 'https://api.example.com/';
	  
	// Define and clear the default parameters, JSON output
	$api_url_parameters = '';
	$curl_return = '';
	
	// GET account email from authToken (READ)
	if($_SERVER['REQUEST_METHOD'] == 'GET'){ 
		$api_command = 'Get';
		$api_url_parameters = '&authToken=' . $_COOKIE['authToken'] . '&returnValueList=account';
		$api_url = "$api_root?command=$api_command$api_url_parameters";
		$curl_return = curl_api($api_url);
		
	// Authenticate credentials from POST inputs (CREATE) 
	} elseif($_SERVER['REQUEST_METHOD'] == 'POST') { 
		$api_command = 'Authenticate';

		// Retrieve POST data
		$postdata = file_get_contents("php://input");
		$login_creds = json_decode($postdata, true);
		$login_user = $login_creds["email"];
		$login_pass = $login_creds["user_password"];
		
		// Example parameters supplied by included creds
		$api_url_parameters = "&partnerName=".APP_NAME."&partnerPassword=".APP_PASSWORD."&partnerUserID=$login_user&partnerUserSecret=$login_pass&useExpensifyLogin=true";
		$api_url = "$api_root?command=$api_command$api_url_parameters";
		
		$curl_return = curl_api($api_url);
	
	// Note that Backbone also uses update (PUT) and delete (DELETE) in its sync method
	}else {
		$curl_return = 'Unsupported method.';
	}

	print $curl_return;
			
	


	
	
	