import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Star,
  Trophy,
  Zap,
  Brain,
  Car,
  Clock,
  Shuffle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  BookOpen,
  Layers,
  ChevronRight,
  ChevronDown,
  Users,
  Download,
  Trash2,
  BarChart3,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import { useClassData } from '../hooks/useClassData';
import { useAuth } from '../context/AuthContext';
import {
  getQuestionsForPractice,
  getQuestionTopicsForPractice,
  type QuestionCurriculum,
  type QuestionItem,
  type QuestionYearGroup,
} from '../../data/questionBanks';
import {
  getFlashcardsForLevel,
  getQuizQuestionsForLevel,
  getStudyCurriculum,
  getStudyLevel,
  getTopicsForLevel,
  parseStudySelection,
} from '../../data/studyCurriculum';

// ─── Types ──────────────────────────────────────────────────────────────────

type QuizQuestion = {
  id: string;
  topicId?: string;
  question: { zh: string; en: string };
  options: { zh: string; en: string }[];
  correct: number;
  explanation: { zh: string; en: string };
};

// ─── Data ────────────────────────────────────────────────────────────────────

const ibQuizBank: QuizQuestion[] = [
  {
    id: 'q1',
    question: { zh: '以下哪個是「生命週期評估 (LCA)」的完整階段描述？', en: 'Which best describes the full scope of a Life Cycle Assessment (LCA)?' },
    options: [
      { zh: '從生產到銷售', en: 'From production to sale' },
      { zh: '從原材料開採到最終廢棄處理', en: 'From raw material extraction to final disposal' },
      { zh: '只包括使用階段的影響', en: 'Only the impact during the use phase' },
      { zh: '只包括製造和運輸', en: 'Only manufacturing and transport' },
    ],
    correct: 1,
    explanation: { zh: 'LCA（搖籃到墳墓）涵蓋原材料開採、製造、運輸、使用及廢棄處理全過程。', en: 'LCA (cradle-to-grave) covers raw material extraction, manufacturing, transport, use, and end-of-life disposal.' },
  },
  {
    id: 'q2',
    question: { zh: '人體測量學 (Anthropometrics) 在設計中主要用於？', en: 'What is the primary use of Anthropometrics in design?' },
    options: [
      { zh: '選擇顏色配色方案', en: 'Choosing colour schemes' },
      { zh: '應用人體尺寸數據設計合適的產品比例', en: 'Applying human body measurement data to size products correctly' },
      { zh: '計算產品的製造成本', en: 'Calculating manufacturing cost' },
      { zh: '繪製工程圖', en: 'Drawing engineering drawings' },
    ],
    correct: 1,
    explanation: { zh: '人體測量學利用第5至第95百分位數的人體數據，確保產品可安全、舒適地被大多數用戶使用。', en: 'Anthropometrics uses human body data (5th–95th percentile) to ensure products fit and are safe for the majority of users.' },
  },
  {
    id: 'q3',
    question: { zh: 'CAD/CAM 中「CAM」代表什麼？', en: 'What does "CAM" stand for in CAD/CAM?' },
    options: [
      { zh: 'Computer Aided Measurement', en: 'Computer Aided Measurement' },
      { zh: 'Creative Arts and Media', en: 'Creative Arts and Media' },
      { zh: 'Computer Aided Manufacturing', en: 'Computer Aided Manufacturing' },
      { zh: 'Component Assembly Method', en: 'Component Assembly Method' },
    ],
    correct: 2,
    explanation: { zh: 'CAM 是電腦輔助製造，將 CAD 設計文件轉化為機器（如 CNC、3D 打印機）的控制指令。', en: 'CAM (Computer Aided Manufacturing) converts CAD designs into machine control instructions for CNC routers, 3D printers, and similar equipment.' },
  },
  {
    id: 'q4',
    question: { zh: '循環經濟的「6R 原則」不包括以下哪項？', en: 'Which of the following is NOT one of the 6R principles of the circular economy?' },
    options: [
      { zh: 'Reduce（減少）', en: 'Reduce' },
      { zh: 'Reuse（再用）', en: 'Reuse' },
      { zh: 'Replace（取代）', en: 'Replace' },
      { zh: 'Recycle（回收）', en: 'Recycle' },
    ],
    correct: 2,
    explanation: { zh: '6R 是：Reduce、Reuse、Recycle、Repair、Rethink、Refuse。「Replace」並非 6R 之一。', en: 'The 6Rs are: Reduce, Reuse, Recycle, Repair, Rethink, Refuse. "Replace" is not one of them.' },
  },
  {
    id: 'q5',
    question: { zh: 'IB DP Design Technology 的設計周期中，哪個階段緊接在「分析 (Analysis)」之後？', en: 'In the IB DP Design Technology design cycle, which phase comes directly after Analysis?' },
    options: [
      { zh: '評鑒 (Evaluation)', en: 'Evaluation' },
      { zh: '發展 (Development)', en: 'Development' },
      { zh: '綜合 (Synthesis)', en: 'Synthesis' },
      { zh: '製造 (Manufacturing)', en: 'Manufacturing' },
    ],
    correct: 1,
    explanation: { zh: 'IB 設計周期：分析 → 發展 → 綜合 → 評鑒，循環往復直至方案最優化。', en: 'The IB design cycle: Analysis → Development → Synthesis → Evaluation, repeated iteratively until the solution is optimised.' },
  },
  {
    id: 'q6',
    question: { zh: '「公差與配合 (Tolerance and Fit)」在製造中的目的是？', en: 'What is the purpose of "Tolerance and Fit" in manufacturing?' },
    options: [
      { zh: '確保零件外觀美觀', en: 'Ensuring parts look attractive' },
      { zh: '規定零件尺寸允許的偏差範圍以確保互換性', en: 'Specifying the allowable dimensional variation to ensure interchangeability' },
      { zh: '選擇最便宜的加工方式', en: 'Selecting the cheapest machining method' },
      { zh: '決定產品顏色', en: 'Deciding product colour' },
    ],
    correct: 1,
    explanation: { zh: '公差定義了尺寸的允許誤差範圍，配合（間隙/過渡/過盈）決定了零件組裝後的鬆緊關係，對可互換性至關重要。', en: 'Tolerances define the allowable size deviation; fit types (clearance, transition, interference) govern how tightly parts assemble, which is critical for interchangeability.' },
  },
  {
    id: 'q7',
    question: { zh: 'MYP Design 的哪個準則要求學生「創建解決方案」並完成可運作的原型？', en: 'Which MYP Design criterion requires students to "create the solution" and produce a working prototype?' },
    options: [
      { zh: '準則 A：探究與分析', en: 'Criterion A: Inquiring and Analyzing' },
      { zh: '準則 B：發展設計構思', en: 'Criterion B: Developing Ideas' },
      { zh: '準則 C：創建解決方案', en: 'Criterion C: Creating the Solution' },
      { zh: '準則 D：評鑑', en: 'Criterion D: Evaluating' },
    ],
    correct: 2,
    explanation: { zh: '準則 C 評核學生實際製作產品的過程——計劃、技術應用、安全操作及製作記錄。', en: 'Criterion C assesses the making process — planning, technical application, safe practice, and a record of modifications.' },
  },
  {
    id: 'q8',
    question: { zh: '以下哪種材料屬於「熱固性塑料 (Thermosetting plastic)」？', en: 'Which of the following is a thermosetting plastic?' },
    options: [
      { zh: 'ABS（丙烯腈–丁二烯–苯乙烯）', en: 'ABS (Acrylonitrile Butadiene Styrene)' },
      { zh: '環氧樹脂 (Epoxy resin)', en: 'Epoxy resin' },
      { zh: 'PLA（聚乳酸）', en: 'PLA (Polylactic acid)' },
      { zh: '聚乙烯 (Polyethylene / PE)', en: 'Polyethylene (PE)' },
    ],
    correct: 1,
    explanation: { zh: '熱固性塑料（如環氧樹脂、酚醛樹脂）一旦成形就無法再熔融重塑；熱塑性塑料（ABS、PLA、PE）則可反復加熱成形。', en: 'Thermosetting plastics (e.g. epoxy resin, phenol formaldehyde) cannot be remelted once set; thermoplastics (ABS, PLA, PE) can be reheated and reshaped.' },
  },
];

