//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import "../css/main.scss";
//const style1 = require("../css/main.scss");
//const style = require("../css/main.css");

import 'jquery';
import 'owl.carousel';

import Menu from "./menu.js";
import Login from "./login.js";

Menu();
Login();

//const arr = ["aaa","bbb","ccc","3333"];
//arr.map(obj => console.log(obj));

var owl = $('.owl-carousel');
owl.owlCarousel({
    items:1,
    loop:true,
    margin:10,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true
});


$(function(){   
    //http://soccer.xnet.world/api/List?routeName=Banner
    //http://soccer.xnet.world/api/List?routeName=Activity 
    const _url_api = "http://soccer.xnet.world/api/"
    
    
    
    var ajax_promise = function(_url, _type, data){
        return new Promise(function(resolve, reject){
            $.ajax({
                url: _url_api + _url,
                type: _type ,
                dataType: "JSON",
                data: data,
                success: function(resp){
                    if(resp.IsSuccess){
                       resolve(resp);
                    }
                },
                error: function(resp){
                    reject(resp);
                }
            });
        });
    }
    
    //取得全部選單
    var load_menu = function(){
        return ajax_promise("Menu?position=1", "GET");
        //"Name":"最新消息",
        //"RouteName":"News",
        //"Url":"http://soccer.xnet.world/News",
    }
    
    //網站基本資料
    var load_default = function(){
        return ajax_promise("SiteInfo", "GET");
    }
    
    //取得單一列表基本資訊
    var load_list = function(routeName){
        return ajax_promise("List?routeName=" + routeName, "GET");
    }
    
    //取得內頁基本資訊
    var load_detail = function(routeName){
        return ajax_promise("Detail?routeName=" + routeName, "GET");
    }
    
    //取得詳細列表資訊
    var load_partialList = function(StructureJson, CategoryJson){
        return ajax_promise("PartialList", "POST", {
                    "IsPaged": true,
                    "StructureJson": StructureJson,
                    "CategoryJson": CategoryJson
                });
    }
    
    //製作初始頁面資料
    var setMenuItems = function(data){
        return new Promise(function(resolve, reject){
            localStorage.setItem("soccer_menu", JSON.stringify(data));
            var _data_menu = [];
            var  ii =0;
            for(var i=0, len=data.Data.length; i<len; i++){
                load_list(data.Data[i].RouteName)
                    .then(function(data){
                        _data_menu.push({
                            "RouteName": data.Data.ItemViewModel.Item.RouteName,
                            "StructureJson": data.Data.ItemPageModel.StructureJson,                      
                            "CategoryJson": data.Data.ItemPageModel.CategoryJson                      
                        });
                        localStorage.setItem("soccer_menu_id", JSON.stringify(_data_menu));
                    });
            }
        });
    }
    
    //公用 - 搜尋陣列 index 
//    var findIndexWithAttr = function (array, attr, value) {
//        for(var i = 0; i < array.length; i += 1) {
//            if(array[i][attr] === value) {
//                return i;
//            }
//        }
//        return -1;
//    }
    
    var _menu_structure = JSON.parse(localStorage.getItem("soccer_menu_id"));
    var _get_menu_route = $.map(_menu_structure, function(item, index) {
        return item.RouteName
    });
    var _menu_list = JSON.parse(localStorage.getItem("menu")).Data;
    var _get_menu_name = $.map(_menu_list, function(item, index) {
        return item.RouteName
    });
    var _web_data = JSON.parse(localStorage.getItem("soccer_default")).Data;
    
    //資料投放
    
    //all
    var layout_default = function(data){
        if(_menu_list){
//            for(var i=0, len=_menu_list.length; i<len; i++){
//            }
        }
    }
    
    //article.html
    var layout_article = function(data){
        var _author   = data.Data.ItemLanguage.Author;
        var _date     = data.Data.Item.Date;
        var _subject  = data.Data.ItemLanguage.Subject;
        var _content  = data.Data.ItemLanguage.Content;
        var _keywords = data.Data.ItemLanguage.Keywords;
        var _pItems = data.Data.ParentItems;
        if(_date){ _date = _date.split("T")[0]}
        
        var _breadcrumb = '<li class="breadcrumb-item"><a href="#">首頁</a></li><li class="breadcrumb-item">';
        for(var i=0, len=_pItems.length; i<len; i++){
            _breadcrumb += 
                    '<a href="articles.html?c='+_pItems[i].RouteName+'">'+_pItems[i].Subject+'</a> ';
        }
        _breadcrumb += '</li>';
        
        $("#nav_breadcrumb").html(_breadcrumb);
        $("#main_subject").html(_subject);
        $("#main_content").html(_content);
        $("#main_date").html(_date);
        $("#main_author").html(_author);        
    }
    //articles.html
    var layout_articles = function(data, route){
        var _this_article = _menu_list[_get_menu_name.indexOf(route)];
        $("#cate_title").html(_this_article.Name);
        
        var _ary = data.Data.DataResult.Data;
        var html = "";
        for(var i=0, len=_ary.length; i<len; i++){
            var _subject = _ary[i].ItemLanguage.Subject;
            var _content = _ary[i].ItemLanguage.Content.replace(/<[^>]+>/g,"");;
            var _img     = _ary[i].ItemFiles[0].FilePath;
            var _route   = _ary[i].Item.RouteName;
            var _date    = _ary[i].Item.Date;
            if(_date){ _date = _date.split("T")[0]}
            if(_content.length > 20){
                _content = _content.slice(0,20);
            }
            
            html +=
                '<article class="col-md-4">' +
                   '<a href="article.html?a='+ _route +'">' +
                       '<div class="imgbox">' +
                           '<div class="img" style="background-image: url('+ _img +')"></div>' +
                       '</div>' +
                       '<h1>'+ _subject +'</h1>' +
                       '<p class="h48">'+ _content +'</p>' +
                       '<div class="info">' +
                           '<span class="date">'+ _date +'</span>' +
                       '</div>' +
                   '</a>' +
               '</article>';
        }
        $("#main_list").html(html);
        
        
        
        
        
    }
    
    
    
    //讀取基本框架資訊
    load_default()    
        .then(function(data){
            localStorage.setItem("soccer_default", JSON.stringify(data));
            return load_menu();
        })
        .then(function(data){
            return setMenuItems(data);
        });
    
//    //讀取 banner
//    load_list("Banner")
//        .then(function(data){
//            return setMenuItems(data);
//        });
    
       
    

    

    var _url_path = location.pathname;
    var _url_search = location.search;

    //偵測頁面
    //article.html
    if(_url_path.indexOf("article.html")>0){
        var article_route = _url_search.split("?a=")[1];
        load_detail(article_route)
            .then(function(data){
            console.log(data)
                layout_article(data);
            });
    }
    //article.html
    if(_url_path.indexOf("article.html")>0){
        var article_route = _url_search.split("?a=")[1];
        load_detail(article_route)
            .then(function(data){
                //console.log(data)
                layout_article(data);
            });
    }
    
    //articles.html
    if(_url_path.indexOf("articles.html")>0){
        var route = _url_search.split("?c=")[1];
//        console.log(_menu_structure[_get_menu_route.indexOf(route)].StructureJson);
        var _menu = _menu_structure[_get_menu_route.indexOf(route)];
        load_partialList(_menu.StructureJson, _menu.CategoryJson)
            .then(function(data){
                console.log(data, route);
                layout_articles(data, route);
            });
    }
    
});