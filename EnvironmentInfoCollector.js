//接收、回復ExtensionManager的指令，如果有收到對的才會蒐集環境資訊

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  
  // 加上 console.log 來確認 content script 是否有收到任何訊息
  console.log("Content script 收到訊息:", message);

  if (message.action === "EnvironmentInfoCollector請開始蒐集環境資訊"){//sender這參數因沒有用到所以不放了
    console.log("EnvironmentInfoCollector開始蒐集環境資訊");
    //開始蒐集環境資訊(本放外面但放裡面是為了不會就算沒有收到指令也會蒐集環境資訊並回傳東西)
    const EnvironmentInfo = {
    url: window.location.href,
    width: window.outerWidth,//outerWidth才是整個視窗的寬度
    height: window.outerHeight,//outerHeight才是整個視窗的高度
    top: window.screenTop,
    left: window.screenLeft,
    };

    //回傳環境資訊給ExtensionManager
    sendResponse({event:"EnvironmentInfoCollector已蒐集到環境資訊", data: EnvironmentInfo}
    );

    //因為最後面那個sendResponse前面有非同步操作，所以要return true，這樣才不會被檔掉回復
    //要放if裡面不然就算沒蒐集到東西也會回傳true
    return true;
  }
  
})