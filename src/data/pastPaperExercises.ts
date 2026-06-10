export type PastPaperSyllabus = 'hkdse' | '0445' | '9705';

export type PastPaperQuestion = {
  id: string;
  label: string;
  promptSummary: string;
  acceptedKeywords: string[];
  sampleAnswer: string;
  guidance: string;
};

export type PastPaperExercise = {
  id: string;
  syllabus: PastPaperSyllabus;
  qualification: string;
  series: string;
  component: string;
  paperName: string;
  language?: string;
  questionPaperFile: string;
  markSchemeFile: string;
  insertFile?: string;
  totalMarks?: number;
  instructions: string[];
  questions: PastPaperQuestion[];
};

export type PastPaperCheckResult = {
  scoreRatio: number;
  likelyCorrect: boolean;
  matchedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
};

export const pastPaperExercises: PastPaperExercise[] = [

  {
    "id": "hkdse-2025-sample-p1-c",
    "syllabus": "hkdse",
    "qualification": "HKDSE DAT Sample Paper",
    "series": "2025 Sample Paper",
    "component": "p1-c",
    "paperName": "Paper 1 Technology, Design and Society",
    "language": "Chinese version",
    "questionPaperFile": "hkdse-dat-2025-sample-paper-1-c.pdf",
    "markSchemeFile": "hkdse-dat-2025-sample-paper-1-c-marking-reference.pdf",
    "instructions": [
      "Open the matching Sample Paper and answer the selected question part in your own words.",
      "Use Check answer for a marking-reference keyword self-check, then compare with teacher guidance.",
      "For sketch, design-development and drawing questions, the checker supports key terminology only; drawing quality still needs manual review."
    ],
    "questions": [
      {
        "id": "1-a-i",
        "label": "1(a)(i)",
        "promptSummary": "Question 1(a)(i): identify one physical property and one mechanical property relevant to the material choice.",
        "acceptedKeywords": [
          "物理特性",
          "低密度",
          "低熱阻",
          "機械特性",
          "高抗拉強度",
          "高硬度"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：物理特性, 低密度, 低熱阻, 機械特性, 高抗拉強度, 高硬度.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-a-ii",
        "label": "1(a)(ii)",
        "promptSummary": "Question 1(a)(ii): explain ergonomic considerations for designing the rubbish-bin opening.",
        "acceptedKeywords": [
          "人體工學",
          "開口高度",
          "不同使用者",
          "開口大小",
          "廢物類型",
          "避免銳角",
          "刮傷"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：人體工學, 開口高度, 不同使用者, 開口大小, 廢物類型, 避免銳角, 刮傷.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Question 1(b): develop initial design ideas for attaching a rubbish bin to a lamp post.",
        "acceptedKeywords": [
          "垃圾桶",
          "燈柱",
          "外形",
          "開口位置",
          "可上鎖翻蓋",
          "互連部件",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：垃圾桶, 燈柱, 外形, 開口位置, 可上鎖翻蓋, 互連部件, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Question 1(c): develop the final rubbish-bin design idea with structure, use situation, flap and labelling.",
        "acceptedKeywords": [
          "最終設計",
          "改良",
          "外形",
          "結構",
          "開口設計",
          "防止野生動物",
          "固定燈柱",
          "標示"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：最終設計, 改良, 外形, 結構, 開口設計, 防止野生動物, 固定燈柱, 標示.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-d",
        "label": "1(d)",
        "promptSummary": "Question 1(d): show how the opening prevents wildlife from pulling rubbish out.",
        "acceptedKeywords": [
          "開口設計",
          "防止野生動物",
          "可行性",
          "合理性",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：開口設計, 防止野生動物, 可行性, 合理性, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-e",
        "label": "1(e)",
        "promptSummary": "Question 1(e): show the mechanical mounting mechanism for attaching the bin to a lamp post.",
        "acceptedKeywords": [
          "固定",
          "燈柱",
          "機械結構",
          "安裝",
          "可行性",
          "合理性",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：固定, 燈柱, 機械結構, 安裝, 可行性, 合理性, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-f",
        "label": "1(f)",
        "promptSummary": "Question 1(f): explain the lockable flap operation, hinge detail and locking mechanism.",
        "acceptedKeywords": [
          "可上鎖翻蓋",
          "清潔工人",
          "鉸接位",
          "組件細節",
          "鎖定",
          "解鎖",
          "機械結構",
          "順序圖"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：可上鎖翻蓋, 清潔工人, 鉸接位, 組件細節, 鎖定, 解鎖, 機械結構, 順序圖.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "1-g",
        "label": "1(g)",
        "promptSummary": "Question 1(g): propose an extra design that repels wildlife attempting to tip over the bin.",
        "acceptedKeywords": [
          "附加設計",
          "驅離",
          "野生動物",
          "翻倒",
          "可行性",
          "合理性",
          "注釋"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：附加設計, 驅離, 野生動物, 翻倒, 可行性, 合理性, 注釋.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-a-i",
        "label": "2(a)(i)",
        "promptSummary": "Question 2(a)(i): identify the logic gate used by the security camera control circuit.",
        "acceptedKeywords": [
          "邏輯門",
          "與門",
          "AND"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：邏輯門, 與門, AND.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-a-ii",
        "label": "2(a)(ii)",
        "promptSummary": "Question 2(a)(ii): complete the truth table for light sensor, motion sensor and camera state.",
        "acceptedKeywords": [
          "真值表",
          "攝影機狀態",
          "光敏感應器",
          "動態感應器",
          "0",
          "1"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：真值表, 攝影機狀態, 光敏感應器, 動態感應器, 0, 1.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-b-i",
        "label": "2(b)(i)",
        "promptSummary": "Question 2(b)(i): design a joint for the security camera mount.",
        "acceptedKeywords": [
          "接口設計",
          "萬向軸承",
          "可行",
          "合理",
          "零件分散圖",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：接口設計, 萬向軸承, 可行, 合理, 零件分散圖, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-b-ii",
        "label": "2(b)(ii)",
        "promptSummary": "Question 2(b)(ii): explain how the camera joint can be locked.",
        "acceptedKeywords": [
          "鎖定接口",
          "鎖定機械結構",
          "可行",
          "合理",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：鎖定接口, 鎖定機械結構, 可行, 合理, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Question 2(c): design a stand that can be free-standing on a table or hung on a wall.",
        "acceptedKeywords": [
          "自由站立",
          "桌面",
          "掛牆",
          "支架",
          "注釋",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：自由站立, 桌面, 掛牆, 支架, 注釋, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-d",
        "label": "2(d)",
        "promptSummary": "Question 2(d): identify circuit components in a security night camera circuit.",
        "acceptedKeywords": [
          "電路圖",
          "光敏電阻",
          "電池",
          "電晶體",
          "電阻",
          "夜視攝影機"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：電路圖, 光敏電阻, 電池, 電晶體, 電阻, 夜視攝影機.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "2-e",
        "label": "2(e)",
        "promptSummary": "Question 2(e): describe ODM and OEM collaboration for producing a security camera.",
        "acceptedKeywords": [
          "ODM",
          "設計",
          "要求",
          "規格",
          "OEM",
          "製造",
          "協作"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：ODM, 設計, 要求, 規格, OEM, 製造, 協作.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Question 3(a): design dry-food storage and feeder-base adapters with a valve operation.",
        "acceptedKeywords": [
          "乾糧儲存箱",
          "轉接器",
          "閥門",
          "寵物餵食器",
          "底座",
          "零件分散圖",
          "注釋"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：乾糧儲存箱, 轉接器, 閥門, 寵物餵食器, 底座, 零件分散圖, 注釋.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-b-i",
        "label": "3(b)(i)",
        "promptSummary": "Question 3(b)(i): identify an electro-mechanical component and mechanism for a pet feeder.",
        "acceptedKeywords": [
          "步進電動機",
          "齒輪",
          "電機元件",
          "機械結構"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：步進電動機, 齒輪, 電機元件, 機械結構.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-b-ii",
        "label": "3(b)(ii)",
        "promptSummary": "Question 3(b)(ii): explain how gears reduce turning speed to drive a screw feeder.",
        "acceptedKeywords": [
          "小主動齒輪",
          "大從動齒輪",
          "降低轉速",
          "螺旋送料器",
          "步進電動機"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：小主動齒輪, 大從動齒輪, 降低轉速, 螺旋送料器, 步進電動機.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-c-i",
        "label": "3(c)(i)",
        "promptSummary": "Question 3(c)(i): design physical switches for feeding frequency and feeding volume.",
        "acceptedKeywords": [
          "實體控制開關",
          "餵食頻率",
          "餵食份量",
          "操作方法"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：實體控制開關, 餵食頻率, 餵食份量, 操作方法.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-c-ii",
        "label": "3(c)(ii)",
        "promptSummary": "Question 3(c)(ii): create graphics that show feeding frequency and feeding volume states.",
        "acceptedKeywords": [
          "圖像",
          "三種餵食頻率",
          "兩種餵食份量",
          "狀態"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：圖像, 三種餵食頻率, 兩種餵食份量, 狀態.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Question 3(d): explain sustainability impact on automatic pet-feeder design.",
        "acceptedKeywords": [
          "可持續性",
          "節能",
          "低功耗",
          "環保材料",
          "待機模式",
          "可生物降解材料",
          "減少污染"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：可持續性, 節能, 低功耗, 環保材料, 待機模式, 可生物降解材料, 減少污染.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-a-i",
        "label": "4(a)(i)",
        "promptSummary": "Question 4(a)(i): identify the electro-mechanical component for the snack vending machine.",
        "acceptedKeywords": [
          "電機元件",
          "步進電動機"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：電機元件, 步進電動機.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-a-ii",
        "label": "4(a)(ii)",
        "promptSummary": "Question 4(a)(ii): show how a spiral coil connects to the motor using suitable components.",
        "acceptedKeywords": [
          "螺旋線圈",
          "聯接器",
          "無頭螺絲",
          "連接方法",
          "零件分散圖"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：螺旋線圈, 聯接器, 無頭螺絲, 連接方法, 零件分散圖.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-b-i",
        "label": "4(b)(i)",
        "promptSummary": "Question 4(b)(i): select a sensor and explain how it detects whether snacks have dropped.",
        "acceptedKeywords": [
          "紅外線感應器",
          "超聲波感應器",
          "發射器",
          "接收器",
          "反射",
          "距離",
          "安裝位置"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：紅外線感應器, 超聲波感應器, 發射器, 接收器, 反射, 距離, 安裝位置.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-b-ii",
        "label": "4(b)(ii)",
        "promptSummary": "Question 4(b)(ii): complete a simplified flowchart for snack detection and motor control.",
        "acceptedKeywords": [
          "流程圖",
          "感應器信號",
          "零食是否掉落",
          "暫停",
          "繼續",
          "步進電動機"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：流程圖, 感應器信號, 零食是否掉落, 暫停, 繼續, 步進電動機.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Question 4(c)(i): design a gate mechanism to keep the snack collection area closed.",
        "acceptedKeywords": [
          "閘門",
          "收集區",
          "封閉",
          "機械結構",
          "可行",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：閘門, 收集區, 封閉, 機械結構, 可行, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-d-i",
        "label": "4(d)(i)",
        "promptSummary": "Question 4(d)(i): explain how a patent protects the company interest from an invention.",
        "acceptedKeywords": [
          "專利",
          "法律保護",
          "排他權",
          "授權收益",
          "市場優勢"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：專利, 法律保護, 排他權, 授權收益, 市場優勢.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-d-ii",
        "label": "4(d)(ii)",
        "promptSummary": "Question 4(d)(ii): identify an intellectual property type for protecting the vending-machine appearance.",
        "acceptedKeywords": [
          "知識產權",
          "註冊外觀設計",
          "造型設計"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：知識產權, 註冊外觀設計, 造型設計.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      }
    ]
  },
  {
    "id": "hkdse-2025-sample-p1-e",
    "syllabus": "hkdse",
    "qualification": "HKDSE DAT Sample Paper",
    "series": "2025 Sample Paper",
    "component": "p1-e",
    "paperName": "Paper 1 Technology, Design and Society",
    "language": "English version",
    "questionPaperFile": "hkdse-dat-2025-sample-paper-1-e.pdf",
    "markSchemeFile": "hkdse-dat-2025-sample-paper-1-e-marking-reference.pdf",
    "instructions": [
      "Open the matching Sample Paper and answer the selected question part in your own words.",
      "Use Check answer for a marking-reference keyword self-check, then compare with teacher guidance.",
      "For sketch, design-development and drawing questions, the checker supports key terminology only; drawing quality still needs manual review."
    ],
    "questions": [
      {
        "id": "1-a-i",
        "label": "1(a)(i)",
        "promptSummary": "Question 1(a)(i): identify one physical property and one mechanical property relevant to the material choice.",
        "acceptedKeywords": [
          "physical property",
          "low density",
          "low thermal resistance",
          "mechanical property",
          "high tensile strength",
          "high hardness"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: physical property, low density, low thermal resistance, mechanical property, high tensile strength, high hardness.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-a-ii",
        "label": "1(a)(ii)",
        "promptSummary": "Question 1(a)(ii): explain ergonomic considerations for designing the rubbish-bin opening.",
        "acceptedKeywords": [
          "ergonomics",
          "opening height",
          "different users",
          "opening size",
          "waste types",
          "avoid sharp edges",
          "finger injury"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ergonomics, opening height, different users, opening size, waste types, avoid sharp edges, finger injury.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Question 1(b): develop initial design ideas for attaching a rubbish bin to a lamp post.",
        "acceptedKeywords": [
          "rubbish bin",
          "lamp post",
          "appearance",
          "opening position",
          "lockable flap",
          "interlocking parts",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: rubbish bin, lamp post, appearance, opening position, lockable flap, interlocking parts, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Question 1(c): develop the final rubbish-bin design idea with structure, use situation, flap and labelling.",
        "acceptedKeywords": [
          "final design",
          "development",
          "structure",
          "opening design",
          "prevent wildlife",
          "mounting",
          "lamp post",
          "labelling"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: final design, development, structure, opening design, prevent wildlife, mounting, lamp post, labelling.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-d",
        "label": "1(d)",
        "promptSummary": "Question 1(d): show how the opening prevents wildlife from pulling rubbish out.",
        "acceptedKeywords": [
          "opening design",
          "prevent wildlife",
          "pulling trash out",
          "feasible",
          "reasonable",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: opening design, prevent wildlife, pulling trash out, feasible, reasonable, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-e",
        "label": "1(e)",
        "promptSummary": "Question 1(e): show the mounting mechanism for attaching the bin to a lamp post.",
        "acceptedKeywords": [
          "mounting mechanism",
          "rubbish bin",
          "lamp post",
          "feasible",
          "reasonable",
          "installation",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: mounting mechanism, rubbish bin, lamp post, feasible, reasonable, installation, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-f",
        "label": "1(f)",
        "promptSummary": "Question 1(f): explain the lockable flap operation, hinge detail and locking mechanism.",
        "acceptedKeywords": [
          "lockable flap",
          "cleaner",
          "empty waste",
          "hinge",
          "component details",
          "locking mechanism",
          "procedural drawing"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: lockable flap, cleaner, empty waste, hinge, component details, locking mechanism, procedural drawing.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "1-g",
        "label": "1(g)",
        "promptSummary": "Question 1(g): propose an extra design that repels wildlife attempting to tip over the bin.",
        "acceptedKeywords": [
          "additional design",
          "repel wildlife",
          "tip over",
          "rubbish bin",
          "feasible",
          "reasonable",
          "annotation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: additional design, repel wildlife, tip over, rubbish bin, feasible, reasonable, annotation.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-a-i",
        "label": "2(a)(i)",
        "promptSummary": "Question 2(a)(i): identify the logic gate used by the security camera control circuit.",
        "acceptedKeywords": [
          "logic gate",
          "AND gate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: logic gate, AND gate.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-a-ii",
        "label": "2(a)(ii)",
        "promptSummary": "Question 2(a)(ii): complete the truth table for light sensor, motion sensor and camera state.",
        "acceptedKeywords": [
          "truth table",
          "camera state",
          "light sensor",
          "motion sensor",
          "0",
          "1"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: truth table, camera state, light sensor, motion sensor, 0, 1.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-b-i",
        "label": "2(b)(i)",
        "promptSummary": "Question 2(b)(i): design a joint for the security camera mount.",
        "acceptedKeywords": [
          "joint design",
          "ball joint",
          "feasible",
          "exploded view",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: joint design, ball joint, feasible, exploded view, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-b-ii",
        "label": "2(b)(ii)",
        "promptSummary": "Question 2(b)(ii): explain how the camera joint can be locked.",
        "acceptedKeywords": [
          "joint lock",
          "locking mechanism",
          "feasible",
          "reasonable",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: joint lock, locking mechanism, feasible, reasonable, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Question 2(c): design a stand that can be free-standing on a table or hung on a wall.",
        "acceptedKeywords": [
          "free standing",
          "table",
          "wall",
          "stand",
          "annotation",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: free standing, table, wall, stand, annotation, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-d",
        "label": "2(d)",
        "promptSummary": "Question 2(d): identify circuit components in a security night camera circuit.",
        "acceptedKeywords": [
          "circuit diagram",
          "LDR",
          "battery",
          "transistor",
          "resistor",
          "security night camera"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: circuit diagram, LDR, battery, transistor, resistor, security night camera.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "2-e",
        "label": "2(e)",
        "promptSummary": "Question 2(e): describe ODM and OEM collaboration for producing a security camera.",
        "acceptedKeywords": [
          "ODM",
          "designs",
          "requirements",
          "specifications",
          "OEM",
          "manufactures",
          "collaboration"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ODM, designs, requirements, specifications, OEM, manufactures, collaboration.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Question 3(a): design dry-food storage and feeder-base adapters with a valve operation.",
        "acceptedKeywords": [
          "dry food storage box",
          "adapter",
          "valve",
          "pet feeder base",
          "exploded view",
          "annotation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dry food storage box, adapter, valve, pet feeder base, exploded view, annotation.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-b-i",
        "label": "3(b)(i)",
        "promptSummary": "Question 3(b)(i): identify an electro-mechanical component and mechanism for a pet feeder.",
        "acceptedKeywords": [
          "stepper motor",
          "gear",
          "electro-mechanical component",
          "mechanism"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: stepper motor, gear, electro-mechanical component, mechanism.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-b-ii",
        "label": "3(b)(ii)",
        "promptSummary": "Question 3(b)(ii): explain how gears reduce turning speed to drive a screw feeder.",
        "acceptedKeywords": [
          "small driver gear",
          "large driven gear",
          "reduce turning speed",
          "screw feeder",
          "stepper motor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: small driver gear, large driven gear, reduce turning speed, screw feeder, stepper motor.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-c-i",
        "label": "3(c)(i)",
        "promptSummary": "Question 3(c)(i): design physical switches for feeding frequency and feeding volume.",
        "acceptedKeywords": [
          "physical switch",
          "feeding frequency",
          "feeding volume",
          "operation method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: physical switch, feeding frequency, feeding volume, operation method.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-c-ii",
        "label": "3(c)(ii)",
        "promptSummary": "Question 3(c)(ii): create graphics that show feeding frequency and feeding volume states.",
        "acceptedKeywords": [
          "graphics",
          "three feeding frequencies",
          "two feeding volumes",
          "states"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: graphics, three feeding frequencies, two feeding volumes, states.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Question 3(d): explain sustainability impact on automatic pet-feeder design.",
        "acceptedKeywords": [
          "sustainability",
          "energy saving",
          "low power",
          "environmentally friendly material",
          "standby mode",
          "biodegradable material",
          "plastic pollution"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: sustainability, energy saving, low power, environmentally friendly material, standby mode, biodegradable material, plastic pollution.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-a-i",
        "label": "4(a)(i)",
        "promptSummary": "Question 4(a)(i): identify the electro-mechanical component for the snack vending machine.",
        "acceptedKeywords": [
          "electro-mechanical component",
          "stepper motor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: electro-mechanical component, stepper motor.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-a-ii",
        "label": "4(a)(ii)",
        "promptSummary": "Question 4(a)(ii): show how a spiral coil connects to the motor using suitable components.",
        "acceptedKeywords": [
          "spiral coil",
          "slit coupling",
          "grub screw",
          "connection solution",
          "exploded view"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: spiral coil, slit coupling, grub screw, connection solution, exploded view.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-b-i",
        "label": "4(b)(i)",
        "promptSummary": "Question 4(b)(i): select a sensor and explain how it detects whether snacks have dropped.",
        "acceptedKeywords": [
          "infrared sensor",
          "ultrasonic sensor",
          "emitter",
          "receiver",
          "bounce back",
          "distance",
          "installation position"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: infrared sensor, ultrasonic sensor, emitter, receiver, bounce back, distance, installation position.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-b-ii",
        "label": "4(b)(ii)",
        "promptSummary": "Question 4(b)(ii): complete a simplified flowchart for snack detection and motor control.",
        "acceptedKeywords": [
          "flowchart",
          "sensor signal",
          "snacks dropped",
          "stop",
          "continue",
          "stepper motor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: flowchart, sensor signal, snacks dropped, stop, continue, stepper motor.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Question 4(c)(i): design a gate mechanism to keep the snack collection area closed.",
        "acceptedKeywords": [
          "gate",
          "snack collection tray",
          "closed",
          "mechanism",
          "feasible",
          "graphic communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gate, snack collection tray, closed, mechanism, feasible, graphic communication.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-d-i",
        "label": "4(d)(i)",
        "promptSummary": "Question 4(d)(i): explain how a patent protects the company interest from an invention.",
        "acceptedKeywords": [
          "patent",
          "legal protection",
          "exclusivity",
          "licensing income",
          "market advantage"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: patent, legal protection, exclusivity, licensing income, market advantage.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      },
      {
        "id": "4-d-ii",
        "label": "4(d)(ii)",
        "promptSummary": "Question 4(d)(ii): identify an intellectual property type for protecting the vending-machine appearance.",
        "acceptedKeywords": [
          "intellectual property",
          "registered design",
          "appearance design"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: intellectual property, registered design, appearance design.",
        "guidance": "Use precise DAT vocabulary, clear design reasoning and labelled sketches where required. The checker looks for core marking-reference ideas, not drawing quality."
      }
    ]
  },
  {
    "id": "hkdse-2025-sample-p2b-c",
    "syllabus": "hkdse",
    "qualification": "HKDSE DAT Sample Paper",
    "series": "2025 Sample Paper",
    "component": "p2b-c",
    "paperName": "Paper 2B Creative Digital Media",
    "language": "Chinese version",
    "questionPaperFile": "hkdse-dat-2025-sample-paper-2-c.pdf",
    "markSchemeFile": "hkdse-dat-2025-sample-paper-2b-c-marking-reference.pdf",
    "instructions": [
      "Open the matching Sample Paper and answer the selected question part in your own words.",
      "Use Check answer for a marking-reference keyword self-check, then compare with teacher guidance.",
      "For sketch, design-development and drawing questions, the checker supports key terminology only; drawing quality still needs manual review."
    ],
    "questions": [
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Question 4(a): identify two visual contents and explain the message each communicates.",
        "acceptedKeywords": [
          "視覺內容",
          "傳遞信息",
          "散亂頭髮",
          "疲倦眼神",
          "打瞌睡泡泡",
          "鬆散姿態",
          "缺乏活力",
          "久坐"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：視覺內容, 傳遞信息, 散亂頭髮, 疲倦眼神, 打瞌睡泡泡, 鬆散姿態, 缺乏活力, 久坐.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Question 4(b): explain the mascot/name meaning and how it reflects Hong Kong lifestyle habits.",
        "acceptedKeywords": [
          "匿獅",
          "躲起來",
          "Lazy",
          "缺乏運動",
          "久坐",
          "生活習慣",
          "非傳染病"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：匿獅, 躲起來, Lazy, 缺乏運動, 久坐, 生活習慣, 非傳染病.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Question 4(c)(i): plan a storyboard for a short video using the main virtual character.",
        "acceptedKeywords": [
          "主角",
          "匿獅",
          "恆常體能活動",
          "拍攝順序",
          "分鏡技巧",
          "影音效果",
          "構圖",
          "創意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：主角, 匿獅, 恆常體能活動, 拍攝順序, 分鏡技巧, 影音效果, 構圖, 創意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-c-ii",
        "label": "4(c)(ii)",
        "promptSummary": "Question 4(c)(ii): describe post-production steps for adding a virtual character to a video.",
        "acceptedKeywords": [
          "後期製作",
          "虛擬角色",
          "數字模型",
          "拍攝動作",
          "疊加",
          "剪接",
          "真實片段"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：後期製作, 虛擬角色, 數字模型, 拍攝動作, 疊加, 剪接, 真實片段.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-d",
        "label": "4(d)",
        "promptSummary": "Question 4(d): explain design considerations for a campaign logo.",
        "acceptedKeywords": [
          "設計考慮",
          "整體目標",
          "願景",
          "象徵意義",
          "簡潔易明",
          "用色",
          "健康視覺形象"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：設計考慮, 整體目標, 願景, 象徵意義, 簡潔易明, 用色, 健康視覺形象.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-e-i",
        "label": "4(e)(i)",
        "promptSummary": "Question 4(e)(i): identify one signifier and signified meaning in the logo.",
        "acceptedKeywords": [
          "意符",
          "意指",
          "人物剪影",
          "全民參與",
          "健康生活方式",
          "活力",
          "團結",
          "健康圖示"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：意符, 意指, 人物剪影, 全民參與, 健康生活方式, 活力, 團結, 健康圖示.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "4-e-ii",
        "label": "4(e)(ii)",
        "promptSummary": "Question 4(e)(ii): explain one visual composition principle used in the logo.",
        "acceptedKeywords": [
          "視覺構圖法則",
          "放射",
          "對稱平衡",
          "視線",
          "動態感",
          "秩序感",
          "設計概念"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：視覺構圖法則, 放射, 對稱平衡, 視線, 動態感, 秩序感, 設計概念.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "5-a-ii",
        "label": "5(a)(ii)",
        "promptSummary": "Question 5(a)(ii): explain a graphic or media decision for a virtual character concept.",
        "acceptedKeywords": [
          "虛擬角色",
          "角色設計",
          "視覺效果",
          "媒體",
          "表達",
          "創意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：虛擬角色, 角色設計, 視覺效果, 媒體, 表達, 創意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "5-c-i",
        "label": "5(c)(i)",
        "promptSummary": "Question 5(c)(i): develop the virtual-character visual design.",
        "acceptedKeywords": [
          "虛擬角色",
          "造型",
          "動作",
          "外觀",
          "設計概念",
          "構圖"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：虛擬角色, 造型, 動作, 外觀, 設計概念, 構圖.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "5-c-ii",
        "label": "5(c)(ii)",
        "promptSummary": "Question 5(c)(ii): explain technical or visual effects for a digital media output.",
        "acceptedKeywords": [
          "數碼媒體",
          "視覺效果",
          "動畫",
          "影音",
          "剪接",
          "後期製作"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：數碼媒體, 視覺效果, 動畫, 影音, 剪接, 後期製作.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "5-e-ii",
        "label": "5(e)(ii)",
        "promptSummary": "Question 5(e)(ii): evaluate or justify design decisions in the digital media proposal.",
        "acceptedKeywords": [
          "評估",
          "理據",
          "設計決定",
          "目標受眾",
          "傳遞信息",
          "視覺傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：評估, 理據, 設計決定, 目標受眾, 傳遞信息, 視覺傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "6-b",
        "label": "6(b)",
        "promptSummary": "Question 6(b): answer a creative digital media design question using correct visual communication vocabulary.",
        "acceptedKeywords": [
          "創意數碼媒體",
          "視覺傳意",
          "圖像",
          "構圖",
          "用色",
          "受眾",
          "信息"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：創意數碼媒體, 視覺傳意, 圖像, 構圖, 用色, 受眾, 信息.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      }
    ]
  },
  {
    "id": "hkdse-2025-sample-p2c-c",
    "syllabus": "hkdse",
    "qualification": "HKDSE DAT Sample Paper",
    "series": "2025 Sample Paper",
    "component": "p2c-c",
    "paperName": "Paper 2C Design Practice and Materials Processing",
    "language": "Chinese version",
    "questionPaperFile": "hkdse-dat-2025-sample-paper-2-c.pdf",
    "markSchemeFile": "hkdse-dat-2025-sample-paper-2c-c-marking-reference.pdf",
    "instructions": [
      "Open the matching Sample Paper and answer the selected question part in your own words.",
      "Use Check answer for a marking-reference keyword self-check, then compare with teacher guidance.",
      "For sketch, design-development and drawing questions, the checker supports key terminology only; drawing quality still needs manual review."
    ],
    "questions": [
      {
        "id": "7-a-i",
        "label": "7(a)(i)",
        "promptSummary": "Question 7(a)(i): name suitable plastic materials and mechanical properties for a three-legged stool.",
        "acceptedKeywords": [
          "塑膠材料",
          "聚丙烯",
          "PP",
          "聚碳酸酯",
          "PC",
          "HDPE",
          "抗拉強度",
          "抗衝擊性"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：塑膠材料, 聚丙烯, PP, 聚碳酸酯, PC, HDPE, 抗拉強度, 抗衝擊性.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-b-i",
        "label": "7(b)(i)",
        "promptSummary": "Question 7(b)(i): name a mass-production method for the stool.",
        "acceptedKeywords": [
          "大量生產",
          "注塑成形法",
          "注射成形法"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：大量生產, 注塑成形法, 注射成形法.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-b-ii",
        "label": "7(b)(ii)",
        "promptSummary": "Question 7(b)(ii): explain important mould design considerations for the stool.",
        "acceptedKeywords": [
          "模具",
          "拔模角",
          "脫模設計",
          "相關解釋"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：模具, 拔模角, 脫模設計, 相關解釋.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-b-iii",
        "label": "7(b)(iii)",
        "promptSummary": "Question 7(b)(iii): describe the injection moulding process.",
        "acceptedKeywords": [
          "粒狀原料",
          "料斗",
          "螺杆",
          "料筒",
          "加熱熔化",
          "噴嘴",
          "注入模具",
          "冷卻硬化"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：粒狀原料, 料斗, 螺杆, 料筒, 加熱熔化, 噴嘴, 注入模具, 冷卻硬化.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-b-iv",
        "label": "7(b)(iv)",
        "promptSummary": "Question 7(b)(iv): state one advantage and one disadvantage of one-piece moulding.",
        "acceptedKeywords": [
          "一體成型",
          "結構完整性",
          "生產效率",
          "難以修復",
          "浪費材料"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：一體成型, 結構完整性, 生產效率, 難以修復, 浪費材料.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-c-i",
        "label": "7(c)(i)",
        "promptSummary": "Question 7(c)(i): propose a design to prevent water collecting on the stool seat.",
        "acceptedKeywords": [
          "改良設計",
          "避免積水",
          "凳面",
          "排水",
          "可行",
          "合理"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：改良設計, 避免積水, 凳面, 排水, 可行, 合理.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-c-ii",
        "label": "7(c)(ii)",
        "promptSummary": "Question 7(c)(ii): propose a design to improve compressive or bending resistance of stool legs.",
        "acceptedKeywords": [
          "凳腳",
          "抗壓性",
          "抗彎性",
          "增強",
          "支撐",
          "可行",
          "合理"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：凳腳, 抗壓性, 抗彎性, 增強, 支撐, 可行, 合理.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-c-iii",
        "label": "7(c)(iii)",
        "promptSummary": "Question 7(c)(iii): propose an anti-slip design for the stool legs.",
        "acceptedKeywords": [
          "防滑",
          "凳腳",
          "紋理",
          "摩擦力",
          "滑動",
          "可行"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：防滑, 凳腳, 紋理, 摩擦力, 滑動, 可行.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "7-d",
        "label": "7(d)",
        "promptSummary": "Question 7(d): explain why a three-legged stool can be better than a four-legged stool.",
        "acceptedKeywords": [
          "三腳凳",
          "四腳凳",
          "不平表面",
          "自然適應",
          "穩定"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：三腳凳, 四腳凳, 不平表面, 自然適應, 穩定.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-a",
        "label": "8(a)",
        "promptSummary": "Question 8(a): identify motion A and motion B in a mechanism.",
        "acceptedKeywords": [
          "運動A",
          "搖擺運動",
          "運動B",
          "往復運動"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：運動A, 搖擺運動, 運動B, 往復運動.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-b-i",
        "label": "8(b)(i)",
        "promptSummary": "Question 8(b)(i): design a mechanism that moves a stamp vertically downwards.",
        "acceptedKeywords": [
          "印章",
          "垂直向下",
          "機械結構",
          "功能細節",
          "解釋"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：印章, 垂直向下, 機械結構, 功能細節, 解釋.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-b-ii",
        "label": "8(b)(ii)",
        "promptSummary": "Question 8(b)(ii): design a mechanism that raises the stamp pattern.",
        "acceptedKeywords": [
          "印章",
          "升起",
          "機械結構",
          "功能細節"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：印章, 升起, 機械結構, 功能細節.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-c-i",
        "label": "8(c)(i)",
        "promptSummary": "Question 8(c)(i): suggest how to increase the speed ratio of the pressing part.",
        "acceptedKeywords": [
          "速度比",
          "更長手柄",
          "按壓部分",
          "提升"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：速度比, 更長手柄, 按壓部分, 提升.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-c-ii",
        "label": "8(c)(ii)",
        "promptSummary": "Question 8(c)(ii): improve the handle ergonomically.",
        "acceptedKeywords": [
          "人體工學",
          "手把",
          "手柄形狀",
          "操控性",
          "舒適"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：人體工學, 手把, 手柄形狀, 操控性, 舒適.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-d",
        "label": "8(d)",
        "promptSummary": "Question 8(d): name and communicate a suitable wood joint.",
        "acceptedKeywords": [
          "榫接法",
          "雌雄榫",
          "圖像傳意"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：榫接法, 雌雄榫, 圖像傳意.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "8-e",
        "label": "8(e)",
        "promptSummary": "Question 8(e): describe steps for cutting and assembling the selected joint.",
        "acceptedKeywords": [
          "標記榫頭",
          "線鋸",
          "標記榫眼",
          "手鑽",
          "鑿",
          "去除材料",
          "木膠"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：標記榫頭, 線鋸, 標記榫眼, 手鑽, 鑿, 去除材料, 木膠.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "9-a-i",
        "label": "9(a)(i)",
        "promptSummary": "Question 9(a)(i): name a ferrous metal and relevant material properties.",
        "acceptedKeywords": [
          "含鐵金屬",
          "軟鋼",
          "抗拉強度",
          "延展性"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：含鐵金屬, 軟鋼, 抗拉強度, 延展性.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "9-a-ii",
        "label": "9(a)(ii)",
        "promptSummary": "Question 9(a)(ii): name the production method for a metal part.",
        "acceptedKeywords": [
          "生產方法",
          "沖壓成型"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：生產方法, 沖壓成型.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "9-b-i",
        "label": "9(b)(i)",
        "promptSummary": "Question 9(b)(i): explain or design a fabrication detail for a metal product.",
        "acceptedKeywords": [
          "金屬",
          "製作",
          "加工",
          "結構",
          "可行"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：金屬, 製作, 加工, 結構, 可行.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "9-c-ii",
        "label": "9(c)(ii)",
        "promptSummary": "Question 9(c)(ii): explain a joining or riveting process for a metal product.",
        "acceptedKeywords": [
          "鉚接",
          "鉚釘",
          "連接",
          "金屬",
          "固定"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：鉚接, 鉚釘, 連接, 金屬, 固定.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      },
      {
        "id": "9-c-iii",
        "label": "9(c)(iii)",
        "promptSummary": "Question 9(c)(iii): evaluate a design or manufacturing improvement for the BBQ grill.",
        "acceptedKeywords": [
          "燒烤爐",
          "改良",
          "設計",
          "製造",
          "評估",
          "可行"
        ],
        "sampleAnswer": "高分答案應包括相關重點，例如：燒烤爐, 改良, 設計, 製造, 評估, 可行.",
        "guidance": "作答時要使用準確DAT詞彙、清楚設計理據；如題目需要繪圖，仍要自行檢查標註、結構、比例和圖像傳意質素。"
      }
    ]
  },
  {
    "id": "0445-s25-11",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "11",
    "paperName": "Paper 1 Product Design",
    "questionPaperFile": "0445_s25_qp_11.pdf",
    "markSchemeFile": "0445_s25_ms_11.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bottle",
          "easy",
          "stable",
          "able",
          "acces",
          "additional",
          "clean",
          "customer",
          "different",
          "easily",
          "keep",
          "label"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bottle, easy, stable, able, acces, additional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "timber",
          "vacuum",
          "basket",
          "bottle",
          "box",
          "circular",
          "cut",
          "cylindrical",
          "drawing",
          "fabric",
          "formed",
          "holding"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: timber, vacuum, basket, bottle, box, circular.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-d",
        "label": "1(d)",
        "promptSummary": "Use the matching question paper and answer 1(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "disadvantage",
          "explained",
          "idea",
          "ideas",
          "justification",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, disadvantage, explained, idea, ideas.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-e",
        "label": "1(e)",
        "promptSummary": "Use the matching question paper and answer 1(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-f",
        "label": "1(f)",
        "promptSummary": "Use the matching question paper and answer 1(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-g",
        "label": "1(g)",
        "promptSummary": "Use the matching question paper and answer 1(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "tools",
          "basic",
          "design",
          "detailed",
          "etc",
          "igcse",
          "just",
          "manufacturing",
          "may/june",
          "names",
          "pencil"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, tools, basic, design, detailed, etc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "easy",
          "restriction",
          "theme",
          "additional",
          "change",
          "children",
          "colour",
          "park",
          "pictogram",
          "point",
          "read"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, easy, restriction, theme, additional, change.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "tabs",
          "arrow",
          "bolt",
          "clic",
          "clips",
          "crash",
          "drawing",
          "etc",
          "fixing",
          "flaps",
          "fold",
          "graphic"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: tabs, arrow, bolt, clic, clips, crash.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-d",
        "label": "2(d)",
        "promptSummary": "Use the matching question paper and answer 2(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "disadvantage",
          "explained",
          "idea",
          "ideas",
          "justification",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, disadvantage, explained, idea, ideas.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-e",
        "label": "2(e)",
        "promptSummary": "Use the matching question paper and answer 2(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-f",
        "label": "2(f)",
        "promptSummary": "Use the matching question paper and answer 2(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-g",
        "label": "2(g)",
        "promptSummary": "Use the matching question paper and answer 2(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "tools",
          "basic",
          "design",
          "detailed",
          "etc",
          "igcse",
          "just",
          "manufacturing",
          "may/june",
          "names",
          "pencil"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, tools, basic, design, detailed, etc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "people",
          "easy",
          "number",
          "accurately",
          "additional",
          "barrier",
          "count",
          "counting",
          "detect",
          "hurt",
          "indicator",
          "low"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: people, easy, number, accurately, additional, barrier.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "sensor",
          "movement",
          "automatically",
          "barrier",
          "camera",
          "connected",
          "counter",
          "detecting",
          "drawing",
          "fixed",
          "gates",
          "laser"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: sensor, movement, automatically, barrier, camera, connected.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "disadvantage",
          "explained",
          "idea",
          "ideas",
          "justification",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, disadvantage, explained, idea, ideas.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-e",
        "label": "3(e)",
        "promptSummary": "Use the matching question paper and answer 3(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-f",
        "label": "3(f)",
        "promptSummary": "Use the matching question paper and answer 3(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-g",
        "label": "3(g)",
        "promptSummary": "Use the matching question paper and answer 3(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "tools",
          "basic",
          "design",
          "detailed",
          "etc",
          "just",
          "manufacturing",
          "names",
          "pencil",
          "rule",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, tools, basic, design, detailed, etc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_11.pdf"
  },
  {
    "id": "0445-s25-12",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "12",
    "paperName": "Paper 1 Product Design",
    "questionPaperFile": "0445_s25_qp_12.pdf",
    "markSchemeFile": "0445_s25_ms_12.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "additional",
          "appealing",
          "balls",
          "brake",
          "children",
          "covered",
          "easy",
          "fold",
          "handles/grip",
          "hold",
          "off",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: additional, appealing, balls, brake, children, covered.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "allowing",
          "castor",
          "drawing",
          "etc",
          "handle",
          "handrail",
          "hands",
          "legs",
          "making",
          "method",
          "moveable",
          "product"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: allowing, castor, drawing, etc, handle, handrail.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-d",
        "label": "1(d)",
        "promptSummary": "Use the matching question paper and answer 1(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-e",
        "label": "1(e)",
        "promptSummary": "Use the matching question paper and answer 1(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-f",
        "label": "1(f)",
        "promptSummary": "Use the matching question paper and answer 1(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-g",
        "label": "1(g)",
        "promptSummary": "Use the matching question paper and answer 1(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "additional",
          "assemble",
          "attention",
          "attract",
          "catching",
          "cost",
          "easy",
          "edges",
          "etc",
          "eye",
          "graphics/image",
          "lifespan"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: additional, assemble, attention, attract, catching, cost.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "air",
          "balanced",
          "clearly",
          "displaying",
          "drawing",
          "etc",
          "held",
          "hold",
          "hung",
          "method",
          "net",
          "object"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: air, balanced, clearly, displaying, drawing, etc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-d",
        "label": "2(d)",
        "promptSummary": "Use the matching question paper and answer 2(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-e",
        "label": "2(e)",
        "promptSummary": "Use the matching question paper and answer 2(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-f",
        "label": "2(f)",
        "promptSummary": "Use the matching question paper and answer 2(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-g",
        "label": "2(g)",
        "promptSummary": "Use the matching question paper and answer 2(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "different",
          "size",
          "adaptable",
          "additional",
          "ball",
          "balls",
          "clean/maintain/repair",
          "damage",
          "durable",
          "easy",
          "end",
          "etc"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: different, size, adaptable, additional, ball, balls.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "friction",
          "vacuum",
          "end",
          "adhesive",
          "cap",
          "closing",
          "drawing",
          "etc",
          "fit",
          "formed",
          "lid",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: friction, vacuum, end, adhesive, cap, closing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-e",
        "label": "3(e)",
        "promptSummary": "Use the matching question paper and answer 3(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-f",
        "label": "3(f)",
        "promptSummary": "Use the matching question paper and answer 3(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-g",
        "label": "3(g)",
        "promptSummary": "Use the matching question paper and answer 3(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_12.pdf"
  },
  {
    "id": "0445-s25-13",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "13",
    "paperName": "Paper 1 Product Design",
    "questionPaperFile": "0445_s25_qp_13.pdf",
    "markSchemeFile": "0445_s25_ms_13.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bottle",
          "easy",
          "chair",
          "out",
          "water",
          "acces",
          "additional",
          "adjustable",
          "attached",
          "clean",
          "colour",
          "damage"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bottle, easy, chair, out, water, acces.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cam",
          "clamp",
          "strap",
          "tube",
          "attaching",
          "between",
          "cable",
          "carabiner",
          "clips",
          "cupping",
          "drawing",
          "jubilee"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cam, clamp, strap, tube, attaching, between.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-d",
        "label": "1(d)",
        "promptSummary": "Use the matching question paper and answer 1(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-e",
        "label": "1(e)",
        "promptSummary": "Use the matching question paper and answer 1(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-f",
        "label": "1(f)",
        "promptSummary": "Use the matching question paper and answer 1(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-g",
        "label": "1(g)",
        "promptSummary": "Use the matching question paper and answer 1(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "side",
          "bottle",
          "handle",
          "hold",
          "able",
          "additional",
          "apart",
          "around",
          "assembly",
          "clearly",
          "comfortable",
          "compartment"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: side, bottle, handle, hold, able, additional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "flaps",
          "arrow",
          "attach",
          "clic",
          "clips",
          "crash",
          "drawing",
          "etc",
          "fold",
          "interlocking",
          "itself",
          "lock"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: flaps, arrow, attach, clic, clips, crash.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-d",
        "label": "2(d)",
        "promptSummary": "Use the matching question paper and answer 2(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-e",
        "label": "2(e)",
        "promptSummary": "Use the matching question paper and answer 2(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-f",
        "label": "2(f)",
        "promptSummary": "Use the matching question paper and answer 2(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-g",
        "label": "2(g)",
        "promptSummary": "Use the matching question paper and answer 2(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "easy",
          "shop",
          "able",
          "additional",
          "adjustable",
          "assistant",
          "bottle",
          "box",
          "boxes",
          "compact",
          "cope"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, easy, shop, able, additional, adjustable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drawing",
          "eccentric",
          "etc",
          "lever",
          "lifting",
          "linkage",
          "mechanical",
          "mechanism",
          "method",
          "pinion",
          "pulley",
          "rack"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drawing, eccentric, etc, lever, lifting, linkage.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "communication",
          "design",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, communication, design, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "advantage",
          "best",
          "disadvantage",
          "explained",
          "generic",
          "idea",
          "ideas",
          "justification",
          "meets",
          "most",
          "selection"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, advantage, best, disadvantage, explained, generic.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-e",
        "label": "3(e)",
        "promptSummary": "Use the matching question paper and answer 3(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "dimension",
          "table"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, dimension, table.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-f",
        "label": "3(f)",
        "promptSummary": "Use the matching question paper and answer 3(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "choice",
          "material",
          "materials",
          "reason",
          "specific"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: choice, material, materials, reason, specific.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-g",
        "label": "3(g)",
        "promptSummary": "Use the matching question paper and answer 3(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "design",
          "detailed",
          "equipment",
          "machine",
          "manufacturing",
          "names",
          "tools"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, design, detailed, equipment, machine, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_13.pdf"
  },
  {
    "id": "0445-s25-31",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "31",
    "paperName": "Paper 3 Resistant Materials",
    "questionPaperFile": "0445_s25_qp_31.pdf",
    "markSchemeFile": "0445_s25_ms_31.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "timber",
          "moisture",
          "contain",
          "content",
          "dried",
          "needs",
          "prevent",
          "reduce",
          "rotting",
          "shrinkage",
          "trees",
          "warping"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: timber, moisture, contain, content, dried, needs.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "hole",
          "saw",
          "mask",
          "advantage",
          "area",
          "bit",
          "cutter",
          "goggle",
          "heats",
          "reference",
          "screw",
          "around"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: hole, saw, mask, advantage, area, bit.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "hole",
          "point",
          "reward",
          "stand",
          "attached",
          "beater",
          "bracket",
          "construction",
          "end",
          "example",
          "expanded",
          "hook"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: hole, point, reward, stand, attached, beater.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bruising",
          "distribute",
          "hardwood",
          "pressure",
          "protect",
          "reason"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bruising, distribute, hardwood, pressure, protect, reason.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "scriber",
          "plastic",
          "centre",
          "sander",
          "added",
          "all",
          "atmosphere",
          "band",
          "bobbin",
          "clean",
          "construction",
          "container"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: scriber, plastic, centre, sander, added, all.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a",
        "label": "5(a)",
        "promptSummary": "Use the matching question paper and answer 5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "bends",
          "former",
          "match",
          "proportion",
          "shape"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, bends, former, match, proportion, shape.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6",
        "label": "6",
        "promptSummary": "Use the matching question paper and answer 6. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "become",
          "hand",
          "hot",
          "immersed",
          "material",
          "moulded",
          "polymorph",
          "soft",
          "water"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: become, hand, hot, immersed, material, moulded.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7",
        "label": "7",
        "promptSummary": "Use the matching question paper and answer 7. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy/proportion",
          "halving",
          "technical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy/proportion, halving, technical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "8",
        "label": "8",
        "promptSummary": "Use the matching question paper and answer 8. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "drilled",
          "hinge",
          "holes",
          "leave",
          "length",
          "piano"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, drilled, hinge, holes, leave, length.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10",
        "label": "10",
        "promptSummary": "Use the matching question paper and answer 10. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "chair",
          "adjustable",
          "armrest",
          "back",
          "castor",
          "construction",
          "fewer",
          "folds",
          "lightweight",
          "materials",
          "minimal",
          "move"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: chair, adjustable, armrest, back, castor, construction.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a",
        "label": "11(a)",
        "promptSummary": "Use the matching question paper and answer 11(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "easy",
          "machine",
          "acces",
          "adjust",
          "different",
          "drill",
          "hold",
          "include",
          "interfere",
          "operation",
          "pillar",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: easy, machine, acces, adjust, different, drill.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-i",
        "label": "11(b)(i)",
        "promptSummary": "Use the matching question paper and answer 11(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "plies",
          "direction",
          "grain",
          "number",
          "opposite",
          "separate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: plies, direction, grain, number, opposite, separate.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iii",
        "label": "11(c)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "edges",
          "accuracy",
          "equipment",
          "filed",
          "off",
          "sand",
          "saw",
          "smooth",
          "tools",
          "waste"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: edges, accuracy, equipment, filed, off, sand.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-d",
        "label": "11(d)",
        "promptSummary": "Use the matching question paper and answer 11(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drill",
          "set",
          "bench",
          "bits",
          "collar",
          "depth",
          "fitted",
          "pedestal",
          "portable",
          "stop",
          "twist"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drill, set, bench, bits, collar, depth.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-e-i",
        "label": "11(e)(i)",
        "promptSummary": "Use the matching question paper and answer 11(e)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "key",
          "allen",
          "head",
          "hex",
          "hexagonal",
          "screwdriver"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: key, allen, head, hex, hexagonal, screwdriver.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-e-ii",
        "label": "11(e)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(e)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "side",
          "rack",
          "barrel",
          "collar",
          "nut",
          "screw",
          "sketche",
          "through",
          "top"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, side, rack, barrel, collar, nut.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a",
        "label": "12(a)",
        "promptSummary": "Use the matching question paper and answer 12(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "attractive",
          "board",
          "cover",
          "cut",
          "layer",
          "logs",
          "manufactured",
          "solid",
          "thin",
          "wood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: attractive, board, cover, cut, layer, logs.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b",
        "label": "12(b)",
        "promptSummary": "Use the matching question paper and answer 12(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "former",
          "veneer",
          "around",
          "clamped",
          "female",
          "glued",
          "male",
          "together"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: former, veneer, around, clamped, female, glued.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-c-v",
        "label": "12(c)(v)",
        "promptSummary": "Use the matching question paper and answer 12(c)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "file",
          "flat",
          "half",
          "hand",
          "round"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: file, flat, half, hand, round.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-d-i",
        "label": "12(d)(i)",
        "promptSummary": "Use the matching question paper and answer 12(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "aluminium",
          "paper",
          "abrasive",
          "carbide",
          "cloth",
          "dry",
          "emery",
          "oxide",
          "silicon",
          "steel/wire",
          "wet",
          "wool"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: aluminium, paper, abrasive, carbide, cloth, dry.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-e",
        "label": "12(e)",
        "promptSummary": "Use the matching question paper and answer 12(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dowel",
          "quality",
          "cut",
          "held",
          "jig",
          "length",
          "marked",
          "sawn",
          "securely",
          "sketche",
          "while"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dowel, quality, cut, held, jig, length.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-g",
        "label": "12(g)",
        "promptSummary": "Use the matching question paper and answer 12(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "beech",
          "mild",
          "comes",
          "felled",
          "finite",
          "replaced",
          "source",
          "sustainable",
          "trees"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, beech, mild, comes, felled, finite.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a",
        "label": "13(a)",
        "promptSummary": "Use the matching question paper and answer 13(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "easy",
          "attractive",
          "carry",
          "clean",
          "colour",
          "durable",
          "easily",
          "finishing",
          "include",
          "lightweight",
          "propertie",
          "self"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: easy, attractive, carry, clean, colour, durable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-b-ii",
        "label": "13(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "file",
          "flat",
          "half",
          "hand",
          "round"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: file, flat, half, hand, round.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-b-iii",
        "label": "13(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 13(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "carbide",
          "dry",
          "paper",
          "silicon",
          "wet"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: carbide, dry, paper, silicon, wet.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-i",
        "label": "13(c)(i)",
        "promptSummary": "Use the matching question paper and answer 13(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "angle",
          "cnc",
          "view",
          "accurate",
          "all",
          "benefit",
          "data",
          "drawing",
          "ease",
          "editing",
          "electronically",
          "machine"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: angle, cnc, view, accurate, all, benefit.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-ii",
        "label": "13(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "advantage",
          "edge",
          "efficient",
          "finishing",
          "materials",
          "repetitive",
          "reqd",
          "speed",
          "time",
          "waste"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, advantage, edge, efficient, finishing, materials.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-d",
        "label": "13(d)",
        "promptSummary": "Use the matching question paper and answer 13(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "acrylic",
          "former",
          "between",
          "clamped",
          "female",
          "heated",
          "male",
          "oven"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: acrylic, former, between, clamped, female, heated.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-e",
        "label": "13(e)",
        "promptSummary": "Use the matching question paper and answer 13(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "constructional",
          "detail",
          "materials",
          "stable",
          "stand"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: constructional, detail, materials, stable, stand.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-f",
        "label": "13(f)",
        "promptSummary": "Use the matching question paper and answer 13(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "around",
          "back",
          "base",
          "bracket",
          "cable",
          "constructional",
          "detail",
          "device",
          "hook",
          "modification",
          "position",
          "practical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: around, back, base, bracket, cable, constructional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-32",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "32",
    "paperName": "Paper 3 Resistant Materials",
    "questionPaperFile": "0445_s25_qp_32.pdf",
    "markSchemeFile": "0445_s25_ms_32.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "abs",
          "acrylic",
          "pla",
          "polypropylene",
          "pvc",
          "benefit",
          "bench",
          "centre",
          "check",
          "chisel",
          "cold",
          "country"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: abs, acrylic, pla, polypropylene, pvc, benefit.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "acrylic",
          "point",
          "saw",
          "accuracy/proportion",
          "blade",
          "correctly",
          "cut",
          "drawn",
          "drilled",
          "edges",
          "end",
          "expanded"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: acrylic, point, saw, accuracy/proportion, blade, correctly.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "hole",
          "base",
          "inside",
          "container",
          "drill",
          "fits",
          "fitted",
          "glued",
          "holes",
          "material",
          "pilot",
          "reference"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: hole, base, inside, container, drill, fits.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "lathe",
          "cnc",
          "centre",
          "engineer",
          "metal"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: lathe, cnc, centre, engineer, metal.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cramp",
          "max",
          "frame",
          "magnet",
          "velcro",
          "adhesive",
          "bottom",
          "clip",
          "contact",
          "epoxy",
          "even",
          "resin"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cramp, max, frame, magnet, velcro, adhesive.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "end",
          "grain",
          "opposite",
          "same"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: end, grain, opposite, same.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "available",
          "board",
          "greater",
          "reason",
          "stability",
          "warping",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: available, board, greater, reason, stability, warping.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "front",
          "height",
          "side",
          "partition",
          "length",
          "drilled",
          "holes",
          "max",
          "template",
          "along",
          "back",
          "drawer"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: front, height, side, partition, length, drilled.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "advantage",
          "lightweight",
          "noncorrosive"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: advantage, lightweight, noncorrosive.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6",
        "label": "6",
        "promptSummary": "Use the matching question paper and answer 6. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "board",
          "both",
          "centre",
          "clamped",
          "end",
          "ends",
          "include",
          "method",
          "plane",
          "scrap",
          "wood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: board, both, centre, clamped, end, ends.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7",
        "label": "7",
        "promptSummary": "Use the matching question paper and answer 7. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "beaten",
          "continuously",
          "hammered",
          "repeatedly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: beaten, continuously, hammered, repeatedly.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "8",
        "label": "8",
        "promptSummary": "Use the matching question paper and answer 8. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "board",
          "housing",
          "stopped",
          "accuracy",
          "lower",
          "technical",
          "upper"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: board, housing, stopped, accuracy, lower, technical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a",
        "label": "10(a)",
        "promptSummary": "Use the matching question paper and answer 10(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bright",
          "colour",
          "handle",
          "intricate",
          "lighter",
          "reason",
          "shape",
          "smoother",
          "splinter"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bright, colour, handle, intricate, lighter, reason.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b",
        "label": "10(b)",
        "promptSummary": "Use the matching question paper and answer 10(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "produce",
          "wood",
          "board",
          "finite",
          "include",
          "manufactured",
          "plastic",
          "product",
          "reason",
          "replaced",
          "replanted"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, produce, wood, board, finite, include.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a",
        "label": "11(a)",
        "promptSummary": "Use the matching question paper and answer 11(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "easy",
          "attractive",
          "carry",
          "clean",
          "colour",
          "durable",
          "easily",
          "finishing",
          "include",
          "lightweight",
          "propertie",
          "resistant"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: easy, attractive, carry, clean, colour, durable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b",
        "label": "11(b)",
        "promptSummary": "Use the matching question paper and answer 11(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "marker",
          "acces",
          "board",
          "ease",
          "location",
          "number",
          "rubber",
          "size"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: marker, acces, board, ease, location, number.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-i",
        "label": "11(c)(i)",
        "promptSummary": "Use the matching question paper and answer 11(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accessible",
          "card",
          "cheap",
          "expensive",
          "materials",
          "modelling",
          "quick",
          "waste"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accessible, card, cheap, expensive, materials, modelling.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-ii",
        "label": "11(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cnc",
          "accuracy",
          "computer",
          "create",
          "ease",
          "editing",
          "electronically",
          "image",
          "machine",
          "model",
          "program",
          "send"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cnc, accuracy, computer, create, ease, editing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-d-i",
        "label": "11(d)(i)",
        "promptSummary": "Use the matching question paper and answer 11(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "scriber",
          "caliper",
          "chinagraph",
          "felt",
          "leg",
          "marker",
          "odd",
          "pen",
          "pencil",
          "tip"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: scriber, caliper, chinagraph, felt, leg, marker.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-e",
        "label": "11(e)",
        "promptSummary": "Use the matching question paper and answer 11(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "side",
          "additional",
          "drilled",
          "edge",
          "explanatory",
          "holes",
          "jig",
          "located",
          "material",
          "template"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: side, additional, drilled, edge, explanatory, holes.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-f",
        "label": "11(f)",
        "promptSummary": "Use the matching question paper and answer 11(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "added",
          "board",
          "clamp",
          "method",
          "sacrificial",
          "some",
          "type",
          "underneath"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: added, board, clamp, method, sacrificial, some.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-g",
        "label": "11(g)",
        "promptSummary": "Use the matching question paper and answer 11(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "acrylic",
          "line",
          "bender",
          "heat",
          "bend",
          "cooling",
          "former",
          "gun",
          "heater",
          "heating",
          "method",
          "retain"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: acrylic, line, bender, heat, bend, cooling.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-i",
        "label": "12(a)(i)",
        "promptSummary": "Use the matching question paper and answer 12(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "available",
          "beech",
          "birch",
          "hardwood",
          "ramin",
          "variety",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: available, beech, birch, hardwood, ramin, variety.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-iii",
        "label": "12(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 12(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "iron",
          "mild",
          "stainles"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, iron, mild, stainles.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b",
        "label": "12(b)",
        "promptSummary": "Use the matching question paper and answer 12(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "max",
          "clip",
          "constructional",
          "detail",
          "idea",
          "magnet",
          "practical",
          "some",
          "sort",
          "velcro"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: max, clip, constructional, detail, idea, magnet.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-c-i",
        "label": "12(c)(i)",
        "promptSummary": "Use the matching question paper and answer 12(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "scriber",
          "felt",
          "marker",
          "pen",
          "tip"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: scriber, felt, marker, pen, tip.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-d-i",
        "label": "12(d)(i)",
        "promptSummary": "Use the matching question paper and answer 12(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "carbide",
          "cloth",
          "dry",
          "emery",
          "paper",
          "silicon",
          "steel/wire",
          "wet",
          "wool"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: carbide, cloth, dry, emery, paper, silicon.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-d-iii",
        "label": "12(d)(iii)",
        "promptSummary": "Use the matching question paper and answer 12(d)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "chrome",
          "electroplating",
          "finishe",
          "galvanise",
          "include",
          "lacquer",
          "paint",
          "plating"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: chrome, electroplating, finishe, galvanise, include, lacquer.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-e",
        "label": "12(e)",
        "promptSummary": "Use the matching question paper and answer 12(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dowel",
          "drill",
          "hole",
          "lathe",
          "chuck",
          "fitted",
          "centre",
          "machine",
          "tailstock",
          "drilling",
          "end",
          "guide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dowel, drill, hole, lathe, chuck, fitted.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-g-i",
        "label": "12(g)(i)",
        "promptSummary": "Use the matching question paper and answer 12(g)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "metal",
          "energy",
          "ferrou",
          "finite",
          "lot",
          "non",
          "produced",
          "production",
          "renewable",
          "source",
          "uses"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: metal, energy, ferrou, finite, lot, non.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-g-ii",
        "label": "12(g)(ii)",
        "promptSummary": "Use the matching question paper and answer 12(g)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "coal",
          "oil",
          "plastic",
          "cannot",
          "finite",
          "gas",
          "many",
          "nonrenewable",
          "processing",
          "produced",
          "recycled",
          "source"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: coal, oil, plastic, cannot, finite, gas.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a-i",
        "label": "13(a)(i)",
        "promptSummary": "Use the matching question paper and answer 13(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "available",
          "beech",
          "birch",
          "example",
          "hardwood",
          "mahogany",
          "oak",
          "variety",
          "walnut",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: available, beech, birch, example, hardwood, mahogany.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a-ii",
        "label": "13(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "attractive",
          "durable",
          "easier",
          "hardwood",
          "reason",
          "tougher",
          "work"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: attractive, durable, easier, hardwood, reason, tougher.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a-iii",
        "label": "13(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 13(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "blockboard",
          "chipboard",
          "laminboard",
          "mdf",
          "plywood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: blockboard, chipboard, laminboard, mdf, plywood.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a-v",
        "label": "13(a)(v)",
        "promptSummary": "Use the matching question paper and answer 13(a)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "appearance",
          "attractive",
          "cheaper",
          "desktop",
          "give",
          "making",
          "oak",
          "solid",
          "wood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: appearance, attractive, cheaper, desktop, give, making.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-b-iii",
        "label": "13(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 13(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "between",
          "max",
          "min",
          "number"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: between, max, min, number.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-i",
        "label": "13(c)(i)",
        "promptSummary": "Use the matching question paper and answer 13(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cramp",
          "frame",
          "bottom",
          "centre",
          "rails",
          "scrap",
          "top",
          "wood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cramp, frame, bottom, centre, rails, scrap.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-ii",
        "label": "13(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "grip",
          "cramp",
          "quick",
          "release",
          "sash"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: grip, cramp, quick, release, sash.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-iii",
        "label": "13(c)(iii)",
        "promptSummary": "Use the matching question paper and answer 13(c)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "check",
          "cramp",
          "flat",
          "frame",
          "glue",
          "lies",
          "off",
          "square",
          "surplu",
          "tightnes",
          "winding",
          "wipe"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: check, cramp, flat, frame, glue, lies.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-d",
        "label": "13(d)",
        "promptSummary": "Use the matching question paper and answer 13(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "groove",
          "bead",
          "drawer",
          "fit",
          "fitted",
          "inside",
          "outside",
          "support",
          "construction",
          "materials"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: groove, bead, drawer, fit, fitted, inside.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-e",
        "label": "13(e)",
        "promptSummary": "Use the matching question paper and answer 13(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "partition",
          "construction",
          "division",
          "drawer",
          "fit",
          "inside",
          "material",
          "sizes"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: partition, construction, division, drawer, fit, inside.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-33",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "33",
    "paperName": "Paper 3 Resistant Materials",
    "questionPaperFile": "0445_s25_qp_33.pdf",
    "markSchemeFile": "0445_s25_ms_33.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "timber",
          "moisture",
          "contain",
          "content",
          "dried",
          "needs",
          "prevent",
          "reduce",
          "rotting",
          "shrinkage",
          "trees",
          "warping"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: timber, moisture, contain, content, dried, needs.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "hole",
          "saw",
          "mask",
          "area",
          "bit",
          "cutter",
          "goggle",
          "heats",
          "reference",
          "screw",
          "advantage",
          "around"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: hole, saw, mask, area, bit, cutter.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "hole",
          "point",
          "reward",
          "stand",
          "attached",
          "beater",
          "bracket",
          "construction",
          "end",
          "example",
          "expanded",
          "hook"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: hole, point, reward, stand, attached, beater.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bruising",
          "distribute",
          "hardwood",
          "pressure",
          "protect",
          "reason"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bruising, distribute, hardwood, pressure, protect, reason.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "scriber",
          "vacuum",
          "plastic",
          "centre",
          "materials",
          "sander",
          "stand",
          "added",
          "all",
          "atmosphere",
          "bag",
          "band"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: scriber, vacuum, plastic, centre, materials, sander.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a",
        "label": "5(a)",
        "promptSummary": "Use the matching question paper and answer 5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "bends",
          "former",
          "match",
          "proportion",
          "shape"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, bends, former, match, proportion, shape.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6",
        "label": "6",
        "promptSummary": "Use the matching question paper and answer 6. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "become",
          "hand",
          "hot",
          "immersed",
          "material",
          "moulded",
          "polymorph",
          "soft",
          "water"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: become, hand, hot, immersed, material, moulded.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7",
        "label": "7",
        "promptSummary": "Use the matching question paper and answer 7. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy/proportion",
          "halving",
          "technical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy/proportion, halving, technical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "8",
        "label": "8",
        "promptSummary": "Use the matching question paper and answer 8. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "drilled",
          "hinge",
          "holes",
          "leave",
          "length",
          "piano"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, drilled, hinge, holes, leave, length.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10",
        "label": "10",
        "promptSummary": "Use the matching question paper and answer 10. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "chair",
          "adjustable",
          "armrest",
          "back",
          "castor",
          "construction",
          "fewer",
          "folds",
          "lightweight",
          "materials",
          "minimal",
          "move"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: chair, adjustable, armrest, back, castor, construction.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a",
        "label": "11(a)",
        "promptSummary": "Use the matching question paper and answer 11(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "easy",
          "machine",
          "acces",
          "adjust",
          "different",
          "drill",
          "hold",
          "include",
          "interfere",
          "operation",
          "pillar",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: easy, machine, acces, adjust, different, drill.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-i",
        "label": "11(b)(i)",
        "promptSummary": "Use the matching question paper and answer 11(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "plies",
          "direction",
          "grain",
          "number",
          "opposite",
          "separate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: plies, direction, grain, number, opposite, separate.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iii",
        "label": "11(c)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "edges",
          "accuracy",
          "equipment",
          "filed",
          "off",
          "sand",
          "saw",
          "smooth",
          "tools",
          "waste"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: edges, accuracy, equipment, filed, off, sand.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-d",
        "label": "11(d)",
        "promptSummary": "Use the matching question paper and answer 11(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drill",
          "set",
          "bench",
          "bits",
          "collar",
          "depth",
          "fitted",
          "pedestal",
          "portable",
          "stop",
          "twist"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drill, set, bench, bits, collar, depth.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-e-i",
        "label": "11(e)(i)",
        "promptSummary": "Use the matching question paper and answer 11(e)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "key",
          "allen",
          "head",
          "hex",
          "hexagonal",
          "screwdriver"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: key, allen, head, hex, hexagonal, screwdriver.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-e-ii",
        "label": "11(e)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(e)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "side",
          "rack",
          "barrel",
          "collar",
          "nut",
          "screw",
          "sketche",
          "through",
          "top"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, side, rack, barrel, collar, nut.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a",
        "label": "12(a)",
        "promptSummary": "Use the matching question paper and answer 12(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "attractive",
          "board",
          "cover",
          "cut",
          "layer",
          "logs",
          "manufactured",
          "solid",
          "thin",
          "wood"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: attractive, board, cover, cut, layer, logs.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b",
        "label": "12(b)",
        "promptSummary": "Use the matching question paper and answer 12(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "former",
          "veneer",
          "around",
          "clamped",
          "female",
          "glued",
          "male",
          "together"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: former, veneer, around, clamped, female, glued.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-c-v",
        "label": "12(c)(v)",
        "promptSummary": "Use the matching question paper and answer 12(c)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "file",
          "flat",
          "half",
          "hand",
          "round"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: file, flat, half, hand, round.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-d-i",
        "label": "12(d)(i)",
        "promptSummary": "Use the matching question paper and answer 12(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "aluminium",
          "paper",
          "abrasive",
          "carbide",
          "cloth",
          "dry",
          "emery",
          "oxide",
          "silicon",
          "steel/wire",
          "wet",
          "wool"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: aluminium, paper, abrasive, carbide, cloth, dry.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-e",
        "label": "12(e)",
        "promptSummary": "Use the matching question paper and answer 12(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dowel",
          "quality",
          "cut",
          "held",
          "jig",
          "length",
          "marked",
          "sawn",
          "securely",
          "sketche",
          "while"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dowel, quality, cut, held, jig, length.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-g",
        "label": "12(g)",
        "promptSummary": "Use the matching question paper and answer 12(g). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "beech",
          "mild",
          "comes",
          "felled",
          "finite",
          "replaced",
          "source",
          "sustainable",
          "trees"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, beech, mild, comes, felled, finite.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-a",
        "label": "13(a)",
        "promptSummary": "Use the matching question paper and answer 13(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "easy",
          "attractive",
          "carry",
          "clean",
          "colour",
          "durable",
          "easily",
          "finishing",
          "include",
          "lightweight",
          "propertie",
          "self"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: easy, attractive, carry, clean, colour, durable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-b-ii",
        "label": "13(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "file",
          "flat",
          "half",
          "hand",
          "round"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: file, flat, half, hand, round.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-b-iii",
        "label": "13(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 13(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "carbide",
          "dry",
          "paper",
          "silicon",
          "wet"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: carbide, dry, paper, silicon, wet.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-i",
        "label": "13(c)(i)",
        "promptSummary": "Use the matching question paper and answer 13(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "angle",
          "cnc",
          "view",
          "accurate",
          "all",
          "benefit",
          "data",
          "drawing",
          "ease",
          "editing",
          "electronically",
          "machine"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: angle, cnc, view, accurate, all, benefit.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-c-ii",
        "label": "13(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 13(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "accuracy",
          "advantage",
          "edge",
          "efficient",
          "finishing",
          "materials",
          "repetitive",
          "reqd",
          "speed",
          "time",
          "waste"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: accuracy, advantage, edge, efficient, finishing, materials.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-d",
        "label": "13(d)",
        "promptSummary": "Use the matching question paper and answer 13(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "acrylic",
          "former",
          "between",
          "clamped",
          "female",
          "heated",
          "male",
          "oven"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: acrylic, former, between, clamped, female, heated.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "13-f",
        "label": "13(f)",
        "promptSummary": "Use the matching question paper and answer 13(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "around",
          "back",
          "base",
          "bracket",
          "cable",
          "constructional",
          "detail",
          "device",
          "hook",
          "modification",
          "position",
          "practical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: around, back, base, bracket, cable, constructional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-41",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "41",
    "paperName": "Paper 4 Systems and Control",
    "questionPaperFile": "0445_s25_qp_41.pdf",
    "markSchemeFile": "0445_s25_ms_41.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "point",
          "described",
          "fully",
          "single",
          "anything",
          "bearing",
          "checking",
          "ecf",
          "effort",
          "explained",
          "explanation",
          "greater"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: point, described, fully, single, anything, bearing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "fossil fuels",
          "natural gas",
          "oil",
          "coal",
          "fossil",
          "natural",
          "derived",
          "fuels",
          "gas",
          "product"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: fossil fuels, natural gas, oil, coal, fossil, natural.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "solar",
          "electricity",
          "charging",
          "daytime",
          "discharge",
          "during",
          "generated",
          "night",
          "releasing",
          "stored",
          "then"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, solar, electricity, charging, daytime, discharge.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "battery",
          "solar",
          "tolerance",
          "will",
          "point",
          "benefit",
          "check",
          "drawback",
          "low",
          "resistance",
          "value"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, battery, solar, tolerance, will, point.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "triangulation",
          "point",
          "fully",
          "position",
          "single",
          "understanding",
          "working",
          "described",
          "different",
          "distributing",
          "explained",
          "frame"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: triangulation, point, fully, position, single, understanding.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "example",
          "force",
          "load",
          "torsion",
          "applied",
          "bridge",
          "cable",
          "car",
          "change",
          "move",
          "pulling",
          "spring"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: example, force, load, torsion, applied, bridge.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "change",
          "changing",
          "direction",
          "explanation",
          "gears",
          "include",
          "multiply",
          "parts",
          "position",
          "precisely",
          "ratio"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, change, changing, direction, explanation, gears.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6",
        "label": "6",
        "promptSummary": "Use the matching question paper and answer 6. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "direction",
          "achieved",
          "benefit",
          "change",
          "drawback",
          "element",
          "gears",
          "idler",
          "number",
          "odd",
          "rotate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, direction, achieved, benefit, change, drawback.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7",
        "label": "7",
        "promptSummary": "Use the matching question paper and answer 7. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "either",
          "fixed",
          "linkage",
          "marked",
          "moving",
          "pivot",
          "position",
          "shape"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: either, fixed, linkage, marked, moving, pivot.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-i",
        "label": "10(a)(i)",
        "promptSummary": "Use the matching question paper and answer 10(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "rods",
          "tension"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, rods, tension.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-ii",
        "label": "10(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "rods",
          "sleeve",
          "thread",
          "act",
          "both",
          "effective",
          "increase",
          "left-hand",
          "length",
          "reduce",
          "right-hand",
          "same"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: rods, sleeve, thread, act, both, effective.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-iii",
        "label": "10(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "plate",
          "distort",
          "gusset",
          "movement",
          "poles",
          "prevent",
          "reduce"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: plate, distort, gusset, movement, poles, prevent.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-iv",
        "label": "10(a)(iv)",
        "promptSummary": "Use the matching question paper and answer 10(a)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "links",
          "movement",
          "rods",
          "some",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: links, movement, rods, some, will.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-v",
        "label": "10(a)(v)",
        "promptSummary": "Use the matching question paper and answer 10(a)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "concrete",
          "frost",
          "will",
          "being",
          "below",
          "chance",
          "compression",
          "damage",
          "damaged",
          "durable",
          "foundation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, concrete, frost, will, being, below.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-i",
        "label": "10(b)(i)",
        "promptSummary": "Use the matching question paper and answer 10(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "class",
          "lever",
          "order",
          "second",
          "wheelbarrow"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: class, lever, order, second, wheelbarrow.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-ii",
        "label": "10(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "brace",
          "member",
          "structural",
          "strut"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: brace, member, structural, strut.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iii",
        "label": "10(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "wheelbarrow",
          "will",
          "advantage",
          "closer",
          "efficiency",
          "efficient",
          "explanation",
          "fulcrum",
          "give",
          "include",
          "increase",
          "increased"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: wheelbarrow, will, advantage, closer, efficiency, efficient.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iv",
        "label": "10(b)(iv)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "wheelbarrow",
          "equilibrium",
          "handle",
          "will",
          "device",
          "effectively",
          "either",
          "ground",
          "hands",
          "lifted",
          "maintain",
          "moving"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: wheelbarrow, equilibrium, handle, will, device, effectively.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-i",
        "label": "10(c)(i)",
        "promptSummary": "Use the matching question paper and answer 10(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "advantage",
          "allow",
          "applied",
          "construction",
          "cost",
          "include",
          "increased",
          "low",
          "method",
          "nail",
          "offsite",
          "plate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: advantage, allow, applied, construction, cost, include.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-ii",
        "label": "10(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "signs",
          "avoided",
          "bent",
          "damage",
          "defect",
          "during",
          "include",
          "insect",
          "knots",
          "large",
          "piece",
          "rot"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: signs, avoided, bent, damage, defect, during.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-i",
        "label": "11(a)(i)",
        "promptSummary": "Use the matching question paper and answer 11(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "second",
          "class",
          "lever",
          "order"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: second, class, lever, order.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-iii",
        "label": "11(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "motion",
          "converted",
          "oscillating",
          "reciprocating"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: motion, converted, oscillating, reciprocating.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-ii",
        "label": "11(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "friction",
          "quality",
          "bearing",
          "due",
          "loss",
          "pulley",
          "efficiency",
          "energy",
          "generated",
          "heat",
          "increased",
          "number"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: friction, quality, bearing, due, loss, pulley.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-iii",
        "label": "11(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bearing",
          "pulley",
          "ball",
          "diameter",
          "efficiency",
          "increase",
          "increased",
          "lubricating",
          "needle"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bearing, pulley, ball, diameter, efficiency, increase.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-ii",
        "label": "11(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bearing",
          "likely",
          "plain"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bearing, likely, plain.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iii",
        "label": "11(c)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "bearing",
          "will",
          "ball",
          "exterior",
          "getting",
          "lubrication",
          "machine",
          "need",
          "needle",
          "prevent",
          "remove"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, bearing, will, ball, exterior, getting.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iv",
        "label": "11(c)(iv)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "belt",
          "easily",
          "will",
          "chain",
          "come",
          "drawback",
          "drive",
          "generally",
          "include",
          "narrower",
          "noisier",
          "off"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: belt, easily, will, chain, come, drawback.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-v",
        "label": "11(c)(v)",
        "promptSummary": "Use the matching question paper and answer 11(c)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "mounted",
          "pulley",
          "against",
          "being",
          "belt",
          "down",
          "method",
          "movable",
          "pressing",
          "provide",
          "quadrant",
          "roller"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: mounted, pulley, against, being, belt, down.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-i",
        "label": "12(a)(i)",
        "promptSummary": "Use the matching question paper and answer 12(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "diode",
          "test",
          "body",
          "cathode",
          "circuit",
          "identified",
          "facility",
          "flat",
          "led",
          "leg",
          "multimeter",
          "shorter"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: diode, test, body, cathode, circuit, identified.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-iii",
        "label": "12(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 12(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "amplifier",
          "current",
          "function",
          "switch",
          "transistor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: amplifier, current, function, switch, transistor.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-i",
        "label": "12(b)(i)",
        "promptSummary": "Use the matching question paper and answer 12(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "formula",
          "out",
          "substitution",
          "vout"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: formula, out, substitution, vout.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-ii",
        "label": "12(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 12(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "inverting",
          "noninverting",
          "output",
          "then",
          "compared",
          "high",
          "input",
          "low",
          "non",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: inverting, noninverting, output, then, compared, high.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-iv",
        "label": "12(b)(iv)",
        "promptSummary": "Use the matching question paper and answer 12(b)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "notch",
          "aligned",
          "and/or",
          "dot",
          "end",
          "holder",
          "next",
          "pin",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: notch, aligned, and/or, dot, end, holder.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-c-i",
        "label": "12(c)(i)",
        "promptSummary": "Use the matching question paper and answer 12(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "voltage",
          "casing",
          "coil",
          "configuration",
          "contact",
          "current",
          "include",
          "size",
          "spdt",
          "switch",
          "technical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: voltage, casing, coil, configuration, contact, current.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "50",
        "label": "50",
        "promptSummary": "Use the matching question paper and answer 50. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "between",
          "check",
          "other",
          "pin",
          "pins",
          "resistance",
          "carried",
          "continue",
          "first",
          "identified",
          "low"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, between, check, other, pin, pins.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-42",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "42",
    "paperName": "Paper 4 Systems and Control",
    "questionPaperFile": "0445_s25_qp_42.pdf",
    "markSchemeFile": "0445_s25_ms_42.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "crank",
          "point",
          "astable",
          "bell",
          "circuit",
          "clock",
          "explained",
          "explanation",
          "fully",
          "output",
          "pendulum",
          "regular"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: crank, point, astable, bell, circuit, clock.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "point",
          "parallel",
          "fully",
          "oil",
          "single",
          "steel",
          "connected",
          "explained",
          "explanation",
          "propertie",
          "reference",
          "resistant"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: point, parallel, fully, oil, single, steel.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "point",
          "all",
          "direction",
          "explained",
          "explanation",
          "flagpole",
          "fully",
          "given",
          "method",
          "single",
          "supported",
          "working"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: point, all, direction, explained, explanation, flagpole.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "friction",
          "aerodynamic",
          "streamlined",
          "method",
          "reduced",
          "surface",
          "accuracy",
          "bearing",
          "between",
          "bird",
          "clock",
          "coefficient"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: friction, aerodynamic, streamlined, method, reduced, surface.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "efficiency",
          "grease",
          "increased",
          "lubrication",
          "reference"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, efficiency, grease, increased, lubrication, reference.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-a",
        "label": "6(a)",
        "promptSummary": "Use the matching question paper and answer 6(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "motion",
          "circular",
          "linear",
          "oscillating",
          "reciprocating",
          "rotary"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: motion, circular, linear, oscillating, reciprocating, rotary.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7-a",
        "label": "7(a)",
        "promptSummary": "Use the matching question paper and answer 7(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "circuit",
          "connect",
          "disconnect",
          "electrically",
          "parts",
          "switch",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: circuit, connect, disconnect, electrically, parts, switch.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7-c",
        "label": "7(c)",
        "promptSummary": "Use the matching question paper and answer 7(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "close",
          "contact",
          "magnet",
          "open",
          "switch",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: close, contact, magnet, open, switch, will.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "8",
        "label": "8",
        "promptSummary": "Use the matching question paper and answer 8. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "converted",
          "value",
          "volts"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: converted, value, volts.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-a-i",
        "label": "9(a)(i)",
        "promptSummary": "Use the matching question paper and answer 9(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "force",
          "defined",
          "distance",
          "effect",
          "magnitude",
          "moment",
          "turning"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: force, defined, distance, effect, magnitude, moment.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-a-iii",
        "label": "9(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 9(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cause",
          "door",
          "force",
          "greater",
          "open",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cause, door, force, greater, open, will.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-b",
        "label": "9(b)",
        "promptSummary": "Use the matching question paper and answer 9(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "width",
          "benefit",
          "drawback",
          "joint",
          "bolts",
          "corrode",
          "increased",
          "loose",
          "movement",
          "taken",
          "tension"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, width, benefit, drawback, joint, bolts.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-c-i",
        "label": "9(c)(i)",
        "promptSummary": "Use the matching question paper and answer 9(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "adhesive",
          "different",
          "either",
          "fixed",
          "increase",
          "increased",
          "insulation",
          "laminating",
          "layer",
          "materials",
          "multiple",
          "normally"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: adhesive, different, either, fixed, increase, increased.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-c-ii",
        "label": "9(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 9(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "timber",
          "carbon",
          "card",
          "fibre",
          "grp",
          "laminate",
          "layer",
          "metal",
          "paper",
          "plastic",
          "sheeting"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: timber, carbon, card, fibre, grp, laminate.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-d-i",
        "label": "9(d)(i)",
        "promptSummary": "Use the matching question paper and answer 9(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "been",
          "join",
          "riveting",
          "roof",
          "support"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: been, join, riveting, roof, support.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-d-ii",
        "label": "9(d)(ii)",
        "promptSummary": "Use the matching question paper and answer 9(d)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cost",
          "fabrication",
          "faster",
          "joining",
          "lower",
          "method",
          "pre",
          "precise",
          "welding"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cost, fabrication, faster, joining, lower, method.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-e-i",
        "label": "9(e)(i)",
        "promptSummary": "Use the matching question paper and answer 9(e)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "balanced",
          "equal",
          "equilibrium",
          "force",
          "moment",
          "state"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, balanced, equal, equilibrium, force, moment.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-e-ii",
        "label": "9(e)(ii)",
        "promptSummary": "Use the matching question paper and answer 9(e)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "fixing",
          "around",
          "cable",
          "flagpole",
          "functional",
          "ground",
          "method",
          "spaced"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: fixing, around, cable, flagpole, functional, ground.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "9-f",
        "label": "9(f)",
        "promptSummary": "Use the matching question paper and answer 9(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "length",
          "change",
          "original",
          "strain",
          "substitution"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: length, change, original, strain, substitution.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-i",
        "label": "10(a)(i)",
        "promptSummary": "Use the matching question paper and answer 10(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "first",
          "class",
          "lever",
          "order"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: first, class, lever, order.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-iii",
        "label": "10(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "blade",
          "adjustment",
          "centre",
          "cleaning",
          "include",
          "lubrication",
          "maintenance",
          "nut",
          "sharpening",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: blade, adjustment, centre, cleaning, include, lubrication.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-i",
        "label": "10(b)(i)",
        "promptSummary": "Use the matching question paper and answer 10(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "crank",
          "direction",
          "drill",
          "handle",
          "move",
          "movement",
          "rotation",
          "table",
          "turns",
          "upward",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: crank, direction, drill, handle, move, movement.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-ii",
        "label": "10(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "control",
          "gear",
          "height",
          "rack",
          "table",
          "advantage",
          "cannot",
          "choice",
          "fall",
          "heavy",
          "high",
          "include"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: control, gear, height, rack, table, advantage.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iii",
        "label": "10(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bearing",
          "component",
          "include",
          "materials",
          "moving",
          "only",
          "parts",
          "plain",
          "prevent",
          "range",
          "rotation",
          "shaft"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bearing, component, include, materials, moving, only.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iv",
        "label": "10(b)(iv)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "low",
          "cost",
          "generally",
          "maintenance",
          "replaceable",
          "worn"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: low, cost, generally, maintenance, replaceable, worn.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-v",
        "label": "10(b)(v)",
        "promptSummary": "Use the matching question paper and answer 10(b)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "clean",
          "free",
          "grease",
          "kept",
          "lubrication",
          "rack",
          "rather",
          "swarf"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, clean, free, grease, kept, lubrication.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-i",
        "label": "10(c)(i)",
        "promptSummary": "Use the matching question paper and answer 10(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "shaft",
          "between",
          "placed",
          "will",
          "input",
          "output",
          "after",
          "alter",
          "another",
          "being",
          "cause"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, shaft, between, placed, will, input.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-ii",
        "label": "10(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "driven",
          "driver",
          "rpm",
          "speed",
          "anticlockwise",
          "ratio",
          "rotate",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, driven, driver, rpm, speed, anticlockwise.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-i",
        "label": "11(a)(i)",
        "promptSummary": "Use the matching question paper and answer 11(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ammeter",
          "circuit",
          "polarity"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ammeter, circuit, polarity.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-ii",
        "label": "11(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "parallel",
          "voltmeter",
          "connected",
          "polarity"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: parallel, voltmeter, connected, polarity.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-i",
        "label": "11(b)(i)",
        "promptSummary": "Use the matching question paper and answer 11(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "tool",
          "component",
          "cutter",
          "wire",
          "wires",
          "bending",
          "circuit",
          "cutting",
          "diagonal",
          "insulation",
          "legs",
          "length"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: tool, component, cutter, wire, wires, bending.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-ii",
        "label": "11(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "joint",
          "clean",
          "solder",
          "active",
          "allowing",
          "flow",
          "flux",
          "fluxe",
          "keep",
          "oxidation",
          "prevent",
          "purpose"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: joint, clean, solder, active, allowing, flow.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-iii",
        "label": "11(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "connection",
          "board",
          "clips",
          "connector",
          "crocodile",
          "method",
          "plug",
          "prototype",
          "recognised",
          "screw",
          "socket"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, connection, board, clips, connector, crocodile.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-i",
        "label": "11(c)(i)",
        "promptSummary": "Use the matching question paper and answer 11(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "around",
          "capacitor",
          "circuit",
          "connect",
          "incorrectly",
          "inserting",
          "need",
          "polarised",
          "them",
          "unsafe",
          "way",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: around, capacitor, circuit, connect, incorrectly, inserting.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-d-ii",
        "label": "11(d)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(d)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "formula",
          "resistor",
          "substitution",
          "value"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: formula, resistor, substitution, value.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-d-iii",
        "label": "11(d)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(d)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "both",
          "collector",
          "connection",
          "diode",
          "base",
          "coil",
          "emitter",
          "lamp",
          "negative",
          "relay",
          "signal",
          "transistor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: both, collector, connection, diode, base, coil.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-43",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "43",
    "paperName": "Paper 4 Systems and Control",
    "questionPaperFile": "0445_s25_qp_43.pdf",
    "markSchemeFile": "0445_s25_ms_43.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "point",
          "described",
          "fully",
          "single",
          "anything",
          "bearing",
          "checking",
          "ecf",
          "effort",
          "explained",
          "explanation",
          "greater"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: point, described, fully, single, anything, bearing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "fossil fuels",
          "natural gas",
          "oil",
          "coal",
          "fossil",
          "natural",
          "derived",
          "fuels",
          "gas",
          "product"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: fossil fuels, natural gas, oil, coal, fossil, natural.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "solar",
          "electricity",
          "charging",
          "daytime",
          "discharge",
          "during",
          "generated",
          "night",
          "releasing",
          "stored",
          "then"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, solar, electricity, charging, daytime, discharge.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "battery",
          "solar",
          "tolerance",
          "will",
          "point",
          "benefit",
          "check",
          "drawback",
          "low",
          "resistance",
          "value"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, battery, solar, tolerance, will, point.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "triangulation",
          "point",
          "fully",
          "position",
          "single",
          "understanding",
          "working",
          "described",
          "different",
          "distributing",
          "explained",
          "frame"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: triangulation, point, fully, position, single, understanding.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "example",
          "force",
          "load",
          "torsion",
          "applied",
          "bridge",
          "cable",
          "car",
          "change",
          "move",
          "pulling",
          "spring"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: example, force, load, torsion, applied, bridge.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "change",
          "changing",
          "direction",
          "explanation",
          "gears",
          "include",
          "multiply",
          "parts",
          "position",
          "precisely",
          "ratio"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, change, changing, direction, explanation, gears.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6",
        "label": "6",
        "promptSummary": "Use the matching question paper and answer 6. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "gear",
          "direction",
          "achieved",
          "benefit",
          "change",
          "drawback",
          "element",
          "gears",
          "idler",
          "number",
          "odd",
          "rotate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: gear, direction, achieved, benefit, change, drawback.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "7",
        "label": "7",
        "promptSummary": "Use the matching question paper and answer 7. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "either",
          "fixed",
          "linkage",
          "marked",
          "moving",
          "pivot",
          "position",
          "shape"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: either, fixed, linkage, marked, moving, pivot.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-i",
        "label": "10(a)(i)",
        "promptSummary": "Use the matching question paper and answer 10(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "rods",
          "tension"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, rods, tension.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-ii",
        "label": "10(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "rods",
          "sleeve",
          "thread",
          "act",
          "both",
          "effective",
          "increase",
          "left-hand",
          "length",
          "reduce",
          "right-hand",
          "same"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: rods, sleeve, thread, act, both, effective.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-iii",
        "label": "10(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "plate",
          "distort",
          "gusset",
          "movement",
          "poles",
          "prevent",
          "reduce"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: plate, distort, gusset, movement, poles, prevent.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-iv",
        "label": "10(a)(iv)",
        "promptSummary": "Use the matching question paper and answer 10(a)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "links",
          "movement",
          "rods",
          "some",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: links, movement, rods, some, will.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-a-v",
        "label": "10(a)(v)",
        "promptSummary": "Use the matching question paper and answer 10(a)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "concrete",
          "frost",
          "will",
          "being",
          "below",
          "chance",
          "compression",
          "damage",
          "damaged",
          "durable",
          "foundation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, concrete, frost, will, being, below.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-i",
        "label": "10(b)(i)",
        "promptSummary": "Use the matching question paper and answer 10(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "class",
          "lever",
          "order",
          "second",
          "wheelbarrow"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: class, lever, order, second, wheelbarrow.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-ii",
        "label": "10(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "brace",
          "member",
          "structural",
          "strut"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: brace, member, structural, strut.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iii",
        "label": "10(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "wheelbarrow",
          "will",
          "advantage",
          "closer",
          "efficiency",
          "efficient",
          "explanation",
          "fulcrum",
          "give",
          "include",
          "increase",
          "increased"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: wheelbarrow, will, advantage, closer, efficiency, efficient.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-b-iv",
        "label": "10(b)(iv)",
        "promptSummary": "Use the matching question paper and answer 10(b)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "wheelbarrow",
          "equilibrium",
          "handle",
          "will",
          "device",
          "effectively",
          "either",
          "ground",
          "hands",
          "lifted",
          "maintain",
          "moving"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: wheelbarrow, equilibrium, handle, will, device, effectively.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-i",
        "label": "10(c)(i)",
        "promptSummary": "Use the matching question paper and answer 10(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "advantage",
          "allow",
          "applied",
          "construction",
          "cost",
          "include",
          "increased",
          "low",
          "method",
          "nail",
          "offsite",
          "plate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: advantage, allow, applied, construction, cost, include.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "10-c-ii",
        "label": "10(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 10(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "signs",
          "avoided",
          "bent",
          "damage",
          "defect",
          "during",
          "include",
          "insect",
          "knots",
          "large",
          "piece",
          "rot"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: signs, avoided, bent, damage, defect, during.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-i",
        "label": "11(a)(i)",
        "promptSummary": "Use the matching question paper and answer 11(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "second",
          "class",
          "lever",
          "order"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: second, class, lever, order.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-a-iii",
        "label": "11(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "motion",
          "converted",
          "oscillating",
          "reciprocating"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: motion, converted, oscillating, reciprocating.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-ii",
        "label": "11(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "friction",
          "quality",
          "bearing",
          "due",
          "loss",
          "pulley",
          "efficiency",
          "energy",
          "generated",
          "heat",
          "increased",
          "number"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: friction, quality, bearing, due, loss, pulley.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-b-iii",
        "label": "11(b)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bearing",
          "pulley",
          "ball",
          "diameter",
          "efficiency",
          "increase",
          "increased",
          "lubricating",
          "needle"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bearing, pulley, ball, diameter, efficiency, increase.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-ii",
        "label": "11(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "bearing",
          "likely",
          "plain"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: bearing, likely, plain.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iii",
        "label": "11(c)(iii)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "oil",
          "bearing",
          "will",
          "ball",
          "exterior",
          "getting",
          "lubrication",
          "machine",
          "need",
          "needle",
          "prevent",
          "remove"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: oil, bearing, will, ball, exterior, getting.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-iv",
        "label": "11(c)(iv)",
        "promptSummary": "Use the matching question paper and answer 11(c)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "belt",
          "easily",
          "will",
          "chain",
          "come",
          "drawback",
          "drive",
          "generally",
          "include",
          "narrower",
          "noisier",
          "off"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: belt, easily, will, chain, come, drawback.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "11-c-v",
        "label": "11(c)(v)",
        "promptSummary": "Use the matching question paper and answer 11(c)(v). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "mounted",
          "pulley",
          "against",
          "being",
          "belt",
          "down",
          "method",
          "movable",
          "pressing",
          "provide",
          "quadrant",
          "roller"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: mounted, pulley, against, being, belt, down.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-i",
        "label": "12(a)(i)",
        "promptSummary": "Use the matching question paper and answer 12(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "diode",
          "test",
          "body",
          "cathode",
          "circuit",
          "identified",
          "facility",
          "flat",
          "led",
          "leg",
          "multimeter",
          "shorter"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: diode, test, body, cathode, circuit, identified.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-a-iii",
        "label": "12(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 12(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "amplifier",
          "current",
          "function",
          "switch",
          "transistor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: amplifier, current, function, switch, transistor.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-i",
        "label": "12(b)(i)",
        "promptSummary": "Use the matching question paper and answer 12(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "formula",
          "out",
          "substitution",
          "vout"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: formula, out, substitution, vout.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-ii",
        "label": "12(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 12(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "inverting",
          "noninverting",
          "output",
          "then",
          "compared",
          "high",
          "input",
          "low",
          "non",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: inverting, noninverting, output, then, compared, high.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-b-iv",
        "label": "12(b)(iv)",
        "promptSummary": "Use the matching question paper and answer 12(b)(iv). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "notch",
          "aligned",
          "and/or",
          "dot",
          "end",
          "holder",
          "next",
          "pin",
          "will"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: notch, aligned, and/or, dot, end, holder.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "12-c-i",
        "label": "12(c)(i)",
        "promptSummary": "Use the matching question paper and answer 12(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "voltage",
          "casing",
          "coil",
          "configuration",
          "contact",
          "current",
          "include",
          "size",
          "spdt",
          "switch",
          "technical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: voltage, casing, coil, configuration, contact, current.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "50",
        "label": "50",
        "promptSummary": "Use the matching question paper and answer 50. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "between",
          "check",
          "other",
          "pin",
          "pins",
          "resistance",
          "carried",
          "continue",
          "first",
          "identified",
          "low"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, between, check, other, pin, pins.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "0445-s25-51",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "51",
    "paperName": "Paper 5 Graphic Products",
    "questionPaperFile": "0445_s25_qp_51.pdf",
    "markSchemeFile": "0445_s25_ms_51.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "a1-a",
        "label": "A1(a)",
        "promptSummary": "Use the matching question paper and answer A1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pentagon",
          "overlay",
          "shape",
          "sided",
          "regular",
          "symmetrical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pentagon, overlay, shape, sided, regular, symmetrical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a2-a",
        "label": "A2(a)",
        "promptSummary": "Use the matching question paper and answer A2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "printing",
          "digital",
          "eco-solvent",
          "flexography",
          "laser",
          "latex",
          "lithography",
          "offset"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: printing, digital, eco-solvent, flexography, laser, latex.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a2-b",
        "label": "A2(b)",
        "promptSummary": "Use the matching question paper and answer A2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "layout",
          "some",
          "tessellation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, layout, some, tessellation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a3-b",
        "label": "A3(b)",
        "promptSummary": "Use the matching question paper and answer A3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dowel",
          "quality",
          "method",
          "flag",
          "allow",
          "communication",
          "high",
          "locks",
          "loosely",
          "spin"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dowel, quality, method, flag, allow, communication.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-a",
        "label": "B4(a)",
        "promptSummary": "Use the matching question paper and answer B4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "front view",
          "side view",
          "overlay",
          "view",
          "front",
          "solution",
          "rectangle",
          "angle",
          "hole",
          "section",
          "side",
          "correctly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: front view, side view, overlay, view, front, solution.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-c",
        "label": "B4(c)",
        "promptSummary": "Use the matching question paper and answer B4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "bolt",
          "washer",
          "added",
          "anchor",
          "dia",
          "ground",
          "hatching",
          "head",
          "internal",
          "long",
          "outer"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, bolt, washer, added, anchor, dia.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-a",
        "label": "B5(a)",
        "promptSummary": "Use the matching question paper and answer B5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "side",
          "front",
          "solution",
          "cabin",
          "back",
          "depth",
          "top",
          "bridge",
          "chimney",
          "deck",
          "edge"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, side, front, solution, cabin, back.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-d",
        "label": "B5(d)",
        "promptSummary": "Use the matching question paper and answer B5(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "side",
          "front",
          "solution",
          "tall",
          "back",
          "glue",
          "size",
          "tabs",
          "added",
          "base",
          "end"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, side, front, solution, tall, back.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_51.pdf"
  },
  {
    "id": "0445-s25-52",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "52",
    "paperName": "Paper 5 Graphic Products",
    "questionPaperFile": "0445_s25_qp_52.pdf",
    "markSchemeFile": "0445_s25_ms_52.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "a1-b",
        "label": "A1(b)",
        "promptSummary": "Use the matching question paper and answer A1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "rectangle",
          "height",
          "overlay",
          "width",
          "drawn"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: rectangle, height, overlay, width, drawn.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a2",
        "label": "A2",
        "promptSummary": "Use the matching question paper and answer A2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "label",
          "letter",
          "added",
          "consistent",
          "existing",
          "projected"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, label, letter, added, consistent, existing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a3-a",
        "label": "A3(a)",
        "promptSummary": "Use the matching question paper and answer A3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "colour",
          "cut",
          "different",
          "change",
          "depth",
          "engrave",
          "kiss",
          "lines",
          "set",
          "then"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: colour, cut, different, change, depth, engrave.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a3-b",
        "label": "A3(b)",
        "promptSummary": "Use the matching question paper and answer A3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "side",
          "overlay",
          "face",
          "added",
          "thicknes",
          "top"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: side, overlay, face, added, thicknes, top.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-a",
        "label": "B4(a)",
        "promptSummary": "Use the matching question paper and answer B4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "front view",
          "side view",
          "overlay",
          "line",
          "side",
          "rectangle",
          "view",
          "angle",
          "curve",
          "front",
          "hole",
          "solution"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: front view, side view, overlay, line, side, rectangle.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-b-ii",
        "label": "B4(b)(ii)",
        "promptSummary": "Use the matching question paper and answer B4(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pva",
          "water",
          "apart",
          "based",
          "come",
          "float",
          "resistant",
          "waterproof"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pva, water, apart, based, come, float.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-c",
        "label": "B4(c)",
        "promptSummary": "Use the matching question paper and answer B4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "side",
          "overlay",
          "divider",
          "face",
          "solution",
          "added",
          "base",
          "drawn",
          "left",
          "position",
          "thicknes",
          "top"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: side, overlay, divider, face, solution, added.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-a",
        "label": "B5(a)",
        "promptSummary": "Use the matching question paper and answer B5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "edge",
          "parallel",
          "back",
          "sloping",
          "solution",
          "top",
          "baseline",
          "face",
          "lines",
          "vertical",
          "above"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, edge, parallel, back, sloping, solution.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-b-iii",
        "label": "B5(b)(iii)",
        "promptSummary": "Use the matching question paper and answer B5(b)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "cement",
          "superglue",
          "tensol"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: cement, superglue, tensol.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-c",
        "label": "B5(c)",
        "promptSummary": "Use the matching question paper and answer B5(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "side",
          "line",
          "added",
          "back",
          "base",
          "complete",
          "convention",
          "face",
          "flap",
          "fold",
          "glue"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, side, line, added, back, base.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_52.pdf"
  },
  {
    "id": "0445-s25-53",
    "syllabus": "0445",
    "qualification": "Cambridge IGCSE Design & Technology 0445",
    "series": "May/June 2025",
    "component": "53",
    "paperName": "Paper 5 Graphic Products",
    "questionPaperFile": "0445_s25_qp_53.pdf",
    "markSchemeFile": "0445_s25_ms_53.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "a1-a",
        "label": "A1(a)",
        "promptSummary": "Use the matching question paper and answer A1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pentagon",
          "overlay",
          "shape",
          "sided",
          "regular",
          "symmetrical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pentagon, overlay, shape, sided, regular, symmetrical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a2-a",
        "label": "A2(a)",
        "promptSummary": "Use the matching question paper and answer A2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "printing",
          "digital",
          "eco-solvent",
          "flexography",
          "laser",
          "latex",
          "lithography",
          "offset"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: printing, digital, eco-solvent, flexography, laser, latex.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a2-b",
        "label": "A2(b)",
        "promptSummary": "Use the matching question paper and answer A2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "layout",
          "some",
          "tessellation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, layout, some, tessellation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "a3-b",
        "label": "A3(b)",
        "promptSummary": "Use the matching question paper and answer A3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dowel",
          "quality",
          "method",
          "flag",
          "allow",
          "communication",
          "high",
          "locks",
          "loosely",
          "spin"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dowel, quality, method, flag, allow, communication.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-a",
        "label": "B4(a)",
        "promptSummary": "Use the matching question paper and answer B4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "front view",
          "side view",
          "overlay",
          "view",
          "front",
          "solution",
          "rectangle",
          "angle",
          "hole",
          "section",
          "side",
          "correctly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: front view, side view, overlay, view, front, solution.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b4-c",
        "label": "B4(c)",
        "promptSummary": "Use the matching question paper and answer B4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "bolt",
          "washer",
          "added",
          "anchor",
          "dia",
          "ground",
          "hatching",
          "head",
          "internal",
          "long",
          "outer"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, bolt, washer, added, anchor, dia.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-a",
        "label": "B5(a)",
        "promptSummary": "Use the matching question paper and answer B5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "side",
          "front",
          "solution",
          "cabin",
          "back",
          "depth",
          "top",
          "bridge",
          "chimney",
          "deck",
          "edge"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, side, front, solution, cabin, back.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "b5-d",
        "label": "B5(d)",
        "promptSummary": "Use the matching question paper and answer B5(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "overlay",
          "side",
          "front",
          "solution",
          "tall",
          "back",
          "glue",
          "size",
          "tabs",
          "added",
          "base",
          "end"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: overlay, side, front, solution, tall, back.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ],
    "insertFile": "0445_s25_in_53.pdf"
  },
  {
    "id": "9705-s25-11",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "11",
    "paperName": "Paper 1 AS Level Written Paper",
    "questionPaperFile": "9705_s25_qp_11.pdf",
    "markSchemeFile": "9705_s25_ms_11.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a-i",
        "label": "1(a)(i)",
        "promptSummary": "Use the matching question paper and answer 1(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "non-ferrous",
          "aluminium",
          "brass",
          "copper",
          "duralumin",
          "metal",
          "gold",
          "including",
          "nonferrou",
          "preciou",
          "silver",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: non-ferrous, aluminium, brass, copper, duralumin, metal.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-ii",
        "label": "1(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "polystyrene",
          "abs",
          "hips",
          "pla",
          "pmma",
          "pvc",
          "acronym",
          "chloride",
          "high",
          "impact",
          "just",
          "polyvinyl"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: polystyrene, abs, hips, pla, pmma, pvc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-iii",
        "label": "1(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pine",
          "base",
          "easy",
          "aesthetically",
          "antibacterial",
          "coat",
          "colour",
          "cost",
          "cut/shape",
          "damaged",
          "different",
          "drink"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pine, base, easy, aesthetically, antibacterial, coat.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-i",
        "label": "1(b)(i)",
        "promptSummary": "Use the matching question paper and answer 1(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "switch",
          "component",
          "led",
          "acceptable",
          "activation",
          "automatically",
          "even",
          "include",
          "input",
          "ldr",
          "light"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, switch, component, led, acceptable, activation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-ii",
        "label": "1(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "light",
          "convert",
          "current",
          "diode",
          "electric",
          "electrical",
          "emits",
          "energy",
          "led",
          "passe",
          "through"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: light, convert, current, diode, electric, electrical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "people",
          "remotely",
          "travel",
          "allow",
          "document",
          "need",
          "recorded",
          "saves",
          "specific",
          "accommodation",
          "aspect",
          "attend"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: people, remotely, travel, allow, document, need.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pvc",
          "easy",
          "refer",
          "stand",
          "apply",
          "around",
          "available",
          "base",
          "colour",
          "consuming",
          "enough",
          "expensive"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pvc, easy, refer, stand, apply, around.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-i",
        "label": "3(b)(i)",
        "promptSummary": "Use the matching question paper and answer 3(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "cut",
          "glued",
          "joining",
          "method",
          "nails",
          "permanent",
          "plastic",
          "sketche",
          "welding"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, cut, glued, joining, method, nails.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-ii",
        "label": "3(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 3(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "clips",
          "fastening",
          "joining",
          "method",
          "screw",
          "sketche",
          "slots",
          "temporary"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, clips, fastening, joining, method, screw.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "being",
          "clamped",
          "cutting",
          "drilled",
          "face",
          "mask",
          "power",
          "saw",
          "securely",
          "sure",
          "wear",
          "work"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: being, clamped, cutting, drilled, face, mask.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "applied",
          "available",
          "brush",
          "colour",
          "easily",
          "just",
          "laminate",
          "paint",
          "range",
          "roller",
          "veneer",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: applied, available, brush, colour, easily, just.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "back",
          "will",
          "bookcase",
          "books",
          "wall",
          "weight",
          "back/falling",
          "break",
          "collapse",
          "damaged/lost",
          "easily",
          "fitted"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: back, will, bookcase, books, wall, weight.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "energy",
          "costs",
          "machine",
          "workshop/factory",
          "better",
          "efficient",
          "environment/reduce",
          "factory",
          "hand",
          "heat",
          "insulated",
          "lighting"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: energy, costs, machine, workshop/factory, better, efficient.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Use the matching question paper and answer 4(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "below",
          "process",
          "asks",
          "corner",
          "follow",
          "grids",
          "hands",
          "instruction",
          "joint",
          "making",
          "mdf",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: below, process, asks, corner, follow, grids.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-ii",
        "label": "4(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 4(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "below",
          "process",
          "adjustable",
          "asks",
          "bookcase",
          "follow",
          "grids",
          "hands",
          "instruction",
          "making",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, below, process, adjustable, asks, bookcase.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-i",
        "label": "5(a)(i)",
        "promptSummary": "Use the matching question paper and answer 5(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drink",
          "knows",
          "user",
          "adapted",
          "being",
          "condition",
          "countrie",
          "dark",
          "different",
          "digital",
          "dimly",
          "display"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drink, knows, user, adapted, being, condition.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-ii",
        "label": "5(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "customer",
          "drink",
          "size",
          "they",
          "coffee",
          "cup",
          "dispenser",
          "get",
          "having",
          "image",
          "know",
          "language"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: customer, drink, size, they, coffee, cup.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-iii",
        "label": "5(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "place",
          "prevent",
          "spillage",
          "tray",
          "being",
          "cleaned/empty",
          "coffee",
          "collect",
          "cup",
          "cups",
          "designed",
          "dispensed"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: place, prevent, spillage, tray, being, cleaned/empty.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "coffee",
          "easily",
          "machine",
          "parts",
          "broken",
          "cleaned",
          "materials",
          "removed",
          "replacement",
          "stainles",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, coffee, easily, machine, parts, broken.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-i",
        "label": "5(c)(i)",
        "promptSummary": "Use the matching question paper and answer 5(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "coffee",
          "machine",
          "refer",
          "arrive",
          "customer",
          "example",
          "hands",
          "hygienic",
          "low",
          "ordering",
          "owner",
          "paying"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: coffee, machine, refer, arrive, customer, example.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-ii",
        "label": "5(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "control",
          "activated",
          "device",
          "door",
          "garage",
          "music",
          "playing",
          "remote",
          "voice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: control, activated, device, door, garage, music.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-i",
        "label": "5(d)(i)",
        "promptSummary": "Use the matching question paper and answer 5(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "grip",
          "coffee",
          "hot",
          "refer",
          "based",
          "card",
          "corrugated",
          "cup",
          "diameter",
          "hand",
          "lid",
          "opening"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: grip, coffee, hot, refer, based, card.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-ii",
        "label": "5(d)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(d)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "sketche",
          "recycling",
          "card",
          "corrugated",
          "cup",
          "identifie",
          "lid",
          "moulded",
          "parts",
          "plastic",
          "polymer",
          "recycled"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: sketche, recycling, card, corrugated, cup, identifie.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "9705-s25-12",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "12",
    "paperName": "Paper 1 AS Level Written Paper",
    "questionPaperFile": "9705_s25_qp_12.pdf",
    "markSchemeFile": "9705_s25_ms_12.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a-i",
        "label": "1(a)(i)",
        "promptSummary": "Use the matching question paper and answer 1(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "non-ferrous",
          "aluminium",
          "brass",
          "copper",
          "duralumin",
          "metal",
          "gold",
          "including",
          "nonferrou",
          "preciou",
          "silver",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: non-ferrous, aluminium, brass, copper, duralumin, metal.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-ii",
        "label": "1(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "polystyrene",
          "abs",
          "hips",
          "pla",
          "pmma",
          "pvc",
          "acronym",
          "chloride",
          "high",
          "impact",
          "just",
          "polyvinyl"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: polystyrene, abs, hips, pla, pmma, pvc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-iii",
        "label": "1(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pine",
          "base",
          "easy",
          "aesthetically",
          "antibacterial",
          "coat",
          "colour",
          "cost",
          "cut/shape",
          "damaged",
          "different",
          "drink"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pine, base, easy, aesthetically, antibacterial, coat.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-i",
        "label": "1(b)(i)",
        "promptSummary": "Use the matching question paper and answer 1(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "switch",
          "component",
          "led",
          "acceptable",
          "activation",
          "automatically",
          "even",
          "include",
          "input",
          "ldr",
          "light"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, switch, component, led, acceptable, activation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-ii",
        "label": "1(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "light",
          "convert",
          "current",
          "diode",
          "electric",
          "electrical",
          "emits",
          "energy",
          "led",
          "passe",
          "through"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: light, convert, current, diode, electric, electrical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "people",
          "remotely",
          "travel",
          "allow",
          "document",
          "need",
          "recorded",
          "saves",
          "specific",
          "accommodation",
          "aspect",
          "attend"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: people, remotely, travel, allow, document, need.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pvc",
          "easy",
          "refer",
          "stand",
          "apply",
          "around",
          "available",
          "base",
          "colour",
          "consuming",
          "enough",
          "expensive"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pvc, easy, refer, stand, apply, around.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-i",
        "label": "3(b)(i)",
        "promptSummary": "Use the matching question paper and answer 3(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "cut",
          "glued",
          "joining",
          "method",
          "nails",
          "permanent",
          "plastic",
          "sketche",
          "welding"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, cut, glued, joining, method, nails.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-ii",
        "label": "3(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 3(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "clips",
          "fastening",
          "joining",
          "method",
          "screw",
          "sketche",
          "slots",
          "temporary"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, clips, fastening, joining, method, screw.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "being",
          "clamped",
          "cutting",
          "drilled",
          "face",
          "mask",
          "power",
          "saw",
          "securely",
          "sure",
          "wear",
          "work"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: being, clamped, cutting, drilled, face, mask.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "applied",
          "available",
          "brush",
          "colour",
          "easily",
          "just",
          "laminate",
          "paint",
          "range",
          "roller",
          "veneer",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: applied, available, brush, colour, easily, just.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "back",
          "will",
          "bookcase",
          "books",
          "wall",
          "weight",
          "back/falling",
          "break",
          "collapse",
          "damaged/lost",
          "easily",
          "fitted"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: back, will, bookcase, books, wall, weight.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "energy",
          "costs",
          "machine",
          "workshop/factory",
          "better",
          "efficient",
          "environment/reduce",
          "factory",
          "hand",
          "heat",
          "insulated",
          "lighting"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: energy, costs, machine, workshop/factory, better, efficient.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Use the matching question paper and answer 4(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "below",
          "process",
          "asks",
          "corner",
          "follow",
          "grids",
          "hands",
          "instruction",
          "joint",
          "making",
          "mdf",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: below, process, asks, corner, follow, grids.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-ii",
        "label": "4(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 4(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "below",
          "process",
          "adjustable",
          "asks",
          "bookcase",
          "follow",
          "grids",
          "hands",
          "instruction",
          "making",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, below, process, adjustable, asks, bookcase.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-i",
        "label": "5(a)(i)",
        "promptSummary": "Use the matching question paper and answer 5(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drink",
          "knows",
          "user",
          "adapted",
          "being",
          "condition",
          "countrie",
          "dark",
          "different",
          "digital",
          "dimly",
          "display"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drink, knows, user, adapted, being, condition.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-ii",
        "label": "5(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "customer",
          "drink",
          "size",
          "they",
          "coffee",
          "cup",
          "dispenser",
          "get",
          "having",
          "image",
          "know",
          "language"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: customer, drink, size, they, coffee, cup.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-iii",
        "label": "5(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "place",
          "prevent",
          "spillage",
          "tray",
          "being",
          "cleaned/empty",
          "coffee",
          "collect",
          "cup",
          "cups",
          "designed",
          "dispensed"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: place, prevent, spillage, tray, being, cleaned/empty.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "coffee",
          "easily",
          "machine",
          "parts",
          "broken",
          "cleaned",
          "materials",
          "removed",
          "replacement",
          "stainles",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, coffee, easily, machine, parts, broken.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-i",
        "label": "5(c)(i)",
        "promptSummary": "Use the matching question paper and answer 5(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "coffee",
          "machine",
          "refer",
          "arrive",
          "customer",
          "example",
          "hands",
          "hygienic",
          "low",
          "ordering",
          "owner",
          "paying"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: coffee, machine, refer, arrive, customer, example.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-ii",
        "label": "5(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "control",
          "activated",
          "device",
          "door",
          "garage",
          "music",
          "playing",
          "remote",
          "voice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: control, activated, device, door, garage, music.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-i",
        "label": "5(d)(i)",
        "promptSummary": "Use the matching question paper and answer 5(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "grip",
          "coffee",
          "hot",
          "refer",
          "based",
          "card",
          "corrugated",
          "cup",
          "diameter",
          "hand",
          "lid",
          "opening"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: grip, coffee, hot, refer, based, card.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-ii",
        "label": "5(d)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(d)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "sketche",
          "recycling",
          "card",
          "corrugated",
          "cup",
          "identifie",
          "lid",
          "moulded",
          "parts",
          "plastic",
          "polymer",
          "recycled"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: sketche, recycling, card, corrugated, cup, identifie.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "9705-s25-13",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "13",
    "paperName": "Paper 1 AS Level Written Paper",
    "questionPaperFile": "9705_s25_qp_13.pdf",
    "markSchemeFile": "9705_s25_ms_13.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1-a-i",
        "label": "1(a)(i)",
        "promptSummary": "Use the matching question paper and answer 1(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "non-ferrous",
          "aluminium",
          "brass",
          "copper",
          "duralumin",
          "metal",
          "gold",
          "including",
          "nonferrou",
          "preciou",
          "silver",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: non-ferrous, aluminium, brass, copper, duralumin, metal.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-ii",
        "label": "1(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "polystyrene",
          "abs",
          "hips",
          "pla",
          "pmma",
          "pvc",
          "acronym",
          "chloride",
          "high",
          "impact",
          "just",
          "polyvinyl"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: polystyrene, abs, hips, pla, pmma, pvc.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a-iii",
        "label": "1(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 1(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pine",
          "base",
          "easy",
          "aesthetically",
          "antibacterial",
          "coat",
          "colour",
          "cost",
          "cut/shape",
          "damaged",
          "different",
          "drink"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pine, base, easy, aesthetically, antibacterial, coat.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-i",
        "label": "1(b)(i)",
        "promptSummary": "Use the matching question paper and answer 1(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "battery",
          "switch",
          "component",
          "led",
          "acceptable",
          "activation",
          "automatically",
          "even",
          "include",
          "input",
          "ldr",
          "light"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: battery, switch, component, led, acceptable, activation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b-ii",
        "label": "1(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 1(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "light",
          "convert",
          "current",
          "diode",
          "electric",
          "electrical",
          "emits",
          "energy",
          "led",
          "passe",
          "through"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: light, convert, current, diode, electric, electrical.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "people",
          "remotely",
          "travel",
          "allow",
          "document",
          "need",
          "recorded",
          "saves",
          "specific",
          "accommodation",
          "aspect",
          "attend"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: people, remotely, travel, allow, document, need.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "pvc",
          "easy",
          "refer",
          "stand",
          "apply",
          "around",
          "available",
          "base",
          "colour",
          "consuming",
          "enough",
          "expensive"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: pvc, easy, refer, stand, apply, around.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-i",
        "label": "3(b)(i)",
        "promptSummary": "Use the matching question paper and answer 3(b)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "cut",
          "glued",
          "joining",
          "method",
          "nails",
          "permanent",
          "plastic",
          "sketche",
          "welding"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, cut, glued, joining, method, nails.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b-ii",
        "label": "3(b)(ii)",
        "promptSummary": "Use the matching question paper and answer 3(b)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "clips",
          "fastening",
          "joining",
          "method",
          "screw",
          "sketche",
          "slots",
          "temporary"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, clips, fastening, joining, method, screw.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "being",
          "clamped",
          "cutting",
          "drilled",
          "face",
          "mask",
          "power",
          "saw",
          "securely",
          "sure",
          "wear",
          "work"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: being, clamped, cutting, drilled, face, mask.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-d",
        "label": "3(d)",
        "promptSummary": "Use the matching question paper and answer 3(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "applied",
          "available",
          "brush",
          "colour",
          "easily",
          "just",
          "laminate",
          "paint",
          "range",
          "roller",
          "veneer",
          "wide"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: applied, available, brush, colour, easily, just.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "back",
          "will",
          "bookcase",
          "books",
          "wall",
          "weight",
          "back/falling",
          "break",
          "collapse",
          "damaged/lost",
          "easily",
          "fitted"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: back, will, bookcase, books, wall, weight.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "energy",
          "costs",
          "machine",
          "workshop/factory",
          "better",
          "efficient",
          "environment/reduce",
          "factory",
          "hand",
          "heat",
          "insulated",
          "lighting"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: energy, costs, machine, workshop/factory, better, efficient.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-i",
        "label": "4(c)(i)",
        "promptSummary": "Use the matching question paper and answer 4(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "below",
          "process",
          "asks",
          "corner",
          "follow",
          "grids",
          "hands",
          "instruction",
          "joint",
          "making",
          "mdf",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: below, process, asks, corner, follow, grids.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c-ii",
        "label": "4(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 4(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "height",
          "below",
          "process",
          "adjustable",
          "asks",
          "bookcase",
          "follow",
          "grids",
          "hands",
          "instruction",
          "making",
          "method"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: height, below, process, adjustable, asks, bookcase.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-i",
        "label": "5(a)(i)",
        "promptSummary": "Use the matching question paper and answer 5(a)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "drink",
          "knows",
          "user",
          "adapted",
          "being",
          "condition",
          "countrie",
          "dark",
          "different",
          "digital",
          "dimly",
          "display"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: drink, knows, user, adapted, being, condition.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-ii",
        "label": "5(a)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "customer",
          "drink",
          "size",
          "they",
          "coffee",
          "cup",
          "dispenser",
          "get",
          "having",
          "image",
          "know",
          "language"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: customer, drink, size, they, coffee, cup.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a-iii",
        "label": "5(a)(iii)",
        "promptSummary": "Use the matching question paper and answer 5(a)(iii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "place",
          "prevent",
          "spillage",
          "tray",
          "being",
          "cleaned/empty",
          "coffee",
          "collect",
          "cup",
          "cups",
          "designed",
          "dispensed"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: place, prevent, spillage, tray, being, cleaned/empty.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "steel",
          "coffee",
          "easily",
          "machine",
          "parts",
          "broken",
          "cleaned",
          "materials",
          "removed",
          "replacement",
          "stainles",
          "such"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: steel, coffee, easily, machine, parts, broken.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-i",
        "label": "5(c)(i)",
        "promptSummary": "Use the matching question paper and answer 5(c)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "coffee",
          "machine",
          "refer",
          "arrive",
          "customer",
          "example",
          "hands",
          "hygienic",
          "low",
          "ordering",
          "owner",
          "paying"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: coffee, machine, refer, arrive, customer, example.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c-ii",
        "label": "5(c)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(c)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "control",
          "activated",
          "device",
          "door",
          "garage",
          "music",
          "playing",
          "remote",
          "voice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: control, activated, device, door, garage, music.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-i",
        "label": "5(d)(i)",
        "promptSummary": "Use the matching question paper and answer 5(d)(i). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "grip",
          "coffee",
          "hot",
          "refer",
          "based",
          "card",
          "corrugated",
          "cup",
          "diameter",
          "hand",
          "lid",
          "opening"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: grip, coffee, hot, refer, based, card.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-d-ii",
        "label": "5(d)(ii)",
        "promptSummary": "Use the matching question paper and answer 5(d)(ii). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "sketche",
          "recycling",
          "card",
          "corrugated",
          "cup",
          "identifie",
          "lid",
          "moulded",
          "parts",
          "plastic",
          "polymer",
          "recycled"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: sketche, recycling, card, corrugated, cup, identifie.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "9705-s25-31",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "31",
    "paperName": "Paper 3 A Level Written Paper",
    "questionPaperFile": "9705_s25_qp_31.pdf",
    "markSchemeFile": "9705_s25_ms_31.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "but",
          "credited",
          "following",
          "include",
          "manufacturing",
          "material",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, but, credited, following, include, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "material",
          "reason",
          "abs",
          "aluminium",
          "beech",
          "bend",
          "easy",
          "shape",
          "available",
          "break",
          "choice",
          "chosen"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: material, reason, abs, aluminium, beech, bend.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "abs",
          "aluminium",
          "angle",
          "ao2b",
          "cad",
          "former",
          "lamination",
          "line",
          "strip",
          "bend",
          "communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, abs, aluminium, angle, ao2b, cad.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "injection moulding",
          "sketche",
          "ao2b",
          "abs",
          "extrusion",
          "injection",
          "moulding",
          "change",
          "communication",
          "manufacturing",
          "method",
          "convention"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: injection moulding, sketche, ao2b, abs, extrusion, injection.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao2b",
          "but",
          "clearly",
          "covered",
          "described",
          "included",
          "point",
          "simple",
          "sketche",
          "some"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao2b, but, clearly, covered, described, included.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "view",
          "printing",
          "benefit",
          "model",
          "produce",
          "very",
          "accurate",
          "complex",
          "confine",
          "creating",
          "explanation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, view, printing, benefit, model, produce.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "tolerance",
          "check",
          "product",
          "component",
          "dimensional",
          "laser",
          "measurement",
          "tools",
          "way",
          "ways",
          "additional"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, tolerance, check, product, component, dimensional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "forming",
          "quality",
          "communication",
          "force",
          "former",
          "process",
          "shape",
          "sketche",
          "tool",
          "ao2b",
          "applie",
          "applied"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: forming, quality, communication, force, former, process.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demographic",
          "age",
          "busines",
          "commercial",
          "identify",
          "information",
          "practice",
          "product",
          "reference",
          "socio-economic",
          "additional",
          "advertising"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demographic, age, busines, commercial, identify, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "strategy",
          "company",
          "customer",
          "disadvantage",
          "discount",
          "further",
          "product",
          "additional",
          "become",
          "before",
          "competitor",
          "create"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: strategy, company, customer, disadvantage, discount, further.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demand",
          "advertising",
          "market",
          "media",
          "product",
          "target",
          "way",
          "ways",
          "add",
          "additional",
          "apply",
          "celebritie"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demand, advertising, market, media, product, target.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao3c",
          "conceptual",
          "idea",
          "clearly",
          "complete",
          "covered",
          "described",
          "design",
          "generate",
          "information",
          "limited",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao3c, conceptual, idea, clearly, complete, covered.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "jit",
          "manufacturing",
          "reduce",
          "time",
          "efficiency",
          "just",
          "needed",
          "receiving",
          "supplie",
          "system",
          "they"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, jit, manufacturing, reduce, time, efficiency.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality control",
          "issue",
          "ao4d",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "control",
          "quality",
          "automated"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality control, issue, ao4d, wider, analysi, design.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c",
        "label": "4(c)",
        "promptSummary": "Use the matching question paper and answer 4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "manufacturing",
          "strategy",
          "system",
          "effectivenes",
          "give",
          "indication",
          "accurate",
          "basic",
          "bought-in",
          "comparison",
          "competitor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, manufacturing, strategy, system, effectivenes, give.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point",
          "detailed",
          "manufacturing",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point, detailed, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a",
        "label": "5(a)",
        "promptSummary": "Use the matching question paper and answer 5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "metal",
          "aluminium",
          "forming",
          "oil",
          "steel",
          "hardening",
          "alloy",
          "coating",
          "heating",
          "involve",
          "physical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, metal, aluminium, forming, oil, steel.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "disadvantage",
          "finish",
          "time",
          "appearance",
          "applying",
          "care",
          "customer",
          "dull",
          "effort",
          "explanation",
          "fade",
          "finishe"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: disadvantage, finish, time, appearance, applying, care.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c",
        "label": "5(c)",
        "promptSummary": "Use the matching question paper and answer 5(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao4d",
          "issue",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "quality",
          "component",
          "least",
          "standard"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao4d, issue, wider, analysi, design, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-a",
        "label": "6(a)",
        "promptSummary": "Use the matching question paper and answer 6(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "idea",
          "innovative",
          "total",
          "communication",
          "different",
          "equipment",
          "gaming",
          "generate",
          "grid",
          "include",
          "marking"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, idea, innovative, total, communication, different.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-b",
        "label": "6(b)",
        "promptSummary": "Use the matching question paper and answer 6(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "comparison",
          "ideas",
          "justification",
          "sketche",
          "annotation",
          "choice",
          "consider",
          "decision",
          "design",
          "development",
          "evaluate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, comparison, ideas, justification, sketche, annotation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-c",
        "label": "6(c)",
        "promptSummary": "Use the matching question paper and answer 6(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "function",
          "sketche",
          "ao2b",
          "communication",
          "construction",
          "described",
          "detail",
          "finishe",
          "materials",
          "construction/assembly",
          "grid",
          "key"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: function, sketche, ao2b, communication, construction, described.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-d",
        "label": "6(d)",
        "promptSummary": "Use the matching question paper and answer 6(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dimension",
          "communication",
          "detail",
          "drawing",
          "include",
          "key",
          "sketche",
          "all",
          "annotation",
          "ao2b",
          "assembled",
          "choice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dimension, communication, detail, drawing, include, key.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-e",
        "label": "6(e)",
        "promptSummary": "Use the matching question paper and answer 6(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "storage",
          "tolerance",
          "unit",
          "manufacturing",
          "specification",
          "allowable",
          "applied",
          "based",
          "bought",
          "chosen",
          "components/part",
          "construction/assembly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: storage, tolerance, unit, manufacturing, specification, allowable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-f",
        "label": "6(f)",
        "promptSummary": "Use the matching question paper and answer 6(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "reduce",
          "storage",
          "assembled",
          "assembling/finishing",
          "assembly",
          "consumer",
          "cost",
          "customer",
          "designing",
          "ease",
          "easier"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, reduce, storage, assembled, assembling/finishing, assembly.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "9705-s25-32",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "32",
    "paperName": "Paper 3 A Level Written Paper",
    "questionPaperFile": "9705_s25_qp_32.pdf",
    "markSchemeFile": "9705_s25_ms_32.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "but",
          "credited",
          "following",
          "include",
          "manufacturing",
          "material",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, but, credited, following, include, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "material",
          "reason",
          "abs",
          "aluminium",
          "beech",
          "bend",
          "easy",
          "shape",
          "available",
          "break",
          "choice",
          "chosen"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: material, reason, abs, aluminium, beech, bend.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "abs",
          "aluminium",
          "angle",
          "ao2b",
          "cad",
          "former",
          "lamination",
          "line",
          "strip",
          "bend",
          "communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, abs, aluminium, angle, ao2b, cad.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "injection moulding",
          "sketche",
          "ao2b",
          "abs",
          "extrusion",
          "injection",
          "moulding",
          "change",
          "communication",
          "manufacturing",
          "method",
          "convention"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: injection moulding, sketche, ao2b, abs, extrusion, injection.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao2b",
          "but",
          "clearly",
          "covered",
          "described",
          "included",
          "point",
          "simple",
          "sketche",
          "some"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao2b, but, clearly, covered, described, included.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "view",
          "printing",
          "benefit",
          "model",
          "produce",
          "very",
          "accurate",
          "complex",
          "confine",
          "creating",
          "explanation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, view, printing, benefit, model, produce.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "tolerance",
          "check",
          "product",
          "component",
          "dimensional",
          "laser",
          "measurement",
          "tools",
          "way",
          "ways",
          "additional"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, tolerance, check, product, component, dimensional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "forming",
          "quality",
          "communication",
          "force",
          "former",
          "process",
          "shape",
          "sketche",
          "tool",
          "ao2b",
          "applie",
          "applied"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: forming, quality, communication, force, former, process.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demographic",
          "age",
          "busines",
          "commercial",
          "identify",
          "information",
          "practice",
          "product",
          "reference",
          "socio-economic",
          "additional",
          "advertising"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demographic, age, busines, commercial, identify, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "strategy",
          "company",
          "customer",
          "disadvantage",
          "discount",
          "further",
          "product",
          "additional",
          "become",
          "before",
          "competitor",
          "create"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: strategy, company, customer, disadvantage, discount, further.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demand",
          "advertising",
          "market",
          "media",
          "product",
          "target",
          "way",
          "ways",
          "add",
          "additional",
          "apply",
          "celebritie"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demand, advertising, market, media, product, target.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao3c",
          "conceptual",
          "idea",
          "clearly",
          "complete",
          "covered",
          "described",
          "design",
          "generate",
          "information",
          "limited",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao3c, conceptual, idea, clearly, complete, covered.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "jit",
          "manufacturing",
          "reduce",
          "time",
          "efficiency",
          "just",
          "needed",
          "receiving",
          "supplie",
          "system",
          "they"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, jit, manufacturing, reduce, time, efficiency.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality control",
          "issue",
          "ao4d",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "control",
          "quality",
          "automated"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality control, issue, ao4d, wider, analysi, design.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c",
        "label": "4(c)",
        "promptSummary": "Use the matching question paper and answer 4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "manufacturing",
          "strategy",
          "system",
          "effectivenes",
          "give",
          "indication",
          "accurate",
          "basic",
          "bought-in",
          "comparison",
          "competitor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, manufacturing, strategy, system, effectivenes, give.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point",
          "detailed",
          "manufacturing",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point, detailed, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a",
        "label": "5(a)",
        "promptSummary": "Use the matching question paper and answer 5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "metal",
          "aluminium",
          "forming",
          "oil",
          "steel",
          "hardening",
          "alloy",
          "coating",
          "heating",
          "involve",
          "physical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, metal, aluminium, forming, oil, steel.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "disadvantage",
          "finish",
          "time",
          "appearance",
          "applying",
          "care",
          "customer",
          "dull",
          "effort",
          "explanation",
          "fade",
          "finishe"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: disadvantage, finish, time, appearance, applying, care.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c",
        "label": "5(c)",
        "promptSummary": "Use the matching question paper and answer 5(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao4d",
          "issue",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "quality",
          "component",
          "least",
          "standard"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao4d, issue, wider, analysi, design, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-a",
        "label": "6(a)",
        "promptSummary": "Use the matching question paper and answer 6(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "idea",
          "innovative",
          "total",
          "communication",
          "different",
          "equipment",
          "gaming",
          "generate",
          "grid",
          "include",
          "marking"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, idea, innovative, total, communication, different.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-b",
        "label": "6(b)",
        "promptSummary": "Use the matching question paper and answer 6(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "comparison",
          "ideas",
          "justification",
          "sketche",
          "annotation",
          "choice",
          "consider",
          "decision",
          "design",
          "development",
          "evaluate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, comparison, ideas, justification, sketche, annotation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-c",
        "label": "6(c)",
        "promptSummary": "Use the matching question paper and answer 6(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "function",
          "sketche",
          "ao2b",
          "communication",
          "construction",
          "described",
          "detail",
          "finishe",
          "materials",
          "construction/assembly",
          "grid",
          "key"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: function, sketche, ao2b, communication, construction, described.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-d",
        "label": "6(d)",
        "promptSummary": "Use the matching question paper and answer 6(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dimension",
          "communication",
          "detail",
          "drawing",
          "include",
          "key",
          "sketche",
          "all",
          "annotation",
          "ao2b",
          "assembled",
          "choice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dimension, communication, detail, drawing, include, key.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-e",
        "label": "6(e)",
        "promptSummary": "Use the matching question paper and answer 6(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "storage",
          "tolerance",
          "unit",
          "manufacturing",
          "specification",
          "allowable",
          "applied",
          "based",
          "bought",
          "chosen",
          "components/part",
          "construction/assembly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: storage, tolerance, unit, manufacturing, specification, allowable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-f",
        "label": "6(f)",
        "promptSummary": "Use the matching question paper and answer 6(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "reduce",
          "storage",
          "assembled",
          "assembling/finishing",
          "assembly",
          "consumer",
          "cost",
          "customer",
          "designing",
          "ease",
          "easier"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, reduce, storage, assembled, assembling/finishing, assembly.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  },
  {
    "id": "9705-s25-33",
    "syllabus": "9705",
    "qualification": "Cambridge International AS & A Level Design & Technology 9705",
    "series": "May/June 2025",
    "component": "33",
    "paperName": "Paper 3 A Level Written Paper",
    "questionPaperFile": "9705_s25_qp_33.pdf",
    "markSchemeFile": "9705_s25_ms_33.pdf",
    "instructions": [
      "Open the question paper PDF and answer the referenced part in your own words.",
      "Use Check answer for a keyword-based self-check, then compare with the official mark scheme.",
      "For drawing and design-development questions, the checker supports terminology only; accuracy and drawing quality still need teacher or self review."
    ],
    "questions": [
      {
        "id": "1",
        "label": "1",
        "promptSummary": "Use the matching question paper and answer 1. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "all",
          "but",
          "credited",
          "following",
          "include",
          "manufacturing",
          "material",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: all, but, credited, following, include, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-a",
        "label": "1(a)",
        "promptSummary": "Use the matching question paper and answer 1(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "material",
          "reason",
          "abs",
          "aluminium",
          "beech",
          "bend",
          "easy",
          "shape",
          "available",
          "break",
          "choice",
          "chosen"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: material, reason, abs, aluminium, beech, bend.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-b",
        "label": "1(b)",
        "promptSummary": "Use the matching question paper and answer 1(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "abs",
          "aluminium",
          "angle",
          "ao2b",
          "cad",
          "former",
          "lamination",
          "line",
          "strip",
          "bend",
          "communication"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, abs, aluminium, angle, ao2b, cad.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "1-c",
        "label": "1(c)",
        "promptSummary": "Use the matching question paper and answer 1(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "injection moulding",
          "sketche",
          "ao2b",
          "abs",
          "extrusion",
          "injection",
          "moulding",
          "change",
          "communication",
          "manufacturing",
          "method",
          "convention"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: injection moulding, sketche, ao2b, abs, extrusion, injection.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2",
        "label": "2",
        "promptSummary": "Use the matching question paper and answer 2. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao2b",
          "but",
          "clearly",
          "covered",
          "described",
          "included",
          "point",
          "simple",
          "sketche",
          "some"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao2b, but, clearly, covered, described, included.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-a",
        "label": "2(a)",
        "promptSummary": "Use the matching question paper and answer 2(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "3d printing",
          "view",
          "printing",
          "benefit",
          "model",
          "produce",
          "very",
          "accurate",
          "complex",
          "confine",
          "creating",
          "explanation"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: 3d printing, view, printing, benefit, model, produce.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-b",
        "label": "2(b)",
        "promptSummary": "Use the matching question paper and answer 2(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "line",
          "tolerance",
          "check",
          "product",
          "component",
          "dimensional",
          "laser",
          "measurement",
          "tools",
          "way",
          "ways",
          "additional"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: line, tolerance, check, product, component, dimensional.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "2-c",
        "label": "2(c)",
        "promptSummary": "Use the matching question paper and answer 2(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "forming",
          "quality",
          "communication",
          "force",
          "former",
          "process",
          "shape",
          "sketche",
          "tool",
          "ao2b",
          "applie",
          "applied"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: forming, quality, communication, force, former, process.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3",
        "label": "3",
        "promptSummary": "Use the matching question paper and answer 3. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-a",
        "label": "3(a)",
        "promptSummary": "Use the matching question paper and answer 3(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demographic",
          "age",
          "busines",
          "commercial",
          "identify",
          "information",
          "practice",
          "product",
          "reference",
          "socio-economic",
          "additional",
          "advertising"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demographic, age, busines, commercial, identify, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-b",
        "label": "3(b)",
        "promptSummary": "Use the matching question paper and answer 3(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "strategy",
          "company",
          "customer",
          "disadvantage",
          "discount",
          "further",
          "product",
          "additional",
          "become",
          "before",
          "competitor",
          "create"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: strategy, company, customer, disadvantage, discount, further.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "3-c",
        "label": "3(c)",
        "promptSummary": "Use the matching question paper and answer 3(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "demand",
          "advertising",
          "market",
          "media",
          "product",
          "target",
          "way",
          "ways",
          "add",
          "additional",
          "apply",
          "celebritie"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: demand, advertising, market, media, product, target.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4",
        "label": "4",
        "promptSummary": "Use the matching question paper and answer 4. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao3c",
          "conceptual",
          "idea",
          "clearly",
          "complete",
          "covered",
          "described",
          "design",
          "generate",
          "information",
          "limited",
          "point"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao3c, conceptual, idea, clearly, complete, covered.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-a",
        "label": "4(a)",
        "promptSummary": "Use the matching question paper and answer 4(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "jit",
          "manufacturing",
          "reduce",
          "time",
          "efficiency",
          "just",
          "needed",
          "receiving",
          "supplie",
          "system",
          "they"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, jit, manufacturing, reduce, time, efficiency.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-b",
        "label": "4(b)",
        "promptSummary": "Use the matching question paper and answer 4(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality control",
          "issue",
          "ao4d",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "control",
          "quality",
          "automated"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality control, issue, ao4d, wider, analysi, design.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "4-c",
        "label": "4(c)",
        "promptSummary": "Use the matching question paper and answer 4(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "quality",
          "manufacturing",
          "strategy",
          "system",
          "effectivenes",
          "give",
          "indication",
          "accurate",
          "basic",
          "bought-in",
          "comparison",
          "competitor"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: quality, manufacturing, strategy, system, effectivenes, give.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5",
        "label": "5",
        "promptSummary": "Use the matching question paper and answer 5. This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "clearly",
          "covered",
          "described",
          "point",
          "detailed",
          "manufacturing",
          "specification"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: clearly, covered, described, point, detailed, manufacturing.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-a",
        "label": "5(a)",
        "promptSummary": "Use the matching question paper and answer 5(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "process",
          "metal",
          "aluminium",
          "forming",
          "oil",
          "steel",
          "hardening",
          "alloy",
          "coating",
          "heating",
          "involve",
          "physical"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: process, metal, aluminium, forming, oil, steel.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-b",
        "label": "5(b)",
        "promptSummary": "Use the matching question paper and answer 5(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "disadvantage",
          "finish",
          "time",
          "appearance",
          "applying",
          "care",
          "customer",
          "dull",
          "effort",
          "explanation",
          "fade",
          "finishe"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: disadvantage, finish, time, appearance, applying, care.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "5-c",
        "label": "5(c)",
        "promptSummary": "Use the matching question paper and answer 5(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ao4d",
          "issue",
          "wider",
          "analysi",
          "design",
          "information",
          "relevant",
          "technology",
          "quality",
          "component",
          "least",
          "standard"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ao4d, issue, wider, analysi, design, information.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-a",
        "label": "6(a)",
        "promptSummary": "Use the matching question paper and answer 6(a). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "ideas",
          "idea",
          "innovative",
          "total",
          "communication",
          "different",
          "equipment",
          "gaming",
          "generate",
          "grid",
          "include",
          "marking"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: ideas, idea, innovative, total, communication, different.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-b",
        "label": "6(b)",
        "promptSummary": "Use the matching question paper and answer 6(b). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "evaluation",
          "comparison",
          "ideas",
          "justification",
          "sketche",
          "annotation",
          "choice",
          "consider",
          "decision",
          "design",
          "development",
          "evaluate"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: evaluation, comparison, ideas, justification, sketche, annotation.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-c",
        "label": "6(c)",
        "promptSummary": "Use the matching question paper and answer 6(c). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "function",
          "sketche",
          "ao2b",
          "communication",
          "construction",
          "described",
          "detail",
          "finishe",
          "materials",
          "construction/assembly",
          "grid",
          "key"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: function, sketche, ao2b, communication, construction, described.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-d",
        "label": "6(d)",
        "promptSummary": "Use the matching question paper and answer 6(d). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "dimension",
          "communication",
          "detail",
          "drawing",
          "include",
          "key",
          "sketche",
          "all",
          "annotation",
          "ao2b",
          "assembled",
          "choice"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: dimension, communication, detail, drawing, include, key.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-e",
        "label": "6(e)",
        "promptSummary": "Use the matching question paper and answer 6(e). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "storage",
          "tolerance",
          "unit",
          "manufacturing",
          "specification",
          "allowable",
          "applied",
          "based",
          "bought",
          "chosen",
          "components/part",
          "construction/assembly"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: storage, tolerance, unit, manufacturing, specification, allowable.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      },
      {
        "id": "6-f",
        "label": "6(f)",
        "promptSummary": "Use the matching question paper and answer 6(f). This checker uses the linked mark-scheme ideas for this part.",
        "acceptedKeywords": [
          "benefit",
          "reduce",
          "storage",
          "assembled",
          "assembling/finishing",
          "assembly",
          "consumer",
          "cost",
          "customer",
          "designing",
          "ease",
          "easier"
        ],
        "sampleAnswer": "A strong answer should include relevant points such as: benefit, reduce, storage, assembled, assembling/finishing, assembly.",
        "guidance": "Compare your response with the official mark scheme after using this keyword checker. For drawing questions, check geometry, dimensions, projection and line quality manually."
      }
    ]
  }
];

export const getPastPaperExercises = (syllabus?: PastPaperSyllabus) =>
  syllabus ? pastPaperExercises.filter((paper) => paper.syllabus === syllabus) : pastPaperExercises;

export const getPastPaperExercise = (id: string) => pastPaperExercises.find((paper) => paper.id === id);

export const normalisePastPaperAnswer = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+\-/\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const keywordMatches = (normalisedAnswer: string, keyword: string) => {
  const normalisedKeyword = normalisePastPaperAnswer(keyword);
  if (!normalisedKeyword) return false;
  if (/[\u3400-\u9fff]/.test(normalisedKeyword)) return normalisedAnswer.includes(normalisedKeyword);
  if (normalisedKeyword.includes(' ')) return normalisedAnswer.includes(normalisedKeyword);
  return new RegExp(`\\b${normalisedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(normalisedAnswer);
};

export const checkPastPaperAnswer = (question: PastPaperQuestion, response: string): PastPaperCheckResult => {
  const normalisedAnswer = normalisePastPaperAnswer(response);
  const matchedKeywords = question.acceptedKeywords.filter((keyword) => keywordMatches(normalisedAnswer, keyword));
  const missingKeywords = question.acceptedKeywords.filter((keyword) => !matchedKeywords.includes(keyword));
  const scoreRatio = question.acceptedKeywords.length ? matchedKeywords.length / question.acceptedKeywords.length : 0;
  const requiredMatches = question.acceptedKeywords.length <= 3 ? 1 : 2;
  const likelyCorrect = scoreRatio >= 0.35 && matchedKeywords.length >= requiredMatches;

  let feedback = 'Add more specific Design & Technology vocabulary from the marking-reference focus.';
  if (likelyCorrect) {
    feedback = 'Good match with the marking-reference focus. Check the full marking reference for marks, drawing accuracy and any alternative accepted answers.';
  } else if (scoreRatio >= 0.25) {
    feedback = 'Partly matched. Add clearer technical points, examples, reasons or process details.';
  }

  return { scoreRatio, likelyCorrect, matchedKeywords, missingKeywords, feedback };
};
