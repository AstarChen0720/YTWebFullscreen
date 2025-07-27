//這裡是接收來自content.script的所有資訊
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

  //印出收到的資訊，方便除錯
  console.log(`"ExtensionManager已收到"${message}`);
  
  //根據message.event或message.action的內容，決定要執行的動作，這步算是篩選
  const event = message.event|| message.action;

  //根據message.event的內容指派任務
  switch(event){
    case "FullscreenButton已被按下":
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length > 0) {//檢查tab陣列是否有內容
          const ActiveTabId = tabs[0].id;//取得陣列的第一個 ID
          console.log(`準備發送指令到 Tab ${ActiveTabId}`);
          chrome.tabs.sendMessage(ActiveTabId, {
            action: "EnvironmentInfoCollector請開始蒐集環境資訊"
          }, //收到從EnvironmentInfoCollector.js回傳的資料，並用他來開啟新視窗
          function(ResponseFromEventInfoCollector) {
            // 檢查是否有收到回應，若無則可能是 content script 未注入或未回應
            if (chrome.runtime.lastError || !ResponseFromEventInfoCollector) {
              console.error("無法從 content script 獲取回應:", chrome.runtime.lastError?.message || "沒有回應");
              sendResponse({status: "錯誤", message: "無法與頁面通訊，請確認您在 YouTube 分頁上並刷新頁面。"});
              return; // 中斷執行
            }




            console.log("收到環境資訊準備開啟新視窗");
            //把環境資訊弄短一點比較好看            
            const EnvInfo = ResponseFromEventInfoCollector.data;

            chrome.windows.create({
              url: EnvInfo.url,
              type: "popup",
              width: EnvInfo.width,
              height: EnvInfo.height,
              top: EnvInfo.top - 10,
              left: EnvInfo.left + 10,
            },function(newWindow){
              
              // 取得新視窗中第一個分頁的 ID
              const newTabId = newWindow.tabs[0].id;
              
              //定義Listener函數去判斷新視窗是否已開啟
              const Listener  = (tabId,changeInfo,tabs) => {
                //確保頁面已完全載入完成，且事件是來自我們新開的 tab
                if (tabId === newTabId &&changeInfo.status === "complete") {
                  console.log(`新視窗已開啟，準備注入 VideoFiller.js`);
                  //確定新視窗開啟後，將VideoFiller.js注入到新視窗中
                  chrome.tabs.query({ windowId: newWindow.id }, (tabs) => {
                    const tabId = tabs[0].id;//第一tab的ID(tab0)
                    chrome.scripting.executeScript({
                      target: { tabId },
                      files: ["VideoFiller.js"]
                    });
                  });
                  //移除監聽器，避免重複注入
                  // 注入後移除監聽器，避免重複執行
                  chrome.tabs.onUpdated.removeListener(Listener);
                }
              };
              // 加入監聽器，當視窗完全加載後(status = "complete")執行Listener
              chrome.tabs.onUpdated.addListener(Listener);
            });
            // 回應給 popup，告訴它指令已發出
            sendResponse({status: "指令已發出"});
            

          }
        );
      }else {
        // 如果找不到 active tab，也應該回覆
        sendResponse({status: "錯誤", message: "找不到活動中的分頁"});
      }
    });
    //因為 sendMessage 是非同步的返回 true，以保持 sendResponse 函式在非同步回呼中可用。
    return true;
  }


  //印出ExtensionManager.js已載入，方便除錯
  console.log("ExtensionManager.js loaded");
  
  //加個保險
  return true; 
});