// DSE Junior (S1–S3) quiz bank
const dseJuniorQuizBank: QuizQuestion[] = [
  {
    id: 'dj1',
    question: { zh: '在工作室使用機器前，最重要的安全步驟是什麼？', en: 'What is the most important safety step before using machinery in the workshop?' },
    options: [
      { zh: '先告知同學', en: 'Inform classmates first' },
      { zh: '取得老師許可並穿戴護目鏡和圍裙', en: 'Get teacher permission and wear goggles and apron' },
      { zh: '確認機器已插電', en: 'Confirm the machine is plugged in' },
      { zh: '打開所有燈光', en: 'Switch on all lights' },
    ],
    correct: 1,
    explanation: { zh: '使用任何機器前必須獲得老師許可，並穿戴適當個人防護設備（PPE），包括護目鏡及圍裙。', en: 'Always obtain teacher permission and wear appropriate PPE (goggles and apron) before operating any machine.' },
  },
  {
    id: 'dj2',
    question: { zh: '以下哪種材料是天然材料？', en: 'Which of the following is a natural material?' },
    options: [
      { zh: '聚氯乙烯（PVC）', en: 'Polyvinyl Chloride (PVC)' },
      { zh: '鋁合金', en: 'Aluminium alloy' },
      { zh: '橡木（Oak Wood）', en: 'Oak Wood' },
      { zh: '丙烯腈丁二烯苯乙烯（ABS）', en: 'ABS plastic' },
    ],
    correct: 2,
    explanation: { zh: '橡木是天然材料，直接來自樹木；PVC、鋁合金及 ABS 均為人造或加工材料。', en: 'Oak is a natural material derived directly from trees. PVC, aluminium alloy, and ABS are all manufactured or processed materials.' },
  },
  {
    id: 'dj3',
    question: { zh: '齒輪系統的主要功能是什麼？', en: 'What is the main function of a gear system?' },
    options: [
      { zh: '產生電力', en: 'Generate electricity' },
      { zh: '傳遞轉矩並改變轉速或方向', en: 'Transmit torque and change speed or direction' },
      { zh: '儲存能量', en: 'Store energy' },
      { zh: '減少摩擦力', en: 'Reduce friction force' },
    ],
    correct: 1,
    explanation: { zh: '齒輪系統透過不同齒數的齒輪嚙合，傳遞動力並改變轉速、方向或扭矩。', en: 'A gear system transmits power between shafts and can change rotational speed, direction, or torque through different gear ratios.' },
  },
  {
    id: 'dj4',
    question: { zh: '以下哪種材料是熱的良導體？', en: 'Which material is a good conductor of heat?' },
    options: [
      { zh: '木材', en: 'Wood' },
      { zh: '橡膠', en: 'Rubber' },
      { zh: '銅', en: 'Copper' },
      { zh: '塑料', en: 'Plastic' },
    ],
    correct: 2,
    explanation: { zh: '銅是金屬，自由電子多，導熱性和導電性都非常好；木材、橡膠和塑料是絕緣體。', en: 'Copper is a metal with many free electrons, making it an excellent conductor of both heat and electricity. Wood, rubber, and plastic are insulators.' },
  },
  {
    id: 'dj5',
    question: { zh: '設計過程的第一個步驟通常是什麼？', en: 'What is typically the first step in the design process?' },
    options: [
      { zh: '製作最終產品', en: 'Make the final product' },
      { zh: '確定設計問題和用戶需求', en: 'Identify the design problem and user needs' },
      { zh: '繪製詳細工程圖', en: 'Draw detailed engineering drawings' },
      { zh: '選擇材料', en: 'Choose materials' },
    ],
    correct: 1,
    explanation: { zh: '設計過程從識別和分析問題、研究用戶需求開始，再進行概念設計及方案發展。', en: 'The design process begins with identifying and analysing the problem and researching user needs, before moving to concept development and planning.' },
  },
  {
    id: 'dj6',
    question: { zh: '以下哪種接合方法不可逆（永久性）？', en: 'Which joining method is permanent (not reversible)?' },
    options: [
      { zh: '螺絲連接', en: 'Screw joint' },
      { zh: '釘書針', en: 'Staple' },
      { zh: '焊接（Welding）', en: 'Welding' },
      { zh: '螺栓和螺母', en: 'Nut and bolt' },
    ],
    correct: 2,
    explanation: { zh: '焊接是通過熔化金屬進行永久連接；螺絲、螺栓和螺母均可拆卸，屬於臨時接合。', en: 'Welding permanently joins metals by melting them together. Screws, bolts, and nuts are all temporary fasteners that can be disassembled.' },
  },
  {
    id: 'dj7',
    question: { zh: '「可持續設計」的主要目的是什麼？', en: 'What is the main aim of "sustainable design"?' },
    options: [
      { zh: '使產品看起來美觀', en: 'Make products look attractive' },
      { zh: '最大化生產速度', en: 'Maximise production speed' },
      { zh: '在滿足現有需求的同時不損害後代的資源', en: 'Meet current needs without compromising resources for future generations' },
      { zh: '降低生產成本', en: 'Lower production costs' },
    ],
    correct: 2,
    explanation: { zh: '可持續設計考慮環境影響，目標是既滿足現代人需求，又保護自然資源以供未來世代使用。', en: "Sustainable design considers environmental impact, aiming to meet today's needs while protecting natural resources for future generations." },
  },
  {
    id: 'dj8',
    question: { zh: '在樑橋結構中，哪種力是樑在彎曲時頂部受到的力？', en: 'In a beam bridge structure, what force acts on the top of the beam when it bends?' },
    options: [
      { zh: '拉力（Tension）', en: 'Tension' },
      { zh: '壓力（Compression）', en: 'Compression' },
      { zh: '扭力（Torsion）', en: 'Torsion' },
      { zh: '剪力（Shear）', en: 'Shear' },
    ],
    correct: 1,
    explanation: { zh: '當樑受到向下荷載時，頂部受到壓縮力，底部受到拉伸力。這是樑橋設計中的基本力學原理。', en: 'When a beam is loaded from above, the top face is in compression and the bottom face is in tension. This is fundamental to beam bridge design.' },
  },
];

// DSE Senior (S4–S6) quiz bank
const dseSeniorQuizBank: QuizQuestion[] = [
  {
    id: 'ds1',
    question: { zh: '以用戶為中心的設計 (User-Centred Design) 最重要的特徵是什麼？', en: 'What is the most important characteristic of User-Centred Design (UCD)?' },
    options: [
      { zh: '使用最新技術', en: 'Using the latest technology' },
      { zh: '在整個設計過程中不斷研究和測試用戶需求', en: 'Continuously researching and testing user needs throughout the design process' },
      { zh: '盡量降低生產成本', en: 'Minimising production costs' },
      { zh: '優先考慮外觀美觀', en: 'Prioritising visual aesthetics' },
    ],
    correct: 1,
    explanation: { zh: 'UCD 的核心是在設計全程不斷研究、測試並根據用戶反饋迭代，確保最終產品真正滿足用戶需求。', en: 'UCD places the user at the centre throughout the entire process — researching, prototyping, and iterating based on continuous user feedback.' },
  },
  {
    id: 'ds2',
    question: { zh: '閉環控制系統 (Closed-Loop Control System) 的關鍵特徵是什麼？', en: 'What is the key feature of a Closed-Loop Control System?' },
    options: [
      { zh: '沒有輸入信號', en: 'It has no input signal' },
      { zh: '輸出結果通過反饋回路影響系統輸入', en: 'The output feeds back to affect the system input' },
      { zh: '系統不需要能源', en: 'It requires no energy source' },
      { zh: '只能在電腦上模擬', en: 'It can only be simulated on a computer' },
    ],
    correct: 1,
    explanation: { zh: '閉環系統有反饋機制：輸出被感測後與期望值比較，差異用於調整輸入，如恆溫器。', en: 'A closed-loop system has feedback: the output is measured and compared to the desired value, and the difference is used to correct the input (e.g. a thermostat).' },
  },
  {
    id: 'ds3',
    question: { zh: '「計劃性淘汰 (Planned Obsolescence)」是指？', en: 'What does "Planned Obsolescence" mean?' },
    options: [
      { zh: '設計產品使其在一定時期後失效或過時，以刺激再購買', en: 'Designing products to fail or become outdated after a set period to encourage repurchase' },
      { zh: '提前計劃生產流程', en: 'Planning the production process in advance' },
      { zh: '使用可回收材料', en: 'Using recyclable materials' },
      { zh: '優化供應鏈效率', en: 'Optimising supply chain efficiency' },
    ],
    correct: 0,
    explanation: { zh: '計劃性淘汰是廠商故意設計有限壽命的產品或人為製造「過時感」，迫使消費者購買新款，但對環境和消費者造成負面影響。', en: "Planned obsolescence is when manufacturers intentionally design products with a limited lifespan or create a sense of outdatedness, encouraging repurchase — controversial for its environmental and consumer impact." },
  },
  {
    id: 'ds4',
    question: { zh: '複合材料 (Composite Materials) 的主要優勢是什麼？', en: 'What is the main advantage of Composite Materials?' },
    options: [
      { zh: '比金屬便宜', en: 'They are cheaper than metals' },
      { zh: '結合多種材料的優點，如強度高且重量輕', en: 'They combine the advantages of multiple materials, such as high strength and low weight' },
      { zh: '完全可生物降解', en: 'They are fully biodegradable' },
      { zh: '製造過程對環境無害', en: 'Their manufacturing is environmentally harmless' },
    ],
    correct: 1,
    explanation: { zh: '複合材料（如碳纖維、玻璃鋼）結合基質和加強材料，兼顧多種性能。例如碳纖維複合材料強度高、重量輕，廣泛用於航空和賽車。', en: 'Composite materials (e.g. CFRP, fibreglass) combine matrix and reinforcement to achieve multiple properties simultaneously — for example, carbon fibre offers very high strength with low weight, used in aerospace and motorsport.' },
  },
  {
    id: 'ds5',
    question: { zh: 'CAD/CAM 在現代製造業中的主要好處是什麼？', en: 'What is the main benefit of CAD/CAM in modern manufacturing?' },
    options: [
      { zh: '消除所有人工工序', en: 'Eliminating all manual processes' },
      { zh: '提高設計精準度並直接驅動機器，加快生產並減少誤差', en: 'Improving design accuracy and directly driving machines to speed production and reduce errors' },
      { zh: '降低軟件許可費用', en: 'Reducing software licensing costs' },
      { zh: '使設計師不再需要學習工程知識', en: 'Removing the need for engineers to learn technical knowledge' },
    ],
    correct: 1,
    explanation: { zh: 'CAD 生成精準數字模型，CAM 將其轉換為 CNC 機器指令，實現設計到生產的無縫對接，大幅提升精度和效率。', en: 'CAD creates precise digital models; CAM converts them to CNC machine instructions — creating a seamless design-to-manufacture workflow that increases accuracy and efficiency.' },
  },
  {
    id: 'ds6',
    question: { zh: '電晶體 (Transistor) 在電子電路中的主要功能是什麼？', en: 'What is the primary function of a transistor in an electronic circuit?' },
    options: [
      { zh: '儲存電荷', en: 'Store electrical charge' },
      { zh: '作為開關或訊號放大器', en: 'Act as a switch or signal amplifier' },
      { zh: '將交流電轉換為直流電', en: 'Convert AC to DC' },
      { zh: '測量電壓', en: 'Measure voltage' },
    ],
    correct: 1,
    explanation: { zh: '電晶體可作開關（數字電路的基礎）或放大器（類比電路）。現代晶片上有數十億個電晶體構成邏輯閘。', en: 'A transistor acts as a switch (the basis of digital logic) or amplifier (analogue circuits). Modern chips contain billions of transistors forming logic gates.' },
  },
  {
    id: 'ds7',
    question: { zh: '「三重底線 (Triple Bottom Line)」框架評估企業表現的三個維度是什麼？', en: 'What are the three dimensions of the Triple Bottom Line (3P) framework for evaluating business performance?' },
    options: [
      { zh: '利潤、人員和地球 (Profit, People, Planet)', en: 'Profit, People, Planet' },
      { zh: '生產、推廣和包裝 (Production, Promotion, Packaging)', en: 'Production, Promotion, Packaging' },
      { zh: '計劃、執行和評估 (Plan, Execute, Evaluate)', en: 'Plan, Execute, Evaluate' },
      { zh: '價格、性能和耐用性 (Price, Performance, Durability)', en: 'Price, Performance, Durability' },
    ],
    correct: 0,
    explanation: { zh: '三重底線框架（3P）要求企業同時衡量財務（Profit）、社會（People）和環境（Planet）表現，超越純粹財務指標的評估方式。', en: 'The Triple Bottom Line (3P) framework requires businesses to measure financial (Profit), social (People), and environmental (Planet) performance — going beyond purely financial metrics.' },
  },
  {
    id: 'ds8',
    question: { zh: '在 HKDSE D&T 的設計過程中，哪個階段要求學生收集用戶反饋並修改設計？', en: 'In the HKDSE D&T design process, which stage requires students to collect user feedback and modify the design?' },
    options: [
      { zh: '問題識別 (Problem Identification)', en: 'Problem Identification' },
      { zh: '概念設計 (Concept Design)', en: 'Concept Design' },
      { zh: '評估與反思 (Evaluation and Reflection)', en: 'Evaluation and Reflection' },
      { zh: '材料選擇 (Material Selection)', en: 'Material Selection' },
    ],
    correct: 2,
    explanation: { zh: '評估與反思階段要求學生根據設計規格和用戶反饋，系統評估作品成效並提出改進建議。', en: 'The Evaluation and Reflection stage requires students to systematically assess their work against design specifications and user feedback, then propose improvements.' },
  },
];

