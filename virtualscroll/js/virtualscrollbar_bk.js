
/*
    所有元件
    viewport => 目標視窗 div
    target => 目標內容物 
    virtualscrollbar => 虛擬的scrollbar
    thumb => scrollbar上的手把
    
    需要那些數據 
    target height
    viewport height
    thumb 手把 top
    
    需要操作的元件
    viewport top
    thumb top
    
    
    需要綁定的事件 
    target onmousewheel
    
    
    設定 
    
    滾輪的速度 100
    speed int 
    
    自動隱藏 true
    autohide true,false
    
    樣式
    
    virtualbar_style ={}
    virtualbar_style['width'] = '8px';
    
    thumb_style = {}
    thumb_style['backgroundColor'] = 'red';
*/
var __virtualScrollbar = function(options){
    
    var self = this
    ,_handleMousewheel = function(e){
        e = e || window.event;
        e.preventDefault();
        var delta = 0;
        if(e.wheelDelta){
            delta = e.wheelDelta/120;
            if(window.opera) delta=delta*-1;
        }else if(e.detail){
            delta = e.detail/3*-1;
        }
        
        onmousewheel.apply(self,[e, delta]);
    }
    ,onmousewheel = function(e, intDelta){
        if (intDelta > 0){
           scrollup(e);
        }else if (intDelta < 0){
            scrolldown(e);
        }
        
        if(typeof options.onmousewheel == 'function') options.onmousewheel.apply(self,[e, delta]);
    }
    ,scrollup = function(e){
        
        //如果到頂 就 return
        if(self.target.offsetTop<0){
            self.target.style.top=(self.target.offsetTop+100) + 'px';
            self.thumb.style.top = get_thumb_top()+'px';
        }else{
            self.target.style.top = '0px';
            self.thumb.style.top='0px';
        }
    }
    ,scrolldown = function(e){
        
        //判斷 target 的 top 上限 
        if(self.target.offsetTop*-1 < max_target_top()){
            self.target.style.top=(self.target.offsetTop-100)+'px';
            self.thumb.style.top = get_thumb_top()+'px';
        }else{
            self.target.style.top = '-'+max_target_top()+'px';
            self.thumb.style.top = max_thumb_top()+'px';
            return;
        }
    }
    ,max_target_top = function(){
        self.target.clientHeight;
        self.viewport.clientHeight;
        
        if(self.viewport.clientHeight >= self.target.clientHeight){
            return 0;
        }else{
            return self.target.clientHeight - self.viewport.clientHeight;
        }
    }
    ,max_thumb_top = function(){
        return self.viewport.clientHeight - self.thumb.clientHeight;
    }
    ,min_thumb_top = function(){
        return 0;
    }
    ,get_thumb_top = function(){
        // 利用 target 座標 計算 thumb 應該在哪個位置 
        // thumb range  0 ~ viewport.clientHeight - thumb.clientHeight;
        // target range  0 ~ target.clientHeight - viewport.clientHeight;
        
        // 目前 target 的 y座標  
        var y = self.target.offsetTop*-1;
        
        // 目前 target y座標 走了多少百分比 
        var percent =  y / max_target_top();
        
        // 目前 thumb 最大 座標距離 * 百分比
        return max_thumb_top()*percent;
        //return self.target.offsetTop*-1 * (self.viewport.clientHeight / self.target.clientHeight) * (self.viewport.clientHeight-self.thumb.clientHeight);
    }
    ,get_target_top = function(){
        // 利用 thumb 座標 計算 target 座標 
        var y = self.thumb.offsetTop*-1;
        
        var percent = y / max_thumb_top();
        
        return max_target_top()*percent;
    }
    ,getPos = function(e){
        e = e || window.event;
        var docEl = document.documentElement;
        var scrollLeft = docEl.scrollLeft || document.body.scrollLeft;
        var scrollTop  = docEl.scrollTop || document.body.scrollTop;
        var p = {};
        p.x = e.pageX || (e.clientX  + scrollLeft);
        p.y = e.pageY || (e.clientY  + scrollTop);
        return p;
    }
    ,addEvent = function(elem, type , handle){
        if ( elem.addEventListener ) {
            elem.addEventListener( type, handle, false );
        } else if ( elem.attachEvent ) {
            elem.attachEvent( "on" + type, handle );
        }
    }
    ,removeEvent = function(elem, type, handle){
        if(elem.removeEventListener){
            elem.removeEventListener(type, handle, false);
        }else if(elem.detachEvent){
            elem.detachEvent('on' + type, handle);
        }
    }
    ,mouseenter = function(e){
        e = e || window.event;
        var el = e.target || e.srcElement;
        //console.log('mouseenter');
        if(options.autohide){
            self.virtualbar.style.opacity='1';
        }
    }
    ,mouseleave = function(e){
        e = e || window.event;
        var el = e.target || e.srcElement;
        //console.log('mouseleave');
        if(options.autohide){
            self.virtualbar.style.opacity='0';
        }
    }
    ,init = function(){
        options = options || {};
        
        options.speed = options.speed || 100;
        
        if(typeof options.autohide == 'undefined') options.autohide=1;
        else options.autohide = options.autohide-0;
        
        options.bar = options.bar || {};
        options.bar['position'] = 'absolute';
        options.bar['right'] = '0';
        options.bar['top'] = '0';
        options.bar['zIndex'] = options.bar['zIndex'] || '2';
        options.bar['width'] = options.bar['width'] || '8px';
        
        options.thumb = options.thumb || {};
        options.thumb['position'] = 'absolute';
        options.thumb['top'] = '0';
        options.thumb['width'] = options.thumb['width'] || '8px';
        options.thumb['height'] = options.thumb['height'] || '40px';
        options.thumb['cursor'] = options.thumb['cursor'] || 'pointer';
        options.thumb['backgroundColor'] = options.thumb['backgroundColor'] || 'red';
        options.thumb['borderRadius'] = options.thumb['borderRadius'] || '4px';
        
    }
    ,disableSelection = function(elem){
        elem.style.webkitTouchCallout='none';
        elem.style.webkitUserSelect='none';
        elem.style.khtmlUserSelect='none';
        elem.style.MozUserSelect='none';
        elem.style.oUserSelect='none';
        elem.style.msUserSelect='none';
        elem.style.userSelect='none';
        /*
        return this.attr('unselectable', 'on')
               .css({'-moz-user-select':'-moz-none',
                     '-moz-user-select':'none',
                     '-o-user-select':'none',
                     '-khtml-user-select':'none',
                     '-webkit-user-select':'none',
                     '-ms-user-select':'none',
                     'user-select':'none'})
               .bind('selectstart', false);
        */
    }
    ,enableSelection = function(elem){
        elem.style.webkitTouchCallout='auto';
        elem.style.webkitUserSelect='auto';
        elem.style.khtmlUserSelect='auto';
        elem.style.MozUserSelect='auto';
        elem.style.oUserSelect='auto';
        elem.style.msUserSelect='auto';
        elem.style.userSelect='auto';
    }
    ;
    
    this.target;
    
    this.viewport;
    
    this.virtualscrollbar;
    
    this.thumb;
    
    /*
        拖曳
        
        事件
        onmousedown
        onmouseup
        onmousemove
        
        座標
        pos.x
        pos.y
        
        偏移
        offsetX
        offsetY
        
    */
    this.thumbhandler = (new function(){
        
        var thumbhandler = this;
        
        this.x;
        
        this.y;
        
        this.elementTop;
        
        this.elementLeft;
        
        this.offsetX;
        
        this.offsetY;
        
        this.mousedown = function(e){
            e = e || window.event;
            var pos = getPos(e);
            
            self.target.style.userSelect = 'none';
            thumbhandler.x = pos.x;
            thumbhandler.y = pos.y;
            
            thumbhandler.elementTop = self.thumb.offsetTop;
            thumbhandler.elementLeft = self.thumb.offsetLeft;
            
            addEvent(document, 'mousemove' ,thumbhandler.mousemove);
            
            disableSelection(self.target);
        }
        
        this.mouseup = function(e){
            removeEvent(document, 'mousemove' ,thumbhandler.mousemove);
            enableSelection(self.target);
        }
        
        this.mousemove = function(e){
            var pos = getPos(e);
            thumbhandler.offsetX = thumbhandler.x - pos.x;
            thumbhandler.offsetY = thumbhandler.y - pos.y;
            thumbhandler.move(thumbhandler.offsetY);
        }
        
        /*
            thumb 移動
        */
        this.move = function(offsetY){
            offsetY = offsetY*-1;
            
            var top = thumbhandler.elementTop + offsetY;
            //console.log(top);
            
            if(top < min_thumb_top()){
                top = min_thumb_top();
            }else if(top > max_thumb_top()){
                top = max_thumb_top();
            }
            
            self.thumb.style.top = top + 'px';
            
            self.target.style.top = get_target_top()+'px';
        }
        
    }());
    
    this.bind = function(target){
        if(typeof target == 'string') target = document.getElementById(target);
        //this.target = target;
        var height = target.clientHeight;
        var width = target.clientWidth;
        //var html = target.innerHTML;
        
        this.viewport = target;
        //this.viewport = document.createElement('div');
        //this.viewport.style.width=width+'px';
        //this.viewport.style.height=height+'px';
        this.viewport.style.overflow='hidden';
        this.viewport.style.position='relative';
        
        this.target = document.createElement('div');
        this.target.style.overflow='hidden';
        this.target.style.height='auto';
        this.target.style.width='auto';
        this.target.style.position='absolute';
        
        while (target.childNodes.length > 0) {
            this.target.appendChild(target.childNodes[0]);
        }
        
        var style;
        
        this.virtualbar = document.createElement('div');
        this.virtualbar.style.position='absolute';
        this.virtualbar.style.height=height+'px';
        this.virtualbar.style.width='8px';
        this.virtualbar.style.right='0';
        this.virtualbar.style.top='0';
        this.virtualbar.style.zIndex='2';
        this.virtualbar.className='virtualbar';
        
        for(style in options.bar){
            if(options.bar.hasOwnProperty(style)){
                this.virtualbar.style[style] = options.bar[style];
            }
        }
        
        if(options.autohide){
            this.virtualbar.style.transition = 'opacity 2s';
            this.virtualbar.style.opacity='0';
        }
        
        this.thumb = document.createElement('div');
        this.thumb.style.position='absolute';
        this.thumb.style.backgroundColor='red';
        this.thumb.style.borderRadius='4px';
        this.thumb.style.top='0';
        this.thumb.style.width='8px';
        this.thumb.style.height='40px';
        this.thumb.style.cursor='pointer';
        this.thumb.className='thumb';
        
        for(style in options.thumb){
            if(options.thumb.hasOwnProperty(style)){
                this.thumb.style[style] = options.thumb[style];
            }
        }
        
        addEvent(this.thumb, 'mousedown', this.thumbhandler.mousedown);
        addEvent(document, 'mouseup', this.thumbhandler.mouseup);
        
        this.virtualbar.appendChild(this.thumb);
        
        //this.target.parentNode.replaceChild(this.viewport, this.target);
        this.viewport.appendChild(this.virtualbar);
        this.viewport.appendChild(this.target);
        
        // 新增事件
        if(this.viewport.addEventListener){
            //firefox
            this.viewport.addEventListener('DOMMouseScroll',_handleMousewheel,false);
        }
        this.viewport.onmousewheel=_handleMousewheel;
        
        addEvent(this.viewport, 'mouseenter' , mouseenter);
        
        addEvent(this.viewport, 'mouseleave' , mouseleave);
    }
    
    init();
    if(options.renderTo) this.bind(options.renderTo);
}



