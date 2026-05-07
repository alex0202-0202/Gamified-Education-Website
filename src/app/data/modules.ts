import { Shield, Beaker, PenTool, Settings, Cpu, BookOpen } from 'lucide-react';

export const moduleData = {
  // K5: Workshop Safety
  'safety': {
    code: 'K5',
    title: '工具及儀器安全 (Safety)',
    icon: Shield,
    color: 'orange',
    sections: [
      {
        title: '一般安全守則 (General Rules)',
        content: '在設計與科技室內，安全是最重要的。學生必須時刻保持警覺，並遵守以下守則：\n\n1. 進入工場前必須穿著整齊的保護衣物 (PPE)。\n2. 嚴禁在工場內奔跑或嬉戲。\n3. 使用任何機器前，必須得到老師的批准。\n4. 保持通道暢通，不要將書包放在通道上。',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070'
      },
      {
        title: '個人防護裝備 (PPE)',
        content: '正確使用 PPE 能有效減低受傷風險：\n\n• 護目鏡 (Safety Goggles)：保護眼睛免受碎片或化學品傷害。\n• 圍裙 (Apron)：保護身體及衣服。\n• 安全鞋 (Safety Shoes)：防止重物砸傷腳部。\n• 耳罩 (Ear Muffs)：在高噪音環境下保護聽覺。',
        image: 'https://images.unsplash.com/photo-1628002580365-f3c0a322d577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRvb2xzJTIwc2F3JTIwaGFtbWVyJTIwZHJpbGx8ZW58MXx8fHwxNzY5NDk1MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    review: [
      { question: '進入工場時，以下哪項不是必須的？', options: ['穿著圍裙', '戴上護目鏡', '攜帶手提電話', '束起長髮'], answer: 2 },
      { question: '如遇上緊急情況，你應首先做什麼？', options: ['大聲尖叫', '立即通知老師', '自行處理', '逃離現場'], answer: 1 }
    ]
  },

  // K3: Materials
  'materials': {
    code: 'K3',
    title: '物料及資源 (Materials)',
    icon: Beaker,
    color: 'emerald',
    sections: [
      {
        title: '物料分類 (Classification)',
        content: '我們常用的物料主要分為三大類：\n\n1. 木材 (Wood)：分為硬木 (Hardwood) 和軟木 (Softwood)。\n2. 金屬 (Metals)：分為黑色金屬 (Ferrous) 和有色金屬 (Non-ferrous)。\n3. 塑膠 (Plastics)：分為熱塑性 (Thermoplastics) 和熱固性 (Thermosetting)。',
        image: 'https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?w=400'
      },
      {
        title: '物料特性 (Properties)',
        content: '選擇物料時，我們需考慮其物理特性：\n\n• 硬度 (Hardness)：抵抗刮損或壓痕的能力。\n• 韌性 (Toughness)：抵抗衝擊及斷裂的能力。\n• 延展性 (Ductility)：拉伸成線的能力。\n• 導電性 (Conductivity)：傳導電流的能力。',
        image: 'https://images.unsplash.com/photo-1673083424160-4bf59a6145c3?w=400'
      }
    ],
    review: [
      { question: '亞加力 (Acrylic) 屬於哪一類塑膠？', options: ['熱塑性塑膠', '熱固性塑膠', '彈性體', '複合材料'], answer: 0 },
      { question: '哪種特性形容物料抵抗衝擊的能力？', options: ['硬度', '剛性', '韌性', '彈性'], answer: 2 }
    ]
  },

  // K6: Design
  'design': {
    code: 'K6',
    title: '製造過程與設計 (Design)',
    icon: PenTool,
    color: 'blue',
    sections: [
      {
        title: '設計溝通 (Communication)',
        content: '設計師使用不同的圖表來表達意念：\n\n• 草圖 (Freehand Sketching)：快速記錄設計意念。\n• 等角圖 (Isometric)：以30度角顯示物體的立體感。\n• 正投影圖 (Orthographic)：準確顯示物體的真實尺寸 (三視圖)。',
        image: 'https://images.unsplash.com/photo-1764737740462-2a310c7b2c39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljYWwlMjBkcmF3aW5nJTIwYmx1ZXByaW50JTIwc2tldGNofGVufDF8fHx8MTc2OTQ5NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: '人體尺寸學 (Anthropometrics)',
        content: '設計產品時，必須考慮使用者的身體尺寸。\n例如：椅有的高度應配合人的小腿長度；門把的高度應配合人的手肘高度。\n\n百分位 (Percentile)：通常設計會遷就 5% 至 95% 的使用者。',
        image: 'https://images.unsplash.com/photo-1743385779347-1549dabf1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGdhbnR0JTIwY2hhcnQlMjBwbGFufGVufDF8fHx8MTc2OTQ5NTE1MHww&ixlib=rb-4.1.0&q=80&w=1080' // Using generic plan image
      }
    ],
    review: [
      { question: '正投影圖通常包括哪三個視圖？', options: ['前、後、左', '正、俯、側', '上、下、中', '東、南、西'], answer: 1 },
      { question: '設計椅子時，應主要參考哪個人體數據？', options: ['身高', '體重', '小腿長度', '手臂長度'], answer: 2 }
    ]
  },

  // K4: Mechanisms
  'mechanisms': {
    code: 'K4',
    title: '結構和機械 (Mechanisms)',
    icon: Settings,
    color: 'amber',
    sections: [
      {
        title: '運動種類 (Types of Motion)',
        content: '機械運動主要分為四類：\n\n1. 線性運動 (Linear)：直線移動。\n2. 旋轉運動 (Rotary)：繞軸轉動。\n3. 往復運動 (Reciprocating)：來回直線運動。\n4. 擺動 (Oscillating)：來回弧形運動 (如鐘擺)。',
        image: 'https://images.unsplash.com/photo-1768796371809-95b49943a48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHByb2Nlc3MlMjBmYWN0b3J5fGVufDF8fHx8MTc2OTQ5NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: '槓桿原理 (Levers)',
        content: '槓桿由支點 (Fulcrum)、施力點 (Effort) 和抗力點 (Load) 組成。\n\n• 第一類槓桿：支點在中間 (如剪刀)。\n• 第二類槓桿：抗力點在中間 (如獨輪車)。\n• 第三類槓桿：施力點在中間 (如鑷子)。',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070' // Workshop context
      }
    ],
    review: [
      { question: '鐘擺屬於哪種運動？', options: ['線性運動', '旋轉運動', '擺動', '往復運動'], answer: 2 },
      { question: '剪刀屬於哪一類槓桿？', options: ['第一類', '第二類', '第三類', '都不是'], answer: 0 }
    ]
  },

  // K8/K9: Systems
  'systems': {
    code: 'K8/K9',
    title: '系統與控制 (Systems)',
    icon: Cpu,
    color: 'purple',
    sections: [
      {
        title: '系統概念 (Systems Concept)',
        content: '所有系統都由三個基本部分組成：\n\n[輸入 Input] → [處理 Process] → [輸出 Output]\n\n例如：電飯煲\n輸入：生米、水、電\n處理：加熱、保溫\n輸出：熟飯',
        image: 'https://images.unsplash.com/photo-1769149068959-b11392164add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwY2lyY3VpdCUyMGJvYXJkJTIwc2NoZW1hdGljJTIwc3lzdGVtfGVufDF8fHx8MTc2OTQ5NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      {
        title: '控制系統 (Control)',
        content: '• 開環控制 (Open-loop)：沒有回饋，系統不會自動修正 (如多士爐)。\n• 閉環控制 (Closed-loop)：有回饋 (Feedback)，系統會根據輸出自動調整 (如冷氣機)。',
        image: 'https://images.unsplash.com/photo-1769149068959-b11392164add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwc2tldGNofGVufDF8fHx8MTc2OTQ5NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    review: [
      { question: '冷氣機屬於哪種控制系統？', options: ['開環控制', '閉環控制', '手動控制', '定時控制'], answer: 1 },
      { question: '系統的中間部分稱為什麼？', options: ['輸入', '回饋', '處理', '輸出'], answer: 2 }
    ]
  },
  
  // Extension: Project Management
  'project': {
    code: 'E3',
    title: '項目管理 (Project Management)',
    icon: BookOpen,
    color: 'blue',
    sections: [
      {
        title: '項目規劃 (Planning)',
        content: '良好的項目管理包括：\n\n1. 確立目標 (Goal Setting)\n2. 時間管理 (Time Management)\n3. 資源分配 (Resource Allocation)\n\n甘特圖 (Gantt Chart) 是常用的工具，用來顯示各項工作的進度和時間表。',
        image: 'https://images.unsplash.com/photo-1743385779347-1549dabf1320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGdhbnR0JTIwY2hhcnQlMjBwbGFufGVufDF8fHx8MTc2OTQ5NTE1MHww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    ],
    review: [
      { question: '甘特圖主要用來顯示什麼？', options: ['成本', '時間進度', '人手', '物料'], answer: 1 }
    ]
  }
};