const ibFlashcards = [
  { front: { zh: 'Anthropometrics', en: 'Anthropometrics' }, back: { zh: '人體測量學——收集並應用人體尺寸數據（身高、臂展等）確保產品適合用戶。', en: 'The science of collecting and applying human body measurement data (height, reach, etc.) to design products that fit users safely.' } },
  { front: { zh: 'LCA', en: 'LCA' }, back: { zh: '生命週期評估——從原材料提取到最終廢棄，評估產品對環境的全程影響。', en: 'Life Cycle Assessment — evaluating the environmental impact of a product from raw material extraction all the way to end-of-life disposal.' } },
  { front: { zh: 'Design Cycle', en: 'Design Cycle' }, back: { zh: 'IB設計周期：分析 → 發展 → 綜合 → 評鑒，可多次迭代直到方案最優化。', en: 'The IB Design Cycle: Analysis → Development → Synthesis → Evaluation. Repeat iteratively until the solution is optimised.' } },
  { front: { zh: 'Ergonomics', en: 'Ergonomics' }, back: { zh: '人因工程——設計工作環境、工具和產品，使其適合人體，提升效率並減少傷害。', en: 'Designing environments, tools, and products to fit the human body — maximising efficiency and reducing injury or discomfort.' } },
  { front: { zh: 'Tolerance', en: 'Tolerance (Manufacturing)' }, back: { zh: '公差——允許尺寸偏離名義值的範圍，確保零件可以互換並正確裝配。', en: 'The allowable deviation from a nominal dimension, ensuring parts are interchangeable and assemble correctly.' } },
  { front: { zh: 'CAD/CAM', en: 'CAD/CAM' }, back: { zh: '電腦輔助設計（CAD）+ 電腦輔助製造（CAM）——設計軟件生成的模型直接驅動CNC/3D打印等機器。', en: 'Computer-Aided Design + Computer-Aided Manufacturing — design software models drive CNC machines, 3D printers, and similar equipment directly.' } },
  { front: { zh: '6R Principles', en: '6R Principles' }, back: { zh: '循環經濟六原則：Reduce（減少）、Reuse（再用）、Recycle（回收）、Repair（修理）、Rethink（重新思考）、Refuse（拒絕）。', en: 'Circular economy: Reduce, Reuse, Recycle, Repair, Rethink, Refuse — a framework for minimising waste and extending product life.' } },
  { front: { zh: 'DfM', en: 'DfM' }, back: { zh: '為製造而設計（Design for Manufacture）——從設計階段起就考慮如何降低生產複雜性和成本。', en: 'Design for Manufacture — considering production constraints and cost reduction from the earliest stages of the design process.' } },
];

const dseJuniorFlashcards = [
  { front: { zh: '公差 (Tolerance)', en: 'Tolerance' }, back: { zh: '允許零件尺寸偏離標稱值的範圍，確保零件可互換並正確裝配。過緊或過鬆都會影響功能。', en: 'The allowable deviation from a nominal dimension. Too tight or too loose affects function and interchangeability of parts.' } },
  { front: { zh: '槓桿 (Lever)', en: 'Lever' }, back: { zh: '簡單機械裝置——支點、施力點和受力點。改變支點位置可改變力臂比，產生機械優勢。', en: 'A simple machine with a fulcrum, effort, and load. Moving the fulcrum changes the mechanical advantage.' } },
  { front: { zh: '塑性 (Plasticity)', en: 'Plasticity' }, back: { zh: '材料在外力下永久變形而不斷裂的能力。鉛和黏土具有高塑性；玻璃和陶瓷塑性低（脆性材料）。', en: 'The ability of a material to permanently deform under force without fracturing. Lead and clay are highly plastic; glass and ceramics are brittle (low plasticity).' } },
  { front: { zh: '靜載荷 / 動載荷', en: 'Static / Dynamic Load' }, back: { zh: '靜載荷：固定不動的力（如建築物自重）。動載荷：移動或變化的力（如行走的人、風力）。設計必須考慮兩者。', en: "Static load: fixed force (e.g. building's own weight). Dynamic load: moving or changing force (e.g. people walking, wind). Design must account for both." } },
  { front: { zh: '等角投影圖', en: 'Isometric Drawing' }, back: { zh: '三維物體的二維表示，三條軸以 120° 間距繪製，無透視縮減。常用於工程設計草圖。', en: 'A 2D representation of a 3D object where the three axes are drawn 120° apart with no perspective foreshortening. Widely used in engineering design sketching.' } },
  { front: { zh: '弦力 (Tension)', en: 'Tension' }, back: { zh: '拉伸力——沿物體長度方向向外拉伸的力。橋梁吊索、鋼筋混凝土中的鋼筋均承受拉力。', en: 'A pulling force that stretches a material along its length. Bridge cables and steel reinforcement in concrete both experience tension.' } },
  { front: { zh: '工具鋼 (Tool Steel)', en: 'Tool Steel' }, back: { zh: '硬度高、耐磨損的特種鋼，用於製造切削工具、模具和衝頭。常見型號：高速鋼 (HSS)。', en: 'A hard, wear-resistant specialty steel used for cutting tools, dies, and punches. Common type: High-Speed Steel (HSS).' } },
  { front: { zh: '正投影 (Orthographic Projection)', en: 'Orthographic Projection' }, back: { zh: '將三維物體投影到垂直平面，呈現三視圖（正視、側視、俯視）。是工程製圖的標準方法。', en: 'Projecting a 3D object onto perpendicular planes to produce three views (front, side, top). The standard method for engineering technical drawings.' } },
];

const dseSeniorFlashcards = [
  { front: { zh: '設計規格 (Design Specification)', en: 'Design Specification' }, back: { zh: '描述設計必須滿足的所有功能、物理和質量要求的清單。優秀的規格可測量、可評估。', en: 'A list of all functional, physical, and quality requirements a design must meet. Good specifications are measurable and evaluable.' } },
  { front: { zh: '型態分析法 (Morphological Analysis)', en: 'Morphological Analysis' }, back: { zh: '系統性設計方法，將問題分解為子功能，為每個子功能生成多個解決方案，再組合出創新設計。', en: 'A systematic design method that breaks a problem into sub-functions, generates multiple solutions for each, then combines them into innovative designs.' } },
  { front: { zh: '六西格瑪 (Six Sigma)', en: 'Six Sigma' }, back: { zh: '品質管理方法，目標是將每百萬件產品的缺陷率控制在 3.4 以下（誤差在±6個標準差以內）。', en: 'A quality management approach targeting fewer than 3.4 defects per million units — keeping errors within ±6 standard deviations.' } },
  { front: { zh: '失效模式分析 (FMEA)', en: 'Failure Mode and Effects Analysis' }, back: { zh: '系統識別潛在失效模式及其後果的工程工具，用於提前發現和預防設計或製造缺陷。', en: 'An engineering tool that systematically identifies potential failure modes and their consequences, used to proactively prevent design or manufacturing defects.' } },
  { front: { zh: '電路板佈線 (PCB Layout)', en: 'PCB Layout' }, back: { zh: '將電子元件和導線安排在印刷電路板上的設計過程，需考慮訊號干擾、散熱和製造可行性。', en: 'The design process of arranging components and tracks on a printed circuit board, considering signal interference, heat dissipation, and manufacturability.' } },
  { front: { zh: '工業物聯網 (IIoT)', en: 'Industrial Internet of Things (IIoT)' }, back: { zh: '將生產設備、感測器和系統連接到網絡，實現實時數據收集和智能製造。是工業4.0的核心技術。', en: 'Connecting manufacturing equipment, sensors, and systems to networks for real-time data collection and intelligent manufacturing. Core to Industry 4.0.' } },
  { front: { zh: '快速成型 (Rapid Prototyping)', en: 'Rapid Prototyping' }, back: { zh: '利用增材製造（3D打印）、激光切割等技術快速製作設計原型，縮短設計迭代周期，降低成本。', en: 'Using additive manufacturing (3D printing), laser cutting, and similar techniques to quickly make design prototypes — shortening iteration cycles and reducing costs.' } },
  { front: { zh: '供應鏈管理 (SCM)', en: 'Supply Chain Management' }, back: { zh: '協調從原材料採購、生產到最終交付用戶的整個流程，目標是最低成本、最高效率和最短交貨期。', en: 'Coordinating the entire flow from raw material sourcing and production to final delivery — targeting minimum cost, maximum efficiency, and shortest lead time.' } },
];

const studyTips = [
  { icon: Clock, color: '#D5896F', tip: { zh: '番茄工作法', en: 'Pomodoro Technique' }, detail: { zh: '25分鐘專注學習 + 5分鐘休息，4輪後長休息15分鐘。用 Forest 或 Focus@Will 配合使用。', en: '25 min focused study + 5 min break, then a 15-min break after 4 rounds. Pair with Forest or Focus@Will.' } },
  { icon: Shuffle, color: '#6B9080', tip: { zh: '交替練習法', en: 'Interleaved Practice' }, detail: { zh: '不要一次只複習一個主題。混合複習 Topic 1+3+5，比連續單一主題的記憶效果好 30-40%。', en: "Don't study one topic at a time. Mix Topic 1+3+5 together — retention is 30–40% better than blocked single-topic review." } },
  { icon: Brain, color: '#CCA068', tip: { zh: '主動回憶', en: 'Active Recall' }, detail: { zh: '合上課本，嘗試默寫知識點。測試自己比重複閱讀的學習效果高 50% 以上（間隔重複學習法）。', en: 'Close the book and write what you know from memory. Self-testing beats re-reading by over 50% (spaced repetition research).' } },
  { icon: Target, color: '#8A9A5B', tip: { zh: '費曼學習法', en: 'Feynman Technique' }, detail: { zh: '嘗試用最簡單的語言向他人（甚至虛構的10歲學生）解釋你正在學習的概念——能教就能學。', en: "Explain the concept in the simplest language to someone else (even an imaginary 10-year-old). If you can teach it, you've learned it." } },
];

// ─── IB MYP Quiz Bank ────────────────────────────────────────────────────────

