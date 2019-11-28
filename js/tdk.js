

$(function () {
    $("#btnRefresh").click(function () {
        window.location.reload();
    })
})

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.executeScript(null, {
        file: "js/en_content.js"
    })

})

chrome.extension.onMessage.addListener(function (pageInfo) {
    debugger;
    $("#txtMsg").val(JSON.stringify(pageInfo));
    setItem("td_url", decodeURIComponent(pageInfo.url));
    setItem("td_title", pageInfo.title);
    setItem("td_key", pageInfo.keywords);
    setItem("td_desc", pageInfo.description);
    setItem("td_h1", pageInfo.h1);
    setItem("td_h2", pageInfo.h2);
    setItem("td_body", pageInfo.body);
    setItem("td_lnk_canonical", pageInfo.link_canonical);
})

function setItem(id, value) {
    $("#" + id).html(value);
    if (value) {
        var len = value.length;
        $("#" + id + "_num").html(len);
    }

}

