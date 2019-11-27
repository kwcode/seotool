chrome.contextMenus.create({
    "id": "SEO辅助工具",
    "title": "SEO辅助工具",
    "type": "normal",
    "contexts": ["all"]
});

chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "百度搜索查询",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var sw = info.selectionText;
        var url = "https://www.baidu.com/s?ie=utf-8&wd=" + sw;
        window.open(url);
    }
});

chrome.contextMenus.create({
    "parentId": "SEO辅助工具",
    "title": "百度指数查询",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info, tab) {
        debugger;
        var sw = info.selectionText;
        var url = "http://index.baidu.com/v2/main/index.html#/trend/" + sw + "?words=" + sw;
        window.open(url);
    }
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    debugger;
    var submittedURL = tab && tab.url;
    if (info["menuItemId"] == "TDK查看器") {
        console.log("右键菜单");
        //chrome.tabs.sendMessage(tab.id, "toggleTDK");
    }
});