


//创建右键菜单
chrome.contextMenus.create({
    "id": "SEO辅助工具",
    "title": "SEO辅助工具",
    "type": "normal",
    "contexts": ["all"]
});


//新窗口打开页面链接
chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "新窗口打开当前页面",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var frameUrl = info.frameUrl;
        if (typeof (frameUrl) != "undefined") {
            window.open(frameUrl);
        }
        else {
            window.open(info.pageUrl);
        }
    }
});
//指数查询-百度
chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "指数查询-百度",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var sw = info.selectionText;
        if (typeof (sw) != "undefined") {
            var url = "http://index.baidu.com/v2/main/index.html#/trend/" + sw + "?words=" + sw;
            window.open(url);
        }

    }
});
//site命令
chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "site:收录查询-百度",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var pageUrl = info.pageUrl;
        if (typeof (pageUrl) != "undefined") {
            var url = "https://www.baidu.com/s?wd=site:" + getHost(pageUrl);
            window.open(url);
        }
        else {
            alert("操作异常" + frameUrl); 
        }
    }
});

//百度下拉联想词
chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "下拉联想词-百度",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var sw = info.selectionText;
        if (typeof (sw) != "undefined") {
            var url = "http://www.tool90.com/seo/longwords/?sw=" + sw;
            window.open(url);
        }

    }
});



chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "站长工具-SEO收录查询",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var url = tab.url; //https://www.fy65.com/
        window.open("http://seo.chinaz.com/" + getHost(url));

    }
});

chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "5118-SEO收录查询",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var url = tab.url; //https://www.fy65.com/
        window.open("https://seo.5118.com/" + getHost(url));
    }
});

chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "爱站网-SEO收录查询",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var url = tab.url; //https://www.fy65.com/
        window.open("https://www.aizhan.com/seo/" + getHost(url));
    }
});




function getHost(url) {

    var reg = /^http(s)?:\/\/(.*?)\//
    var host = reg.exec(url)[2];
    return host;
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //debugger;
    //var submittedURL = tab && tab.url;
    //if (info["menuItemId"] == "TDK查看器") {
    //    console.log("右键菜单"); 
    //}
});