const ibMypQuizBank: QuizQuestion[] = [
  {
    id: 'myp1',
    question: { zh: 'MYP Design 的設計周期共有幾個評核準則？', en: 'How many assessment criteria are in the MYP Design cycle?' },
    options: [{ zh: '2個', en: '2' }, { zh: '3個', en: '3' }, { zh: '4個', en: '4' }, { zh: '5個', en: '5' }],
    correct: 2,
    explanation: { zh: 'MYP Design 有4個評核準則：A（探究與分析）、B（發展設計構思）、C（創建解決方案）、D（評鑑）。', en: 'MYP Design has 4 criteria: A (Inquiring and Analyzing), B (Developing Ideas), C (Creating the Solution), D (Evaluating).' },
  },
  {
    id: 'myp2',
    question: { zh: 'MYP 準則 A「探究與分析」主要要求學生做什麼？', en: 'What does MYP Criterion A "Inquiring and Analyzing" primarily require?' },
    options: [
      { zh: '製作原型並測試', en: 'Build and test a prototype' },
      { zh: '陳述問題、研究設計情境及分析現有產品', en: 'State the problem, research design context, and analyse existing products' },
      { zh: '評估成品並提出改進', en: 'Evaluate the product and suggest improvements' },
      { zh: '繪製詳細設計草圖', en: 'Draw detailed design sketches' },
    ],
    correct: 1,
    explanation: { zh: '準則A要求陳述問題、描述設計情境、列出需求，並分析類似現有產品。', en: 'Criterion A requires stating the problem, describing design context, listing requirements, and analysing comparable existing products.' },
  },
  {
    id: 'myp3',
    question: { zh: 'MYP 準則 B「發展設計構思」的核心輸出是什麼？', en: 'What is the core output of MYP Criterion B "Developing Ideas"?' },
    options: [
      { zh: '完成的最終產品', en: 'The finished final product' },
      { zh: '設計規格（PDS）及多個設計構思草圖', en: 'A design specification (PDS) and multiple design idea sketches' },
      { zh: '安全評估報告', en: 'A safety assessment report' },
      { zh: '材料成本估算', en: 'A material cost estimate' },
    ],
    correct: 1,
    explanation: { zh: '準則B需要制定PDS、生成多個有說明的設計構思草圖，並詳細說明最終選定方案。', en: 'Criterion B requires a PDS, multiple sketched design ideas with justification, and a detailed presentation of the chosen solution.' },
  },
  {
    id: 'myp4',
    question: { zh: '在 MYP Design 中，「客戶 (Client)」和「用戶 (User)」的主要區別是？', en: 'In MYP Design, what is the key difference between "Client" and "User"?' },
    options: [
      { zh: '兩者完全相同', en: 'They are exactly the same' },
      { zh: '客戶委託設計任務，用戶是最終使用產品的人', en: 'The client commissions the task; the user is who ultimately uses the product' },
      { zh: '用戶支付費用，客戶不付費', en: 'The user pays; the client does not' },
      { zh: '客戶製作產品，用戶設計產品', en: 'The client makes the product; the user designs it' },
    ],
    correct: 1,
    explanation: { zh: '客戶提出設計需求（如學校或企業），用戶是最終使用產品的人（如學生或消費者）。兩者可重疊但通常不同。', en: 'The client commissions the design task (e.g. a school or company); the user is who ultimately uses the product (e.g. students or consumers). They may overlap but are often different.' },
  },
  {
    id: 'myp5',
    question: { zh: '以下哪項最能描述「設計簡報 (Design Brief)」？', en: 'Which best describes a "Design Brief"?' },
    options: [
      { zh: '詳細說明所有製造步驟的文件', en: 'A document detailing all manufacturing steps' },
      { zh: '簡短聲明，概述設計任務的目的和期望成果', en: 'A short statement outlining the purpose and desired outcomes of the design task' },
      { zh: '評估最終產品的量規', en: 'A rubric for assessing the final product' },
      { zh: '列出設計構思的創意板', en: 'A mood board listing design ideas' },
    ],
    correct: 1,
    explanation: { zh: '設計簡報是一份簡短聲明，說明要解決的問題、目標用戶及期望成果，為整個設計項目提供方向。', en: 'A design brief is a short statement defining the problem, target users, and desired outcomes — giving direction to the entire design project.' },
  },
  {
    id: 'myp6',
    question: { zh: 'MYP Design 準則 C 的「製作記錄」中，最重要的是記錄什麼？', en: 'In MYP Criterion C making documentation, what is most important to record?' },
    options: [
      { zh: '只記錄最終成品的照片', en: 'Only photos of the final product' },
      { zh: '每個步驟的決策、困難、修改及安全操作', en: 'Decisions made at each step, difficulties, modifications, and safe working practice' },
      { zh: '材料採購清單', en: 'A material purchasing list' },
      { zh: '與同學作品的比較', en: "Comparisons with classmates' work" },
    ],
    correct: 1,
    explanation: { zh: '準則C要求詳細記錄製作過程，包括每步驟的決策、遇到的問題、修改及安全操作，展示有計劃的製作思路。', en: 'Criterion C requires detailed records of decisions, problems encountered, modifications, and safe working — demonstrating a planned and reflective making process.' },
  },
  {
    id: 'myp7',
    question: { zh: 'MYP Design 的「可持續性」考量通常涵蓋哪三個維度？', en: 'Which three dimensions does "sustainability" typically cover in MYP Design?' },
    options: [
      { zh: '速度、成本、美觀', en: 'Speed, cost, aesthetics' },
      { zh: '環境、社會、經濟', en: 'Environment, social, economic' },
      { zh: '功能、耐用、安全', en: 'Function, durability, safety' },
      { zh: '設計、製作、評估', en: 'Design, making, evaluation' },
    ],
    correct: 1,
    explanation: { zh: '可持續性涵蓋環境（減少廢物和能耗）、社會（公平勞工和社區影響）和經濟（長期可行性）三個維度。', en: 'Sustainability covers environmental (reducing waste/energy), social (fair labour and community impact), and economic (long-term viability) dimensions.' },
  },
  {
    id: 'myp8',
    question: { zh: 'MYP 準則 D「評鑑」最主要的任務是什麼？', en: 'What is the main task of MYP Criterion D "Evaluating"?' },
    options: [
      { zh: '描述製作過程', en: 'Describe the making process' },
      { zh: '根據設計規格測試成品，收集用戶反饋並提出改進', en: 'Test against the design specification, collect user feedback, and suggest improvements' },
      { zh: '繪製最終設計方案', en: 'Draw the final design solution' },
      { zh: '列出使用的材料', en: 'List the materials used' },
    ],
    correct: 1,
    explanation: { zh: '準則D要求學生按設計規格測試成品、收集客戶和用戶反饋，並提出具體改進建議，展示批判性反思能力。', en: 'Criterion D requires testing against the PDS, gathering client/user feedback, and making specific improvement suggestions — demonstrating critical reflection.' },
  },
];

const ibMypFlashcards = [
  { front: { zh: '設計簡報 (Design Brief)', en: 'Design Brief' }, back: { zh: '簡短聲明，說明設計任務的目的、目標用戶及期望成果，為整個設計項目提供方向。', en: 'A short statement defining the purpose, target users, and desired outcomes of the design task — providing direction for the project.' } },
  { front: { zh: '產品設計規格 (PDS)', en: 'Product Design Specification (PDS)' }, back: { zh: '詳細的設計標準清單，說明成品必須滿足的所有要求（功能、尺寸、材料、安全、美觀等）。', en: 'A detailed list of criteria specifying all requirements the final product must meet (function, size, materials, safety, aesthetics, etc.).' } },
  { front: { zh: 'MYP 準則 A', en: 'MYP Criterion A' }, back: { zh: '探究與分析——陳述問題、描述設計情境、列出用戶/功能需求、分析現有類似產品。', en: 'Inquiring and Analyzing — state the problem, describe context, list requirements, and analyse comparable existing products.' } },
  { front: { zh: 'MYP 準則 B', en: 'MYP Criterion B' }, back: { zh: '發展設計構思——制定設計規格（PDS），生成多個設計構思草圖，選擇並詳細說明最佳方案。', en: 'Developing Ideas — create PDS, generate multiple sketched design ideas, select and detail the chosen solution.' } },
  { front: { zh: 'MYP 準則 C', en: 'MYP Criterion C' }, back: { zh: '創建解決方案——計劃製作步驟，應用技術技能，安全操作，詳細記錄製作過程與所有修改。', en: 'Creating the Solution — plan steps, apply technical skills, work safely, and document the making process and all modifications in detail.' } },
  { front: { zh: 'MYP 準則 D', en: 'MYP Criterion D' }, back: { zh: '評鑑——根據PDS測試成品，收集用戶和客戶反饋，評估成效，提出具體改進建議。', en: 'Evaluating — test against the PDS, collect user/client feedback, assess effectiveness, and suggest specific improvements.' } },
  { front: { zh: '原型 (Prototype)', en: 'Prototype' }, back: { zh: '設計構思的測試版本，用於評估是否符合規格、識別問題，在最終製作前進行改良。', en: 'A test version of a design used to check against specs, identify problems, and improve before final production.' } },
  { front: { zh: '人因工程 (Ergonomics)', en: 'Ergonomics' }, back: { zh: '研究人與產品/環境互動的學科，目標是設計出安全、舒適、高效的產品，減少疲勞和受傷風險。', en: 'The study of how people interact with products and environments — designing for safety, comfort, and efficiency to minimise fatigue and injury.' } },
];

// ─── Year Groups & Topic Catalogs ────────────────────────────────────────────

type BankId = 'dse-junior' | 'dse-senior' | 'ib-myp' | 'ib-dp';
type TopicDef = { id: string; label: { zh: string; en: string } };
type FlashCard = { front: { zh: string; en: string }; back: { zh: string; en: string }; topicId?: string };

const yearGroupDefs: { id: string; shortLabel: string; group: 'DSE' | 'IB MYP' | 'IB DP'; bank: BankId }[] = [
  { id: 'S1', shortLabel: 'S1', group: 'DSE', bank: 'dse-junior' },
  { id: 'S2', shortLabel: 'S2', group: 'DSE', bank: 'dse-junior' },
  { id: 'S3', shortLabel: 'S3', group: 'DSE', bank: 'dse-junior' },
  { id: 'S4', shortLabel: 'S4', group: 'DSE', bank: 'dse-senior' },
  { id: 'S5', shortLabel: 'S5', group: 'DSE', bank: 'dse-senior' },
  { id: 'S6', shortLabel: 'S6', group: 'DSE', bank: 'dse-senior' },
  { id: 'MYP Y1', shortLabel: 'Y1', group: 'IB MYP', bank: 'ib-myp' },
  { id: 'MYP Y2', shortLabel: 'Y2', group: 'IB MYP', bank: 'ib-myp' },
  { id: 'MYP Y3', shortLabel: 'Y3', group: 'IB MYP', bank: 'ib-myp' },
  { id: 'MYP Y4', shortLabel: 'Y4', group: 'IB MYP', bank: 'ib-myp' },
  { id: 'MYP Y5', shortLabel: 'Y5', group: 'IB MYP', bank: 'ib-myp' },
  { id: 'DP Y1', shortLabel: 'Y1', group: 'IB DP', bank: 'ib-dp' },
  { id: 'DP Y2', shortLabel: 'Y2', group: 'IB DP', bank: 'ib-dp' },
];

