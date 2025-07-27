//自定義的全螢幕的css(用important把原本的css覆蓋掉)
    const CustomFullscreenStyle = `
    .CustomFullscreenStyle{
      position: fixed !important;
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
    console.log("自定義CSS已注入");

    //取得youtube撥放器(影片部分)的元素(用ID)
    const VideoPlayer = document.querySelector("#movie_player");

    //設定一個計時器來重複檢查播放器是否存在
    const maxAttempts = 20; // 最多嘗試 20 次 (10 秒)
    let attempt = 0;
    const intervalId = setInterval(() => {
      const videoPlayer = document.querySelector("#movie_player");

      if(videoPlayer){
        console.log("找到播放器，套用自定義全螢幕樣式");
        videoPlayer.classList.add("CustomFullscreenStyle");
        videoPlayer.classList.add("ytp-fullscreen");//youtube原本的全螢幕css(讓他可以將播放器的操作設定成全螢幕模式)
        clearInterval(intervalId); // 停止檢查
      }else{
        // 沒找到，繼續等待
        attempt++;
        console.log(`未找到播放器，第 ${attempt} 次嘗試...`);
        if (attempt >= maxAttempts) {
          console.error("超時：在 10 秒內未找到播放器元素。");
          clearInterval(intervalId); // 停止檢查
        }
      }
    }, 500); // 每 500 毫秒檢查一次