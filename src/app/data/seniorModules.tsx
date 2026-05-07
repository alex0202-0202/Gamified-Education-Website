import {
  Lightbulb,
  Settings,
  Globe,
  Cpu,
  MonitorPlay,
  Hammer,
  CircuitBoard,
  Monitor,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SeniorModuleId =
  | 'design_innovation'
  | 'technological_principles'
  | 'value_impact'
  | 'automation'
  | 'creative_digital_media'
  | 'design_material_processing'
  | 'electronics'
  | 'visualisation_cad';

export type SeniorModule = {
  id: SeniorModuleId;
  section: 'compulsory' | 'elective';
  num: string;
  title: string;
  en: string;
  icon: LucideIcon;
  color: string;
  accent: string;
  panelBg: string;
  desc: string;
  enDesc?: string;
  tags: string[];
  enTags?: string[];
  points: string[];
  enPoints?: string[];
  knowledge: string[];
  enKnowledge?: string[];
  instructions: string[];
  enInstructions?: string[];
};

export const seniorCompulsoryModules: SeniorModule[] = [
  {
    id: 'design_innovation',
    section: 'compulsory',
    num: '必修一',
    title: '設計與創新',
    en: 'Design & Innovation',
    icon: Lightbulb,
    color: '#D5896F',
    accent: '#D5896F',
    panelBg: '#FDF5F2',
    desc: '設計過程、創新策略、企業精神、專利與市場推廣。',
    enDesc: 'Design processes, innovation strategies, entrepreneurship, patents, and market promotion.',
    tags: ['[理論]', '[設計流程]', '[SBA]'],
    enTags: ['[Theory]', '[Design Process]', '[SBA]'],
    points: ['設計過程：探索問題 → 構思 → 原型 → 評鑒', '創新方法：仿生學、設計思維、逆向工程', '商業與知識產權：專利、版權、品牌', 'SBA Design Folio 與演示技巧'],
    enPoints: ['Design process: explore problems -> ideate -> prototype -> evaluate', 'Innovation methods: biomimicry, design thinking, and reverse engineering', 'Business and intellectual property: patents, copyright, and branding', 'SBA design folio and presentation skills'],
    knowledge: ['設計過程並非直線，而是反覆迭代。', '創新需要兼顧用戶、技術可行性與市場價值。', '設計師需考慮知識產權與倫理責任。'],
    enKnowledge: ['The design process is iterative rather than linear.', 'Innovation must balance user needs, technical feasibility, and market value.', 'Designers must consider intellectual property and ethical responsibility.'],
    instructions: ['排序設計流程卡片。', '找出最適合進入下一步的行動。', '完成後進入測驗。'],
    enInstructions: ['Arrange the design process cards in order.', 'Identify the most suitable next action.', 'Then proceed to the quiz.'],
  },
  {
    id: 'technological_principles',
    section: 'compulsory',
    num: '必修二',
    title: '科技原理',
    en: 'Technological Principles',
    icon: Settings,
    color: '#6B9080',
    accent: '#6B9080',
    panelBg: '#F2F7F4',
    desc: '材料、機械結構、製造過程、系統與控制的核心原理。',
    enDesc: 'Core principles of materials, mechanisms, manufacturing processes, systems, and control.',
    tags: ['[理論]', '[機械]', '[製造]'],
    enTags: ['[Theory]', '[Mechanisms]', '[Manufacturing]'],
    points: ['材料分類與測試：木材、金屬、聚合物、複合材料', '機械結構：齒輪、凸輪、連桿、帶輪', '製造過程：加工、成形、接合、表面處理', '系統與控制：輸入、處理、輸出、回饋'],
    enPoints: ['Material groups and testing: timber, metals, polymers, and composites', 'Mechanisms: gears, cams, linkages, and pulleys', 'Manufacturing processes: machining, forming, joining, and surface finishing', 'Systems and control: input, process, output, and feedback'],
    knowledge: ['科技原理是理解產品如何被製造與運作的基礎。', '選材與機構設計會直接影響性能與成本。', '系統設計需要同時考慮機械與電子元件。'],
    enKnowledge: ['Technological principles are the basis for understanding how products are made and how they operate.', 'Material choice and mechanism design directly affect performance and cost.', 'System design must consider both mechanical and electronic components.'],
    instructions: ['為設計任務選出正確材料與機構。', '檢查配搭是否合理。', '再進入測驗。'],
    enInstructions: ['Select the correct material and mechanism for the design task.', 'Check whether the pairing is reasonable.', 'Then continue to the quiz.'],
  },
  {
    id: 'value_impact',
    section: 'compulsory',
    num: '必修三',
    title: '價值與影響',
    en: 'Value & Impact',
    icon: Globe,
    color: '#CCA068',
    accent: '#CCA068',
    panelBg: '#FBF8F1',
    desc: '科技對社會、環境、職業安全與知識產權的影響。',
    enDesc: 'The impact of technology on society, the environment, occupational safety, and intellectual property.',
    tags: ['[理論]', '[可持續]', '[倫理]'],
    enTags: ['[Theory]', '[Sustainability]', '[Ethics]'],
    points: ['可持續發展：5R、LCA、循環設計', '社會影響：生活模式、就業與公平性', '職業安全：風險評估、工作程序', '知識產權：版權、商標、專利'],
    enPoints: ['Sustainable development: 5R, LCA, and circular design', 'Social impact: lifestyles, employment, and fairness', 'Occupational safety: risk assessment and work procedures', 'Intellectual property: copyright, trademarks, and patents'],
    knowledge: ['科技設計需平衡功能、成本與社會後果。', '環保與安全不是附加項，而是設計要求。', '知識產權保護創新，也影響商業策略。'],
    enKnowledge: ['Technological design must balance function, cost, and social consequences.', 'Environmental protection and safety are not optional extras; they are design requirements.', 'Intellectual property protects innovation and also shapes business strategy.'],
    instructions: ['在設計案例中選擇最平衡的方案。', '比較不同決策的社會與環境代價。', '完成後檢查你的分數。'],
    enInstructions: ['Choose the most balanced solution in the design case.', 'Compare the social and environmental cost of different decisions.', 'Check your score after finishing.'],
  },
];

export const seniorElectiveModules: SeniorModule[] = [
  {
    id: 'automation',
    section: 'elective',
    num: '模組一',
    title: '自動化操作',
    en: 'Automation',
    icon: Cpu,
    color: '#6B705C',
    accent: '#E67E22',
    panelBg: '#F6F4EF',
    desc: '氣動系統、微控制器 (Arduino/Micro:bit)、傳感器、自動化生產線原理。',
    enDesc: 'Pneumatic systems, microcontrollers (Arduino/Micro:bit), sensors, and automated production-line principles.',
    tags: ['[理論]', '[實作]', '[編程]'],
    enTags: ['[Theory]', '[Hands-on]', '[Programming]'],
    points: ['氣動系統：單動 / 雙動氣缸', '邏輯控制：AND / OR valves', '微控制器：Arduino / Micro:bit I/O', '傳感 → 處理 → 執行 (Sense-Think-Act)'],
    enPoints: ['Pneumatic systems: single-acting / double-acting cylinders', 'Logic control: AND / OR valves', 'Microcontrollers: Arduino / Micro:bit I/O', 'Sense -> Process -> Act (Sense-Think-Act)'],
    knowledge: ['自動化系統的核心是由感測器收集資料，再由控制器判斷，最後由執行器完成動作。', '在工業環境中，傳感器常與氣缸、馬達、繼電器配合。', '簡單條件邏輯可用 if-then 指令表達。'],
    enKnowledge: ['The core of automation is that sensors collect data, the controller makes a decision, and the actuator carries out the action.', 'In industrial settings, sensors are often paired with cylinders, motors, and relays.', 'Simple conditional logic can be expressed with if-then statements.'],
    instructions: ['放置紅外線感測器。', '輸入 If sensor == 1 then Extend Cylinder。', '按 Start 觀察氣缸是否將次品推出。'],
    enInstructions: ['Place the infrared sensor.', 'Enter If sensor == 1 then Extend Cylinder.', 'Press Start and observe whether the cylinder pushes out the defective item.'],
  },
  {
    id: 'creative_digital_media',
    section: 'elective',
    num: '模組二',
    title: '創意數碼媒體',
    en: 'Creative Digital Media',
    icon: MonitorPlay,
    color: '#2A9D8F',
    accent: '#2A9D8F',
    panelBg: '#F9F8F6',
    desc: '圖像處理 (2D/3D)、動畫製作、聲音與影像編輯、介面設計 (UI/UX)。',
    enDesc: 'Image processing (2D/3D), animation, audio and video editing, and interface design (UI/UX).',
    tags: ['[實作]', '[電腦軟件]'],
    enTags: ['[Hands-on]', '[Software]'],
    points: ['點陣圖 Bitmap vs 向量圖 Vector', 'RGB vs CMYK 色彩空間', 'UI/UX 原則：對比、重複、對齊、親密性', 'Keyframe 影格動畫與介面互動'],
    enPoints: ['Bitmap versus vector graphics', 'RGB versus CMYK colour spaces', 'UI/UX principles: contrast, repetition, alignment, and proximity', 'Keyframe animation and interface interaction'],
    knowledge: ['UI 設計不只美觀，還需易讀、易點擊、易理解。', '對比度直接影響可用性與無障礙。', '點陣圖與向量圖適合不同設計用途。'],
    enKnowledge: ['UI design is not only about appearance; it must also be readable, clickable, and easy to understand.', 'Contrast directly affects usability and accessibility.', 'Bitmap and vector graphics are suited to different design purposes.'],
    instructions: ['調整按鈕 padding。', '改變背景顏色提升對比。', '令對比度分數達到 4.5:1 以上。'],
    enInstructions: ['Adjust the button padding.', 'Change the background colour to improve contrast.', 'Reach a contrast score of 4.5:1 or above.'],
  },
  {
    id: 'design_material_processing',
    section: 'elective',
    num: '模組三',
    title: '設計實踐及材料處理',
    en: 'Design & Material Processing',
    icon: Hammer,
    color: '#D5896F',
    accent: '#D5896F',
    panelBg: '#FAF5F3',
    desc: '測試材料強度、鑄造、模具設計、熱處理、大量生產與質量保證 (QA/QC)。',
    enDesc: 'Material strength testing, casting, mould design, heat treatment, mass production, and quality assurance / quality control (QA/QC).',
    tags: ['[實作]', '[進階]'],
    enTags: ['[Hands-on]', '[Advanced]'],
    points: ['材料強度測試：Tensile / Compression', 'Stress / Strain Graph 與屈服點', 'Casting、Mould、Heat Treatment', 'Mass Production 與 QA/QC'],
    enPoints: ['Material strength testing: tensile / compression', 'Stress / strain graphs and yield point', 'Casting, moulds, and heat treatment', 'Mass production and QA/QC'],
    knowledge: ['不同材料在同一載重下會有不同變形與斷裂行為。', '應力-應變圖可顯示材料的屈服與極限強度。', '大量生產需配合品質控制與標準程序。'],
    enKnowledge: ['Different materials show different deformation and fracture behaviour under the same load.', 'Stress-strain graphs reveal yield strength and ultimate strength.', 'Mass production must be supported by quality control and standard procedures.'],
    instructions: ['選擇鋼、鋁或碳纖維。', '逐步增加載重。', '觀察應力-應變曲線與斷裂狀態。'],
    enInstructions: ['Choose steel, aluminium, or carbon fibre.', 'Increase the load step by step.', 'Observe the stress-strain curve and fracture state.'],
  },
  {
    id: 'electronics',
    section: 'elective',
    num: '模組四',
    title: '電子學',
    en: 'Electronics',
    icon: CircuitBoard,
    color: '#1B263B',
    accent: '#4361EE',
    panelBg: '#EEF1FF',
    desc: '運算放大器 (OP-AMP)、邏輯門、電路板製作、焊接與電子測試。',
    enDesc: 'Operational amplifiers (OP-AMP), logic gates, PCB fabrication, soldering, and electronic testing.',
    tags: ['[理論]', '[實作]'],
    enTags: ['[Theory]', '[Hands-on]'],
    points: ['OP-AMP 比較器功能', 'AND / OR / NOT / NAND / NOR 邏輯門', 'PCB 製作與焊接安全', '輸入條件與輸出端 LED 狀態'],
    enPoints: ['OP-AMP comparator functions', 'AND / OR / NOT / NAND / NOR logic gates', 'PCB fabrication and soldering safety', 'Input conditions and output LED status'],
    knowledge: ['邏輯門能把多個二進制輸入轉化為可預測輸出。', 'OP-AMP 可作比較器，判斷輸入是否高於參考電壓。', '電子實作需遵守焊接溫度與安全程序。'],
    enKnowledge: ['Logic gates convert multiple binary inputs into predictable outputs.', 'An OP-AMP can work as a comparator to judge whether an input is above a reference voltage.', 'Electronics work must follow correct soldering temperatures and safety procedures.'],
    instructions: ['拖放正確邏輯門到空位。', '切換輸入值 0 / 1。', '令 LED 在正確條件下亮起。'],
    enInstructions: ['Drag the correct logic gate into the slot.', 'Toggle the input values between 0 and 1.', 'Make the LED light under the correct condition.'],
  },
  {
    id: 'visualisation_cad',
    section: 'elective',
    num: '模組五',
    title: '視覺化及電腦輔助設計',
    en: 'Visualisation and CAD',
    icon: Monitor,
    color: '#3D405B',
    accent: '#E0C097',
    panelBg: '#F8F4EC',
    desc: '正投影圖、等角圖、3D建模軟件 (SolidWorks)、CAM、快速原型製作。',
    enDesc: 'Orthographic drawing, isometric drawing, 3D modelling software (SolidWorks), CAM, and rapid prototyping.',
    tags: ['[實作]', '[電腦軟件]'],
    enTags: ['[Hands-on]', '[Software]'],
    points: ['第一 / 第三角投影法', '等角圖 Isometric (30°)', '剖面圖 Sectional View', 'STL / G-code 與 CAM 轉換'],
    enPoints: ['First- and third-angle projection', 'Isometric drawing (30 degrees)', 'Sectional views', 'STL / G-code and CAM conversion'],
    knowledge: ['CAD 讓設計者能從 3D 模型準確轉換成工程圖。', '正投影圖要求視圖位置與對應關係準確。', '快速原型常用 STL、切片與 G-code。'],
    enKnowledge: ['CAD allows designers to convert 3D models accurately into engineering drawings.', 'Orthographic drawings require accurate view placement and alignment.', 'Rapid prototyping commonly uses STL files, slicing, and G-code.'],
    instructions: ['觀察 3D 模型。', '把對應 2D 視圖放到 Front / Plan / End 位置。', '完成 Projection Master 挑戰。'],
    enInstructions: ['Observe the 3D model.', 'Place the matching 2D views into the Front / Plan / End positions.', 'Complete the Projection Master challenge.'],
  },
];

export const seniorModuleList = [...seniorCompulsoryModules, ...seniorElectiveModules];

export const seniorModules: Record<SeniorModuleId, SeniorModule> = seniorModuleList.reduce(
  (acc, module) => ({ ...acc, [module.id]: module }),
  {} as Record<SeniorModuleId, SeniorModule>
);
