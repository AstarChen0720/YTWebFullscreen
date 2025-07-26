//自定義的全螢幕的css(用important把原本的css覆蓋掉)
    const CustomFullscreenStyle = `
    .CustomFullscreenStyle{
      position: "fixed" !important;
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 9999 !important;
      background-color: black !important;
    }`;
    //將自定義的css加入到head裡面
    const styleElement = document.createElement("style");
    styleElement.textContent = CustomFullscreenStyle;
    document.head.appendChild(styleElement);


//過濾出要給自己的指令並回應、執行
chrome.runtime.onMessage.addListener(function(message, sendResponse) {
  if(message.action === "VideoFiller請將播放器網頁全螢幕") {
    //回復ExtensionManager
    sendResponse({event: "VideoFiller準備將播放器網頁全螢幕"});

    //取得youtube撥放器(影片部分)的元素(用ID)
    const VideoPlayer = document.querySelector("#movie_player");

    

    //定義方法將自定義的css用toggle方法加到影片播放器上
    function ToggleCustomFullScreen(){
      if(VideoPlayer){
        VideoPlayer.classList.toggle("CustomFullscreenStyle");
        VideoPlayer.classList.toggle  ("ytp-fullscreen");//youtube原本的全螢幕css(讓他可以將播放器的操作設定成全螢幕模式)
      }else{
        console.log("當前頁面沒有找到影片播放器元素");
      }
    }
    //開啟自定義全螢幕
    ToggleCustomFullScreen();

    chrome.runtime.sendMessage({
      event: "VideoFiller已將播放器網頁全螢幕"
    }, function(response) {
      console.log(response)
    });   
  }
  //加個保險
  return true;
})