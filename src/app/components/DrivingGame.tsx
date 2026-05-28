/**
 * DrivingGame.tsx
 * Design Technology Learning Racing Game
 * ─────────────────────────────────────────────────────────────────────────────
 * A canvas-based pseudo-3D lane runner inspired by classic road-racing games.
 * Players collect D&T-themed coins, answer checkpoint questions, and activate
 * an XP Boost for 3× score multiplier. Correct answers award XP to the profile.
 *
 * Controls:
 *   Desktop : ← / A  and  → / D  to steer  |  Space / W to accelerate
 *   Mobile  : Left/Right on-screen buttons  |  virtual joystick swipe
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Trophy, Star, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';

// ─── Types ───────────────────────────────────────────────────────────────────

type QuestionData = {
  q:    { zh: string; en: string };
  opts: { zh: string; en: string }[];
  ans:  number; // 0-indexed correct answer
  xp:   number;
};

// ─── D&T Quiz questions used at checkpoints ──────────────────────────────────
// 52 questions across: Safety | Joining & Adhesives | Materials | IB DP DT |
//                      IB MYP DT | DSE DT | Modelling & Prototyping

const DT_QUESTIONS: QuestionData[] = [

  // ══════════════════════════════════════════════════════
  // SAFETY (10 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: '在工場打磨金屬時，必須佩戴哪種個人防護裝備 (PPE)?',
         en: 'When grinding metal in the workshop, which PPE is essential?' },
    opts: [
      { zh: '安全護目鏡', en: 'Safety goggles' },
      { zh: '棉質手套', en: 'Cotton gloves' },
      { zh: '耳機', en: 'Headphones' },
      { zh: '鋼頭鞋', en: 'Steel-toe boots' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '化學品濺入眼睛時，應第一時間怎樣做?',
         en: 'If chemicals splash into your eyes, what should you do FIRST?' },
    opts: [
      { zh: '立即用大量清水沖洗眼睛最少 15 分鐘', en: 'Immediately rinse eyes with plenty of water for at least 15 minutes' },
      { zh: '用紙巾擦乾', en: 'Wipe with a paper towel' },
      { zh: '閉上眼睛等老師過來', en: 'Close your eyes and wait for the teacher' },
      { zh: '繼續工作', en: 'Continue working' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '在工場工作時，長頭髮應如何處理?',
         en: 'How should long hair be managed when working in the workshop?' },
    opts: [
      { zh: '放下來，因為比較舒適', en: 'Left down for comfort' },
      { zh: '用帽子蓋住', en: 'Covered with a hat' },
      { zh: '綁起或戴頭網', en: 'Tied back or covered with a hair net' },
      { zh: '不需要特別處理', en: 'No special treatment needed' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '電器著火時，應使用哪種滅火器?',
         en: 'Which fire extinguisher should be used on an electrical fire?' },
    opts: [
      { zh: '水 (紅色)', en: 'Water (Red)' },
      { zh: '二氧化碳 CO₂ (黑色)', en: 'Carbon dioxide CO₂ (Black)' },
      { zh: '泡沫 (淡黃色)', en: 'Foam (Cream)' },
      { zh: '沙', en: 'Sand' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '使用電鑽前，最重要的安全檢查是什麼?',
         en: 'What is the most important safety check before using a power drill?' },
    opts: [
      { zh: '確保護罩正確安裝及工件已夾緊', en: 'Ensure guard is fitted correctly and workpiece is clamped' },
      { zh: '檢查電線顏色是否正確', en: 'Check the wire colours are correct' },
      { zh: '確認插頭是否乾淨', en: 'Make sure the plug is clean' },
      { zh: '試行空轉幾次', en: 'Do a few test spins first' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '攜帶鑿刀 (chisel) 行走時，刀刃應朝向哪個方向?',
         en: 'When carrying a chisel, which way should the blade face?' },
    opts: [
      { zh: '向上，方便別人看見', en: 'Upward so others can see it' },
      { zh: '向前', en: 'Forward' },
      { zh: '向下，並遮蓋刀刃', en: 'Downward with the blade covered' },
      { zh: '向後', en: 'Backward' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '焊接 (soldering) 時為何需要良好通風?',
         en: 'Why is good ventilation essential when soldering?' },
    opts: [
      { zh: '令焊錫冷卻更快', en: 'To cool the solder faster' },
      { zh: '焊接煙霧含有害化學物，吸入有損健康', en: 'Soldering fumes contain harmful chemicals that are dangerous to inhale' },
      { zh: '防止焊錫氧化', en: 'To prevent the solder from oxidising' },
      { zh: '減少電力消耗', en: 'To reduce electricity use' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '雙手潮濕時，絕對不應做什麼?',
         en: 'What should you NEVER do with wet hands?' },
    opts: [
      { zh: '接觸任何電器或插座', en: 'Touch any electrical equipment or sockets' },
      { zh: '使用手動鋸', en: 'Use a hand saw' },
      { zh: '用鉛筆畫線', en: 'Draw with a pencil' },
      { zh: '量度工件', en: 'Measure a workpiece' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '在工場發生意外，應立即怎樣做?',
         en: 'If an accident occurs in the workshop, what should you do immediately?' },
    opts: [
      { zh: '自行處理後繼續工作', en: 'Handle it yourself and continue working' },
      { zh: '告知同學', en: 'Tell your classmates' },
      { zh: '立即通知老師，按緊急停機掣', en: 'Immediately notify the teacher and press the emergency stop' },
      { zh: '用手機拍照', en: 'Take a photo with your phone' },
    ],
    ans: 2, xp: 30,
  },
  {
    q: { zh: 'COSHH 是指什麼?',
         en: 'What does COSHH stand for?' },
    opts: [
      { zh: 'Control of Sharp and Hazardous Hardware', en: 'Control of Sharp and Hazardous Hardware' },
      { zh: 'Control of Substances Hazardous to Health', en: 'Control of Substances Hazardous to Health' },
      { zh: 'Cutting of Steel and Heavy Hardware', en: 'Cutting of Steel and Heavy Hardware' },
      { zh: 'Certificate of Safe Handling in Hong Kong', en: 'Certificate of Safe Handling in Hong Kong' },
    ],
    ans: 1, xp: 20,
  },

  // ══════════════════════════════════════════════════════
  // JOINING METHODS & ADHESIVES (12 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: '哪種膠水最適合黏合木材或紙板?',
         en: 'Which adhesive is most suitable for bonding wood or cardboard?' },
    opts: [
      { zh: 'PVA 膠水', en: 'PVA glue' },
      { zh: '環氧樹脂 (Epoxy)', en: 'Epoxy resin' },
      { zh: '氰基丙烯酸酯 (Superglue)', en: 'Cyanoacrylate (Superglue)' },
      { zh: '接觸膠 (Contact cement)', en: 'Contact cement' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '環氧樹脂 (Epoxy resin) 最適合用於哪種黏合情況?',
         en: 'Epoxy resin adhesive is best suited for which bonding situation?' },
    opts: [
      { zh: '布料與布料', en: 'Fabric to fabric' },
      { zh: '泡沫膠 (foam) 造型', en: 'Foam modelling' },
      { zh: '金屬與金屬，或金屬與陶瓷的結構性黏合', en: 'Metal-to-metal or metal-to-ceramic structural bonding' },
      { zh: '薄紙張', en: 'Thin paper' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '氰基丙烯酸酯 (Superglue / CA glue) 對哪類物料效果最佳?',
         en: 'Cyanoacrylate (Superglue) works best on which materials?' },
    opts: [
      { zh: '多孔材料如海綿', en: 'Porous materials like sponge' },
      { zh: '硬質且緊密貼合的表面，如陶瓷、橡膠、部分塑料', en: 'Hard, close-fitting surfaces such as ceramics, rubber, and some plastics' },
      { zh: '潮濕木材', en: 'Wet wood' },
      { zh: '玻璃纖維', en: 'Fibreglass' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '接觸膠 (Contact cement / Impact adhesive) 最適合黏合哪類物料?',
         en: 'Contact cement (impact adhesive) is most suitable for:' },
    opts: [
      { zh: '橡膠、皮革、美耐板 (laminate)', en: 'Rubber, leather, and laminate' },
      { zh: '鋁合金結構件', en: 'Aluminium structural parts' },
      { zh: '焊接金屬片', en: 'Welding metal sheets' },
      { zh: '木材榫接', en: 'Wood joinery' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '熱溶膠槍 (Hot glue gun) 最適合快速黏合哪類物料?',
         en: 'A hot glue gun is ideal for quickly bonding which materials?' },
    opts: [
      { zh: '鋼材與鋁材', en: 'Steel and aluminium' },
      { zh: '陶瓷磚', en: 'Ceramic tiles' },
      { zh: '布料、泡沫膠、輕質材料', en: 'Fabric, foam, and lightweight materials' },
      { zh: '硬化混凝土', en: 'Hardened concrete' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '溶劑膠 (Solvent cement) 是透過什麼原理黏合 PVC 或 ABS 塑料的?',
         en: 'How does solvent cement bond PVC or ABS plastic?' },
    opts: [
      { zh: '透過化學反應產生新物質', en: 'Through a chemical reaction creating a new substance' },
      { zh: '溶解表面塑料使其熔合在一起', en: 'By dissolving the plastic surface so it fuses together' },
      { zh: '透過物理壓力夾緊', en: 'By physical clamping pressure' },
      { zh: '加熱後黏合', en: 'Bonding after heating' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '榫卯接合 (Mortise and Tenon joint) 通常用於哪種材料的永久接合?',
         en: 'Mortise and tenon joints are traditionally used for permanent joining of:' },
    opts: [
      { zh: '金屬板', en: 'Metal sheets' },
      { zh: '塑料管', en: 'Plastic pipes' },
      { zh: '木材框架結構', en: 'Timber frame structures' },
      { zh: '玻璃面板', en: 'Glass panels' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '燕尾榫 (Dovetail joint) 的主要優點是什麼?',
         en: 'What is the main advantage of a dovetail joint?' },
    opts: [
      { zh: '最容易製作', en: 'Easiest to make' },
      { zh: '可輕易拆卸', en: 'Can be easily dismantled' },
      { zh: '抵抗拉伸力極強，非常適合製作抽屜和箱體', en: 'Extremely resistant to tensile forces, ideal for drawers and boxes' },
      { zh: '只需要膠水，不需榫接', en: 'Requires only glue, no joinery' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '在模型製作中，哪種材料最適合作「可拆卸的臨時固定」?',
         en: 'In model making, which is best for temporary, removable fixing?' },
    opts: [
      { zh: '萬能膠 / Blu-Tack 或紙膠帶', en: 'Blu-Tack or masking tape' },
      { zh: '環氧樹脂', en: 'Epoxy resin' },
      { zh: '焊接', en: 'Welding' },
      { zh: '鉚釘', en: 'Riveting' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '焊接 (Welding) 是哪種類型的接合方式?',
         en: 'Welding is which type of joining method?' },
    opts: [
      { zh: '臨時機械接合', en: 'Temporary mechanical joint' },
      { zh: '永久性接合，透過高溫熔融金屬', en: 'Permanent joint by melting metal with high heat' },
      { zh: '黏合劑接合', en: 'Adhesive bonding' },
      { zh: '榫卯接合', en: 'Mortise and tenon joint' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '鉚釘 (Rivet) 通常用於哪種情況?',
         en: 'Rivets are typically used for:' },
    opts: [
      { zh: '臨時固定木材模型', en: 'Temporarily fixing wood models' },
      { zh: '黏合橡膠', en: 'Bonding rubber' },
      { zh: '永久連接金屬薄板，不需焊接', en: 'Permanently joining sheet metal without welding' },
      { zh: '修補陶瓷破裂', en: 'Repairing cracked ceramics' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '製作泡沫膠 (foam) 快速概念模型時，哪種膠水最佳且不會溶解泡沫?',
         en: 'Which adhesive is safe for foam models and will NOT dissolve the foam?' },
    opts: [
      { zh: 'UHU 萬能膠 (溶劑型)', en: 'UHU all-purpose (solvent-based)' },
      { zh: '熱溶膠 (Hot glue) 或 PVA', en: 'Hot glue or PVA' },
      { zh: '丙酮基溶劑膠', en: 'Acetone-based solvent cement' },
      { zh: '環氧樹脂', en: 'Epoxy resin' },
    ],
    ans: 1, xp: 25,
  },

  // ══════════════════════════════════════════════════════
  // MATERIALS (8 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: '「鐵系金屬 (Ferrous metals)」的主要特徵是什麼?',
         en: 'What is the key characteristic of ferrous metals?' },
    opts: [
      { zh: '含鐵，通常有磁性，容易生銹', en: 'Contain iron, usually magnetic, and prone to rust' },
      { zh: '非常輕盈，不含鐵', en: 'Very light and iron-free' },
      { zh: '透明或半透明', en: 'Transparent or semi-transparent' },
      { zh: '由植物提煉', en: 'Derived from plants' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '熱塑性塑料 (Thermoplastic) 和熱固性塑料 (Thermosetting plastic) 最大的分別是什麼?',
         en: 'What is the key difference between thermoplastics and thermosetting plastics?' },
    opts: [
      { zh: '熱塑性可加熱重塑，熱固性加熱後永久硬化不可再塑', en: 'Thermoplastics can be reheated and reshaped; thermosets permanently harden and cannot be remoulded' },
      { zh: '兩者都可以無限次重新熔化', en: 'Both can be melted an unlimited number of times' },
      { zh: '熱固性比熱塑性更輕', en: 'Thermosetting plastics are lighter than thermoplastics' },
      { zh: '熱塑性塑料不能回收', en: 'Thermoplastics cannot be recycled' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '複合材料 (Composite material) 是指什麼?',
         en: 'What is a composite material?' },
    opts: [
      { zh: '純天然材料', en: 'A purely natural material' },
      { zh: '由兩種或以上不同材料結合，性能優於各單一材料', en: 'A combination of two or more materials with superior properties to either alone' },
      { zh: '只由金屬製成的合金', en: 'An alloy made only from metals' },
      { zh: '可以透光的材料', en: 'A material that transmits light' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '碳纖維增強聚合物 (CFRP) 有哪些突出特性?',
         en: 'Carbon Fibre Reinforced Polymer (CFRP) is notable for:' },
    opts: [
      { zh: '密度高、易生銹', en: 'High density and prone to rust' },
      { zh: '超高強度重量比 (strength-to-weight ratio)，常用於航空和賽車', en: 'Extremely high strength-to-weight ratio, used in aerospace and motorsport' },
      { zh: '導電性差', en: 'Poor electrical conductivity' },
      { zh: '成本低廉，適合大量生產', en: 'Low cost, suitable for mass production' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '形狀記憶合金 (Shape Memory Alloy, SMA) 是哪類材料?',
         en: 'Shape Memory Alloy (SMA) is an example of which type of material?' },
    opts: [
      { zh: '傳統鐵系金屬', en: 'Traditional ferrous metal' },
      { zh: '熱固性塑料', en: 'Thermosetting plastic' },
      { zh: '智能材料 (Smart material)', en: 'Smart material' },
      { zh: '天然木材', en: 'Natural timber' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '闊葉木 (Hardwood) 和針葉木 (Softwood) 在植物學上的主要分別是什麼?',
         en: 'What is the botanical distinction between hardwood and softwood trees?' },
    opts: [
      { zh: '闊葉木來自落葉闊葉樹，針葉木來自針葉長青樹', en: 'Hardwood comes from deciduous broadleaf trees; softwood from coniferous evergreen trees' },
      { zh: '闊葉木一定比針葉木更硬', en: 'Hardwood is always physically harder than softwood' },
      { zh: '闊葉木生長於熱帶，針葉木只生長於寒帶', en: 'Hardwood grows only in tropics; softwood only in arctic zones' },
      { zh: '兩者沒有分別', en: 'There is no difference' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '鋁 (Aluminium) 比鋼 (Steel) 更常用於飛機機身的主要原因是什麼?',
         en: 'Why is aluminium preferred over steel for aircraft fuselages?' },
    opts: [
      { zh: '鋁更堅硬', en: 'Aluminium is harder' },
      { zh: '鋁的密度遠低於鋼，重量更輕', en: 'Aluminium has a much lower density (lighter weight) than steel' },
      { zh: '鋁不導電', en: 'Aluminium does not conduct electricity' },
      { zh: '鋁更便宜', en: 'Aluminium is cheaper' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '氧化處理 (Anodising) 最常用於哪種金屬?',
         en: 'Anodising is a surface finish most commonly applied to which metal?' },
    opts: [
      { zh: '鋼 (Steel)', en: 'Steel' },
      { zh: '銅 (Copper)', en: 'Copper' },
      { zh: '鋁 (Aluminium)', en: 'Aluminium' },
      { zh: '鉛 (Lead)', en: 'Lead' },
    ],
    ans: 2, xp: 20,
  },

  // ══════════════════════════════════════════════════════
  // IB DP DESIGN TECHNOLOGY (8 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: 'IB DT 設計週期的第一個階段是什麼?',
         en: 'What is the first stage of the IB DT Design Cycle?' },
    opts: [
      { zh: '探究與分析 (Inquiring and Analysing)', en: 'Inquiring and Analysing' },
      { zh: '創造解決方案 (Creating the Solution)', en: 'Creating the Solution' },
      { zh: '評估 (Evaluating)', en: 'Evaluating' },
      { zh: '發展想法 (Developing Ideas)', en: 'Developing Ideas' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '「人體測量學 (Anthropometrics)」在設計中通常使用哪個百分位數範圍?',
         en: 'In design, which percentile range is typically used in anthropometric data?' },
    opts: [
      { zh: '1st 至 99th 百分位', en: '1st to 99th percentile' },
      { zh: '5th 至 95th 百分位', en: '5th to 95th percentile' },
      { zh: '10th 至 90th 百分位', en: '10th to 90th percentile' },
      { zh: '只用 50th 百分位（平均值）', en: '50th percentile (average) only' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '以下哪項最準確描述「計劃性淘汰 (Planned Obsolescence)」?',
         en: 'Which best describes Planned Obsolescence?' },
    opts: [
      { zh: '設計耐用、長壽命的產品', en: 'Designing durable, long-lasting products' },
      { zh: '透過設計令產品在特定時間後失效或過時，促使消費者購買新版本', en: 'Designing products to fail or become outdated after a set time to encourage new purchases' },
      { zh: '改善產品可持續性的策略', en: 'A strategy to improve product sustainability' },
      { zh: '以最低成本生產最高品質', en: 'Producing highest quality at lowest cost' },
    ],
    ans: 1, xp: 30,
  },
  {
    q: { zh: '仿生設計 (Biomimicry) 的核心概念是什麼?',
         en: 'What is the core concept of Biomimicry in design?' },
    opts: [
      { zh: '完全使用人工合成材料', en: 'Using only synthetic materials' },
      { zh: '從自然界生物的結構和功能中獲取設計靈感', en: 'Drawing design inspiration from structures and functions found in nature' },
      { zh: '複製競爭對手的產品', en: "Copying a competitor's products" },
      { zh: '只使用回收材料', en: 'Using only recycled materials' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '在 IB DT 中，「搖籃到墳墓 (Cradle to Grave)」LCA 的四個主要階段按順序是?',
         en: 'In IB DT, the four stages of a "Cradle to Grave" LCA in order are:' },
    opts: [
      { zh: '原材料開採 → 製造 → 使用 → 廢棄處理', en: 'Raw material extraction → Manufacturing → Use → End-of-life disposal' },
      { zh: '設計 → 製造 → 銷售 → 廢棄', en: 'Design → Manufacturing → Sale → Disposal' },
      { zh: '廢棄 → 回收 → 製造 → 使用', en: 'Disposal → Recycling → Manufacturing → Use' },
      { zh: '使用 → 廢棄 → 原材料 → 製造', en: 'Use → Disposal → Raw materials → Manufacturing' },
    ],
    ans: 0, xp: 30,
  },
  {
    q: { zh: '以下哪種 3D 打印技術使用光固化樹脂 (resin) 為原材料?',
         en: 'Which 3D printing technology uses photocurable resin as its material?' },
    opts: [
      { zh: 'FDM (熔融沉積成型)', en: 'FDM (Fused Deposition Modelling)' },
      { zh: 'SLA (立體光固化)', en: 'SLA (Stereolithography)' },
      { zh: 'CNC 銑削', en: 'CNC milling' },
      { zh: '雷射切割', en: 'Laser cutting' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '專利 (Patent) 保護的是什麼?',
         en: 'What does a Patent protect?' },
    opts: [
      { zh: '設計的外觀和美學 (Registered Design)', en: "A design's appearance and aesthetics (Registered Design)" },
      { zh: '書面和藝術作品 (Copyright)', en: 'Written and artistic works (Copyright)' },
      { zh: '新發明的技術功能，防止他人在未經許可下製造或使用', en: "A new invention's technical function, preventing others from making or using it without permission" },
      { zh: '品牌名稱和標誌 (Trademark)', en: 'Brand names and logos (Trademark)' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: 'FDM 3D 打印最常用的兩種熱塑性塑料是?',
         en: 'The two most common thermoplastics used in FDM 3D printing are:' },
    opts: [
      { zh: '環氧樹脂和聚酯', en: 'Epoxy resin and polyester' },
      { zh: '鋁和鋼', en: 'Aluminium and steel' },
      { zh: 'PLA (聚乳酸) 和 ABS (丙烯腈丁二烯苯乙烯)', en: 'PLA (polylactic acid) and ABS (acrylonitrile butadiene styrene)' },
      { zh: '橡膠和矽膠', en: 'Rubber and silicone' },
    ],
    ans: 2, xp: 20,
  },

  // ══════════════════════════════════════════════════════
  // IB MYP DESIGN TECHNOLOGY (6 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: 'IB MYP 設計週期 (Design Cycle) 包含哪四個階段?',
         en: 'The IB MYP Design Cycle has which four stages?' },
    opts: [
      { zh: '調查 → 設計 → 製作 → 評估', en: 'Inquiring → Designing → Creating → Evaluating' },
      { zh: '研究 → 建造 → 測試 → 發表', en: 'Research → Build → Test → Present' },
      { zh: '提問 → 答題 → 展示 → 反思', en: 'Question → Answer → Display → Reflect' },
      { zh: '設計 → 測試 → 修改 → 完成', en: 'Design → Test → Modify → Complete' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: 'MYP 設計「準則 B：設計 (Criterion B: Developing Ideas)」中，學生需要做什麼?',
         en: 'In MYP Design Criterion B (Developing Ideas), students are required to:' },
    opts: [
      { zh: '只需要一個最終設計方案', en: 'Present only one final design' },
      { zh: '呈現多個設計方案、製作設計規格及選定最終方案', en: 'Present multiple design ideas, develop design specifications, and select a final design' },
      { zh: '製作產品', en: 'Manufacture the product' },
      { zh: '評估已完成的產品', en: 'Evaluate the completed product' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '在 MYP 設計中，「設計規格 (Design Specification)」的作用是什麼?',
         en: 'In MYP Design, what is the purpose of a Design Specification?' },
    opts: [
      { zh: '列出製作過程的步驟', en: 'List the steps of the making process' },
      { zh: '記錄成品的售價', en: 'Record the selling price of the product' },
      { zh: '列出設計方案必須符合的可測量標準清單', en: 'A list of measurable criteria that the solution must meet' },
      { zh: '說明如何使用產品', en: 'Explain how to use the product' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '在 MYP 設計評估準則中，「準則 C」是什麼?',
         en: 'In MYP Design assessment criteria, Criterion C is:' },
    opts: [
      { zh: '調查 (Inquiring and Analysing)', en: 'Inquiring and Analysing' },
      { zh: '設計 (Developing Ideas)', en: 'Developing Ideas' },
      { zh: '製作 (Creating the Solution)', en: 'Creating the Solution' },
      { zh: '評估 (Evaluating)', en: 'Evaluating' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '在 MYP 設計中，「原型測試 (Prototype Testing)」的主要目的是?',
         en: 'In MYP Design, the main purpose of prototype testing is:' },
    opts: [
      { zh: '展示最終產品給老師看', en: 'To show the final product to the teacher' },
      { zh: '識別設計中的缺陷並根據測試結果改進設計', en: 'To identify flaws and improve the design based on test results' },
      { zh: '計算材料費用', en: 'To calculate material costs' },
      { zh: '拍攝產品照片', en: 'To photograph the product' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '迭代設計 (Iterative Design) 的主要特點是什麼?',
         en: 'What is the key feature of Iterative Design?' },
    opts: [
      { zh: '只設計一次，不作修改', en: 'Design once with no revisions' },
      { zh: '透過反覆測試、評估和修改不斷改進設計', en: 'Continuously improving the design through repeated testing, evaluation, and modification' },
      { zh: '由電腦自動生成設計', en: 'Design generated automatically by computer' },
      { zh: '只考慮外觀美感', en: 'Only considering aesthetics' },
    ],
    ans: 1, xp: 25,
  },

  // ══════════════════════════════════════════════════════
  // DSE DESIGN & TECHNOLOGY (8 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: 'DSE D&T 中，「設計過程」的第一步通常是什麼?',
         en: 'In DSE D&T, what is typically the first step of the Design Process?' },
    opts: [
      { zh: '製作模型', en: 'Making a model' },
      { zh: '識別問題 / 設計簡介 (Design Brief)', en: 'Identifying the problem / Design Brief' },
      { zh: '評估成品', en: 'Evaluating the finished product' },
      { zh: '選擇材料', en: 'Selecting materials' },
    ],
    ans: 1, xp: 20,
  },
  {
    q: { zh: '齒輪系統中，若主動齒輪有 20 齒，從動齒輪有 40 齒，齒輪比是多少?',
         en: 'In a gear system, if the driver gear has 20 teeth and the driven gear has 40 teeth, what is the gear ratio?' },
    opts: [
      { zh: '2:1 (速度減半，扭力加倍)', en: '2:1 (speed halved, torque doubled)' },
      { zh: '1:2 (速度加倍，扭力減半)', en: '1:2 (speed doubled, torque halved)' },
      { zh: '1:1 (速度不變)', en: '1:1 (speed unchanged)' },
      { zh: '4:1', en: '4:1' },
    ],
    ans: 0, xp: 30,
  },
  {
    q: { zh: '在結構設計中，為什麼三角形是最穩定的形狀?',
         en: 'In structural design, why is the triangle the most stable shape?' },
    opts: [
      { zh: '三角形面積最大', en: 'A triangle has the largest area' },
      { zh: '三角形的邊不能在不改變邊長的情況下改變角度，能有效分散負荷', en: "A triangle's sides cannot change angle without changing length, effectively distributing loads" },
      { zh: '三角形最容易製作', en: 'A triangle is the easiest to construct' },
      { zh: '三角形外觀最美', en: 'A triangle looks the most attractive' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '在電子學中，電阻 (Resistor) 的主要功能是什麼?',
         en: 'In electronics, what is the main function of a Resistor?' },
    opts: [
      { zh: '儲存電能', en: 'Store electrical energy' },
      { zh: '放大電流訊號', en: 'Amplify electrical signals' },
      { zh: '限制電路中的電流', en: 'Limit the flow of current in a circuit' },
      { zh: '將交流電轉為直流電', en: 'Convert AC to DC' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '「控制系統」的基本模型是什麼?',
         en: 'What is the basic model of a Control System?' },
    opts: [
      { zh: '輸入 (Input) → 過程 (Process) → 輸出 (Output)', en: 'Input → Process → Output' },
      { zh: '設計 → 製作 → 測試', en: 'Design → Make → Test' },
      { zh: '材料 → 工具 → 產品', en: 'Material → Tool → Product' },
      { zh: '問題 → 解決方案 → 評估', en: 'Problem → Solution → Evaluation' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '「吹塑成型 (Blow Moulding)」主要用於製造哪類產品?',
         en: 'Blow moulding is primarily used to manufacture which type of product?' },
    opts: [
      { zh: '實心金屬棒', en: 'Solid metal rods' },
      { zh: '薄木板', en: 'Thin wooden planks' },
      { zh: '中空塑料容器，如膠樽和油桶', en: 'Hollow plastic containers such as bottles and tanks' },
      { zh: '陶瓷碗碟', en: 'Ceramic bowls and plates' },
    ],
    ans: 2, xp: 25,
  },
  {
    q: { zh: '以下哪項最能體現「6R 可持續設計原則」?',
         en: 'Which best illustrates the "6R" Sustainable Design principles?' },
    opts: [
      { zh: '再思考、拒絕、減少、再用、修復、回收', en: 'Rethink, Refuse, Reduce, Reuse, Repair, Recycle' },
      { zh: '重新設計、重做、再測試、再評估、重新生產、再銷售', en: 'Redesign, Redo, Retest, Re-evaluate, Reproduce, Resell' },
      { zh: '只包括回收', en: 'Recycling only' },
      { zh: '使用最多材料以確保耐用', en: 'Use maximum materials to ensure durability' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: 'CAD 軟件（電腦輔助設計）在 DSE D&T 設計過程中的主要優勢是什麼?',
         en: 'What is the main advantage of CAD software in the DSE D&T design process?' },
    opts: [
      { zh: '可以快速、精準地繪製和修改設計，並輸出 3D 可視化', en: 'Enables fast, accurate drawing and editing of designs with 3D visualisation' },
      { zh: '不需要電腦知識', en: 'Requires no computer knowledge' },
      { zh: '比手繪更具創意', en: 'More creative than hand drawing' },
      { zh: '可以自動製造產品', en: 'Can automatically manufacture products' },
    ],
    ans: 0, xp: 20,
  },

  // ══════════════════════════════════════════════════════
  // MODELLING & PROTOTYPING (6 questions)
  // ══════════════════════════════════════════════════════
  {
    q: { zh: '製作「原型 (Prototype)」的主要目的是什麼?',
         en: 'What is the main purpose of making a Prototype?' },
    opts: [
      { zh: '作為最終銷售的商品', en: 'To serve as the final product for sale' },
      { zh: '測試、評估設計的功能性、人體工程學和外觀，以便作出改進', en: 'To test and evaluate the design\'s function, ergonomics, and aesthetics for improvement' },
      { zh: '展示給班上同學參觀', en: 'To display to classmates' },
      { zh: '計算生產成本', en: 'To calculate production costs' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '用紙板 (cardboard) 製作快速模型的主要優勢是什麼?',
         en: 'What is the main advantage of using cardboard for quick modelling?' },
    opts: [
      { zh: '成本低廉、易於切割和修改，適合快速探索設計概念', en: 'Low cost, easy to cut and modify — ideal for rapid design concept exploration' },
      { zh: '非常耐用，可作最終產品', en: 'Very durable and suitable as a final product' },
      { zh: '防水性能極佳', en: 'Excellent waterproof properties' },
      { zh: '外觀最美', en: 'Most aesthetically pleasing' },
    ],
    ans: 0, xp: 20,
  },
  {
    q: { zh: '比例為 1:10 的模型，代表什麼意思?',
         en: 'A model with a scale of 1:10 means:' },
    opts: [
      { zh: '模型是實物的 10 倍大', en: 'The model is 10 times larger than the real object' },
      { zh: '模型尺寸等於實物', en: 'The model is the same size as the real object' },
      { zh: '模型是實物的 1/10 大（縮小 10 倍）', en: 'The model is 1/10 the size of the real object (scaled down 10×)' },
      { zh: '模型只有 1 個零件', en: 'The model has only 1 part' },
    ],
    ans: 2, xp: 20,
  },
  {
    q: { zh: '「外觀模型 (Mock-up)」和「功能原型 (Working Prototype)」的主要分別是什麼?',
         en: 'What is the main difference between a Mock-up and a Working Prototype?' },
    opts: [
      { zh: '兩者完全相同', en: 'They are exactly the same' },
      { zh: '外觀模型測試美感和形態，工作原型則測試實際功能', en: 'A mock-up tests aesthetics and form; a working prototype tests actual function' },
      { zh: '工作原型只看外觀', en: 'A working prototype only examines appearance' },
      { zh: '外觀模型比工作原型更複雜', en: 'A mock-up is more complex than a working prototype' },
    ],
    ans: 1, xp: 25,
  },
  {
    q: { zh: '快速成型 (Rapid Prototyping) 技術最常指的是哪類製造方式?',
         en: 'Rapid Prototyping most commonly refers to which manufacturing method?' },
    opts: [
      { zh: '加法製造技術如 3D 打印 (SLA、FDM)', en: 'Additive manufacturing such as 3D printing (SLA, FDM)' },
      { zh: '手工鍛造', en: 'Hand forging' },
      { zh: '傳統木工', en: 'Traditional woodworking' },
      { zh: '陶瓷窯燒', en: 'Ceramic kiln firing' },
    ],
    ans: 0, xp: 25,
  },
  {
    q: { zh: '在設計評估中，哪種方法最能體現「以用家為中心」?',
         en: 'Which evaluation method best reflects a "user-centred" approach?' },
    opts: [
      { zh: '設計師自行判斷是否成功', en: "Designer's own judgement of success" },
      { zh: '計算材料費用', en: 'Calculating material costs' },
      { zh: '邀請目標用家測試原型並收集反饋', en: 'Inviting target users to test the prototype and collecting their feedback' },
      { zh: '與競爭對手的產品比較外觀', en: "Comparing appearance with competitors' products" },
    ],
    ans: 2, xp: 25,
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const CANVAS_W = 400;
const CANVAS_H = 600;
const GAME_DURATION = 60; // seconds
const LANES = [100, 200, 300]; // x-centres of 3 lanes
const PLAYER_Y = 480;
const PLAYER_W = 44;
const PLAYER_H = 72;
const ROAD_COLOR   = '#5A5A5A';
const GRASS_COLOR  = '#6B9080';
const LANE_COLOR   = '#CCCCCC';
const SKY_TOP      = '#87CEEB';
const SKY_BOT      = '#D4E8F0';
const COIN_RADIUS  = 14;
const BOOST_NEEDED = 3; // fuel capsules to fill boost bar

// Coin topic labels for D&T vocabulary (z = zh, e = en, correct = green)
const VOCAB_COINS = [
  { zh: '人體工程', en: 'Ergonomics',  correct: true  },
  { zh: 'LCA',      en: 'LCA',         correct: true  },
  { zh: 'CAD',      en: 'CAD',         correct: true  },
  { zh: '可持續性',  en: 'Sustain.',    correct: true  },
  { zh: '加法製造',  en: 'Additive',    correct: true  },
  { zh: '熱固性',    en: 'Thermoset',   correct: true  },
  { zh: '原型',      en: 'Prototype',   correct: true  },
  { zh: '拉伸強度',  en: 'Tensile',     correct: true  },
  { zh: '用家需求',  en: 'UCD',         correct: true  },
  { zh: 'PVA膠',    en: 'PVA Glue',    correct: true  },
  { zh: '榫卯',      en: 'Mortise',     correct: true  },
  { zh: '智能物料',  en: 'Smart Mat.',  correct: true  },
  { zh: '護目鏡',    en: 'Goggles',     correct: true  },
  { zh: '安全第一',  en: 'Safety 1st',  correct: true  },
  { zh: '複合物料',  en: 'Composite',   correct: true  },
  { zh: '不安全',    en: 'Unsafe!',     correct: false },
  { zh: '無護罩',    en: 'No Guard!',   correct: false },
];

// ─── Helper: draw rounded rectangle ─────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
  fill: string,
) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
}

// ─── Gear drawing helper ─────────────────────────────────────────────────────

function drawGear(
  ctx: CanvasRenderingContext2D,
  gcx: number, gcy: number,
  innerR: number, outerR: number,
  teeth: number, fill: string,
) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 0.35) / teeth) * Math.PI * 2 - Math.PI / 2;
    const a3 = ((i + 0.65) / teeth) * Math.PI * 2 - Math.PI / 2;
    const a4 = ((i + 1) / teeth) * Math.PI * 2 - Math.PI / 2;
    if (i === 0) ctx.moveTo(gcx + Math.cos(a1) * innerR, gcy + Math.sin(a1) * innerR);
    ctx.lineTo(gcx + Math.cos(a1) * innerR, gcy + Math.sin(a1) * innerR);
    ctx.lineTo(gcx + Math.cos(a2) * outerR, gcy + Math.sin(a2) * outerR);
    ctx.lineTo(gcx + Math.cos(a3) * outerR, gcy + Math.sin(a3) * outerR);
    ctx.lineTo(gcx + Math.cos(a4) * innerR, gcy + Math.sin(a4) * innerR);
  }
  ctx.closePath();
  ctx.fill();
}

// ─── Sprite-like object types ─────────────────────────────────────────────────

type Coin = {
  id:      number;
  x:       number;
  y:       number;
  vocab:   typeof VOCAB_COINS[0];
  speed:   number;
  alive:   boolean;
  flash:   number; // countdown frames for collect flash
};

type Obstacle = {
  id:     number;
  x:      number;
  y:      number;
  speed:  number;
  alive:  boolean;
  color:  string;
};

type FuelCapsule = {
  id:    number;
  x:     number;
  y:     number;
  speed: number;
  alive: boolean;
};

type Particle = {
  id:  number;
  x:   number;
  y:   number;
  vx:  number;
  vy:  number;
  life: number;
  color: string;
};

type TreeConfig = {
  lx:    number; // left tree x-centre
  rx:    number; // right tree x-centre
  phase: number; // individual scroll-phase offset
};

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = { onBack: () => void };

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export const DrivingGame = ({ onBack }: Props) => {
  const { t, isEnglish } = useLanguage();
  const { addXp } = useGame();

  // ── Canvas ref ─────────────────────────────────────────────────────────────
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);

  // ── Game phase ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'start' | 'playing' | 'question' | 'end'>('start');
  const phaseRef = useRef<'start' | 'playing' | 'question' | 'end'>('start');
  const setPhaseSync = useCallback((nextPhase: typeof phaseRef.current) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  // ── Question overlay ───────────────────────────────────────────────────────
  const [currentQ, setCurrentQ] = useState<QuestionData | null>(null);
  const [answered, setAnswered] = useState<number | null>(null); // index chosen
  const questionQueueRef = useRef<QuestionData[]>([...DT_QUESTIONS].sort(() => Math.random() - 0.5));

  // ── HUD state (synced from game loop) ─────────────────────────────────────
  const [hudScore,   setHudScore]   = useState(0);
  const [hudTime,    setHudTime]    = useState(GAME_DURATION);
  const [hudBoost,   setHudBoost]   = useState(0);
  const [boostActive, setBoostActive] = useState(false);
  const [hudXp,      setHudXp]      = useState(0);

  // ── Mutable game state (not React state – lives in refs for RAF loop) ──────
  const scoreRef        = useRef(0);
  const timeRef         = useRef(GAME_DURATION);
  const lastTimeRef     = useRef(0);
  const boostFuelRef    = useRef(0);   // 0-3
  const boostActiveRef  = useRef(false);
  const boostTimerRef   = useRef(0);
  const xpEarnedRef     = useRef(0);

  // Player
  const playerLaneRef = useRef(1);       // 0=left, 1=mid, 2=right
  const playerXRef    = useRef(LANES[1]);
  const steerDirRef   = useRef(0);       // -1 left, 0 none, 1 right
  // Road scroll
  const roadOffsetRef = useRef(0);
  const speedRef      = useRef(180);     // px/s base road scroll
  const hillRef       = useRef(0);       // sinusoidal hill phase

  // Objects
  const coinsRef       = useRef<Coin[]>([]);
  const obstaclesRef   = useRef<Obstacle[]>([]);
  const fuelRef        = useRef<FuelCapsule[]>([]);
  const particlesRef   = useRef<Particle[]>([]);
  const treeConfigsRef = useRef<TreeConfig[]>([]);
  const idCounterRef   = useRef(0);
  const spawnTimerRef = useRef(0);
  const checkpointRef = useRef(0); // question every N seconds

  const hudTimerRef   = useRef(0); // HUD update throttle

  // ── Keyboard / touch control ──────────────────────────────────────────────
  const keysRef = useRef({ left: false, right: false, accel: false });

  const applySteer = useCallback((dir: -1 | 0 | 1) => {
    if (phaseRef.current !== 'playing') return;
    steerDirRef.current = dir;
    if (dir === -1 && playerLaneRef.current > 0) playerLaneRef.current--;
    if (dir === 1  && playerLaneRef.current < 2) playerLaneRef.current++;
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isGameKey = key === 'arrowleft' || key === 'arrowright' || key === 'arrowup' || key === 'a' || key === 'd' || key === 'w' || key === ' ';
      if (isGameKey) e.preventDefault();
      if (key === 'arrowleft'  || key === 'a') { keysRef.current.left  = true; applySteer(-1); }
      if (key === 'arrowright' || key === 'd') { keysRef.current.right = true; applySteer(1);  }
      if (key === 'arrowup'    || key === 'w' || key === ' ') keysRef.current.accel = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isGameKey = key === 'arrowleft' || key === 'arrowright' || key === 'arrowup' || key === 'a' || key === 'd' || key === 'w' || key === ' ';
      if (isGameKey) e.preventDefault();
      if (key === 'arrowleft'  || key === 'a') keysRef.current.left  = false;
      if (key === 'arrowright' || key === 'd') keysRef.current.right = false;
      if (key === 'arrowup'    || key === 'w' || key === ' ') keysRef.current.accel = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup',   onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup',   onKeyUp);
    };
  }, [applySteer]);

  useEffect(() => {
    if (phase !== 'playing') {
      keysRef.current = { left: false, right: false, accel: false };
      steerDirRef.current = 0;
    }
  }, [phase]);

  // ── Boost button ──────────────────────────────────────────────────────────
  const activateBoost = useCallback(() => {
    if (boostFuelRef.current < BOOST_NEEDED || boostActiveRef.current) return;
    boostFuelRef.current = 0;
    boostActiveRef.current = true;
    boostTimerRef.current  = 5; // 5 seconds boost
    setBoostActive(true);
    setHudBoost(0);
  }, []);

  // ── Spawn helpers ─────────────────────────────────────────────────────────
  const spawnCoin = useCallback(() => {
    const lane   = Math.floor(Math.random() * 3);
    const vocab  = VOCAB_COINS[Math.floor(Math.random() * VOCAB_COINS.length)];
    const speed  = speedRef.current * (0.6 + Math.random() * 0.5);
    coinsRef.current.push({ id: idCounterRef.current++, x: LANES[lane], y: -20, vocab, speed, alive: true, flash: 0 });
  }, []);

  const spawnObstacle = useCallback(() => {
    const lane   = Math.floor(Math.random() * 3);
    const colors = ['#D5896F', '#8A9A5B', '#CCA068'];
    obstaclesRef.current.push({
      id: idCounterRef.current++,
      x:  LANES[lane],
      y:  -30,
      speed: speedRef.current * (0.5 + Math.random() * 0.4),
      alive: true,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }, []);

  const spawnFuel = useCallback(() => {
    const lane = Math.floor(Math.random() * 3);
    fuelRef.current.push({ id: idCounterRef.current++, x: LANES[lane], y: -20, speed: speedRef.current * 0.55, alive: true });
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        id:    idCounterRef.current++,
        x, y,
        vx:    (Math.random() - 0.5) * 180,
        vy:    -Math.random() * 220 - 60,
        life:  0.6,
        color,
      });
    }
  }, []);

  // ── Show question ─────────────────────────────────────────────────────────
  const showQuestion = useCallback(() => {
    if (questionQueueRef.current.length === 0) {
      questionQueueRef.current = [...DT_QUESTIONS].sort(() => Math.random() - 0.5);
    }
    const q = questionQueueRef.current.pop()!;
    setCurrentQ(q);
    setAnswered(null);
    setPhaseSync('question');
  }, [setPhaseSync]);

  const handleAnswer = useCallback((idx: number) => {
    if (answered !== null || !currentQ) return;
    setAnswered(idx);
    const correct = idx === currentQ.ans;
    if (correct) {
      scoreRef.current += 200 * (boostActiveRef.current ? 3 : 1);
      xpEarnedRef.current += currentQ.xp;
      addXp(currentQ.xp);
      spawnParticles(CANVAS_W / 2, CANVAS_H / 2, '#CCA068', 16);
    }
    setTimeout(() => {
      setCurrentQ(null);
      setAnswered(null);
      setPhaseSync('playing');
    }, 1400);
  }, [answered, currentQ, addXp, setPhaseSync, spawnParticles]);

  // ── Drawing helpers ───────────────────────────────────────────────────────

  const drawRoad = useCallback((ctx: CanvasRenderingContext2D, scroll: number) => {
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, CANVAS_H * 0.42);
    sky.addColorStop(0, SKY_TOP);
    sky.addColorStop(1, SKY_BOT);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H * 0.42);

    // Distant hills
    ctx.fillStyle = '#8A9A5B';
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_H * 0.38);
    for (let xi = 0; xi <= CANVAS_W; xi += 20) {
      const yh = CANVAS_H * 0.38 - Math.sin((xi + scroll * 0.3) * 0.02) * 18
                                  - Math.sin((xi + scroll * 0.15) * 0.04) * 10;
      ctx.lineTo(xi, yh);
    }
    ctx.lineTo(CANVAS_W, CANVAS_H * 0.42);
    ctx.lineTo(0, CANVAS_H * 0.42);
    ctx.closePath();
    ctx.fill();

    // Grass
    ctx.fillStyle = GRASS_COLOR;
    ctx.fillRect(0, CANVAS_H * 0.42, CANVAS_W, CANVAS_H * 0.58);

    // Road trapezoid
    ctx.fillStyle = ROAD_COLOR;
    ctx.beginPath();
    ctx.moveTo(CANVAS_W * 0.12, CANVAS_H * 0.42);
    ctx.lineTo(CANVAS_W * 0.88, CANVAS_H * 0.42);
    ctx.lineTo(CANVAS_W, CANVAS_H);
    ctx.lineTo(0, CANVAS_H);
    ctx.closePath();
    ctx.fill();

    // Lane markings (perspective dashes)
    ctx.setLineDash([18, 18]);
    ctx.strokeStyle = LANE_COLOR;
    ctx.lineWidth = 2;
    for (let lane = 1; lane <= 2; lane++) {
      const topX = CANVAS_W * (0.12 + 0.76 * lane / 3);
      const botX = CANVAS_W * lane / 3;
      ctx.beginPath();
      ctx.moveTo(topX, CANVAS_H * 0.42);
      ctx.lineTo(botX, CANVAS_H);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }, []);

  const drawPlayer = useCallback((ctx: CanvasRenderingContext2D, x: number, steer: number, boost: boolean) => {
    const cy = PLAYER_Y;
    const cx = x;
    ctx.save();

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 34, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // === WHEELS ===
    roundRect(ctx, cx - 27, cy - 12, 8, 22, 3, '#222222'); // left tyre
    roundRect(ctx, cx - 25, cy - 8,  5,  8, 1, '#666666'); // left rim
    roundRect(ctx, cx + 19, cy - 12, 8, 22, 3, '#222222'); // right tyre
    roundRect(ctx, cx + 20, cy - 8,  5,  8, 1, '#666666'); // right rim

    // === BLUE LOWER BUMPER ===
    roundRect(ctx, cx - 22, cy + 18, 44, 16, 4, '#1A5BAA');
    roundRect(ctx, cx - 9,  cy + 22, 18,  7, 1, '#EEEEDD'); // plate
    ctx.fillStyle = '#333344';
    ctx.font = 'bold 4px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('D&T', cx, cy + 25.5);

    // === RED LOWER BODY (mechanical section) ===
    roundRect(ctx, cx - 22, cy,     44, 20, 0, '#CC2A18');
    // Tail lights
    roundRect(ctx, cx - 22, cy + 2,  8, 14, 2, '#FF1515');
    roundRect(ctx, cx + 14, cy + 2,  8, 14, 2, '#FF1515');
    roundRect(ctx, cx - 21, cy + 3,  6, 11, 1, '#FF7070'); // inner glow
    roundRect(ctx, cx + 15, cy + 3,  6, 11, 1, '#FF7070');
    // Large gear
    drawGear(ctx, cx - 8, cy + 13, 5, 8, 8, '#878787');
    ctx.fillStyle = '#555555'; ctx.beginPath(); ctx.arc(cx - 8, cy + 13, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#BBBBBB'; ctx.beginPath(); ctx.arc(cx - 8, cy + 13, 1.5, 0, Math.PI * 2); ctx.fill();
    // Small gear (interlocked)
    drawGear(ctx, cx - 1, cy + 5, 3, 5, 6, '#777777');
    ctx.fillStyle = '#555555'; ctx.beginPath(); ctx.arc(cx - 1, cy + 5, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#BBBBBB'; ctx.beginPath(); ctx.arc(cx - 1, cy + 5, 1, 0, Math.PI * 2); ctx.fill();
    // Spring coil (left edge)
    ctx.strokeStyle = '#999999'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (let si = 0; si <= 8; si++) {
      const sy = cy + 2 + si * 1.8;
      const sx = cx - 19 + (si % 2 === 0 ? 0 : 3);
      if (si === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    // Rainbow battery strips (right)
    const batColors = ['#FF3030','#FF7030','#FFD030','#30C030','#3090FF','#A040E0'];
    for (let bi = 0; bi < 6; bi++) {
      roundRect(ctx, cx + 8, cy + 2 + bi * 3, 12, 2.5, 0.5, batColors[bi]);
    }

    // === RED UPPER CABIN ===
    roundRect(ctx, cx - 22, cy - 28, 44, 30, 4, '#E53020');
    // Rear windscreen
    roundRect(ctx, cx - 14, cy - 26, 28, 20, 3, '#5FA8C8');
    roundRect(ctx, cx - 13, cy - 25, 10,  6, 2, 'rgba(255,255,255,0.18)'); // reflection
    // Driver head
    ctx.fillStyle = '#C88050';
    ctx.beginPath(); ctx.arc(cx - 2, cy - 12, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4A2800';
    ctx.beginPath(); ctx.arc(cx - 2, cy - 14, 4.5, Math.PI, 0); ctx.fill(); // hair
    ctx.strokeStyle = '#CC2020'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx - 6, cy - 12.5); ctx.lineTo(cx + 2, cy - 13.5); ctx.stroke(); // headband
    roundRect(ctx, cx - 6, cy - 9, 10, 6, 2, '#2A80C0'); // shirt

    // === YELLOW ROOF ===
    roundRect(ctx, cx - 21, cy - 36, 42, 10, 4, '#F0B020');
    // Solar panel
    roundRect(ctx, cx - 17, cy - 35, 34, 8, 1, '#1A44CC');
    ctx.strokeStyle = '#4070FF'; ctx.lineWidth = 0.5;
    for (let gy = 1; gy <= 2; gy++) {
      ctx.beginPath(); ctx.moveTo(cx - 17, cy - 35 + gy * (8 / 3)); ctx.lineTo(cx + 17, cy - 35 + gy * (8 / 3)); ctx.stroke();
    }
    for (let gx = 1; gx <= 5; gx++) {
      ctx.beginPath(); ctx.moveTo(cx - 17 + gx * (34 / 6), cy - 35); ctx.lineTo(cx - 17 + gx * (34 / 6), cy - 27); ctx.stroke();
    }

    // === BOOST EXHAUST FLAME ===
    if (boost) {
      const flameGrad = ctx.createLinearGradient(cx, cy + 34, cx, cy + 54);
      flameGrad.addColorStop(0, '#FF6B35');
      flameGrad.addColorStop(1, 'rgba(255,50,0,0)');
      ctx.fillStyle = flameGrad;
      ctx.globalAlpha = 0.75 + Math.random() * 0.25;
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy + 34); ctx.lineTo(cx + 6, cy + 34);
      ctx.lineTo(cx, cy + 50 + Math.random() * 10); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Steer lean highlight
    if (steer !== 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      const lx = steer < 0 ? cx - 22 : cx;
      ctx.fillRect(lx, cy - 36, 22, 72);
    }

    ctx.restore();
  }, []);

  const drawCoin = useCallback((ctx: CanvasRenderingContext2D, coin: Coin, isEnglish: boolean) => {
    if (!coin.alive) return;
    const label = isEnglish ? coin.vocab.en : coin.vocab.zh;
    const fill  = coin.vocab.correct ? '#CCA068' : '#D5896F';
    ctx.save();
    if (coin.flash > 0) {
      ctx.globalAlpha = coin.flash / 6;
    }
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, COIN_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label.length > 8 ? label.slice(0, 8) : label, coin.x, coin.y);
    ctx.restore();
  }, []);

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, ob: Obstacle) => {
    if (!ob.alive) return;
    roundRect(ctx, ob.x - 22, ob.y - 16, 44, 32, 6, ob.color);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚠', ob.x, ob.y);
  }, []);

  const drawFuel = useCallback((ctx: CanvasRenderingContext2D, f: FuelCapsule) => {
    if (!f.alive) return;
    roundRect(ctx, f.x - 12, f.y - 18, 24, 36, 6, '#6B9080');
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', f.x, f.y);
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4 * p.life, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, []);

  // ── Main game loop ────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    // Reset everything
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    scoreRef.current        = 0;
    timeRef.current         = GAME_DURATION;
    boostFuelRef.current    = 0;
    boostActiveRef.current  = false;
    boostTimerRef.current   = 0;
    xpEarnedRef.current     = 0;
    playerLaneRef.current   = 1;
    playerXRef.current      = LANES[1];
    steerDirRef.current     = 0;
    roadOffsetRef.current   = 0;
    speedRef.current        = 180;
    hillRef.current         = 0;
    spawnTimerRef.current   = 0;
    checkpointRef.current   = 12; // first question in 12s
    coinsRef.current        = [];
    obstaclesRef.current    = [];
    fuelRef.current         = [];
    particlesRef.current    = [];
    treeConfigsRef.current  = Array.from({ length: 8 }, (_, i) => ({
      lx:    20 + Math.random() * 14,
      rx:    CANVAS_W - 20 - Math.random() * 14,
      phase: i * 15 + Math.random() * 8,
    }));
    idCounterRef.current    = 0;
    lastTimeRef.current     = performance.now();
    hudTimerRef.current     = 0;
    questionQueueRef.current = [...DT_QUESTIONS].sort(() => Math.random() - 0.5);
    keysRef.current = { left: false, right: false, accel: false };
    setHudScore(0);
    setHudTime(GAME_DURATION);
    setHudBoost(0);
    setHudXp(0);
    setBoostActive(false);
    setPhaseSync('playing');
  }, [setPhaseSync]);

  // ── The RAF loop ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const loop = (timestamp: number) => {
      if (phaseRef.current !== 'playing') return;

      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = timestamp;

      // ── Time countdown ──────────────────────────────────────────────────
      timeRef.current -= dt;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setPhaseSync('end');
        setHudTime(0);
        setHudScore(scoreRef.current);
        return;
      }

      // ── Speed ramp ──────────────────────────────────────────────────────
      const baseSpeed = 180 + (GAME_DURATION - timeRef.current) * 1.2;
      const targetSpeed = baseSpeed * (keysRef.current.accel ? 1.28 : 1) * (boostActiveRef.current ? 2.2 : 1);
      speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 5.5);

      // ── Boost timer ─────────────────────────────────────────────────────
      if (boostActiveRef.current) {
        boostTimerRef.current -= dt;
        if (boostTimerRef.current <= 0) {
          boostActiveRef.current = false;
          setBoostActive(false);
        }
      }

      // ── Road scroll ─────────────────────────────────────────────────────
      roadOffsetRef.current = (roadOffsetRef.current + speedRef.current * dt) % 40;
      hillRef.current += dt * 0.8;

      // ── Player X interpolation ───────────────────────────────────────────
      const targetX = LANES[playerLaneRef.current];
      playerXRef.current += (targetX - playerXRef.current) * Math.min(1, dt * 9);

      // ── Spawn logic ──────────────────────────────────────────────────────
      spawnTimerRef.current += dt;
      if (spawnTimerRef.current > 1.1) {
        spawnTimerRef.current = 0;
        const r = Math.random();
        if (r < 0.55)       spawnCoin();
        else if (r < 0.80)  spawnObstacle();
        else                spawnFuel();
      }

      // ── Checkpoint / question trigger ────────────────────────────────────
      checkpointRef.current -= dt;
      if (checkpointRef.current <= 0) {
        checkpointRef.current = 14 + Math.random() * 8;
        showQuestion();
        return; // pause loop until answered
      }

      // ── Collision detection ──────────────────────────────────────────────
      const px = playerXRef.current;
      const py = PLAYER_Y;

      // Coins
      coinsRef.current.forEach(c => {
        if (!c.alive) return;
        c.y += c.speed * dt;
        if (c.flash > 0) { c.flash--; return; }
        const dx = px - c.x;
        const dy = py - c.y;
        if (Math.sqrt(dx * dx + dy * dy) < PLAYER_W * 0.6 + COIN_RADIUS) {
          c.alive  = false;
          const pts = c.vocab.correct ? (boostActiveRef.current ? 150 : 50) : 10;
          scoreRef.current += pts;
          spawnParticles(c.x, c.y, c.vocab.correct ? '#CCA068' : '#D5896F');
        }
        if (c.y > CANVAS_H + 20) c.alive = false;
      });

      // Obstacles
      obstaclesRef.current.forEach(ob => {
        if (!ob.alive) return;
        ob.y += ob.speed * dt;
        const dx = Math.abs(px - ob.x);
        const dy = Math.abs(py - ob.y);
        if (dx < PLAYER_W * 0.45 && dy < PLAYER_H * 0.45) {
          ob.alive = false;
          scoreRef.current = Math.max(0, scoreRef.current - 80);
          spawnParticles(ob.x, ob.y, '#D5896F', 12);
        }
        if (ob.y > CANVAS_H + 40) ob.alive = false;
      });

      // Fuel capsules
      fuelRef.current.forEach(f => {
        if (!f.alive) return;
        f.y += f.speed * dt;
        const dx = Math.abs(px - f.x);
        const dy = Math.abs(py - f.y);
        if (dx < PLAYER_W * 0.45 && dy < PLAYER_H * 0.45) {
          f.alive = false;
          if (boostFuelRef.current < BOOST_NEEDED) {
            boostFuelRef.current++;
            setHudBoost(boostFuelRef.current);
            spawnParticles(f.x, f.y, '#6B9080');
          }
        }
        if (f.y > CANVAS_H + 30) f.alive = false;
      });

      // Particles
      particlesRef.current.forEach(p => {
        p.x  += p.vx * dt;
        p.y  += p.vy * dt;
        p.vy += 300 * dt; // gravity
        p.life -= dt * 1.6;
      });
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      // GC dead objects
      coinsRef.current     = coinsRef.current.filter(c => c.alive || c.flash > 0);
      obstaclesRef.current = obstaclesRef.current.filter(ob => ob.alive);
      fuelRef.current      = fuelRef.current.filter(f => f.alive);

      // ── Render ──────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      drawRoad(ctx, roadOffsetRef.current);

      // Roadside trees – random lateral positions, two-tier pine style
      treeConfigsRef.current.forEach(tc => {
        const ty = (roadOffsetRef.current * 4 + tc.phase) % (CANVAS_H + 60) - 30;
        // Left tree
        ctx.fillStyle = '#1A6B20';
        ctx.beginPath();
        ctx.moveTo(tc.lx - 12, ty + 40); ctx.lineTo(tc.lx + 12, ty + 40); ctx.lineTo(tc.lx, ty + 10); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tc.lx - 9, ty + 28); ctx.lineTo(tc.lx + 9, ty + 28); ctx.lineTo(tc.lx, ty); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#4a3000';
        ctx.fillRect(tc.lx - 2, ty + 38, 4, 14);
        // Right tree
        ctx.fillStyle = '#1A6B20';
        ctx.beginPath();
        ctx.moveTo(tc.rx - 12, ty + 40); ctx.lineTo(tc.rx + 12, ty + 40); ctx.lineTo(tc.rx, ty + 10); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(tc.rx - 9, ty + 28); ctx.lineTo(tc.rx + 9, ty + 28); ctx.lineTo(tc.rx, ty); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#4a3000';
        ctx.fillRect(tc.rx - 2, ty + 38, 4, 14);
      });

      // Objects
      fuelRef.current.forEach(f => drawFuel(ctx, f));
      obstaclesRef.current.forEach(ob => drawObstacle(ctx, ob));
      coinsRef.current.forEach(c => drawCoin(ctx, c, isEnglish));

      // Player
      drawPlayer(ctx, playerXRef.current, steerDirRef.current, boostActiveRef.current);

      // Particles on top
      drawParticles(ctx);

      // Score pop on canvas
      ctx.fillStyle = boostActiveRef.current ? '#FF6B35' : '#2C2A26';
      ctx.font = `bold ${boostActiveRef.current ? 22 : 18}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(String(Math.floor(scoreRef.current)), 10, 28);

      // ── HUD sync (throttled to ~10fps to avoid React re-render overhead) ──
      hudTimerRef.current += dt;
      if (hudTimerRef.current > 0.1) {
        hudTimerRef.current = 0;
        setHudScore(Math.floor(scoreRef.current));
        setHudTime(Math.ceil(timeRef.current));
        setHudBoost(boostFuelRef.current);
        setHudXp(xpEarnedRef.current);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, drawCoin, drawFuel, drawObstacle, drawParticles, drawPlayer, drawRoad, isEnglish, setPhaseSync, showQuestion, spawnCoin, spawnFuel, spawnObstacle, spawnParticles]);

  // ─── Render ──────────────────────────────────────────────────────────────

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width:    CANVAS_W,
    maxWidth: '100%',
    margin:   '0 auto',
    userSelect: 'none',
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E5E0D8] px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-[#F2EFE9] rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#6B665E]" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-[#2C2A26]">{t('D&T 賽車學習遊戲', 'D&T Racing Learning Game')}</h1>
          <p className="text-xs text-[#8C857B]">{t('收集金幣・答題贏XP・啟動加速', 'Collect coins · Answer questions · Activate boost')}</p>
        </div>
      </div>

      <div className="p-4">

        {/* ── START SCREEN ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {phase === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden"
            >
              {/* Hero banner */}
              <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D5896F 0%, #CCA068 60%, #8A9A5B 100%)', padding: '2rem 1.5rem' }}>
                <div className="text-5xl text-center mb-2">🏎️</div>
                <h2 className="text-2xl font-black text-white text-center drop-shadow">{t('D&T 賽車挑戰', 'D&T Racing Challenge')}</h2>
                <p className="text-sm text-white/80 text-center mt-1">{t('駕駛你的設計科技賽車，收集知識金幣，回答問題贏取XP！', 'Drive your D&T car, collect knowledge coins, answer questions to earn XP!')}</p>
              </div>

              {/* Rules */}
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🪙', color: '#CCA068', title: t('知識金幣', 'Knowledge Coins'), body: t('收集D&T詞彙金幣得分', 'Collect D&T vocabulary coins') },
                    { icon: '⚡', color: '#6B9080', title: t('燃料膠囊', 'Fuel Capsules'), body: t('集滿3個可啟動加速', 'Collect 3 to activate boost') },
                    { icon: '⚠️', color: '#D5896F', title: t('障礙物', 'Obstacles'), body: t('撞到會扣分，要迴避！', 'Collision deducts points!') },
                    { icon: '🎯', color: '#8A9A5B', title: t('知識問題', 'Quiz Questions'), body: t('答對可得XP及加分', 'Correct answers earn XP') },
                  ].map(item => (
                    <div key={item.title} className="bg-[#F9F8F6] rounded-xl p-3 flex gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <div>
                        <div className="text-xs font-bold" style={{ color: item.color }}>{item.title}</div>
                        <div className="text-xs text-[#8C857B] mt-0.5">{item.body}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FFF5F0] rounded-xl p-3 border border-[#D5896F]/20">
                  <div className="text-xs font-black text-[#D5896F] mb-1">⚡ {t('XP加速模式', 'XP Boost Mode')}</div>
                  <p className="text-xs text-[#6B665E]">{t('集滿3個⚡燃料後按加速鈕，啟動5秒3倍積分模式！', 'Collect 3 ⚡ fuel capsules, then press BOOST for 5s × 3 score!')}</p>
                </div>

                <div className="bg-[#EFF5F3] rounded-xl p-3 border border-[#6B9080]/20">
                  <div className="text-xs font-black text-[#6B9080] mb-1">🎮 {t('操控方式', 'Controls')}</div>
                  <p className="text-xs text-[#6B665E]">{t('電腦：← → 切換行道 ｜ 手機：點擊左右按鈕', 'Desktop: ← → keys  |  Mobile: tap L/R buttons')}</p>
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-4 rounded-xl font-black text-white text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #D5896F, #CCA068)' }}
                >
                  🏁 {t('開始遊戲！', 'Start Game!')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GAME CANVAS + HUD ────────────────────────────────────────── */}
        {(phase === 'playing' || phase === 'question') && (
          <div style={containerStyle}>
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 12, border: '2px solid #E5E0D8' }}
            />

            {/* HUD overlay */}
            <div style={{ position: 'absolute', top: 8, left: 8, right: 8, pointerEvents: 'none', display: 'flex', gap: 6 }}>
              <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-xl px-2 py-1.5 text-center">
                <div className="text-[10px] text-white/60 font-bold uppercase">{t('分數', 'Score')}</div>
                <div className="text-sm font-black text-[#CCA068]">{hudScore}</div>
              </div>
              <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-xl px-2 py-1.5 text-center">
                <div className="text-[10px] text-white/60 font-bold uppercase">{t('時間', 'Time')}</div>
                <div className={`text-sm font-black ${hudTime <= 10 ? 'text-red-400' : 'text-white'}`}>{hudTime}s</div>
              </div>
              <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-xl px-2 py-1.5 text-center">
                <div className="text-[10px] text-white/60 font-bold uppercase">XP</div>
                <div className="text-sm font-black text-[#6B9080]">+{hudXp}</div>
              </div>
            </div>

            {/* Boost bar (bottom left) */}
            <div style={{ position: 'absolute', bottom: 80, left: 8, display: 'flex', flexDirection: 'column', gap: 3, pointerEvents: 'none' }}>
              <div className="text-[10px] text-white font-black bg-black/40 rounded px-1">⚡ {hudBoost}/{BOOST_NEEDED}</div>
              <div style={{ width: 60, height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }}>
                <div style={{ width: `${(hudBoost / BOOST_NEEDED) * 100}%`, height: '100%', background: '#6B9080', borderRadius: 4, transition: 'width 0.3s' }} />
              </div>
            </div>

            {/* Boost button (bottom right) */}
            <button
              onClick={activateBoost}
              style={{
                position: 'absolute', bottom: 72, right: 8,
                width: 64, height: 64, borderRadius: '50%',
                border: 'none', cursor: boostFuelRef.current >= BOOST_NEEDED && !boostActive ? 'pointer' : 'default',
                background: boostActive
                  ? 'linear-gradient(135deg, #FF6B35, #FF3300)'
                  : boostFuelRef.current >= BOOST_NEEDED
                    ? 'linear-gradient(135deg, #6B9080, #4A7060)'
                    : 'rgba(100,100,100,0.4)',
                boxShadow: boostActive ? '0 0 20px #FF6B35' : boostFuelRef.current >= BOOST_NEEDED ? '0 0 12px #6B9080' : 'none',
                color: 'white', fontWeight: 'black', fontSize: 22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'auto',
                transition: 'all 0.2s',
                transform: boostActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {boostActive ? '🔥' : '⚡'}
            </button>

            {/* Mobile steering buttons */}
            <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 8px', pointerEvents: 'auto' }}>
              <button
                onPointerDown={() => applySteer(-1)}
                style={{ width: 80, height: 56, borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.45)', color: 'white', fontSize: 24, fontWeight: 'bold', touchAction: 'manipulation' }}
              >◀</button>
              <button
                onPointerDown={() => applySteer(1)}
                style={{ width: 80, height: 56, borderRadius: 12, border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(0,0,0,0.45)', color: 'white', fontSize: 24, fontWeight: 'bold', touchAction: 'manipulation' }}
              >▶</button>
            </div>

            {/* Boost active banner */}
            <AnimatePresence>
              {boostActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  style={{
                    position: 'absolute', top: '38%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'linear-gradient(135deg, #FF6B35, #FF3300)',
                    color: 'white', fontWeight: 900, fontSize: '1.5rem',
                    padding: '6px 24px', borderRadius: 30,
                    pointerEvents: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    boxShadow: '0 0 30px #FF6B35',
                  }}
                >
                  🔥 BOOST × 3
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question overlay */}
            <AnimatePresence>
              {phase === 'question' && currentQ && (
                <motion.div
                  key="question"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(20,20,20,0.88)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: 20, borderRadius: 12,
                  }}
                >
                  <div className="text-xs font-black text-[#CCA068] uppercase tracking-widest mb-2">
                    🎯 {t('知識問題！', 'Knowledge Challenge!')}
                  </div>
                  <div className="text-white font-bold text-center text-sm mb-5 leading-relaxed px-2">
                    {isEnglish ? currentQ.q.en : currentQ.q.zh}
                  </div>
                  <div className="w-full space-y-2">
                    {currentQ.opts.map((opt, i) => {
                      const isSelected = answered === i;
                      const isCorrect  = i === currentQ.ans;
                      let bg = 'rgba(255,255,255,0.08)';
                      let border = '1.5px solid rgba(255,255,255,0.15)';
                      const textColor = 'white';
                      if (answered !== null) {
                        if (isCorrect)        { bg = '#6B9080'; border = '1.5px solid #6B9080'; }
                        else if (isSelected)  { bg = '#D5896F'; border = '1.5px solid #D5896F'; }
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={answered !== null}
                          style={{
                            width: '100%', padding: '10px 14px',
                            background: bg, border, borderRadius: 10,
                            color: textColor, fontWeight: 'bold', fontSize: '0.82rem',
                            textAlign: 'left', cursor: answered !== null ? 'default' : 'pointer',
                            transition: 'all 0.25s',
                          }}
                        >
                          <span style={{ opacity: 0.5, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                          {isEnglish ? opt.en : opt.zh}
                          {answered !== null && isCorrect && <span style={{ float: 'right' }}>✓ +{currentQ.xp} XP</span>}
                          {answered !== null && isSelected && !isCorrect && <span style={{ float: 'right' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                  {answered !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center"
                    >
                      <span className={`text-lg font-black ${answered === currentQ.ans ? 'text-[#6B9080]' : 'text-[#D5896F]'}`}>
                        {answered === currentQ.ans ? `✓ ${t('答對！', 'Correct!')}` : `✗ ${t('答錯了', 'Incorrect')}`}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── END SCREEN ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {phase === 'end' && (
            <motion.div
              key="end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden"
            >
              <div
                className="p-6 text-center text-white"
                style={{ background: 'linear-gradient(135deg, #D5896F 0%, #CCA068 100%)' }}
              >
                <div className="text-5xl mb-2">🏆</div>
                <h2 className="text-2xl font-black">{t('遊戲結束！', 'Game Over!')}</h2>
                <p className="text-white/80 text-sm mt-1">{t('精彩表現！', 'Great performance!')}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FFF5F0] rounded-xl p-4 text-center border border-[#D5896F]/20">
                    <Trophy className="w-6 h-6 text-[#D5896F] mx-auto mb-1" />
                    <div className="text-2xl font-black text-[#D5896F]">{hudScore}</div>
                    <div className="text-xs text-[#8C857B]">{t('最終分數', 'Final Score')}</div>
                  </div>
                  <div className="bg-[#EFF5F3] rounded-xl p-4 text-center border border-[#6B9080]/20">
                    <Star className="w-6 h-6 text-[#6B9080] mx-auto mb-1" />
                    <div className="text-2xl font-black text-[#6B9080]">+{hudXp}</div>
                    <div className="text-xs text-[#8C857B]">{t('獲得 XP', 'XP Earned')}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="bg-[#F9F8F6] rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">
                    {hudScore >= 2000 ? '🥇' : hudScore >= 1200 ? '🥈' : hudScore >= 600 ? '🥉' : '🎖️'}
                  </div>
                  <div className="font-black text-[#2C2A26]">
                    {hudScore >= 2000 ? t('設計大師！', 'Design Master!')
                      : hudScore >= 1200 ? t('技術達人！', 'Technology Expert!')
                      : hudScore >= 600  ? t('初露鋒芒！', 'Promising Start!')
                      : t('繼續努力！', 'Keep Trying!')}
                  </div>
                  <div className="text-xs text-[#8C857B] mt-1">
                    {hudScore >= 2000 ? t('你的D&T知識無人能及！', 'Your D&T knowledge is unmatched!')
                      : hudScore >= 1200 ? t('非常出色，繼續保持！', 'Excellent! Keep it up!')
                      : hudScore >= 600  ? t('答多幾條題目可以追上！', 'Answer more questions to catch up!')
                      : t('每次練習都能進步！', 'Every practice makes you better!')}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #D5896F, #CCA068)' }}
                  >
                    <RotateCcw className="w-4 h-4" /> {t('再試一次', 'Play Again')}
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 rounded-xl font-bold text-[#6B665E] border border-[#E5E0D8] hover:bg-[#F2EFE9] transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t('返回', 'Back')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
