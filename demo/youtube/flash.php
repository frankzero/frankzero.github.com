<!DOCTYPE html >
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title></title>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
</head>

<body>

<script src="//ajax.googleapis.com/ajax/libs/swfobject/2/swfobject_src.js"></script>

<div id="ytapiplayer">
You need Flash player 8+ and JavaScript enabled to view this video.
</div>

<script type="text/javascript">

var youtube_id = 'M7lc1UVf-VE';
var params = { allowScriptAccess: "always" ,allownetworking:"internal" , allowFullScreen :"true"};
var atts = { id: "myytplayer" };
swfobject.embedSWF("http://www.youtube.com/v/"+youtube_id+"?enablejsapi=1&playerapiid=ytplayer&version=3&modestbranding=1","ytapiplayer", "425", "356", "8", null, null, params, atts);


</script>
</body>
</html>
