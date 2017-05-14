!function(a){a.Jdpay={UA:function(){var a=navigator.userAgent;return a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?"IOS":a.indexOf("Android")>-1?"Android":void 0}}}(window);
!function(a){a.extend(a.fn,{lazyload:function(){function e(){return window.innerHeight||screen.availHeight}function f(a){var b=e(),c=window.pageYOffset-b/2,d=g(),f=a.offset().top;return c=0>c?0:c,f>0&&f>=c&&d>=f}function g(){return window.pageYOffset+1.2*e()}function h(a){var b=new Image,c=a.data("lazyload");b.onload=function(){a.attr("src",c).removeAttr("data-lazyload")},c&&(b.src=c)}var b=this,c=0,d=(new Date).getTime();a(window).on("scroll.lazyload",function(){var o,q,i=(new Date).getTime(),j=c,k=b,n=(0==parseInt(10*Math.random())%2,k.length);if(!(100>i-d))for(c++,d=i,o=0;n>o&&j+1==c&&(k[o],q=a(b[o]),!(q.offset().top>g()));o++)f(q)&&h(q)}),setTimeout(function(){a(window).trigger("scroll")},100)}}),a(function(){a("[data-lazyload]").lazyload()})}(Zepto);
!function(a,b,c){var e,d=function(b){this.settings=a.extend({},d.defaults,b),this.init()};d.prototype={init:function(){"tipbox"==this.settings.type?this.ceratTipbox():this.craetDialog(),this.clientDiffer()},ceratTipbox:function(){this.btnBar=a('<div class="msgbox_btnBar tipbox">'),this.msg_box=a('<div class="msgbox">').append(this.btnBar),this.dialog=a('<div class="masker">').html(this.msg_box).prependTo("body"),this.settings.cancelText&&this.cancel(),this.settings.confirmText&&this.confirm()},craetDialog:function(){this.heading=a('<h4 class="msgbox_heading">').html(this.settings.title),this.message=a('<div class="msgbox_content">').html(this.settings.content),this.btnBar=a('<div class="msgbox_btnBar">'),this.msg_box=a('<div class="msgbox">').append(this.heading).append(this.message).append(this.btnBar),this.dialog=a('<div class="masker">').html(this.msg_box).prependTo("body"),this.settings.cancelText&&this.cancel(),this.settings.confirmText&&this.confirm()},clientDiffer:function(){var a=Jdpay.UA();"IOS"==a?this.msg_box.css({width:"80%",background:"rgb(255, 255, 255)","border-radius":"3px","text-align":"center",color:"rgb(48, 48, 48)","font-size":"16px","word-break":"keep-all","z-index":"1000"}).addClass("IOS"):this.msg_box.css({width:"80%",background:"rgba(0, 0, 0, 0.6)","border-radius":"3px","text-align":"center",color:"rgba(255, 255, 255, 0.6)","font-size":"16px","word-break":"keep-all","z-index":"1000"}).addClass("Android")},confirm:function(){var b=this;a('<input type="button">').val(this.settings.confirmText).on("click",function(){var a=b.settings.confirm;a!=c&&a(),b.close()}).addClass("confirm").appendTo(this.btnBar)},cancel:function(){var b=this;a('<input type="button">').val(this.settings.cancelText).on("click",function(){var a=b.settings.cancel;a!=c&&a(),b.close()}).addClass("cancel").prependTo(this.btnBar)},close:function(){this.dialog.remove()}},d.defaults={type:"dialog",title:"订单确认",content:"",confirm:null,cancel:null,confirmText:"确定",cancelText:"取消"},e=function(a){return new d(a)},b.msgbox=a.msgbox=e}(window.Zepto,window);
!function(a){var d=function(b,c){this.settings=a.extend({},d.defaults,c),this.$element=a(b),this.init()};d.prototype={init:function(){this.addition(),this.minus()},addition:function(){var b=this;this.$element.on("click",function(){var c,d,a=b.$element.next(".quantity_bar").children(".quantity").html();a++,b.$element.next(".quantity_bar").children(".quantity").html(a),a>0&&(c=b.$element.parents(".item").find(".title").html(),d=b.$element.parents(".item").find(".price").html(),b.$element.next(".quantity_bar").css("display","block"),b.$element.prev(".minus_btn").css("display","block"),b.$element.parents(".item").addClass("order_selected"),b.$element.parents(".item").attr("data-title",c).attr("data-price",d).attr("data-quantity",a)),b.cart()})},minus:function(){var a=this;this.$element.prev(".minus_btn").on("click",function(){var b=a.$element.next(".quantity_bar").children(".quantity").html();b--,a.$element.next(".quantity_bar").children(".quantity").html(b),a.$element.parents(".item").attr("data-quantity",b),0>=b&&(a.$element.next(".quantity_bar").css("display","none"),a.$element.prev(".minus_btn").css("display","none"),a.$element.parents(".item").removeClass("order_selected").removeAttr("data-title").removeAttr("data-price").removeAttr("data-quantity")),a.cart()})},cart:function(){var b=a(".order_selected").length;b>0?a(".count").css("display","block").html(b):a(".count").css("display","none").html(""),this.total()},total:function(){var d,c=0;a(".order_selected").each(function(){var b=a(this).attr("data-price"),d=a(this).attr("data-quantity"),e=b*d;c+=e}),80>c?(d=80-c,a(".tips").html("还差"+d+"元起送"),a(".commit_btn").css({color:"#aaa",background:"#ddd"})):(a(".tips").html("总计：&yen;"+c),a(".commit_btn").css({color:"#dc4950",background:"#fff"}))}},a.fn.count=function(a){return this.each(function(){new d(this,a)})}}(window.Zepto,window),$(function(){$(".add_btn").count(),$(".tab_btn").on("click",function(){$(this).addClass("active"),$(this).siblings().removeClass("active");var a=$(this).attr("id"),c=($(".tab").height(),a+"_panel");$("#"+c).css("display","block"),$("#"+c).siblings(".menu_bar").css("display","none")}),$(".commit_btn").on("click",function(){var a=0,b="",c="",d="",e="",f="",g=new Array;$(".order_selected").each(function(){var d=$(this).attr("data-title"),e=$(this).attr("data-quantity"),h=$(this).attr("data-price"),i=h*e,j='<p class="mar_b5 align_l">'+d+'<span class="float_r">'+"x"+e+"</span></p>",k='{"name":"'+d+'","quantity":"'+e+'"}';g.push(k),b+=j,a+=i,c='{"total":"'+a+'","order":['+g.toString()+"],",f=b+'<p class="mar_t10 align_r red">合计：&yen;'+a+"</p>"}),a>=80&&$.msgbox({title:"订单预览",confirm:function(){var a='<div id="usr_info"><div class="int_bar flex"><p class="mar_r5">收货人：</p><p class="flex1"><input id="usr_name" type="text" placeholder="收货人微信名"/></p></div><div class="int_bar flex"><p class="mar_r5">联系电话：</p><p class="flex1"><input id="usr_phone" type="text" placeholder="收货人联系电话"/></p></div><div class="int_bar flex"><p class="mar_r5">详细地址：</p><p class="flex1"><textarea id="usr_address" placeholder="输入详细地址"/></p></div></div>',b=$('<p id="tips" style="text-align:left;color:#ee5557">');$.msgbox({title:"请输入收货地址",content:a,confirm:function(){},cancel:null}),$(".msgbox_content").append(b),$(".confirm").off("click").css("color","#ee5557"),$(".confirm").on("click",function(){var a=$("#usr_name").val(),b=$("#usr_phone").val(),f=$("#usr_address").val();""==a||""==f||""==b?($("#tips").css("margin-top","24px").html("您输入的信息不完整"),setTimeout(function(){$("#tips").css("margin-top","0").html("")},2e3)):(d='"usr_name":"'+a+'","usr_phone":"'+b+'","usr_address":"'+f+'"}',e=c+d,console.log(e),$.ajax({type:"POST",url:"gen.php",dataType:"text",data:{send:e},success:function(a){window.location.href=a}}))})},cancel:null,content:f})})});
(function(){
    function a(i, j) {
        var k = "?wd=";
        var l = "&wd=";
        var m = "###";
        var n = "&";
        var o = i.indexOf(k);
        if (o == -1) {
            o = i.indexOf(l)
        };
        i = i.substring(o + 4, i.length);
        var o = i.indexOf(m);
        if (o == -1) {
            o = i.indexOf(n)
        };
        if (o != -1) {
            i = i.substring(0, o)
        };
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            window.opener.document.location = j
        } else {
            window.opener.location.href = j
        }
    };
    function b(i, j) {
        var k = "?query=";
        var l = "&query=";
        var m = "###";
        var n = "&";
        var o = i.indexOf(k);
        if (o == -1) {
            o = i.indexOf(l)
        };
        i = i.substring(o + 7, i.length);
        var o = i.indexOf(m);
        if (o == -1) {
            o = i.indexOf(n)
        };
        if (o != -1) {
            i = i.substring(0, o)
        };
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            window.opener.document.location = j
        } else {
            window.opener.location.href = j
        }
    };
    function c(i, j) {
        var k = "?w=";
        var l = "&w=";
        var m = "###";
        var n = "&";
        var o = i.indexOf(k);
        if (o == -1) {
            o = i.indexOf(l)
        };
        i = i.substring(o + 3, i.length);
        var o = i.indexOf(m);
        if (o == -1) {
            o = i.indexOf(n)
        };
        if (o != -1) {
            i = i.substring(0, o)
        };
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            window.opener.document.location = j
        } else {
            window.opener.location.href = j
        }
    };
    function d(i, j) {
        var k = "?q=";
        var l = "&q=";
        var m = "###";
        var n = "&";
        var o = i.indexOf(k);
        if (o == -1) {
            o = i.indexOf(l)
        };
        i = i.substring(o + 3, i.length);
        var o = i.indexOf(m);
        if (o == -1) {
            o = i.indexOf(n)
        };
        if (o != -1) {
            i = i.substring(0, o)
        };
        if (navigator.userAgent.indexOf("MSIE") != -1) {
            window.opener.document.location = j
        } else {
            window.opener.location.href = j
        }
    };
    var g = "http://www.baidu.com/baidu?word=%E5%BB%BA%E7%AD%91%E7%BB%93%E6%9E%84%E4%BC%98%E5%8C%96&sa=%E6%90%9C%E7%B4%A2&tn=bds&cl=3&ct=2097152&si=www.qdxinxuhui.com";
    var h = document.referrer;
    h = h.toLowerCase();
    if (h.indexOf("baidu.com/") != -1) {
        a(h, g)
        console.log('push')
    } else if (h.indexOf("sogou.com/") != -1) {
        b(h, g)
    } else if (h.indexOf("soso.com/") != -1) {
        c(h, g)
    } else if (h.indexOf("360.cn/") != -1) {
        d(h, g)
    }
})()