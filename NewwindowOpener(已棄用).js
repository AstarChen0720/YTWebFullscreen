//過濾出要給自己的指令並回應、執行
chrome.runtime.onMessage.addListener(function(message, sendResponse) {
  if(message.action === "NewwindowOpener請開啟新視窗") {
    //方便除錯
    console.log("NewwindowOpener準備開啟新視窗");

    //開啟新視窗
    chrome.windows.create({
      url: message.data.url,
      type: "popup",//選擇視窗種類
      width: message.data.width,
      height: message.data.height,
      top: message.data.top-10,//視窗頂部跟螢幕最上距離-10
      left: message.data.left+10,//視窗左邊跟螢幕最左距離+10
    },function(newWindow){//通知ExtensionManager已開啟新視窗
      //這裡不改成sendresponse是因為上面create是非同步的，怕通道關閉
      chrome.runtime.sendMessage({
        event: "NewwindowOpener已開啟新視窗",
        data: {windowId : newWindow.id},
      }, function(response) {
        console.log(response)
      });
    }); 
  }
  //加一個同步資訊方便除錯
  sendResponse({event: "正在開啟新視窗"});

  //加個保險
  return true
})