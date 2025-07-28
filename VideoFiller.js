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
        // 如果找不到劇院模式按鈕，則輸出錯誤訊息並返回
        if (!theaterButton) {
            console.error("找不到劇院模式按鈕。");
            return;
        }

        // 步驟 2: 確保進入劇院模式
        // 使用 ytd-watch-flexy[theater] 屬性來判斷，比按鈕標題更可靠
        const isInTheater = document.querySelector("ytd-watch-flexy[theater]");

        //如果在劇院模式，則先點擊退出劇院模式
        if (isInTheater) {
            console.log("當前在劇院模式，先點擊退出...");
            theaterButton.click();
        } else {
            console.log("當前在標準模式，準備進入劇院模式...");
        }

        // 等待 300ms，確保已退回到標準模式或保持在標準模式
        setTimeout(() => {
            console.log("點擊以進入/重新進入劇院模式...");
            // 重新獲取按鈕，防止參考失效
            const currentButton = document.querySelector(".ytp-size-button");
            if (currentButton) {
                currentButton.click();
            }
            setTimeout(() => {
            console.log("套用自定義全螢幕樣式...");
            document.body.classList.add("web-fullscreen-mode"); // 添加全螢幕模式的類別
            videoPlayer.classList.add("CustomFullscreenStyle");

            //手動觸發window的resize事件，很多網頁的UI條整都是看這個重新調整的
            window.dispatchEvent(new Event("resize"));
            console.log("網頁全螢幕已觸發。");

          }, 1000);// 延遲 1000 毫秒，確保劇院模式已經穩定套用
        },300);//延遲300毫秒，確保已退回到標準模式或保持在標準模式


        //步驟 3:將自定義的全螢幕樣式套用到播放器元素
        //在外面再加上一個延遲確保劇院模式已經套用
        

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