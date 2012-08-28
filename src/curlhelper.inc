<?
  // curl helper
  function curl_api($url, $payload, $request_method = 'get') {
    $ch = curl_init($url);
    
    if (strtolower($request_method) == 'post') { curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $payload); };
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    list( $header, $content ) = preg_split( '/([\r\n][\r\n])\\1/', curl_exec( $ch ), 2 );
    $status = curl_getinfo($ch);
    curl_close($ch);
    
    return $content;
  };