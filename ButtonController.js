
console.log("ButtonController.js loaded");
//取的FullscreenButton元素，不然沒辦法在javascript中使用這元素
const FullscreenButton=document.getElementById("FullscreenButton");
//如果FullscreenButton被按下了，則IsPushed變數設為"FullscreenButton已被按下"
FullscreenButton.addEventListener("click", function() {
  const IsPushed = "FullscreenButton已被按下";

  //按鈕被按下後傳資料給ExtensionManager.js，並在控制台印出回應
  chrome.runtime.sendMessage({ event:IsPushed}, function(response) {
    console.log(response);
  });
  //按鈕被按下後關閉彈出視窗
  // window.close();
});


