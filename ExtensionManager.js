//這裡是接收來自content.script的所有資訊
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  //如果有收到資訊就回復"已收到"沒有就回復"沒有收到"，方便除錯
  if (message.event){
    sendResponse({event:"ExtensionManager已收到"})
  }else{
    sendResponse({event:"ExtensionManager沒有收到"})
  }

  //根據message.event的內容指派任務
  switch(message.event){
    case "FullscreenButton已被按下":
      chrome.runtime.sendMessage({
        action: "EnvironmentInfoCollector請開始蒐集環境資訊"}, 
        function(response) {
        console.log(response);
      });
      break;
    
    case "EnvironmentInfoCollector已蒐集到環境資訊":
      chrome.runtime.sendMessage({
        action: "NewwindowOpener請開啟新視窗",
        data: message.data
        }, function(response) {
        console.log(response);
      });
      break;

      case "NewwindowOpener已開啟新視窗":
        //新視窗開啟後，將VideoFiller.js注入到新視窗中
        chrome.tabs.query({ windowId: message.data.windowId }, (tabs) => {
          const tabId = tabs[0].id;//第一tab的ID(tab0)
          chrome.scripting.executeScript({
            target: { tabId },
            files: ["VideoFiller.js"]
          }, () => {
            //用chrome.tabs.sendMessage因為他是要傳給指定tab
            chrome.tabs.sendMessage(tabId, {
              action: "VideoFiller請將播放器網頁全螢幕",
              data: message.data
            }, function(response) {
              console.log(response);
            });
          });
        });
      break; 
  }
});