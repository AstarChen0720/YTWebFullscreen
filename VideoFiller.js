console.log("VideoFiller.js 已注入，準備執行網頁全螢幕...");

//自定義的全螢幕的css(用important把原本的css覆蓋掉) 
    //當網頁進入全螢幕時(web-fullscreen-mode)套用下面css，上面隱藏滾動條下面調成全螢幕
    const CustomFullscreenStyle = `
    body.web-fullscreen-mode {
      overflow: hidden !important;
    }
    
    /* 主要播放器容器 */
    #movie_player.CustomFullscreenStyle {
      position: fixed !important;
      width: 100vw !important;
      height: 100vh !important;
      top: 0 !important;
      left: 0 !important;
      z-index: 9999 !important;
      background-color: black !important;
    }

    /* 確保影片本身和其容器填滿播放器，並防止裁切 */
    #movie_player.CustomFullscreenStyle .html5-video-container,
    #movie_player.CustomFullscreenStyle .html5-main-video {
      width: 100% !important;
      height: 100% !important;
      left: 0 !important;
      top: 0 !important;
      object-fit: contain !important; /* 防止影片畫面被裁切 */
    }

    /* 確保底部控制列寬度正確 */
    #movie_player.CustomFullscreenStyle .ytp-chrome-bottom {
      width: 100% !important;
    }
    `;
    //將自定義的css加入到head裡面
    const styleElement = document.createElement("style");
    styleElement.textContent = CustomFullscreenStyle;
    document.head.appendChild(styleElement);

    //取得youtube撥放器(影片部分)的元素(用ID)
    const videoPlayer = document.querySelector("#movie_player");

    //設定一個計時器來重複檢查播放器是否存在
    const maxAttempts = 20; // 最多嘗試 20 次 (10 秒)
    let attempt = 0;
    
    const intervalId = setInterval(() => {
      //取得youtube撥放器(影片部分)的元素(用ID)
      const videoPlayer = document.querySelector("#movie_player");

      if(videoPlayer){
        console.log("找到播放器，正在套用自定義全螢幕樣式");
        clearInterval(intervalId); // 停止檢查

        // 步驟 1: 檢查並點擊劇院模式按鈕
        // 取得劇院模式按鈕的選擇器
        const theaterButton = document.querySelector(".ytp-size-button");
        // 檢查播放器是否已經是劇院模式 (通常劇院模式按鈕會有一個標題 "預設檢視模式")
        const isAlreadyTheater = theaterButton.title.includes("預設");
        if (isAlreadyTheater) {
            console.log("已經是劇院模式，透過切換來強制重繪UI");
            // 點擊離開劇院模式
            theaterButton.click();
            // 等150毫秒再點擊一次回到劇院模式以強制重繪
            setTimeout(() => theaterButton.click(), 150);
        } else if (theaterButton) {
            console.log("點擊劇院模式按鈕...");
            theaterButton.click();
        }



        // 將自定義的全螢幕樣式套用到播放器元素
        //在外面再加上一個延遲確保劇院模式已經套用
        setTimeout(() => {
          document.body.classList.add("web-fullscreen-mode"); // 添加全螢幕模式的類別
          videoPlayer.classList.add("CustomFullscreenStyle");

          //手動觸發window的resize事件，很多網頁的UI條整都是看這個
          // 延遲觸發，確保樣式已套用
          setTimeout(() => {
              window.dispatchEvent(new Event("resize"));
              console.log("網頁全螢幕已觸發。");
          }, 100); // 延遲 100 毫秒
        },150);// 延遲 150 毫秒，確保劇院模式已經套用

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