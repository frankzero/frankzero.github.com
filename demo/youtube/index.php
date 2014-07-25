<?php 
// https://developers.google.com/youtube/iframe_api_reference?hl=en-us
// https://developers.google.com/youtube/js_api_reference?hl=en-us
// https://developers.google.com/youtube/js_api_reference#Embedding
// http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject_src.js



?>

<!DOCTYPE html >
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title></title>
<!--link rel="stylesheet" type="text/css" href="index.css" /-->
</head>

<body>
<div style="margin-bottom:20px;font-size:1.5rem;">
    <a href="https://developers.google.com/youtube/player_parameters?hl=en-us" target="_blank">參數</a>
    <a href="https://developers.google.com/youtube/iframe_api_reference?hl=en-us" target="_blank">iframe_api 文件</a>
    <a href="https://developers.google.com/youtube/youtube_player_demo?hl=en-us" target="_blank">api 展示</a>
</div>

<div><div id="player"></div></div>

<div><div id="ytplayer"></div></div>

<!--div>
<iframe id="player" type="text/html" width="640" height="390"
  src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com&autoplay=1"
  frameborder="0"></iframe>
</div-->


<script>
if(typeof console == 'undefined'){
    console={
        log:function(){
            
        }
    }
}
</script>

<script src="./js/youtube.js"></script>

<script>
var options = {};

options.PAUSED = function(e){
    
}

options.playerVars={};

/*
    autohide default:2
    
    0  the video progress bar and the video player controls will be visible throughout the video and in fullscreen.
    
    1  the video progress bar and the player controls will slide out of view a couple of seconds after the video starts playing.
    They will only reappear if the user moves her mouse over the video player or presses a key on her keyboard.
    
    2 r the video progress bar to fade out while the player controls (play button, volume control, etc.) remain visible.

*/
options.playerVars.autohide = 0;

/*
    autoplay
    
    default:0
    
    0
    
    1 自動撥放
*/
options.playerVars.autoplay=0;

/*
    影片進度條顏色 
    default:red
    red : 
    white : 
*/
options.playerVars.color='red';

/*
    controls
    
    default:1
    
    0 Player controls do not display in the player. For IFrame embeds, the Flash player loads immediately.
    
    1 Player controls display in the player. For IFrame embeds, the controls display immediately and the Flash player also loads immediately.
    
    2 Player controls display in the player. For IFrame embeds, the controls display and the Flash player loads after the user initiates the video playback.
    
*/
options.playerVars.controls=1;

/*
    enablejsapi 
    
    default:0
    
    0
    
    1
*/
options.playerVars.enablejsapi=0;

/*
    loop 循環播放 
    
    default:0
    
    0
    
    1
    
*/
options.playerVars.loop=0;

/*
    modestbranding 
    
    default:0
    
    0 顯示下面bar上的 youtube logo
    
    1 隱藏下面bar上的 youtube logo
    
*/
options.playerVars.modestbranding=0;

/*
    playsinline
    
    default:0
    
    0: This value causes fullscreen playback. This is currently the default value, though the default is subject to change.
    
    1: This value causes inline playback.
    
*/
options.playerVars.playsinline=0;

/*
    rel 
    
    default:1
    
    0 播放完畢以後 不顯示相關影片 
    
    1 播放完畢以後 顯示其他相關影片連結
*/
options.playerVars.rel=1;

/*
    showinfo
    
    default:1
    
    0 the player will not display information like the video title and uploader before the video starts playing.
    
    1
*/
options.playerVars.showinfo=1;

/*
    start
    
    Values: A positive integer
    
    his parameter causes the player to begin playing the video at the given number of seconds from the start of the video.
*/
options.playerVars.start=0;


/*
    theme 樣板顏色
    
    default:dark
    
    dark
    
    light
*/
options.playerVars.theme='dark';

// 影藏放大按鈕 
//options.playerVars.fs=0;
//options.playerVars.modestbranding=1;


options.renderId = 'player';

options.width = 640;

//options.height = 390;

options.youtube_id = 'LmMF00Ip0y0';

options.youtube_id = 'Wg5sjqUYR5g';

options.youtube_id = '3SR75k7Oggg';

options.debug=1;

options.title = '冰雪奇緣';

options.ENDED = function(e){
    
    console.log(this.options.renderId);
    
    var renderTo = document.getElementById(this.options.renderId);
    
    //renderTo.innerHTML='';
    
}
var youtube = new __youtubeplayer(options);

</script>
</body>
</html>