const topicsByBank: Record<BankId, TopicDef[]> = {
  'dse-junior': [
    { id: 'safety', label: { zh: '工坊安全', en: 'Workshop Safety' } },
    { id: 'materials', label: { zh: '材料', en: 'Materials' } },
    { id: 'mechanisms', label: { zh: '機構', en: 'Mechanisms' } },
    { id: 'structures', label: { zh: '結構', en: 'Structures' } },
    { id: 'design-process', label: { zh: '設計過程', en: 'Design Process' } },
    { id: 'sustainability', label: { zh: '可持續性', en: 'Sustainability' } },
  ],
  'dse-senior': [
    { id: 'ucd', label: { zh: '用戶中心設計', en: 'UCD' } },
    { id: 'control-systems', label: { zh: '控制系統', en: 'Control Systems' } },
    { id: 'materials', label: { zh: '材料', en: 'Materials' } },
    { id: 'cad-cam', label: { zh: 'CAD/CAM', en: 'CAD/CAM' } },
    { id: 'electronics', label: { zh: '電子學', en: 'Electronics' } },
    { id: 'sustainability', label: { zh: '可持續性', en: 'Sustainability' } },
    { id: 'design-process', label: { zh: '設計過程', en: 'Design Process' } },
  ],
  'ib-myp': [
    { id: 'design-cycle', label: { zh: '設計周期', en: 'Design Cycle' } },
    { id: 'criteria', label: { zh: '評核準則', en: 'Assessment Criteria' } },
    { id: 'prototyping', label: { zh: '原型製作', en: 'Prototyping' } },
    { id: 'sustainability', label: { zh: '可持續性', en: 'Sustainability' } },
    { id: 'materials', label: { zh: '材料 / 用戶', en: 'Materials & Users' } },
  ],
  'ib-dp': [
    { id: 'lca-sustainability', label: { zh: 'LCA / 可持續', en: 'LCA & Sustainability' } },
    { id: 'human-factors', label: { zh: '人因工程', en: 'Human Factors' } },
    { id: 'cad-cam', label: { zh: 'CAD/CAM', en: 'CAD/CAM' } },
    { id: 'manufacturing', label: { zh: '製造', en: 'Manufacturing' } },
    { id: 'design-cycle', label: { zh: '設計周期', en: 'Design Cycle' } },
    { id: 'materials', label: { zh: '材料', en: 'Materials' } },
  ],
};

const topicQuestionMap: Record<string, string[]> = {
  'dse-junior:safety': ['dj1'],
  'dse-junior:materials': ['dj2', 'dj4'],
  'dse-junior:mechanisms': ['dj3', 'dj6'],
  'dse-junior:structures': ['dj8'],
  'dse-junior:design-process': ['dj5'],
  'dse-junior:sustainability': ['dj7'],
  'dse-senior:ucd': ['ds1'],
  'dse-senior:control-systems': ['ds2'],
  'dse-senior:sustainability': ['ds3', 'ds7'],
  'dse-senior:materials': ['ds4'],
  'dse-senior:cad-cam': ['ds5'],
  'dse-senior:electronics': ['ds6'],
  'dse-senior:design-process': ['ds8'],
  'ib-dp:lca-sustainability': ['q1', 'q4'],
  'ib-dp:human-factors': ['q2'],
  'ib-dp:cad-cam': ['q3'],
  'ib-dp:design-cycle': ['q5', 'q7'],
  'ib-dp:manufacturing': ['q6'],
  'ib-dp:materials': ['q8'],
  'ib-myp:design-cycle': ['myp1', 'myp5'],
  'ib-myp:criteria': ['myp2', 'myp3', 'myp6', 'myp8'],
  'ib-myp:prototyping': ['myp6'],
  'ib-myp:sustainability': ['myp7'],
  'ib-myp:materials': ['myp4'],
};

