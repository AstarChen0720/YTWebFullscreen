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

  }
})