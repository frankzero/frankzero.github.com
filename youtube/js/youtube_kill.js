"use strict";
function __youtubeplayer(options){ 
    
    var self = this;
    
    var emptyFN = function(){}
    
    this.id = function(){
        var num = 10;
        var t = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'
            , 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            , 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'
            , 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        var f = [];
        for (var i = 0; i < num; i++) {
            f[i] = t[(i != 0) ? Math.floor((Math.random() * 62)) : Math.floor((Math.random() * 52))];
        }
        return f.join('');
    }
    
    this.init = function(options){
        
        options = options || {};
        
        options.playerVars = options.playerVars || {};
        
        if( !options.renderId && !this.options.renderId ) console.log('renderId cant be empty.');
        
        if( !options.youtube_id && !this.options.youtube_id ) console.log('youtube_id cant be empty.');
        
        this.options.video_warpper_id = this.options.video_warpper_id || this.id();
        
        this.options.width =  options.width || this.options.width || 640;
        
        this.options.height = options.height || this.options.height || Math.round(this.options.width*39/64);
        
        this.options.debug = options.debug || this.options.debug || 0;
        
        this.options.renderId = options.renderId || this.options.renderId;
        
        this.options.youtube_id = options.youtube_id || this.options.youtube_id;
        
        this.options.UNSTARTED = options.UNSTARTED || this.options.UNSTARTED || emptyFN;
        
        this.options.ENDED = options.ENDED || this.options.ENDED || emptyFN;
        
        this.options.PLAYING = options.PLAYING || this.options.PLAYING || emptyFN;
        
        this.options.PAUSED = options.PAUSED || this.options.PAUSED || emptyFN;
        
        this.options.BUFFERING = options.BUFFERING || this.options.BUFFERING || emptyFN;
        
        this.options.CUED = options.CUED || this.options.CUED || emptyFN;
        
        this.options.onReady = options.onReady || this.options.onReady || emptyFN;
        
        this.options.onStateChange = options.onStateChange || this.options.onStateChange || emptyFN;
        
        this.options.onPlaybackQualityChange = options.onPlaybackQualityChange || this.options.onPlaybackQualityChange || emptyFN;
        
        this.options.onError = options.onError || this.options.onError || emptyFN;
        
        this.options.title = options.title || this.options.title || '';
        
        var playerVars = options.playerVars;
        
        var myplayerVars = this.options.playerVars;
        
        /*
            0 the video progress bar and the video player controls will be visible throughout the video and in fullscreen.
            
            1 the video progress bar and the player controls will slide out of view a couple of seconds after the video starts playing.
            They will only reappear if the user moves her mouse over the video player or presses a key on her keyboard.
            
            2 the video progress bar to fade out while the player controls (play button, volume control, etc.) remain visible.
        */
        myplayerVars.autohide = this.priority(playerVars.autohide, myplayerVars.autohide, 0);
        
        /*
            0
            
            1 自動撥放
        */
        myplayerVars.autoplay = this.priority(playerVars.autoplay, myplayerVars.autoplay, 0);

        /*
            影片進度條顏色 
            default:red
            red : 
            white : 
        */
        myplayerVars.color = this.priority(playerVars.color, myplayerVars.color, 'red');

        /*
            0 Player controls do not display in the player. For IFrame embeds, the Flash player loads immediately.
            
            1 Player controls display in the player. For IFrame embeds, the controls display immediately and the Flash player also loads immediately.
            
            2 Player controls display in the player. For IFrame embeds, the controls display and the Flash player loads after the user initiates the video playback.
            
        */
        
        myplayerVars.controls = this.priority(playerVars.controls, myplayerVars.controls, 1);
        
        /*
            disablekb AS3 only
            
            0 
            
            1 disable the player keyboard controls.  停掉鍵盤控制
            
             Spacebar: Play / Pause 
             Arrow Left: Jump back 10% in the current video 
             Arrow Right: Jump ahead 10% in the current video 
             Arrow Up: Volume up 
             Arrow Down: Volume Down 
        */
        myplayerVars.disablekb = this.priority(playerVars.disablekb, myplayerVars.disablekb, 0);
        
        
        /*
            0
            
            1
        */
        myplayerVars.enablejsapi = this.priority(playerVars.enablejsapi, myplayerVars.enablejsapi, 0);
        
        /*
            end AS3 only
            Values: A positive integer
            設定秒數 播放到幾秒 就停止
            
        */
        //myplayerVars.end = this.priority(playerVars.end, myplayerVars.end, 0);
        
        /*
            fs AS3 only 
            
            0 隱藏全螢幕按鈕 
            
            1 顯示全螢幕按鈕 
        */
        myplayerVars.fs = this.priority(playerVars.fs, myplayerVars.fs, 1);
        
        /*
            iv_load_policy
            
            1 顯示 影片註解 
            
            3 不顯示 影片註解 (annotations)
            
        */
        myplayerVars.iv_load_policy = this.priority(playerVars.iv_load_policy, myplayerVars.iv_load_policy, 1);
        
        /*
            list AS3 only
            
            他跟 listType 關聯 
            
            If the listType parameter value is search, then the list parameter value specifies the search query.
            
            If the listType parameter value is user_uploads, 
            then the list parameter value identifies the YouTube channel whose uploaded videos will be loaded.
            
            If the listType parameter value is playlist, then the list parameter value specifies a YouTube playlist ID. 
            In the parameter value, you need to prepend the playlist ID with the letters PL as shown in the example below.
        */
        //myplayerVars.list = this.priority(playerVars.list, myplayerVars.list, 1);
        
        /*
            listType AS3 only 
            
            The listType parameter, in conjunction with the list parameter, identifies the content that will load in the player.
            Valid parameter values are playlist, search, and user_uploads.
            
            If you specify values for the list and listType parameters, the IFrame embed URL does not need to specify a video ID.
        */
        //myplayerVars.listType = this.priority(playerVars.listType, myplayerVars.listType, 1);
        
        /*
            loop 循環播放 
            
            0
            
            1
            
        */
        myplayerVars.loop = this.priority(playerVars.loop, myplayerVars.loop, 0);

        /*
            modestbranding 
            
            default:0
            
            0 顯示下面bar上的 youtube logo
            
            1 隱藏下面bar上的 youtube logo
            
        */
        myplayerVars.modestbranding = this.priority(playerVars.modestbranding, myplayerVars.modestbranding, 0);

        /*
            origin
            This parameter provides an extra security measure for the IFrame API and is only supported for IFrame embeds. 
            If you are using the IFrame API, which means you are setting the enablejsapi parameter value to 1,
            you should always specify your domain as the origin parameter value.
        */
        //myplayerVars.origin   = this.priority(playerVars.origin  , myplayerVars.origin  , 1);
        
        /*
            playlist 
            播放列表  用 逗點隔開  在播完 videoId 以後 會照這個列表順序撥放下去 
        */
        myplayerVars.playlist = this.priority(playerVars.playlist, myplayerVars.playlist, undefined);
        
        /*
            0 播放完畢以後 不顯示相關影片 
            
            1 播放完畢以後 顯示其他相關影片連結
        */
        
        /*
            playsinline
            This parameter controls whether videos play inline or fullscreen in an HTML5 player on iOS
            
            0: This value causes fullscreen playback. This is currently the default value, though the default is subject to change.
            
            1: This value causes inline playback.
            
            IOS 用的 0 大螢幕 1 內鑲
            
        */
        myplayerVars.playsinline = this.priority(playerVars.playsinline, myplayerVars.playsinline, 0);
        
        myplayerVars.rel = this.priority(playerVars.rel, myplayerVars.rel, 1);
        /*
            0 the player will not display information like the video title and uploader before the video starts playing.
            
            1
        */
        myplayerVars.showinfo = this.priority(playerVars.showinfo, myplayerVars.showinfo, 1);

        /*
            Values: A positive integer
            
            在第幾秒開始撥放 
            
            his parameter causes the player to begin playing the video at the given number of seconds from the start of the video.
        */
        myplayerVars.start = this.priority(playerVars.start, myplayerVars.start, 0);

        /*
            theme 樣板顏色
            
            dark
            
            light
        */
        myplayerVars.theme = this.priority(playerVars.theme, myplayerVars.theme, 'dark');
        
    }
    
    // return 陣列中 最前面不是 undefined 的值
    this.priority = function(){
        var i,imax;
        for(i=0,imax=arguments.length;i<imax;i++){
            if(typeof arguments[i] != 'undefined') return arguments[i];
        }
    }
    
    this.UNSTARTED = function(e){
        if(typeof self.options.UNSTARTED == 'function') self.options.UNSTARTED.call(self, e);
    }
    
    this.ENDED = function(e){
        if(typeof self.options.ENDED == 'function') self.options.ENDED.call(self, e);
    }
    
    this.PLAYING = function(e){
        if(typeof self.options.PLAYING == 'function') self.options.PLAYING.call(self, e);
    }
    
    this.PAUSED = function(e){
        if(typeof self.options.PAUSED == 'function') self.options.PAUSED.call(self, e);
    }
    
    this.BUFFERING = function(e){
        if(typeof self.options.BUFFERING == 'function') self.options.BUFFERING.call(self, e);
    }
    
    this.CUED = function(e){
        if(typeof self.options.CUED == 'function') self.options.CUED.call(self, e);
    }
    
    this.onReady = function(e){
        if(self.options.debug) console.log('onReady');
        
        if(typeof self.options.onReady == 'function') self.options.onReady.call(self, e);
        
    }
    
    this.map_state = {
        '-1':'UNSTARTED'
        ,'0':'ENDED'
        ,'1':'PLAYING'
        ,'2':'PAUSED'
        ,'3':'BUFFERING'
        ,'5':'CUED'
    };
    
    this.onStateChange = function(e){
        if(self.options.debug) console.log('onStateChange : '+e.data+' : '+self.map_state[e.data]);
        
        if(typeof self.options.onStateChange == 'function') self.options.onStateChange.call(self, e);
        
        switch(e.data){
             
            case YT.PlayerState.PLAYING:
                self.PLAYING.call(self, e);
                break;
            
            case YT.PlayerState.PAUSED:
                self.PAUSED.call(self, e);
                break;
            
            case YT.PlayerState.UNSTARTED:
                self.UNSTARTED.call(self, e);
                break;
            
            case YT.PlayerState.ENDED:
                
                self.ENDED.call(self, e);
                
                //循環播放 
                if(self.options.playerVars.loop == 1){
                    e.target.playVideo();
                }
                break;
            
            case YT.PlayerState.BUFFERING:
                self.BUFFERING.call(self, e);
                break;
            
            case YT.PlayerState.CUED:
                self.CUED.call(self, e);
                break;
            
            default:
                break;
        }
        
    }
    
    this.onPlaybackQualityChange = function(e){
        if(self.options.debug) console.log('onPlaybackQualityChange');
        
        if(typeof self.options.onPlaybackQualityChange == 'function') self.options.onPlaybackQualityChange.call(self, e);
        
    }
    
    this.onError = function(e){
        if(self.options.debug) console.log('onError');
        
        if(typeof self.options.onError == 'function') self.options.onError.call(self, e);
        
    }
    
    this.load_iframe_api = function(){
        if(typeof YT == 'undefined'){
            window.onYouTubeIframeAPIReady = self.onYouTubeIframeAPIReady;
        // This code loads the IFrame Player API code asynchronously.
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }else{
            self.onYouTubeIframeAPIReady();
        }
    }
    
    this.onYouTubeIframeAPIReady = function(e){
        if(self.options.debug) console.log('onYouTubeIframeAPIReady');
        
        // 生一個div在裡面 
        
        var renderTo = document.getElementById(self.options.renderId);
        renderTo.style.position='relative';
        renderTo.style.width=self.options.width+'px';
        renderTo.style.height=self.options.height+'px';
        //renderTo.style.boxSizing = 'border-box';
        renderTo.innerHTML = '';
        
        var div = document.createElement('div');
        div.setAttribute('id',self.options.video_warpper_id);
        renderTo.appendChild(div);
        
        if(self.options.title){
            // virtual title
            self.options.playerVars.showinfo = 0;
        } 
        
        console.log(self.options.playerVars);
        self.player = new YT.Player(self.options.video_warpper_id, {
            height: self.options.height,
            width: self.options.width,
            videoId: self.options.youtube_id,
            playerVars:self.options.playerVars,
            events: {
            'onReady': self.onReady,
            'onStateChange': self.onStateChange,
            'onPlaybackQualityChange': self.onPlaybackQualityChange,
            'onError': self.onError
            }
        });
        
        if(self.options.title){
            self.create_virtual_title();
        }
        
    }
    
    this.create_virtual_title = function(){
        
        var renderTo = document.getElementById(self.options.renderId);
        
        var virtual_title = document.createElement('div');
        virtual_title.style.backgroundColor='rgba(26, 25, 23, 0.5)'; //'#1A1917';
        virtual_title.style.position='absolute';
        virtual_title.style.color='#fff';
        virtual_title.style.padding='5px 10px';
        virtual_title.style.width='100%';
        virtual_title.style.textAlign='left';
        virtual_title.style.boxSizing = 'border-box';
        virtual_title.style.overflow = 'hidden';
        
        var text = document.createElement('span');
        text.style.fontSize='12px';
        text.style.fontFamily='Microsoft JhengHei UI';
        text.innerHTML = self.options.title;
        
        virtual_title.appendChild(text);
        
        renderTo.insertBefore(virtual_title,document.getElementById(self.options.video_warpper_id));
        
        document.getElementById(self.options.video_warpper_id).onmouseover = function(e){
            virtual_title.style.display='block';
        }
        
        document.getElementById(self.options.video_warpper_id).onmouseout = function(e){
            virtual_title.style.display='none';
        }
    }
    
    this.play = function(){
        this.player.playVideo(); 
    }
    
    this.pause = function(){
        this.player.pauseVideo();
    }
    
    this.replay = function(options){
        
        this.init(options);
        
        var renderId = this.options.renderId;
        
        var renderTo = document.getElementById(renderId);
        
        var div = document.createElement('div');
        div.setAttribute('id', renderId);
        
        renderTo.parentNode.replaceChild(div, renderTo);
        
        this.onYouTubeIframeAPIReady();
    }
    
    this.options = {playerVars:{}};
    
    this.init(options);
    
    this.load_iframe_api();
    
}
