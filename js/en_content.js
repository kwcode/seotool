 
var g_arrPage = {
    action: "getSource",
    url: document.location.href,
    title: document.title,
    keywords: "",
    description: "",
    robots: "",
    host: "",
    h1: "",
    h2: "",
    b: "",
    i: "",
    alt: "",
    body: "",
    h1_len: 0,
    h2_len: 0,
    b_len: 0,
    i_len: 0,
    alt_len: 0,
    body_len: 0,
    link_canonical: "",
    link_internal: 0,
    link_external: 0,
    link_internal_nofollow: 0,
    link_external_nofollow: 0,
    link_map: {}
};
GetTags("h1", "", 512);
GetTags("h2", "", 512);
GetTags("alt", "", 512);
GetTags("body", "", 128);
GetTags("b", "strong", 512);
GetTags("i", "em", 512);
for (var metas = document.getElementsByTagName("meta"), i = metas.length - 1; 0 <= i; i--) {
    var t_strName = metas[i].name.toLowerCase();
    "keywords" == t_strName ? g_arrPage.keywords = metas[i].content : "description" == t_strName ? g_arrPage.description = metas[i].content : "robots" == t_strName && (g_arrPage.robots = metas[i].content)
}
for (var t_arrCLink = document.getElementsByTagName("link"), i = t_arrCLink.length - 1; 0 <= i; i--) "canonical" == t_arrCLink[i].rel.toLowerCase() && (g_arrPage.link_canonical = t_arrCLink[i].href);
for (var body_clone = document.body.cloneNode(!0), trash = body_clone.querySelectorAll("script, iframe, style, textarea, input, select"), j = trash.length - 1; 0 <= j; j--) trash[j].parentNode.removeChild(trash[j]);
g_arrPage.content = body_clone.innerText;
var hostname = "www." == document.location.hostname.substr(0, 4) ? document.location.hostname.substr(4) : document.location.hostname;
g_arrPage.host = hostname;
for (var links = body_clone.getElementsByTagName("A"), i = 0, l = links.length; i < l; i++)
    if (links[i].href && !("http:" != links[i].protocol && "https:" != links[i].protocol)) {
        var href = links[i].href,
            href = href.replace(/#.*/, "");
        if (href in g_arrPage.link_map) g_arrPage.link_map[href].text[g_arrPage.link_map[href].count] = GetLinkText(links[i]), g_arrPage.link_map[href].count += 1;
        else {
            var t_strCurHost = links[i].hostname.replace(/^www\./, "").replace(/:\d+$/, "");
            g_arrPage.link_map[href] = {
                count: 1,
                href: href,
                hostname: t_strCurHost,
                nofollow: links[i].hasAttribute("rel") && links[i].getAttribute("rel").match(/nofollow/i) ? 1 : 0,
                text: {
                    "0": GetLinkText(links[i])
                },
                is_internal: hostname == t_strCurHost ? 1 : 0
            };
            t_strCurHost == hostname ? (g_arrPage.link_internal++, 1 == g_arrPage.link_map[href].nofollow && g_arrPage.link_internal_nofollow++) : (g_arrPage.link_external++, 1 == g_arrPage.link_map[href].nofollow && g_arrPage.link_external_nofollow++)
        }
    }
links = null;
chrome.extension.sendMessage(g_arrPage);

function GetImgSrc(a, c) {
    var b = {
        type: "IMG",
        data: ""
    };
    return "IMG" == a.nodeName ? (b.data = a.src, b) : null != a.firstChild && (b = GetImgSrc(a.firstChild, c + 1), null != b) || 0 < c && null != a.nextSibling && (b = GetImgSrc(a.nextSibling, c + 1), null != b) ? b : null
}

function GetLinkText(a) {
    var c = {
            type: "NA",
            data: ""
        },
        b = a.innerText.replace(/^\s+|\s+$/g, "");
    "" == b ? (c = GetImgSrc(a, 0), null == c && (c = void 0 == a.innerHTML || "" == a.innerHTML ? {
        type: "NA",
        data: ""
    } : {
        type: "TXT",
        data: a.innerHTML.replace(/</ig, "&lt;").replace(/>/ig, "&gt;")
    })) : (c.type = "TXT", c.data = b.replace(/</ig, "&lt;").replace(/>/ig, "&gt;"));
    return c
}

function StripTags(a) {
    a = a.replace(/(<script([^>]+)>([^<]+)<\/script>)/ig, "");
    a = a.replace(/(<noscript([^>]+)>([^<]+)<\/noscript>)/ig, "");
    return a.replace(/(<([^>]+)>)/ig, "")
}

function StripSpaces(a) {
    return a.replace(/\s{2,}/g, " ")
}

function MakeTagsVale(a, c) {
    var b = StripSpaces(StripTags(c));
    "" != b && ("" != g_arrPage[a] && (g_arrPage[a] += " | "), g_arrPage[a] += b, g_arrPage[a + "_len"] += b.length)
}

function GetTags(a, c, b) {
    var d, e = document.getElementsByTagName("alt" == a ? "img" : a);
    for (d = 0; d < e.length; d++) MakeTagsVale(a, "alt" == a ? e[d].alt : e[d].innerHTML);
    if ("" != c && g_arrPage[a].length < b) {
        e = document.getElementsByTagName(c);
        for (d = 0; d < e.length; d++) MakeTagsVale(a, e[d].innerHTML)
    }
    g_arrPage[a].length > b && (g_arrPage[a] = g_arrPage[a].substr(0, b) + "...")
};