const topicCardMap: Record<string, number[]> = {
  'dse-junior:materials': [0, 2, 6],
  'dse-junior:mechanisms': [1],
  'dse-junior:structures': [3, 5],
  'dse-junior:design-process': [4, 7],
  'dse-junior:safety': [],
  'dse-junior:sustainability': [],
  'dse-senior:design-process': [0, 1, 3],
  'dse-senior:ucd': [2, 7],
  'dse-senior:electronics': [4],
  'dse-senior:control-systems': [5],
  'dse-senior:cad-cam': [6],
  'dse-senior:materials': [],
  'dse-senior:sustainability': [],
  'ib-dp:human-factors': [0, 3],
  'ib-dp:lca-sustainability': [1, 6],
  'ib-dp:design-cycle': [2],
  'ib-dp:manufacturing': [4, 7],
  'ib-dp:cad-cam': [5],
  'ib-dp:materials': [],
  'ib-myp:design-cycle': [0, 1],
  'ib-myp:criteria': [2, 3, 4, 5],
  'ib-myp:prototyping': [6],
  'ib-myp:materials': [7],
  'ib-myp:sustainability': [],
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

const getBankId = (yg: string): BankId => yearGroupDefs.find(y => y.id === yg)?.bank ?? 'dse-junior';

const curriculumByBank: Record<BankId, QuestionCurriculum> = {
  'ib-dp': 'IB DP Design Technology',
  'ib-myp': 'IB MYP Design',
  'dse-senior': 'HKDSE DAT',
  'dse-junior': 'EDB DT',
};

const yearGroupMap: Record<string, QuestionYearGroup> = {
  S1: 'S1',
  S2: 'S2',
  S3: 'S3',
  S4: 'S4',
  S5: 'S5',
  S6: 'S6',
  'MYP Y1': 'Y6',
  'MYP Y2': 'Y7',
  'MYP Y3': 'Y8',
  'MYP Y4': 'Y9',
  'MYP Y5': 'Y10',
  'DP Y1': 'Y11',
  'DP Y2': 'Y12',
};

const questionToQuiz = (item: QuestionItem): QuizQuestion => {
  const correct = item.options.findIndex((option) => option === item.correctAnswer);
  return {
    id: item.id,
    topicId: item.topicId,
    question: { zh: item.question, en: item.question },
    options: item.options.map((option) => ({ zh: option, en: option })),
    correct: correct >= 0 ? correct : 0,
    explanation: { zh: item.explanation, en: item.explanation },
  };
};

const getQuizBank = (bankId: BankId, yearGroup?: string, practiceTopic?: string): QuizQuestion[] => {
  const baseQuestions = ({
    'ib-dp': ibQuizBank,
    'ib-myp': ibMypQuizBank,
    'dse-senior': dseSeniorQuizBank,
    'dse-junior': dseJuniorQuizBank,
  } as Record<BankId, QuizQuestion[]>)[bankId];
  if (!yearGroup) return baseQuestions;

  const externalYearGroup = yearGroupMap[yearGroup];
  if (!externalYearGroup) return baseQuestions;

  const addOnQuestions = getQuestionsForPractice({
    curriculum: curriculumByBank[bankId],
    yearGroup: externalYearGroup,
    gameMode: 'quiz',
  }).map(questionToQuiz);

  const forcedTopicQuestions = practiceTopic?.startsWith('design-skill-')
    ? getQuestionsForPractice({ topicId: practiceTopic, gameMode: 'quiz' }).map(questionToQuiz)
    : [];

  const seen = new Set<string>();
  return [...baseQuestions, ...addOnQuestions, ...forcedTopicQuestions].filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
};

const getFlashcards = (bankId: BankId): FlashCard[] => (({
  'ib-dp': ibFlashcards, 'ib-myp': ibMypFlashcards, 'dse-senior': dseSeniorFlashcards, 'dse-junior': dseJuniorFlashcards,
} as Record<BankId, FlashCard[]>)[bankId]);

const getTopicsForBank = (bankId: BankId, yearGroup: string, practiceTopic?: string): TopicDef[] => {
  const externalYearGroup = yearGroupMap[yearGroup];
  if (!externalYearGroup) return topicsByBank[bankId];

  const addOnTopics = getQuestionTopicsForPractice({
    curriculum: curriculumByBank[bankId],
    yearGroup: externalYearGroup,
    gameMode: 'quiz',
  }).map((topic) => ({
    id: topic.id,
    label: { zh: topic.title, en: topic.title },
  }));

  const forcedTopic = practiceTopic?.startsWith('design-skill-')
    ? getQuestionTopicsForPractice({ gameMode: 'quiz' }).find((topic) => topic.id === practiceTopic)
    : undefined;
  const forcedTopics = forcedTopic ? [{ id: forcedTopic.id, label: { zh: forcedTopic.title, en: forcedTopic.title } }] : [];

  const seen = new Set<string>();
  return [...topicsByBank[bankId], ...addOnTopics, ...forcedTopics].filter((topic) => {
    if (seen.has(topic.id)) return false;
    seen.add(topic.id);
    return true;
  });
};

const filterQuestions = (questions: QuizQuestion[], bankId: BankId, topic: string): QuizQuestion[] => {
  if (topic === 'all') return questions;
  const ids = topicQuestionMap[`${bankId}:${topic}`] ?? [];
  return questions.filter(q => q.topicId === topic || ids.includes(q.id));
};

const filterCards = (cards: FlashCard[], bankId: BankId, topic: string): FlashCard[] => {
  if (topic === 'all') return cards;
  const indices = topicCardMap[`${bankId}:${topic}`] ?? [];
  return indices.length > 0 ? indices.map(i => cards[i]).filter((c): c is FlashCard => c !== undefined) : cards;
};

const getCurriculumLabel = (bankId: BankId, yg: string, practiceTopic?: string): string => {
  if (practiceTopic?.startsWith('design-skill-')) return 'Shared Design Technology Skills';
  if (bankId === 'ib-dp') return `IB DP Design Technology (${yg})`;
  if (bankId === 'ib-myp') return `IB MYP Design (${yg})`;
  if (bankId === 'dse-senior') return `HKDSE D&T (${yg})`;
  return `HKDSE D&T (${yg})`;
};

const studyQuestionToQuiz = (item: ReturnType<typeof getQuizQuestionsForLevel>[number]): QuizQuestion => {
  const correct = item.options.findIndex((option) => option === item.correctAnswer);
  return {
    id: item.id,
    topicId: item.topicId,
    question: { zh: item.question, en: item.question },
    options: item.options.map((option) => ({ zh: option, en: option })),
    correct: correct >= 0 ? correct : 0,
    explanation: { zh: item.explanation, en: item.explanation },
  };
};

const studyFlashcardToCard = (item: ReturnType<typeof getFlashcardsForLevel>[number]): FlashCard => ({
  front: { zh: item.term, en: item.term },
  back: { zh: `${item.shortDefinition} ${item.example}`, en: `${item.shortDefinition} Example: ${item.example}` },
  topicId: item.topicId,
});

// ─── Sub-components ──────────────────────────────────────────────────────────

const QuizMode = ({ questions, onComplete }: { questions: QuizQuestion[]; onComplete?: (score: number, total: number, xpEarned: number) => void }) => {
  const { t, isEnglish } = useLanguage();
  const { addXp } = useGame();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [finished, setFinished] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const q = questions[current];

  const pick = (val: { zh: string; en: string }) => isEnglish ? val.en : val.zh;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplain(true);
    if (idx === q.correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      const finalScore = scoreRef.current;
      setFinished(true);
      addXp(finalScore * 15);
      onComplete?.(finalScore, questions.length, finalScore * 15);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplain(false);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setShowExplain(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '🎯' : '📚'}</div>
        <h3 className="text-2xl font-bold text-[#2C2A26] mb-2">{t('測驗完成！', 'Quiz Complete!')}</h3>
        <div className="text-4xl font-black mb-2" style={{ color: pct >= 80 ? '#6B9080' : pct >= 50 ? '#CCA068' : '#D5896F' }}>
          {score} / {questions.length}
        </div>
        <p className="text-sm text-[#6B665E] mb-2">{pct}% {t('正確率', 'correct')}</p>
        <p className="text-xs text-[#D5896F] font-bold mb-6">+{score * 15} XP {t('已獲得', 'earned')}</p>
        <p className="text-sm text-[#8C857B] mb-6">
          {pct >= 80 ? t('出色！你已掌握這些概念。', 'Excellent! You have mastered these concepts.') :
           pct >= 50 ? t('不錯！繼續複習較弱的部分。', 'Good effort! Keep revising the weaker areas.') :
           t('繼續努力！重新嘗試一次。', 'Keep going! Try again to improve your score.')}
        </p>
        <button onClick={restart} className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D5896F] text-white rounded-full font-bold text-sm hover:bg-[#C4785E] transition-colors">
          <RotateCcw className="w-4 h-4" /> {t('再試一次', 'Try Again')}
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-2 bg-[#F2EFE9] rounded-full overflow-hidden">
          <div className="h-full bg-[#D5896F] rounded-full transition-all duration-500" style={{ width: `${(current / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-[#8C857B] whitespace-nowrap">{current + 1} / {questions.length}</span>
        <span className="text-xs font-bold text-[#6B9080] whitespace-nowrap">⭐ {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="text-base font-bold text-[#2C2A26] mb-5 leading-relaxed">{pick(q.question)}</p>
          <div className="space-y-3 mb-5">
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.correct;
              const isSelected = idx === selected;
              let bg = 'bg-white border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F]';
              if (selected !== null) {
                if (isCorrect) bg = 'bg-[#E8F5F1] border-[#6B9080] text-[#2C2A26]';
                else if (isSelected) bg = 'bg-[#FFF0EB] border-[#D5896F] text-[#2C2A26]';
                else bg = 'bg-white border-[#E5E0D8] text-[#8C857B] opacity-60';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm text-left ${bg} ${selected === null ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-black flex-shrink-0">
                    {selected !== null && isCorrect ? '✓' : selected !== null && isSelected && !isCorrect ? '✗' : String.fromCharCode(65 + idx)}
                  </span>
                  <span>{pick(opt)}</span>
                </button>
              );
            })}
          </div>

          {showExplain && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#F9F8F6] rounded-xl border border-[#E5E0D8] p-4 mb-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1">{t('解釋', 'Explanation')}</div>
              <p className="text-sm text-[#4A4741] leading-relaxed">{pick(q.explanation)}</p>
            </motion.div>
          )}

          {selected !== null && (
            <div className="flex justify-end">
              <button onClick={next} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2A26] text-white rounded-full text-sm font-bold hover:bg-[#4A4741] transition-colors">
                {current + 1 >= questions.length ? t('查看結果', 'See Results') : t('下一題', 'Next')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FlashcardMode = ({ cards }: { cards: { front: { zh: string; en: string }; back: { zh: string; en: string } }[] }) => {
  const { t, isEnglish } = useLanguage();
  const { addXp } = useGame();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<number[]>([]);
  const [xpAwarded, setXpAwarded] = useState(false);

  const card = cards[index];
  const pick = (val: { zh: string; en: string }) => isEnglish ? val.en : val.zh;

  const markKnown = () => {
    if (!known.includes(index)) {
      const next = [...known, index];
      setKnown(next);
      if (next.length === cards.length && !xpAwarded) {
        addXp(50);
        setXpAwarded(true);
      }
    }
    advance();
  };

  const advance = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % cards.length), 150);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-bold text-[#8C857B]">{index + 1} / {cards.length}</span>
        <span className="text-xs font-bold text-[#6B9080]">✓ {known.length} {t('已掌握', 'known')}</span>
      </div>
      <div className="flex justify-center mb-6">
        <motion.div
          className="w-full max-w-md h-52 cursor-pointer"
          onClick={() => setFlipped((f) => !f)}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#2C2A26] rounded-2xl p-6 text-white" style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29A] mb-3">{t('術語 / Term', 'Term')}</div>
              <div className="text-2xl font-black text-center">{pick(card.front)}</div>
              <div className="text-xs text-[#6B665E] mt-4">{t('點擊翻轉查看解釋', 'Click to flip for the definition')}</div>
            </div>
            {/* Back */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-[#D5896F] p-6" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#D5896F] mb-3">{t('定義 / Definition', 'Definition')}</div>
              <p className="text-sm text-[#2C2A26] text-center leading-relaxed">{pick(card.back)}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={advance} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E0D8] text-sm font-bold text-[#6B665E] hover:bg-[#F9F8F6] transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> {t('再看一次', 'Review Again')}
        </button>
        <button onClick={markKnown} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B9080] text-white text-sm font-bold hover:bg-[#5A7A6F] transition-colors">
          <CheckCircle2 className="w-3.5 h-3.5" /> {t('已掌握', 'Got It!')}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

type Props = { activeTopic?: string; onNavigate: (screen: string, topic?: string) => void };

export const FunLearning = ({ activeTopic, onNavigate }: Props) => {
  const { t, isEnglish } = useLanguage();
  const { user, selectedLevel } = useGame();
  const { results, saveResult, clearAll, leaderboard, overallStats, storageMode } = useClassData();
  const { isAdmin } = useAuth();
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [studentName, setStudentName] = useState('');
  const [playerClass, setPlayerClass] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  const isDirectPracticeTopic = activeTopic?.startsWith('s1-') || activeTopic?.startsWith('design-skill-') || false;
  const defaultYG = isDirectPracticeTopic ? 'S1' : selectedLevel === 'IB' ? 'DP Y1' : selectedLevel === 'S4_S6' ? 'S4' : (selectedLevel as string);
  const [quizYearGroup, setQuizYearGroup] = useState(defaultYG);
  const [quizTopic, setQuizTopic] = useState(isDirectPracticeTopic ? (activeTopic ?? 'all') : 'all');
  const [quizPlaying, setQuizPlaying] = useState(false);
  const [flashYearGroup, setFlashYearGroup] = useState(defaultYG);
  const [flashTopic, setFlashTopic] = useState('all');
  const [flashPlaying, setFlashPlaying] = useState(false);

  const studySelection = parseStudySelection(activeTopic);
  const studyCurriculum = studySelection ? getStudyCurriculum(studySelection.curriculumId) : undefined;
  const studyLevel = studySelection ? getStudyLevel(studySelection.curriculumId, studySelection.levelId) : undefined;
  const studyTopics = studySelection ? getTopicsForLevel(studySelection.curriculumId, studySelection.levelId) : [];
  const quizBankId = getBankId(quizYearGroup);
  const flashBankId = getBankId(flashYearGroup);
  const allQuizQuestions = studySelection
    ? getQuizQuestionsForLevel(studySelection.curriculumId, studySelection.levelId).map(studyQuestionToQuiz)
    : getQuizBank(quizBankId, quizYearGroup, activeTopic);
  const allFlashCards = studySelection
    ? getFlashcardsForLevel(studySelection.curriculumId, studySelection.levelId).map(studyFlashcardToCard)
    : getFlashcards(flashBankId);
  const activeQuizQuestions = studySelection
    ? (quizTopic === 'all' ? allQuizQuestions : allQuizQuestions.filter((question) => question.topicId === quizTopic))
    : filterQuestions(allQuizQuestions, quizBankId, quizTopic);
  const activeFlashCards = studySelection
    ? (flashTopic === 'all' ? allFlashCards : allFlashCards.filter((card) => card.topicId === flashTopic))
    : filterCards(allFlashCards, flashBankId, flashTopic);
  const quizTopics = studySelection
    ? studyTopics.map((topicItem) => ({ id: topicItem.id, label: { zh: topicItem.title, en: topicItem.title } }))
    : getTopicsForBank(quizBankId, quizYearGroup, activeTopic);
  const flashTopics = studySelection
    ? studyTopics.map((topicItem) => ({ id: topicItem.id, label: { zh: topicItem.title, en: topicItem.title } }))
    : topicsByBank[flashBankId];
  const quizCurrLabel = studySelection && studyCurriculum && studyLevel
    ? `${studyCurriculum.shortName} · ${studyLevel.label}`
    : getCurriculumLabel(quizBankId, quizYearGroup, activeTopic);
  const flashCurrLabel = studySelection && studyCurriculum && studyLevel
    ? `${studyCurriculum.shortName} · ${studyLevel.label}`
    : getCurriculumLabel(flashBankId, flashYearGroup);

  const handleQuizYGChange = (yg: string) => { setQuizYearGroup(yg); setQuizTopic('all'); setQuizPlaying(false); };
  const handleFlashYGChange = (yg: string) => { setFlashYearGroup(yg); setFlashTopic('all'); setFlashPlaying(false); };

  const pick = (val: { zh: string; en: string }) => isEnglish ? val.en : val.zh;

  const handleQuizComplete = (score: number, total: number, xpEarned: number) => {
    const name = studentName.trim();
    if (!name) return;
    saveResult({
      studentName: name,
      className: playerClass || 'Design Technology Demo',
      score,
      total,
      pct: Math.round((score / total) * 100),
      xpEarned,
    });
  };

  const exportCsv = () => {
    if (results.length === 0) return;
    const headers = ['Name', 'Class', 'Score', 'Total', 'Pct%', 'XP', 'Date'];
    const rows = results.map((r) =>
      [r.studentName, r.className, r.score, r.total, r.pct, r.xpEarned, new Date(r.date).toLocaleString()].join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techlab_gradebook_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-10 pb-20">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl p-10 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #1F1D2E 0%, #3B2F5A 50%, #5E3D7A 100%)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" style={{ background: '#CCA068' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full mix-blend-screen filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" style={{ background: '#D5896F' }} />
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#E5D9CD] mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            {t('設計科技練習 · 概念鞏固', 'Design Technology Practice')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            {t('趣味學習中心', 'Fun Learning Hub')}
            <span className="block text-xl lg:text-2xl font-semibold text-[#D4C4B0] mt-1">{t('用問答、閃卡與模擬練習支援 IA / SBA / 公開試準備', 'Quizzes, flashcards, and simulations for IA, SBA, and assessment preparation')}</span>
          </h1>
          <p className="text-sm text-[#C8BEB4] max-w-2xl leading-relaxed">
            {t('此區集中於 IB Design Technology 與 HKDSE DAT 的核心概念練習，包括材料、人體工學、可持續設計、建模、製造與評估語言。', 'This area focuses on IB Design Technology and HKDSE DAT practice: materials, ergonomics, sustainable design, modelling, manufacturing, and assessment language.')}
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">
              <Trophy className="w-4 h-4 text-[#CCA068]" /> {user.xp} XP
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">
              <Star className="w-4 h-4 text-[#D5896F]" /> {user.level}
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Games Section ────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-[#D5896F]" />
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('互動遊戲模式', 'Interactive Game Modes')}</h2>
          <span className="text-xs font-bold text-white bg-[#D5896F] px-3 py-1 rounded-full">+XP</span>
        </div>
        <div className="space-y-6">

          {/* ── QUIZ PANEL ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F2EFE9]" style={{ background: 'linear-gradient(135deg, #FFF5F0, #FFF8F6)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#D5896F]/15 rounded-xl flex-shrink-0">
                  <Gamepad2 className="w-5 h-5 text-[#D5896F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#2C2A26]">{t('知識問答挑戰', 'Knowledge Quiz Challenge')}</h3>
                  <p className="text-xs text-[#8C857B] truncate">{quizCurrLabel} · {activeQuizQuestions.length} {t('題', 'questions')}</p>
                </div>
                <span className="text-xs font-black text-[#D5896F] bg-[#D5896F]/10 px-2 py-1 rounded-full flex-shrink-0">+{activeQuizQuestions.length * 15} XP</span>
              </div>
            </div>

            {!quizPlaying && (
              <div className="px-6 pt-5 pb-5 bg-[#FDFCFB] border-b border-[#F2EFE9]">
                {studySelection && (
                  <div className="mb-4 rounded-xl border border-[#E5E0D8] bg-white p-3 text-sm font-bold text-[#6B665E]">
                    {t('已鎖定所選課程：', 'Locked to selected curriculum: ')} {quizCurrLabel}
                  </div>
                )}
                {!studySelection && <div className="mb-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B] mb-2.5">{t('年級 / Year Group', 'Year Group')}</div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#A8A29A] w-14 shrink-0">DSE</span>
                      {yearGroupDefs.filter(yg => yg.group === 'DSE').map(yg => (
                        <button key={yg.id} onClick={() => handleQuizYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${quizYearGroup === yg.id ? 'bg-[#D5896F] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#FFF5F0] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#6B9080] w-14 shrink-0">IB MYP</span>
                      {yearGroupDefs.filter(yg => yg.group === 'IB MYP').map(yg => (
                        <button key={yg.id} onClick={() => handleQuizYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${quizYearGroup === yg.id ? 'bg-[#6B9080] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#EFF5F3] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#CCA068] w-14 shrink-0">IB DP</span>
                      {yearGroupDefs.filter(yg => yg.group === 'IB DP').map(yg => (
                        <button key={yg.id} onClick={() => handleQuizYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${quizYearGroup === yg.id ? 'bg-[#CCA068] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#FBF5EC] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                  </div>
                </div>}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B] mb-2.5">{t('主題篩選 / Topic', 'Filter by Topic')}</div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => setQuizTopic('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${quizTopic === 'all' ? 'bg-[#2C2A26] text-white' : 'bg-white text-[#6B665E] hover:bg-[#F2EFE9] border border-[#E5E0D8]'}`}
                    >{t('全部', 'All')} ({allQuizQuestions.length})</button>
                    {quizTopics.map(tp => {
                      const cnt = filterQuestions(allQuizQuestions, quizBankId, tp.id).length;
                      return (
                        <button key={tp.id} onClick={() => cnt > 0 && setQuizTopic(tp.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            quizTopic === tp.id ? 'bg-[#D5896F] text-white' :
                            cnt > 0 ? 'bg-white text-[#6B665E] hover:bg-[#FFF5F0] border border-[#E5E0D8]' :
                            'bg-[#F2EFE9] text-[#C4BDB6] border border-[#EDE8E0] cursor-default'
                          }`}
                        >{isEnglish ? tp.label.en : tp.label.zh}{cnt > 0 ? ` (${cnt})` : ''}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              {quizPlaying ? (
                <div>
                  <QuizMode key={`${quizYearGroup}-${quizTopic}`} questions={activeQuizQuestions} onComplete={handleQuizComplete} />
                  <button onClick={() => setQuizPlaying(false)} className="mt-4 text-xs text-[#8C857B] hover:text-[#D5896F] underline">
                    ← {t('返回選擇', 'Back to selector')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1 block">{t('學生姓名', 'Student Name')}</label>
                      <input value={studentName} onChange={e => setStudentName(e.target.value)}
                        placeholder={t('輸入姓名（選填）', 'Name (optional)')}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E5E0D8] focus:outline-none focus:border-[#D5896F] bg-[#F9F8F6]" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1 block">{t('班別', 'Class')}</label>
                      <select value={playerClass} onChange={e => setPlayerClass(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#E5E0D8] focus:outline-none focus:border-[#D5896F] bg-[#F9F8F6]">
                        <option value="">{t('選擇年組', 'Select year group')}</option>
                        <optgroup label="DSE">
                          <option value="S1">S1 中一</option>
                          <option value="S2">S2 中二</option>
                          <option value="S3">S3 中三</option>
                          <option value="S4">S4 中四</option>
                          <option value="S5">S5 中五</option>
                          <option value="S6">S6 中六</option>
                        </optgroup>
                        <optgroup label="IB MYP">
                          <option value="MYP Y1">MYP Year 1</option>
                          <option value="MYP Y2">MYP Year 2</option>
                          <option value="MYP Y3">MYP Year 3</option>
                          <option value="MYP Y4">MYP Year 4</option>
                          <option value="MYP Y5">MYP Year 5</option>
                        </optgroup>
                        <optgroup label="IB DP">
                          <option value="DP Y1">DP Year 1</option>
                          <option value="DP Y2">DP Year 2</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  {!studentName.trim() && (
                    <p className="text-[10px] text-[#A8A29A]">{t('填寫姓名後成績將自動儲存至班級成績冊', 'Enter your name to save your score to the gradebook')}</p>
                  )}
                  {activeQuizQuestions.length === 0 && (
                    <p className="rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">
                      {t('此篩選暫時未有題目。請嘗試其他主題或年級。', 'No questions available for this filter yet. Try another topic or year group.')}
                    </p>
                  )}
                  <button onClick={() => setQuizPlaying(true)}
                    disabled={activeQuizQuestions.length === 0}
                    className="w-full py-3 bg-[#D5896F] text-white rounded-xl font-bold text-sm hover:bg-[#C4785E] transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-45">
                    <Zap className="w-4 h-4" /> {t('開始挑戰', 'Start Challenge')} · {activeQuizQuestions.length} {t('題', 'Q')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── FLASHCARD PANEL ──────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F2EFE9]" style={{ background: 'linear-gradient(135deg, #F0F6F4, #F5FAF8)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#6B9080]/15 rounded-xl flex-shrink-0">
                  <Layers className="w-5 h-5 text-[#6B9080]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#2C2A26]">{t('術語閃卡練習', 'Terminology Flashcards')}</h3>
                  <p className="text-xs text-[#8C857B] truncate">{flashCurrLabel} · {activeFlashCards.length} {t('張', 'cards')}</p>
                </div>
                <span className="text-xs font-black text-[#6B9080] bg-[#6B9080]/10 px-2 py-1 rounded-full flex-shrink-0">+50 XP</span>
              </div>
            </div>

            {!flashPlaying && (
              <div className="px-6 pt-5 pb-5 bg-[#FDFCFB] border-b border-[#F2EFE9]">
                {studySelection && (
                  <div className="mb-4 rounded-xl border border-[#E5E0D8] bg-white p-3 text-sm font-bold text-[#6B665E]">
                    {t('已鎖定所選課程：', 'Locked to selected curriculum: ')} {flashCurrLabel}
                  </div>
                )}
                {!studySelection && <div className="mb-4">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B] mb-2.5">{t('年級 / Year Group', 'Year Group')}</div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#A8A29A] w-14 shrink-0">DSE</span>
                      {yearGroupDefs.filter(yg => yg.group === 'DSE').map(yg => (
                        <button key={yg.id} onClick={() => handleFlashYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${flashYearGroup === yg.id ? 'bg-[#D5896F] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#FFF5F0] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#6B9080] w-14 shrink-0">IB MYP</span>
                      {yearGroupDefs.filter(yg => yg.group === 'IB MYP').map(yg => (
                        <button key={yg.id} onClick={() => handleFlashYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${flashYearGroup === yg.id ? 'bg-[#6B9080] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#EFF5F3] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-black text-[#CCA068] w-14 shrink-0">IB DP</span>
                      {yearGroupDefs.filter(yg => yg.group === 'IB DP').map(yg => (
                        <button key={yg.id} onClick={() => handleFlashYGChange(yg.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${flashYearGroup === yg.id ? 'bg-[#CCA068] text-white shadow-sm' : 'bg-white text-[#6B665E] hover:bg-[#FBF5EC] border border-[#E5E0D8]'}`}
                        >{yg.shortLabel}</button>
                      ))}
                    </div>
                  </div>
                </div>}
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B] mb-2.5">{t('主題篩選 / Topic', 'Filter by Topic')}</div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => setFlashTopic('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${flashTopic === 'all' ? 'bg-[#2C2A26] text-white' : 'bg-white text-[#6B665E] hover:bg-[#F2EFE9] border border-[#E5E0D8]'}`}
                    >{t('全部', 'All')} ({allFlashCards.length})</button>
                    {flashTopics.map(tp => {
                      const cnt = filterCards(allFlashCards, flashBankId, tp.id).length;
                      return (
                        <button key={tp.id} onClick={() => cnt > 0 && setFlashTopic(tp.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                            flashTopic === tp.id ? 'bg-[#6B9080] text-white' :
                            cnt > 0 ? 'bg-white text-[#6B665E] hover:bg-[#EFF5F3] border border-[#E5E0D8]' :
                            'bg-[#F2EFE9] text-[#C4BDB6] border border-[#EDE8E0] cursor-default'
                          }`}
                        >{isEnglish ? tp.label.en : tp.label.zh}{cnt > 0 ? ` (${cnt})` : ''}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              {flashPlaying ? (
                <div>
                  <FlashcardMode key={`${flashYearGroup}-${flashTopic}`} cards={activeFlashCards} />
                  <button onClick={() => setFlashPlaying(false)} className="mt-4 text-xs text-[#8C857B] hover:text-[#6B9080] underline">
                    ← {t('返回選擇', 'Back to selector')}
                  </button>
                </div>
              ) : (
                <>
                  {activeFlashCards.length === 0 && (
                    <p className="mb-3 rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">
                      {t('此篩選暫時未有閃卡。請嘗試其他主題或年級。', 'No flashcards available for this filter yet. Try another topic or year group.')}
                    </p>
                  )}
                  <button onClick={() => setFlashPlaying(true)}
                    disabled={activeFlashCards.length === 0}
                    className="w-full py-3 bg-[#6B9080] text-white rounded-xl font-bold text-sm hover:bg-[#5A7A6F] transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-45">
                    <BookOpen className="w-4 h-4" /> {t('開始練習', 'Start Practising')} · {activeFlashCards.length} {t('張', 'cards')}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── DRIVING GAME PANEL ───────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#F2EFE9]" style={{ background: 'linear-gradient(135deg, #F0F4FF, #F5F0FF)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#7B68EE]/15 rounded-xl flex-shrink-0">
                  <Car className="w-5 h-5 text-[#7B68EE]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#2C2A26]">{t('設計科技賽車學習遊戲', 'D&T Driving Learning Game')}</h3>
                  <p className="text-xs text-[#8C857B] truncate">{t('駕駛賽車、收集硬幣、回答科技知識問答，賺取 XP！', 'Race your car, collect coins, answer D&T checkpoints, earn XP!')}</p>
                </div>
                <span className="text-xs font-black text-[#7B68EE] bg-[#7B68EE]/10 px-2 py-1 rounded-full flex-shrink-0">+XP</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3 text-xs text-[#6B665E] mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EFE9] rounded-full">
                  <Zap className="w-3.5 h-3.5 text-[#CCA068]" /> {activeQuizQuestions.length} {t('道科技問答', 'D&T questions')}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EFE9] rounded-full">
                  <Star className="w-3.5 h-3.5 text-[#D5896F]" /> {t('XP 加速模式', 'XP Boost mode')}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F2EFE9] rounded-full">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#7B68EE]" /> {t('鍵盤 / 觸控控制', 'Keyboard / touch controls')}
                </span>
              </div>
              <button
                onClick={() => onNavigate('driving_game', studySelection ? activeTopic : undefined)}
                className="w-full py-3 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #7B68EE, #9B88FF)' }}
              >
                <Car className="w-4 h-4" /> {t('開始駕駛遊戲', 'Launch Driving Game')}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Practice Design Principles ───────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-[#CCA068]" />
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('設計科技練習設計原則', 'Design Technology Practice Design')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Trophy, color: '#CCA068', bg: '#FBF5EC', title: { zh: '積分與排行榜', en: 'Points & Leaderboards' }, body: { zh: '即時反饋系統——學生可以看到自己的進步，競爭榜單激發向上動力。研究顯示適度競爭可提升學習投入度達 40%。', en: 'Instant feedback systems — students see their progress in real time, and leaderboards inspire healthy competition. Research shows moderate competition boosts engagement by up to 40%.' } },
            { icon: Star, color: '#D5896F', bg: '#FFF5F0', title: { zh: '徽章與成就', en: 'Badges & Achievements' }, body: { zh: '里程碑式認可——每完成一個知識單元就解鎖新徽章，象徵性獎勵對內在動機有持久影響。', en: 'Milestone-based recognition — unlock a badge for every knowledge unit completed. Symbolic rewards have a lasting impact on intrinsic motivation.' } },
            { icon: TrendingUp, color: '#6B9080', bg: '#EFF5F3', title: { zh: '進度條與等級', en: 'Progress Bars & Levels' }, body: { zh: '視覺化進度——讓學生清楚看見「距離目標還有多遠」，完成感驅動持續努力。XP 等級系統強化長期堅持。', en: 'Visual progress — students see clearly how far they are from their goal. The sense of completion drives sustained effort. XP level systems reinforce long-term commitment.' } },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -3 }} className="rounded-2xl border border-[#E5E0D8] shadow-sm p-6" style={{ background: item.bg }}>
              <div className="p-2.5 rounded-xl inline-block mb-3" style={{ background: `${item.color}20` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h3 className="font-bold text-[#2C2A26] mb-2">{pick(item.title)}</h3>
              <p className="text-xs text-[#6B665E] leading-relaxed">{pick(item.body)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Study Strategy Tips ──────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-[#8A9A5B]" />
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('科學實證學習技巧', 'Evidence-based Study Strategies')}</h2>
        </div>
        <div className="space-y-3">
          {studyTips.map((item, i) => {
            const open = expandedTip === i;
            return (
              <div key={i} className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
                <button onClick={() => setExpandedTip(open ? null : i)} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FDFCFB] transition-colors">
                  <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${item.color}15` }}>
                    <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  </div>
                  <span className="font-bold text-[#2C2A26] flex-1">{pick(item.tip)}</span>
                  {open ? <ChevronDown className="w-4 h-4 text-[#8C857B]" /> : <ChevronRight className="w-4 h-4 text-[#8C857B]" />}
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-[#6B665E] leading-relaxed">{pick(item.detail)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Class Gradebook ─────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-[#7B8FA1]" />
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('班級成績冊', 'Class Gradebook')}</h2>
          <span className="text-xs font-bold text-white bg-[#7B8FA1] px-3 py-1 rounded-full">{t('自動儲存', 'Auto-saved')}</span>
        </div>
        <p className="text-sm text-[#6B665E] mb-2">{t('完成問答挑戰時輸入姓名及班別，成績會即時儲存於此示範排行榜。', 'Enter your name and class before a quiz; scores are saved to this demo leaderboard.')}</p>
        <p className="text-xs text-[#A8A29A] mb-6">
          {storageMode === 'demo-local'
            ? t('示範模式：資料只儲存在此瀏覽器。正式學校版本必須使用安全資料庫、教師帳戶、學生帳戶、班級權限、私隱同意及評估記錄保護。', 'Demo mode: data is stored only in this browser. Production schools must use a secure database, teacher accounts, student accounts, class permissions, privacy consent, and protected assessment records.')
            : t('正式資料儲存模式已啟用。', 'Production storage mode is enabled.')}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: t('總挑戰次數', 'Total Attempts'), value: overallStats.totalAttempts || '—', color: '#D5896F', icon: BarChart3 },
            { label: t('獨立學生數', 'Unique Students'), value: overallStats.uniqueStudents || '—', color: '#6B9080', icon: Users },
            { label: t('全班平均分', 'Class Avg'), value: overallStats.totalAttempts ? `${overallStats.avgPct}%` : '—', color: '#CCA068', icon: TrendingUp },
            { label: t('最高分', 'Top Score'), value: overallStats.topStudent ? `${overallStats.topStudent.bestPct}%` : '—', color: '#8A9A5B', icon: Trophy },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E5E0D8] p-4 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-0.5">{stat.label}</div>
                <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden mb-4">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F2EFE9]">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#CCA068]" />
              <h3 className="font-bold text-[#2C2A26]">{t('排行榜（最佳成績）', 'Leaderboard (Best Score)')}</h3>
              <span className="text-xs text-[#8C857B]">{leaderboard.length} {t('名學生', 'students')}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportCsv}
                disabled={results.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#F9F8F6] border border-[#E5E0D8] rounded-lg hover:border-[#6B9080] text-[#6B665E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" /> {t('匯出 CSV', 'Export CSV')}
              </button>
              {isAdmin && (!confirmClear ? (
                <button
                  onClick={() => setConfirmClear(true)}
                  disabled={results.length === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#F9F8F6] border border-[#E5E0D8] rounded-lg hover:border-[#D5896F] text-[#8C857B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-3.5 h-3.5" /> {t('清除全部', 'Clear All')}
                </button>
              ) : (
                <div className="flex gap-1">
                  <button onClick={() => { clearAll(); setConfirmClear(false); }} className="px-3 py-1.5 text-xs font-bold bg-[#D5896F] text-white rounded-lg hover:bg-[#C4785E] transition-colors">
                    {t('確認清除', 'Confirm')}
                  </button>
                  <button onClick={() => setConfirmClear(false)} className="px-3 py-1.5 text-xs font-bold bg-[#F9F8F6] border border-[#E5E0D8] rounded-lg text-[#6B665E] hover:bg-white transition-colors">
                    {t('取消', 'Cancel')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="text-5xl mb-4">🏆</div>
              <p className="text-sm font-bold text-[#2C2A26] mb-1">{t('暫無成績記錄', 'No records yet')}</p>
              <p className="text-xs text-[#8C857B] max-w-xs">
                {t('在問答挑戰中輸入姓名並完成測驗，成績將自動出現在此排行榜。', 'Complete a quiz with your name entered — your score will appear here automatically.')}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9F8F6] border-b border-[#E5E0D8]">
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B] w-12">{t('名次', 'Rank')}</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('學生', 'Student')}</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('班別', 'Class')}</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('最佳分', 'Best')}</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('挑戰次數', 'Attempts')}</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('最近日期', 'Last Played')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F9F8F6]">
                  {leaderboard.map((entry, i) => {
                    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : String(i + 1);
                    const scoreColor = entry.bestPct >= 80 ? '#6B9080' : entry.bestPct >= 50 ? '#CCA068' : '#D5896F';
                    return (
                      <tr key={entry.studentName} className="hover:bg-[#FDFCFB] transition-colors">
                        <td className="px-4 py-3 text-center text-lg">{medal}</td>
                        <td className="px-4 py-3 font-bold text-[#2C2A26]">{entry.studentName}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F2EFE9] text-[#6B665E]">{entry.className}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-lg font-black" style={{ color: scoreColor }}>{entry.bestPct}%</span>
                          <span className="text-xs text-[#8C857B] ml-1">({entry.bestScore}/{entry.bestScore > 0 ? Math.round(entry.bestScore / (entry.bestPct / 100)) : 0})</span>
                        </td>
                        <td className="px-4 py-3 text-[#6B665E]">{entry.attempts}</td>
                        <td className="px-4 py-3 text-xs text-[#8C857B]">{new Date(entry.lastDate).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent results log */}
        {results.length > 0 && (
          <div className="bg-[#F9F8F6] rounded-2xl border border-[#E5E0D8] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('最近記錄（最新10筆）', 'Recent Results (Latest 10)')}</div>
            </div>
            <div className="space-y-2">
              {results.slice(0, 10).map((r) => {
                const pctColor = r.pct >= 80 ? '#6B9080' : r.pct >= 50 ? '#CCA068' : '#D5896F';
                return (
                  <div key={r.id} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 border border-[#E5E0D8]">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                      style={{ background: pctColor }}
                    >
                      {r.pct}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[#2C2A26] text-sm">{r.studentName}</span>
                      <span className="text-[#8C857B] text-xs ml-2 font-medium">{r.className}</span>
                    </div>
                    <div className="text-right text-xs text-[#6B665E]">
                      <div className="font-bold">{r.score}/{r.total} {t('題正確', 'correct')}</div>
                      <div className="text-[#A8A29A]">{new Date(r.date).toLocaleDateString()} {new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* ── Quick Nav ────────────────────────────────────────────────────── */}
      <div className="bg-[#F2EFE9] rounded-2xl border border-[#E5E0D8] p-6">
        <h3 className="font-bold text-[#2C2A26] mb-4">{t('繼續學習', 'Continue Learning')}</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: { zh: 'IB Dashboard', en: 'IB Dashboard' }, screen: 'dashboard', color: '#D5896F' },
            { label: { zh: 'IB 資源中心', en: 'IB Resource Library' }, screen: 'ib_resources', color: '#6B9080' },
            { label: { zh: '專題活動中心', en: 'Project Hub' }, screen: 'project_hub', color: '#CCA068' },
            { label: { zh: '課程概覽', en: 'Curriculum Overview' }, screen: 'dashboard', color: '#8A9A5B' },
          ].map((nav) => (
            <button key={nav.screen + nav.label.en} onClick={() => onNavigate(nav.screen)} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E5E0D8] text-sm font-bold hover:border-current transition-colors" style={{ color: nav.color }}>
              {pick(nav.label)} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
