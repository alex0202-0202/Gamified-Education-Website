🌐 全局介面元件 (Global UI Components)
這些元件會出現在每一個頁面中。

1. 頂部導航欄 (Top Header)
Logo: [學校/平台 Logo] DAT 科技教育學習平台

搜尋列 (Search Bar): * Placeholder: "搜尋單元、材料或關鍵字..."

Icon: 🔍 放大鏡

用戶區域 (User Profile):

Avatar: 用戶頭像

Text: "陳大文 (S1A)"

Dropdown Menu: 「我的檔案」、「設定」、「登出」

2. 側邊選單 (Sidebar Navigation)
設計為可收合 (Collapsible) 的側邊欄，包含以下導航按鈕：

🏠 儀表板 (Dashboard) * 📘 中一 (S1) * 📗 中二 (S2) * 📙 中三 (S3) * 🎓 高中 DAT (S4-S6) * 📥 資源下載 (Resources) * UI 狀態： Default (灰色), Hover (淺藍底), Active (深藍字+左側粗線條標示目前頁面)

🏠 首頁：用戶儀表板 (Dashboard)
學生登入後看到的第一個畫面。

Section 1: 歡迎與狀態 (Welcome Header)

Text: "歡迎回來, 陳大文！"

Sub-text: "你目前是 初級設計師 🛠️"

Progress Bar: "學習經驗值 (XP): 350 / 1000"

Section 2: 繼續學習 (Continue Learning Widget)

這是一個大卡片，顯示上次未完成的課程。

Title: "上次停留在：中一 - K6 製造過程基本設計元素"

Progress: 顯示 40% 進度條

Button: [繼續學習 Continue] (Primary 藍色按鈕)

📚 中一至中三頁面 (S1 - S3 Pages)
這三個頁面的 UI 結構完全相同，僅資料（Data）不同。適合在 Figma 製作一個 Page Template。

頁面頂部 (Page Header)
Title: "中一級課程概覽" (或中二、中三)

Tabs (分頁切換按鈕):

核心部分 (組合甲) [Active 狀態]

核心部分 (組合乙) [Default 狀態]

延伸部分 [Default 狀態]

課程卡片設計 (Course Card Component)
(在 Figma 中製作一個 Auto-layout 的 Card Component)

標籤 (Badge): 例如 [K6 - S1a] (右上角小字)

卡片標題 (Title): 例如 "製造過程基本設計元素"

卡片內文 (Description): 例如 "基本的設計理念、草繪技巧"

中繼資料 (Meta-data): Icon 🕒 + "6 課節"

分類標籤 (Tags): [設計], [繪圖] (圓角小標籤)

按鈕 (Action Button): 放在卡片右下角或底部。

狀態 1 (未開始): 文字 [開始]，顏色：深藍色

狀態 2 (進行中): 文字 [繼續]，顏色：橙色

狀態 3 (已完成): 文字 [重溫]，顏色：綠色 + Icon ✔️

具體按鈕與內容映射 (S1-S3 資料)
(你可以直接將這些資料寫入 GAS 的 JSON 檔案中)

📘 中一 (S1) 卡片列表
Tab 1: 核心部分 (組合甲)

K6 – S1a | 製造過程基本設計元素 | 基本的設計理念、草繪技巧 | 6課節 | 按鈕:[開始]

K3 – S1 | 物料及資源 | 物料的基本認識、物料的特性 | 9課節 | 按鈕:[開始]

K5 – S1a | 工具及儀器安全 | 基本手工具、基本量度工具 | 4課節 | 按鈕:[開始]

K6 – S1b | 製造過程進行設計 | 使用不同的物料、人的因素 | 15課節 | 按鈕:[開始]

Tab 2: 核心部分 (組合乙)
5. K4 – S1 | 結構和機械結構 | 結構和機械結構的基本概念 | 8課節 | 按鈕:[開始]
6. K8 – S1 | 系統概念 | 系統的基本概念 | 2課節 | 按鈕:[開始]
7. K9 – S1 | 系統應用 | 系統應用的基本概念 | 5課節 | 按鈕:[開始]
8. K5 – S1b | 工具及儀器安全 | 基本手工具、基本量度工具 | 4課節 | 按鈕:[開始]
9. K6 – S1c | 製造過程進行設計 | 包括結構和機械結構的製作 | 15課節 | 按鈕:[開始]

