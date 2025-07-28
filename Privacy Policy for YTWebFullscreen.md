YTWebFullscreen 隱私權政策 (Privacy Policy)
最後更新日期：2025年7月28日

感謝您使用 AstarChen 開發的 YTWebFullscreen 擴充功能。我們非常重視您的隱私，本隱私權政策旨在說明我們的擴充功能在運作時如何處理資訊。

1. 我們不收集任何個人資訊

YTWebFullscreen 的核心宗旨是提供更佳的觀影體驗，同時完全尊重您的隱私。我們向您承諾：

不收集：本擴充功能不會收集、讀取或存取任何您的個人身份資訊（Personally Identifiable Information, PII），例如您的姓名、電子郵件、YouTube 帳號、觀看紀錄或瀏覽歷史。
不儲存：本擴充功能不會在您的電腦或任何遠端伺服器上儲存任何使用者資料。
不傳輸：本擴充功能不會將任何資料傳輸到開發者或任何第三方服務。

2. 擴充功能運作所需的資訊

為了實現「網頁全螢幕」功能，當您點擊擴充功能按鈕時，我們會暫時讀取以下非個人化的瀏覽器視窗資訊：

當前分頁的網址 (URL)：用於在新視窗中開啟相同的 YouTube 影片。
瀏覽器視窗的尺寸與位置 (寬、高、螢幕座標)：用於建立一個與您當前視窗大小和位置相同的新視窗，以達到無縫的全螢幕體驗。
這些資訊僅在功能觸發的當下、於您的本機電腦上進行處理，僅用於 chrome.windows.create API 呼叫以建立新視窗。處理完成後，這些資訊會立即被捨棄，不會被儲存或用於任何其他目的。

3. 權限說明

本擴充功能在 manifest.json 中請求了以下權限，所有權限都嚴格用於實現核心功能：

activeTab：允許擴充功能在您點擊圖示時，與當前活動的 YouTube 分頁互動。
scripting：用於將腳本注入到新的 YouTube 視窗中，以調整影片播放器的樣式，使其填滿整個視窗。
tabs：用於在新視窗建立後，偵測其載入狀態並執行腳本。
host_permissions (https://www.youtube.com/*)：將擴充功能的功能範圍限制在 YouTube 網站上。

4. 政策變更

如果未來擴充功能有任何更新，可能影響本隱私權政策，我們將會更新此文件，並在擴充功能的說明頁面中通知您。

5. 聯絡我們

如果您對本隱私權政策有任何疑問，歡迎透過我們的 GitHub 專案頁面 與我們聯繫。

Privacy Policy for YTWebFullscreen
Last Updated: July 28, 2025

Thank you for using the YTWebFullscreen extension developed by AstarChen. We are committed to protecting your privacy. This policy explains how our extension handles information.

1. We Do Not Collect Any Personal Information

The core principle of YTWebFullscreen is to enhance your viewing experience while fully respecting your privacy. We promise:

No Collection: This extension does not collect, read, or access any of your Personally Identifiable Information (PII), such as your name, email, YouTube account, viewing history, or browsing data.
No Storage: This extension does not store any user data on your local machine or any remote servers.
No Transmission: This extension does not transmit any data to the developer or any third-party services.

2. Information Required for Functionality

To enable the "Web Fullscreen" feature, when you click the extension button, we temporarily access the following non-personal browser window information:

Current Tab URL: To open the same YouTube video in a new window.
Browser Window Dimensions and Position (width, height, screen coordinates): To create a new window of the same size and position as your current one for a seamless fullscreen experience.
This information is processed locally on your computer only at the moment the feature is triggered. It is used exclusively for the chrome.windows.create API call to create the new window. After this action is complete, the information is immediately discarded and is not stored or used for any other purpose.

3. Permissions Explained

Our extension requests the following permissions in its manifest.json, all of which are strictly for implementing its core functionality:

activeTab: Allows the extension to interact with the currently active YouTube tab when you click its icon.
scripting: Used to inject scripts into the new YouTube window to modify the video player's style to fill the window.
tabs: Used to detect the loading status of the new window to execute scripts after it's ready.
host_permissions (https://www.youtube.com/*): Limits the extension's functionality to the YouTube website.

4. Changes to This Policy

If any future updates to the extension affect this privacy policy, we will update this document and notify you through the extension's description page.

5. Contact Us

If you have any questions about this privacy policy, please feel free to contact us via our GitHub project page.
