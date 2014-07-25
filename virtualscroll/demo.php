<!DOCTYPE html >
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<title></title>
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/elements.css">
<style>
*{
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
}

body{
    
}

.block{
    padding:20px 10px 20px 10px;
}


</style>
</head>

<body>


<div class="block">
    <div class="video_list">
        
        <div class="scrollbar">
            <div class="scrollbar-thumb"></div>
        </div>
        
        <div class="viewport">
        <?php for($i=0;$i<100;$i++):?>
        <a class="video_list_item" href="#">
            
            <div class="img-container">
                <img src="http://d1d4324mp0stc8.cloudfront.net/media/photo/pRW1EjRW0_360w_v1.png" />
                <div class="img-mask"></div>
            </div>
            
            <div class="info">
                <div class="title">
                    <h4>Guys Are Not Only Attracted To Hot Girls, It's Way More Than That</h4>
                </div>
                <div class="meta">
                    <p>3:27</p>
                </div>
            </div>
            
            <div class="wrapper_button_watch_later">
                <span>«O¦s</span>
            </div>
            
            <div class="wrapper_button_watched">
                <span>¤wÅª</span>
            </div>
        </a>
        <?php endfor;?>
        </div>
    </div>
</div>

<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="js/jQuery_mousewheel_plugin.js"></script>
<script>
window.onload = function(){
    $('.video_list_item').click(function(e){
        $('.video_list_item').removeClass('playing');
        $(this).addClass('playing');
        e.preventDefault();
    });
    
    $('.video_list').mousewheel(function(e, intDelta){
//        console.log(intDelta);
        //console.log(e.wheelDelta);
        if (intDelta > 0){
           intOverallDelta--;
           //console.log('up - (' + intOverallDelta + ')');
        }
        else if (intDelta < 0){
            intOverallDelta++;
           //console.log('down - (' +  intOverallDelta + ')');
        }
        e.preventDefault();
        
        var dom = e.target || e.srcElement;
        //console.log(intOverallDelta);
        ///viewport.scrollTop = intOverallDelta*100;
        viewport.style.top='-'+intOverallDelta*100+'px';
        var top = intOverallDelta /video_list.clientHeight;
        console.log(top);
        top = video_list.clientHeight*top;
        console.log(top);
        thumb.style.top = top+'px';
    });
    
}

var intOverallDelta = 0;

var viewport = $('.viewport')[0];
var video_list = $('.video_list')[0];
var thumb = $('.scrollbar-thumb')[0];





</script>
</body>
</html>
