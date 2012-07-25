var coloredIcon = '../images/icon16.png',
    greyIcon = '../images/icon16grey.png';

var pages = {};

var queryBookmarkState = function(info) {
  if(info.url && info.url != 'chrome://newtab/') {
    var url = info.url;
    var jqXHR = $.ajax({
      url: 'https://api.del.icio.us/v1/posts/get?url=' + encodeURIComponent(url),
      type: 'GET',
      dataType: 'json',
      contentType:'text/plain',
      username: "delicious-username",
      password: "delicious-password"
    });
    jqXHR.always(function (data) {
      var post = $(data.responseXML).find('post'),
          pageInfo = {isAlreadySaved: false};
      if (post.length) {
        pageInfo = {
          isAlreadySaved: true
        };
      }
      pages[url] = pageInfo;
      info.ready && info.ready(pageInfo);
    });
  }
};

chrome.tabs.getSelected(null, function (tab) {
  queryBookmarkState({
    url: tab.url,
    ready: function(pageInfo) {
      if(pageInfo && pageInfo.isAlreadySaved) {
        chrome.browserAction.setIcon({path: coloredIcon, tabId: tab.id});
      }
    }
  });
});

chrome.tabs.onUpdated.addListener(
  function(id, changeInfo, tab) {
    if (changeInfo.url) {
      var url = changeInfo.url;
      chrome.browserAction.setIcon({path: greyIcon, tabId: tab.id});
      queryBookmarkState({
        url: tab.url,
        ready: function(pageInfo) {
          if(pageInfo && pageInfo.isAlreadySaved) {
            chrome.browserAction.setIcon({path: coloredIcon, tabId: tab.id});
          }
        }
      });
    }
    var url = changeInfo.url;
    if(pages[url] && pages[url].isAlreadySaved) {
      chrome.browserAction.setIcon({ path: coloredIcon, tabId: tab.id});
    }
  }
);

chrome.tabs.onSelectionChanged.addListener(
  function(tabId, selectInfo) {
    chrome.tabs.getSelected(null, function (tab) {
      var url = tab.url;
      queryBookmarkState({
        url: url,
        ready: function (pageInfo) {
          if (pageInfo && pageInfo.isAlreadySaved) {
            chrome.browserAction.setIcon({path: coloredIcon, tabId: tab.id});
          }
        }
      });
    });
  }
);