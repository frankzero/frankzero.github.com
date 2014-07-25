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
    <div id="video_list" class="video_list">
        
        <?php for($i=0;$i<100;$i++):?>
        <a class="video_list_item" href="#">
            
            <div class="img-container">
                <img src="http://d1d4324mp0stc8.cloudfront.net/media/photo/pRW1EjRW0_360w_v1.png" />
                <div class="img-mask"></div>
            </div>
            
            <div class="info">
                <div class="title">
                    <h4><?=$i;?> Guys Are Not Only Attracted To Hot Girls, It's Way More Than That</h4>
                </div>
                <div class="meta">
                    <p>3:27</p>
                </div>
            </div>
            
            <div class="wrapper_button_watch_later">
                <span>保存</span>
            </div>
            
            <div class="wrapper_button_watched">
                <span>已讀</span>
            </div>
        </a>
        <?php endfor;?>
    </div>
</div>


<script src="js/virtualscrollbar.js"></script>
<script>
window.onload = function(){
    var options = {};
    options.renderTo = 'video_list';
    options.autohide=1;
    
    options.thumb={};
    options.thumb.backgroundColor='#B03C3F';
    options.thumb.height='40px';
    
    options.bar={};
    //options.bar.border='1px gray solid';
    options.bar.borderRadius='6px';
    options.bar.backgroundColor='#333';
    //options.bar.boxShadow='0 0 6px gray inset';

    var scroller = new __virtualScrollbar(options);
}








</script>
</body>
</html>