Tab 3: 延伸部分
10. E2 – S1 | 物料處理 | 切除、成形、接合及完成處理 | 11課節 | 按鈕:[開始]
11. E6 – S1 | 系統整合 | 系統與子系統之間的聯繫 | 12課節 | 按鈕:[開始]
12. E7 – S1 | 控制與自動化 | 現代產品的自動化控制 | 10課節 | 按鈕:[開始]

(中二 S2 與中三 S3 的資料請參照前文的內容，直接套用上述卡片格式即可)

🎓 高中頁面 (S4 - S6 / HKDSE DAT)
這個頁面設計應該顯得更專業、進階。

頁面頂部 (Page Header)
Title: "HKDSE 設計與應用科技 (DAT) 知識庫"

Subtitle: "涵蓋中四至中六必修與選修單元，準備你的 SBA 校本評核與公開試。"

儀表板區塊 (Progress Dashboard)
必修單元 (Core): 圓形進度條 (e.g., 33% 1/3 完成)

選修單元 (Elective): 圓形進度條 (e.g., 0% 0/2 完成)

SBA 評核區 (SBA Task): 長條進度條，按鈕 [進入 SBA 專區]

模組卡片區 (Module Sections)
設計分為兩大欄 (2 Columns) 或上下兩區。

區塊 A：必修部分 (Compulsory Part)

Card 1: 1. 設計與創新 (Design & Innovation)

Text: 設計過程、設計與商業(專利/版權)、創新策略(仿生學/設計思維)

Tags: [必考] [理論] [實作]

Button: [進入模組]

Card 2: 2. 科技原理 (Technological Principles)

Text: 材料及標準元件、系統及控制(齒輪/電子學)、生產程序(3D打印/鐳射)

Button: [進入模組]

Card 3: 3. 價值與影響 (Value and Impact)

Text: 科技對社會的影響、可持續發展(5R)、職業與道德(工業安全)

Button: [進入模組]

區塊 B：選修部分 (Elective Modules - 五選二)
在 Figma 設計中，這 5 張卡片可以並排 (Grid 佈局)，並加入 Icon 裝飾。

E1: 自動化操作 (Automation) | [進入模組]

E2: 創意數碼媒體 (Creative Digital Media) | [進入模組]

E3: 設計實踐及材料處理 (Design & Material Processing) | [進入模組]

E4: 電子學 (Electronics) | [進入模組]

E5: 視覺傳達及CAD (Visualisation and CAD) | [進入模組]

🖥️ 學習器介面 (Learning Player Interface)
這是使用者點擊任何「開始」或「進入模組」後跳轉的頁面。這個頁面是你未來寫 Code 時最核心的互動區！

左側：章節選單 (Lesson Sidebar)

Header: 顯示當前模組名稱 (例如: K6 製造過程)

List Items (List of lessons):

甚麼是設計理念？ [Icon: Play Video]

草繪技巧基礎 [Icon: Document]

隨堂測驗 [Icon: Quiz]

狀態: 當前播放的課程會 Highlight，完成的會有 ✔️ 打勾。

中間：主內容區 (Main Content Area)

影片/簡報播放器 (Video/Slide Container): 佔據畫面上方 70% 空間。

內容分頁 (Content Tabs): 在播放器下方，有 4 個 Tab 按鈕：

[內容介紹 Overview]

[下載筆記 Notes/PDF]

[實作任務 Task]

[討論區 Discussion]

底部：操作列 (Bottom Action Bar)

Button Left: [⬅️ 上一課 Previous] (Secondary Style - 灰色框線)

Button Right: [標示為完成並進入下一課 Mark as Complete & Next ➡️] (Primary Style - 亮藍色實心)

📥 資源下載頁 (Resources Page)
簡單的列表設計 (List View) 或表格 (Table View)。

欄位名稱 (Columns): 檔案名稱 | 類別 | 檔案大小 | 操作

Row 1: 材料特性速查表 | [筆記] | 1.2 MB | Button: [⬇️ 下載 PDF]

Row 2: 鐳射切割安全守則 | [安全] | 800 KB | Button: [⬇️ 下載 PDF]

Row 3: 3D 打印切片設定指南 | [設備] | 2.5 MB | Button: [⬇️ 下載 PDF]

Row 4: 中六 SBA 報告範本 | [DSE] | 15 KB | Button: [⬇️ 下載 Word]