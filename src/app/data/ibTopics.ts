import { Box, Globe, Leaf, Lightbulb, ShoppingCart, Star, TrendingUp, Users, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type BilingualText = {
  zh: string;
  en: string;
};

type TopicReference = {
  label: BilingualText;
  url: string;
  internalTarget?: string;
};

export type IBSubtopicDetailSection = {
  title: BilingualText;
  paragraphs?: BilingualText[];
  bullets?: BilingualText[];
};

export type IBSubtopicDetail = {
  overview?: BilingualText;
  essentialIdea?: BilingualText;
  guidance?: BilingualText[];
  caseStudies?: BilingualText[];
  sections?: IBSubtopicDetailSection[];
  sourceLinks?: TopicReference[];
};

export type IBTopicSubtopic = {
  code: string;
  title: BilingualText;
  summary: BilingualText;
  resources?: TopicReference[];
  detail?: IBSubtopicDetail;
};

export type IBTopicGuide = {
  id: string;
  number: BilingualText;
  title: BilingualText;
  icon: LucideIcon;
  color: string;
  instruction: BilingualText;
  knowledge: BilingualText[];
  example: BilingualText;
  references: TopicReference[];
  subtopics?: IBTopicSubtopic[];
};

const bt = (zh: string, en: string): BilingualText => ({ zh, en });

export const createIBSubtopicKey = (topicId: string, subtopicCode: string) => `${topicId}::${subtopicCode}`;
export const createIBResourceKey = (resourceId: string) => `ib_resource::${resourceId}`;

export const findIBTopicById = (topicId?: string) => ibTopicGuides.find((topic) => topic.id === topicId);

const extractSubtopicCode = (value?: string) => value?.match(/^(\d+(?:\.\d+[a-z]?)?)/i)?.[1];

/** Resolve an internalTarget string to {screen, key} for navigation. */
export const resolveInternalTarget = (target: string): { screen: string; key?: string } => {
  if (target.startsWith('dashboard::')) return { screen: 'dashboard', key: target.slice('dashboard::'.length) };
  if (target.startsWith('ib_resource::')) return { screen: 'ib_resource', key: target.slice('ib_resource::'.length) };
  // legacy / subtopic format: ib_t6::6.1
  return { screen: 'ib_subtopic', key: target };
};

/** Returns {screen, key} if a reference has an internal route (explicit or auto-resolved). */
export const getInternalRoute = (topicId: string, reference: TopicReference): { screen: string; key?: string } | undefined => {
  if (reference.internalTarget) return resolveInternalTarget(reference.internalTarget);

  const topic = findIBTopicById(topicId);
  if (!topic?.subtopics?.length) return undefined;

  const codeFromEn = extractSubtopicCode(reference.label.en);
  const codeFromZh = extractSubtopicCode(reference.label.zh);
  const matchedCode = codeFromEn ?? codeFromZh;
  if (!matchedCode) return undefined;

  const subtopic = topic.subtopics.find((entry) => entry.code.toLowerCase() === matchedCode.toLowerCase());
  return subtopic ? { screen: 'ib_subtopic', key: createIBSubtopicKey(topicId, subtopic.code) } : undefined;
};

/** @deprecated Use getInternalRoute instead. Kept for backward compat. */
export const findIBSubtopicKeyForReference = (topicId: string, reference: TopicReference) => {
  const route = getInternalRoute(topicId, reference);
  return route?.screen === 'ib_subtopic' ? route.key : route ? `${route.screen}::${route.key ?? ''}` : undefined;
};

export const findIBSubtopicByKey = (subtopicKey?: string) => {
  if (!subtopicKey) {
    return undefined;
  }

  const [topicId, subtopicCode] = subtopicKey.split('::');
  if (!topicId || !subtopicCode) {
    return undefined;
  }

  const topic = findIBTopicById(topicId);
  const subtopic = topic?.subtopics?.find((entry) => entry.code === subtopicCode);

  if (!topic || !subtopic) {
    return undefined;
  }

  return { topic, subtopic };
};

export const ibTopicGuides: IBTopicGuide[] = [
  {
    id: 'ib_t1',
    number: bt('主題 1', 'Topic 1'),
    title: bt('人因工程與人機界面', 'Human Factors and Ergonomics'),
    icon: Users,
    color: '#D5896F',
    instruction: bt('先界定使用者、任務和情境，再用人體測量、姿勢和錯誤風險來支持你的設計判斷。', 'Start by defining the user, task, and context, then justify design decisions with anthropometrics, posture, and error-risk analysis.'),
    knowledge: [
      bt('掌握 5th / 50th / 95th 百分位、可達範圍、視線和施力區間。', 'Understand 5th / 50th / 95th percentiles, reach ranges, sight lines, and force zones.'),
      bt('把生理、心理和認知因素一起考慮，不要只停在尺寸。', 'Consider physiological, psychological, and cognitive factors, not just dimensions.'),
      bt('能解釋舒適、效率、安全、可及性與錯誤預防之間的關係。', 'Be able to explain the relationship between comfort, efficiency, safety, accessibility, and error prevention.'),
    ],
    example: bt('例子：可調節課室座椅與無障礙控制面板都可用來分析姿勢支撐、關節角度、視線安排與即時回饋。', 'Example: an adjustable classroom chair and an accessible control panel can both be analysed through posture support, joint angles, sight lines, and immediate feedback.'),
    references: [
      { label: bt('Topic 1: 人因工程與人機界面', 'Topic 1: Human Factors and Ergonomics'), url: '#', internalTarget: 'dashboard::ib_t1' },
      { label: bt('1.1a 人體測量學', '1.1a Anthropometrics'), url: '#', internalTarget: createIBSubtopicKey('ib_t1', '1.1a') },
      { label: bt('1.1c 生理因素', '1.1c Physiological Factors'), url: '#', internalTarget: createIBSubtopicKey('ib_t1', '1.1c') },
    ],
    subtopics: [
      {
        code: '1.1a',
        title: bt('人體測量學', 'Anthropometrics'),
        summary: bt('IB Topic 1 先從人體尺寸數據開始，設計者要用年齡、體型、可達範圍與使用／誤用情境去判斷產品或服務是否真正適合目標使用者。', 'IB Topic 1 starts with human measurement data, asking designers to use age, body size, reach range, and use or misuse scenarios to judge whether a product or service really fits the intended user.'),
      },
      {
        code: '1.1b',
        title: bt('心理因素', 'Psychological Factors'),
        summary: bt('除了尺寸，設計者還要分析知覺、偏好、情緒與感官經驗，因為人對顏色、質感、聲音和氣味的反應不一定能用單一標準量化。', 'Beyond size, designers analyse perception, preference, emotion, and sensory experience because responses to colour, texture, sound, and smell cannot always be reduced to one fixed standard.'),
      },
      {
        code: '1.1c',
        title: bt('生理因素', 'Physiological Factors'),
        summary: bt('IB 會把安全、健康、舒適與表現放在一起看，重點是理解力量、姿勢、疲勞和身體負擔如何影響設計決策。', 'IB treats safety, health, comfort, and performance together, focusing on how force, posture, fatigue, and bodily strain influence design decisions.'),
        resources: [
          { label: bt('人體工學工具設計', 'Ergonomic Tool Design'), url: '#', internalTarget: 'ib_resource::ergonomic_tool_design' },
        ],
      },
    ],
  },
  {
    id: 'ib_t2',
    number: bt('主題 2', 'Topic 2'),
    title: bt('資源管理與可持續性', 'Resource Management and Sustainability'),
    icon: Leaf,
    color: '#6B9080',
    instruction: bt('先追蹤材料與能源流，再比較設計方案如何影響資源消耗、壽命、回收與供應鏈風險。', 'Track material and energy flows first, then compare how design choices affect resource use, longevity, recovery, and supply-chain risk.'),
    knowledge: [
      bt('要熟悉線性經濟與循環經濟、6R、LCA、embodied energy 和碳足跡。', 'Know linear versus circular systems, the 6Rs, LCA, embodied energy, and carbon footprint.'),
      bt('資源管理不只談環保，也要談成本、物流、法規和企業責任。', 'Resource management is not only environmental; it also includes cost, logistics, regulation, and corporate responsibility.'),
      bt('能比較可再生、再生、再製和可維修策略的取捨。', 'Be able to compare the trade-offs among renewable, recycled, remanufactured, and repairable strategies.'),
    ],
    example: bt('例子：可維修電子產品或可重複補充包裝系統都可用來討論壽命延長、回收策略與供應鏈透明度。', 'Example: a repairable electronic product or a refill-based packaging system can be used to discuss life extension, recovery strategies, and supply-chain transparency.'),
    references: [
      { label: bt('Topic 2: 資源管理與可持續性', 'Topic 2: Resource Management and Sustainability'), url: '#', internalTarget: 'dashboard::ib_t2' },
      { label: bt('2.2 減廢策略', '2.2 Waste Mitigation Strategies'), url: '#', internalTarget: createIBSubtopicKey('ib_t2', '2.2') },
      { label: bt('2.6 生態設計', '2.6 Eco-design'), url: '#', internalTarget: createIBSubtopicKey('ib_t2', '2.6') },
    ],
    subtopics: [
      {
        code: '2.1',
        title: bt('資源與儲量', 'Resources and Reserves'),
        summary: bt('這一部分強調設計者不能把資源視為無限，而要理解可再生與不可再生來源、供應壓力，以及如何以創新方式回應能源、食物與原材料需要。', 'This subtopic asks designers not to treat resources as unlimited, but to understand renewable and non-renewable sources, supply pressure, and how innovation responds to needs for energy, food, and raw materials.'),
      },
      {
        code: '2.2',
        title: bt('減廢策略', 'Waste Mitigation Strategies'),
        summary: bt('IB 不只談垃圾分類，而是要追問設計如何減少一次性思維、延長使用週期，並把廢棄物流重新看成可回收的資源庫。', 'IB moves beyond recycling slogans and asks how design can reduce throwaway thinking, extend service life, and treat waste streams as recoverable resource stocks.'),
      },
      {
        code: '2.3',
        title: bt('能源使用、儲存與分配', 'Energy Utilization, Storage, and Distribution'),
        summary: bt('設計者要分清 energy conservation 與 energy efficiency，並比較產品、服務和系統如何透過技術或流程安排降低能耗。', 'Designers should distinguish energy conservation from energy efficiency and compare how products, services, and systems reduce energy demand through technology or process design.'),
        resources: [
          { label: bt('電池類型', 'Types of Batteries'), url: 'https://www.explainthatstuff.com/batteries.html' },
        ],
      },
      {
        code: '2.4',
        title: bt('清潔科技', 'Clean Technology'),
        summary: bt('Clean technology 在 IB 的重點是把環境、技術、經濟和社會因素一同納入，思考設計怎樣脫離高污染、低效率的舊技術。', 'In IB, clean technology combines environmental, technical, economic, and social factors to consider how design can move away from polluting and obsolete technologies.'),
      },
      {
        code: '2.5',
        title: bt('綠色設計', 'Green Design'),
        summary: bt('綠色設計通常從改善既有產品開始，重點是看 redesign 能否逐步或徹底地回應環境目標。', 'Green design often starts by improving an existing product, focusing on whether redesign can respond to environmental objectives incrementally or radically.'),
      },
      {
        code: '2.6',
        title: bt('生態設計', 'Eco-design'),
        summary: bt('生態設計要求在最早階段就把整個生命週期的環境影響放進設計決策，而不是等到生產完成後才補做環保處理。', 'Eco-design requires environmental impact across the whole life cycle to be considered from the earliest design stage rather than treated as a late add-on after production decisions are fixed.'),
        resources: [
          { label: bt('LCA 資源', 'LCA Resources'), url: 'https://www.ellenmacarthurfoundation.org/topics/circular-economy/overview' },
          { label: bt('Cradle to Cradle 課程', 'C2C Course'), url: 'https://mcdonough.com/cradle-to-cradle/' },
        ],
      },
    ],
  },
  {
    id: 'ib_t3',
    number: bt('主題 3', 'Topic 3'),
    title: bt('模型製作', 'Modelling'),
    icon: Box,
    color: '#CCA068',
    instruction: bt('用 IB 的角度說明設計者為何在不同設計階段選擇 conceptual、graphical、physical、CAD 或 rapid prototyping，而不是把 modelling 當成單一做模型技巧。', 'Explain modelling in the IB sense by showing why a designer chooses conceptual, graphical, physical, CAD, or rapid prototyping at different stages of the design cycle rather than treating modelling as one generic model-making skill.'),
    knowledge: [
      bt('Topic 3 要區分 3.1 conceptual、3.2 graphical、3.3 physical、3.4 CAD 與 3.5 rapid prototyping 五種 modelling 路徑。', 'Topic 3 distinguishes five modelling routes: 3.1 conceptual, 3.2 graphical, 3.3 physical, 3.4 CAD, and 3.5 rapid prototyping.'),
      bt('模型的角色包括理解功能、行為、外觀、比例、使用者理解方式，以及測試是否回應 user requirements。', 'Models are used to understand function, behaviour, appearance, scale, user understanding, and whether a design responds to user requirements.'),
      bt('CAD 與 rapid prototyping 也連到 customization、virtual testing、CAM workflow 與 data / design protection。', 'CAD and rapid prototyping also connect to customization, virtual testing, CAM workflows, and data / design protection.'),
    ],
    example: bt('例子：先用 flowchart 和 sketch map 出服務流程與結構，再做紙板比例模型測試操作，最後用 CAD 和 3D print 驗證配件與製造可行性。', 'Example: start with flowcharts and sketches to map service flow and structure, then use a scaled cardboard model to test interaction, and finally use CAD plus 3D printing to validate part fit and manufacturing feasibility.'),
    references: [
      { label: bt('3.1 概念模型', '3.1 Conceptual Modelling'), url: '#', internalTarget: createIBSubtopicKey('ib_t3', '3.1') },
      { label: bt('3.2 圖像模型', '3.2 Graphical Modelling'), url: '#', internalTarget: createIBSubtopicKey('ib_t3', '3.2') },
      { label: bt('3.5 快速原型製作', '3.5 Rapid Prototyping'), url: '#', internalTarget: createIBSubtopicKey('ib_t3', '3.5') },
    ],
    subtopics: [
      {
        code: '3.1',
        title: bt('概念模型', 'Conceptual Modelling'),
        summary: bt('概念模型用來模擬系統、服務或產品的核心運作，幫助設計者先釐清它應該做甚麼、如何行為、看起來如何，以及使用者是否能照預期理解。', 'Conceptual modelling simulates the essential logic of a system, service, or product so the designer can clarify what it should do, how it should behave, what it should look like, and whether users will understand it as intended.'),
        resources: [
          { label: bt('設計流程圖', 'Flowcharts for Designers'), url: '#', internalTarget: 'ib_resource::flowcharts_for_designers' },
        ],
      },
      {
        code: '3.2',
        title: bt('圖像模型', 'Graphical Modelling'),
        summary: bt('圖像模型的重點是把資料與構思簡化成更易討論和比較的形式，讓設計者可以由技術上未必可行的想法一路收斂至可實現方案。', 'Graphical modelling turns information and design intent into simpler visual forms so ideas can be discussed, compared, and refined from technically uncertain proposals toward feasible solutions.'),
        resources: [
          { label: bt('草圖與展示', 'Sketching and Presentation'), url: '#', internalTarget: 'ib_resource::sketching_presentation' },
          { label: bt('數碼繪圖', 'Digital Drawing'), url: '#', internalTarget: 'ib_resource::digital_drawing' },
          { label: bt('製作 planning drawings', 'Creating Planning Drawings'), url: '#', internalTarget: 'ib_resource::planning_drawings' },
          { label: bt('Fusion 360 planning drawings', 'Fusion 360: Creating Planning Drawings'), url: '#', internalTarget: 'ib_resource::fusion360_drawings' },
          { label: bt('建築圖學', 'Architectural Drawings'), url: '#', internalTarget: 'ib_resource::architectural_drawings' },
        ],
      },
      {
        code: '3.3',
        title: bt('實體模型', 'Physical Modelling'),
        summary: bt('實體模型把設計帶回尺寸、比例和使用情境，讓設計者可以放大或縮小物件去檢視結構、使用流程與 user requirements 是否真的成立。', 'Physical modelling brings design back to scale, proportion, and context so designers can enlarge or reduce objects to check structure, interaction flow, and whether user requirements are genuinely being met.'),
        resources: [
          { label: bt('紙板模型製作', 'Cardboard Modelling'), url: '#', internalTarget: 'ib_resource::cardboard_modelling' },
          { label: bt('原型與模型製作技巧', 'Prototyping and Model-making Tips'), url: '#', internalTarget: 'ib_resource::prototyping_tips' },
        ],
      },
      {
        code: '3.4',
        title: bt('電腦輔助設計', 'Computer-aided Design (CAD)'),
        summary: bt('CAD 不只是畫圖工具，它讓設計者能虛擬建立、視覺化、修改與分享設計，並把 customization、personalization 與 prototype communication 帶進整個 design cycle。', 'CAD is more than a drawing tool: it lets designers build, visualize, revise, and share designs virtually while supporting customization, personalization, and prototype communication across the whole design cycle.'),
      },
      {
        code: '3.5',
        title: bt('快速原型製作', 'Rapid Prototyping'),
        summary: bt('快速原型把 digital modelling 連到 CAM 與材料輸出，讓設計者可先做虛擬測試，再把資料送到製作設備，同時要考慮跨地域製造帶來的資料與設計保護問題。', 'Rapid prototyping connects digital modelling to CAM and material output so designers can test virtually before sending data to fabrication equipment, while also considering the implications for data and design protection across distributed manufacturing.'),
        resources: [
          { label: bt('3D 列印材料與應用', '3D Filaments and Applications'), url: '#', internalTarget: 'ib_resource::3d_filaments' },
        ],
      },
    ],
  },
  {
    id: 'ib_t4',
    number: bt('主題 4', 'Topic 4'),
    title: bt('材料與製造過程', 'Materials and Manufacturing Processes'),
    icon: Wrench,
    color: '#8A9A5B',
    instruction: bt('由性能需求出發，再把材料、加工方法、產量、公差、表面處理和品質控制連成完整決策。', 'Start from performance requirements, then connect materials, processes, production volume, tolerances, finishing, and quality control into one decision.'),
    knowledge: [
      bt('熟悉材料家族、性能、製程限制，以及加法、減法、成形和接合技術。', 'Know material families, properties, process limits, and additive, subtractive, forming, and joining techniques.'),
      bt('能解釋為何同一產品在 prototype、batch 與 mass production 會使用不同方法。', 'Explain why the same product may use different methods across prototyping, batch, and mass production.'),
      bt('理解 DfM、QA/QC、公差、配合和安全標準如何影響成品質素。', 'Understand how DfM, QA/QC, tolerances, fits, and safety standards affect final quality.'),
    ],
    example: bt('例子：比較 3D 列印原型、CNC 加工件與射出成型產品，分析它們在成本、精度和產量上的取捨。', 'Example: compare a 3D-printed prototype, a CNC-machined part, and an injection-moulded product to analyse trade-offs in cost, precision, and scale.'),
    references: [
      { label: bt('Topic 4: 材料與製造過程', 'Topic 4: Materials and Manufacturing Processes'), url: '#', internalTarget: 'dashboard::ib_t4' },
      { label: bt('4.4 製造過程', '4.4 Manufacturing Processes'), url: '#', internalTarget: createIBSubtopicKey('ib_t4', '4.4') },
      { label: bt('4.5 生產系統', '4.5 Production Systems'), url: '#', internalTarget: createIBSubtopicKey('ib_t4', '4.5') },
    ],
    subtopics: [
      {
        code: '4.1',
        title: bt('材料性質', 'Properties of Materials'),
        summary: bt('IB Topic 4 先看材料選擇背後的科學與倫理，設計者不只比較強度和外觀，也要分析 smart materials、環境影響與使用情境。', 'IB Topic 4 begins with the science and ethics behind material choice, asking designers to compare not only strength and appearance but also smart materials, environmental impact, and context of use.'),
      },
      {
        code: '4.2',
        title: bt('材料分類', 'Materials'),
        summary: bt('這裡會按金屬、木材、玻璃、塑膠、紡織與複合材料等類別比較性能與應用，而不是只背材料名稱。', 'This section compares metals, timber, glass, plastics, textiles, and composites through properties and applications rather than treating materials as a simple memorisation list.'),
        resources: [
          { label: bt('紙張、紙板與合成紙', 'Paper, Cardboard, Pulp, and Synthetic Papers'), url: '#', internalTarget: 'ib_resource::paper_pulp_board' },
        ],
      },
      {
        code: '4.3',
        title: bt('生產規模', 'Scales of Production'),
        summary: bt('IB 會把 production scale 與產量、財務、人手及物料選擇連起來，分析 one-off、batch 與 mass production 何時最合適。', 'IB links production scale to output volume, finance, staffing, and materials so students can judge when one-off, batch, or mass production is appropriate.'),
      },
      {
        code: '4.4',
        title: bt('製造過程', 'Manufacturing Processes'),
        summary: bt('製造過程在 IB 不只是技術名稱，而是要理解 DfM、品質控制和不同加工方法如何影響成本、準確度與可製造性。', 'Manufacturing processes in IB are not just technique names; they require understanding how DfM, quality control, and different processing methods affect cost, accuracy, and manufacturability.'),
        resources: [
          { label: bt('加法製造', 'Additive Manufacturing'), url: '#', internalTarget: 'ib_resource::additive_manufacturing' },
          { label: bt('減法製造', 'Subtractive Manufacturing'), url: '#', internalTarget: 'ib_resource::subtractive_manufacturing' },
          { label: bt('成形技術', 'Shaping Techniques'), url: '#', internalTarget: 'ib_resource::shaping_techniques' },
          { label: bt('接合技術', 'Joining Techniques'), url: '#', internalTarget: 'ib_resource::joining_techniques' },
        ],
      },
      {
        code: '4.5',
        title: bt('生產系統', 'Production Systems'),
        summary: bt('Topic 4 也要求學生看 economies of scale、內外部效率，以及生產方法如何跟 business growth 和 design for manufacture 一起運作。', 'Topic 4 also asks students to consider economies of scale, internal and external efficiency, and how production methods operate alongside business growth and design for manufacture.'),
        resources: [
          { label: bt('Design for Manufacture', 'Design for Manufacture'), url: '#', internalTarget: 'ib_resource::design_for_manufacture' },
        ],
      },
      {
        code: '4.6',
        title: bt('自動化生產中的機械人', 'Robots in Automated Production'),
        summary: bt('IB 對 automation 的處理同時看效率、穩定性和倫理，設計者要能評估自動化如何改變品質控制、勞動與歷史上的就業影響。', 'IB treats automation through efficiency, consistency, and ethics together, requiring designers to evaluate how automation changes quality control, labour, and the historical impact of job displacement.'),
      },
    ],
  },
  {
    id: 'ib_t5',
    number: bt('主題 5', 'Topic 5'),
    title: bt('創新', 'Innovation'),
    icon: Lightbulb,
    color: '#D5896F',
    instruction: bt('把創新寫成「問題、證據、原理、可行性」四步，而不是只把新穎外形當作創新。', 'Frame innovation through problem, evidence, principle, and feasibility instead of treating novelty of form as innovation.'),
    knowledge: [
      bt('懂得區分 incremental、radical、sustaining 和 disruptive innovation。', 'Distinguish incremental, radical, sustaining, and disruptive innovation.'),
      bt('能連結 desirability、feasibility、viability 與設計思維流程。', 'Connect desirability, feasibility, viability, and the design-thinking process.'),
      bt('知道專利、商標、版權與知識產權如何保護或限制創新。', 'Know how patents, trademarks, copyright, and IP protect or constrain innovation.'),
    ],
    example: bt('例子：一個回應校園飲水、收納或無障礙需要的新產品概念，很適合分析它是否真的解決問題，以及技術可行性是否足夠。', 'Example: a new product concept responding to campus hydration, storage, or accessibility needs is useful for analysing whether it solves a real problem and whether the technical feasibility is strong enough.'),
    references: [
      { label: bt('Topic 5: 發明與創新', 'Topic 5: Invention and Innovation'), url: '#', internalTarget: 'dashboard::ib_t5' },
      { label: bt('5.3 創新策略', '5.3 Strategies for Innovation'), url: '#', internalTarget: createIBSubtopicKey('ib_t5', '5.3') },
      { label: bt('5.5 產品生命週期', '5.5 Product Life Cycle'), url: '#', internalTarget: createIBSubtopicKey('ib_t5', '5.5') },
    ],
    subtopics: [
      {
        code: '5.1',
        title: bt('發明', 'Invention'),
        summary: bt('IB 把 invention 放在創造力與可行性之間來看，設計者不只要有想像力，也要明白知識、限制和使用者需要如何支持新產品成立。', 'IB treats invention as a balance between creativity and viability, where imagination must be supported by knowledge, constraints, and real user needs.'),
      },
      {
        code: '5.2',
        title: bt('創新', 'Innovation'),
        summary: bt('創新重點在於是否真正改善既有問題、找到產品缺口，並持續透過客觀分析重做與優化。', 'Innovation focuses on whether a design genuinely improves an existing problem, identifies a product gap, and continues to evolve through objective analysis and redevelopment.'),
      },
      {
        code: '5.3',
        title: bt('創新策略', 'Strategies for Innovation'),
        summary: bt('這一部分會把研發、策略流程與跨專業合作連起來，說明新技術和新服務如何被有系統地發展。', 'This section links R&D, strategic process, and interdisciplinary collaboration to show how new technologies and services are developed systematically.'),
      },
      {
        code: '5.4',
        title: bt('發明與創新的持份者', 'Stakeholders in Invention and Innovation'),
        summary: bt('IB 要學生看 innovation network，而不只看設計者本人，因為知識共享、參與式研究和產業合作都會影響創新成效。', 'IB asks students to analyse the innovation network rather than just the designer because knowledge sharing, participatory research, and industry collaboration all affect outcomes.'),
      },
      {
        code: '5.5',
        title: bt('產品生命週期', 'Product Life Cycle'),
        summary: bt('創新不能只看 launch 時刻，還要考慮產品、服務或系統在使用、維修、淘汰與社會環境影響中的整個生命週期。', 'Innovation cannot be judged only at launch; it must consider the whole life cycle of a product, service, or system across use, maintenance, decline, and wider environmental or social impact.'),
      },
      {
        code: '5.6',
        title: bt('創新擴散與消費者採納', 'Diffusion of Innovation and Consumer Adoption'),
        summary: bt('這一部分會分析新想法如何透過溝通、時間和社會系統被接受，以及文化與社群差異如何影響採納速度。', 'This part analyses how new ideas are accepted through communication, time, and social systems, and how culture and community differences influence adoption rates.'),
      },
      {
        code: '5.7',
        title: bt('創新、設計與市場規格', 'Innovation, Design, and Marketing Specifications'),
        summary: bt('IB 將 marketing specification 視為設計參數的一部分，要求設計者持續從 target market 收集有效資料，並把它轉化成明確規格。', 'IB treats the marketing specification as part of the design parameters, requiring designers to gather valid information from the target market and convert it into clear specifications.'),
      },
    ],
  },
  {
    id: 'ib_t6',
    number: bt('主題 6', 'Topic 6'),
    title: bt('經典設計', 'Classic Design'),
    icon: Star,
    color: '#6B9080',
    instruction: bt('分析經典設計時，不只描述外觀，還要說明它如何回應當時的科技、文化、材料與使用需求。', 'When analysing classic design, go beyond appearance and explain how it responded to the technology, culture, materials, and user needs of its time.'),
    knowledge: [
      bt('熟悉 Bauhaus、Modernism、Postmodernism、Rams 原則和品牌語言。', 'Be familiar with Bauhaus, Modernism, Postmodernism, Rams principles, and brand language.'),
      bt('能從功能、美學、生產方法、人體工學與文化影響作多角度分析。', 'Analyse from function, aesthetics, production method, ergonomics, and cultural impact.'),
      bt('知道「經典」不等於舊，而是具有持久影響力與可辨識價值。', 'Know that classic design does not simply mean old; it means enduring influence and recognisable value.'),
    ],
    example: bt('例子：經典收音機、休閒椅與家用咖啡壺可以作為不同時代的經典設計，比較材料、形式語言與文化價值。', 'Example: a classic radio, lounge chair, and domestic coffee pot can be compared as designs from different periods through materials, visual language, and cultural values.'),
    references: [
      { label: bt('Topic 6: 經典設計', 'Topic 6: Classic Design'), url: '#', internalTarget: 'dashboard::ib_t6' },
      { label: bt('6.1 經典設計的特徵', '6.1 Characteristics of Classic Design'), url: '#', internalTarget: createIBSubtopicKey('ib_t6', '6.1') },
      { label: bt('6.2 經典設計、功能與形式', '6.2 Classic Design, Function, and Form'), url: '#', internalTarget: createIBSubtopicKey('ib_t6', '6.2') },
    ],
    subtopics: [
      {
        code: '6.1',
        title: bt('經典設計的特徵', 'Characteristics of Classic Design'),
        summary: bt('IB 對 classic design 的理解不只在於名氣或功能，而是要從設計運動、時代語境與 originality 去分析產品為何具有持久影響力。', 'IB understands classic design through more than fame or function, asking students to analyse how design movement, historical context, and originality give a product lasting influence.'),
        detail: {
          overview: bt('6.1 不是單純列舉名作，而是要學生解釋一件產品如何在長時間內保持可辨識、被欣賞、被模仿，甚至在原本功能之外仍有文化價值。', 'Subtopic 6.1 is not about naming famous objects. It asks students to explain how a product remains recognizable, admired, imitated, and culturally valuable over time, even beyond its original function.'),
          essentialIdea: bt('經典設計之所以成為經典，不是因為它一開始就「看起來經典」，而是因為它經過時間考驗後仍保持辨識度、吸引力與文化地位。', 'A classic design does not begin life as a classic; it becomes one when time confirms its recognizability, desirability, and cultural status.'),
          guidance: [
            bt('說明 image 如何令產品一眼可辨，並引發情感反應。', 'Explain how image makes a product instantly recognizable and emotionally charged.'),
            bt('分析產品如何超越原有功能，不因技術更新而完全失去吸引力。', 'Analyse how a product transcends its original function and stays desirable even when newer technologies appear.'),
            bt('連結 mass production、持續出現在市場，以及 dominant design 對經典地位的影響。', 'Link mass production, long-term market presence, and dominant-design effects to classic status.'),
            bt('比較設計在不同時代背景中如何維持核心特徵，同時做出細微演化。', 'Compare how a design preserves its core identity while evolving subtly across changing contexts.'),
          ],
          caseStudies: [
            bt('Eames Lounge Chair', 'Eames Lounge Chair'),
            bt('Braun T3 Radio 與 Apple iPod', 'Braun T3 Radio and Apple iPod'),
            bt('1957 Volkswagen Beetle', '1957 Volkswagen Beetle'),
            bt('Converse Chuck Taylor All Stars', 'Converse Chuck Taylor All Stars'),
            bt('Bialetti Moka Coffee Pot', 'Bialetti Moka Coffee Pot'),
          ],
          sections: [
            {
              title: bt('設計本質與課程目標', 'Nature of Design and Course Aim'),
              paragraphs: [
                bt('IB 對 classic design 的理解不只看功能是否成功，也會看它是否能代表某個設計運動、時代語言或文化氣氛。真正關鍵通常是 originality，也就是設計如何在演化式或突破式改變中建立持久影響。', 'IB treats classic design as more than successful function. It also considers whether the product expresses a design movement, era, or cultural mood. Originality is often the key factor, whether the change was evolutionary or genuinely breakthrough.'),
                bt('課程角度會把經典設計和 breakthrough products 連在一起，因為它們往往在市場、文化或製造層面重新定義了人們對某類產品的期待。', 'From the course perspective, classic design is often linked to breakthrough products because these products reset expectations for a category in the market, in culture, or in manufacture.'),
              ],
            },
            {
              title: bt('Timelessness 如何形成', 'How Timelessness Develops'),
              bullets: [
                bt('經典設計不是一推出就自動成為 timeless，它需要時間、使用情境與文化記憶慢慢累積。', 'Classic design does not become timeless at launch; it needs time, use, and cultural memory to accumulate.'),
                bt('很多經典作品在誕生時其實顯得前衛甚至激進，之後才被社會接受並吸收進日常生活。', 'Many classic products first appear futuristic or radical and only later become absorbed into everyday life.'),
                bt('經典設計會演化，例如材料、尺寸、製程與細節可能改變，但核心輪廓與品牌印象通常仍被保留。', 'Classic designs evolve over time: materials, scale, processes, and details may change, while the core silhouette and brand identity are retained.'),
              ],
            },
            {
              title: bt('設計師為何要學 timelessness', 'Why Designers Study Timelessness'),
              bullets: [
                bt('理解經典設計的因素，有助於新產品在創新時建立更強的辨識度與長期價值。', 'Understanding classic-design factors helps new products build stronger recognition and longer-term value.'),
                bt('重新設計既有產品時，設計師需要知道哪些元素構成其經典特徵，否則容易破壞使用者的情感連結。', 'When redesigning an existing product, designers need to know which elements create its classic identity, or they risk damaging user attachment.'),
                bt('設計師也可以借用經典作品的 aesthetic properties，但必須轉化成新的語境，而不是單純複製。', 'Designers may borrow aesthetic properties from classic products, but they must adapt them to a new context rather than merely copying them.'),
              ],
            },
            {
              title: bt('經典設計常見特徵', 'Common Features of Classic Design'),
              bullets: [
                bt('Iconic：能代表一段時期、設計運動或次文化。', 'Iconic: it represents a period, design movement, or subculture.'),
                bt('Instantly recognizable：輪廓、色彩、比例或細節一眼可辨。', 'Instantly recognizable: its silhouette, colour, proportions, or details are immediately identifiable.'),
                bt('Desirable：它能引發擁有和使用的慾望，不只是一件工具。', 'Desirable: it creates a strong desire to own or use it, beyond pure utility.'),
                bt('Transcends function：即使技術上已過時，仍可能因收藏、象徵或情感價值而被追捧。', 'Transcends function: even if technologically outdated, it may remain desirable for collectible, symbolic, or emotional reasons.'),
                bt('Widely imitated、具 resale value、並逐漸成為 collectable。', 'It is often widely imitated, retains resale value, and gradually becomes collectible.'),
              ],
            },
            {
              title: bt('Image、情感與使用者反應', 'Image, Emotion, and User Response'),
              paragraphs: [
                bt('經典設計通常有強烈的 image。它的外觀不只美觀，也會把材料理解、製造技術、比例控制與耐用性一起轉化成可感知的品質。', 'Classic designs usually carry a strong image. Their appearance is not merely attractive; it communicates material knowledge, manufacturing quality, proportion control, and durability.'),
                bt('學生可以用三層情感回應來分析這種吸引力：visceral 針對第一眼美感，behavioural 針對功能與易用性，reflective 則關乎故事、身份與記憶。', 'Students can analyse this appeal through three layers of emotional response: visceral for first impressions, behavioural for performance and usability, and reflective for story, identity, and memory.'),
              ],
            },
            {
              title: bt('地位、文化與過時性', 'Status, Culture, and Obsolescence'),
              bullets: [
                bt('經典產品往往會反映文化背景，並在使用者之間形成身份認同與歸屬感。', 'Classic products often reflect a cultural background and create identity and belonging among users.'),
                bt('某些經典設計因稀有、昂貴或需要維護，會同時傳達 social status。', 'Some classic designs communicate social status because they are rare, expensive, or demanding to maintain.'),
                bt('它們能超越 obsolescence，意思是即使市場上有更新版本，人們仍願意保留、收藏或持續購買。', 'They can outlast obsolescence, meaning people still want to keep, collect, or buy them even when newer alternatives exist.'),
              ],
            },
            {
              title: bt('Mass Production、普及化與 Dominant Design', 'Mass Production, Ubiquity, and Dominant Design'),
              bullets: [
                bt('大規模生產讓產品進入更多人的日常生活，因此更容易變成共同記憶與文化符號。', 'Mass production puts a product into more people’s daily lives, making it more likely to become shared memory and a cultural symbol.'),
                bt('經典設計常因長期普及而變得 ubiquitous，人們甚至會對它產生情感依附。', 'Classic designs often become ubiquitous through long-term presence, and users may develop emotional attachment to them.'),
                bt('當某個設計成為 dominant design，它就會成為其他產品的評估基準，也因此更難被徹底改變。', 'Once a design becomes dominant, it becomes the benchmark against which other products are judged, which also makes it harder to change radically.'),
              ],
            },
          ],
          sourceLinks: [
            { label: bt('Topic 6: 經典設計總覽', 'Topic 6: Classic Design Overview'), url: '#', internalTarget: 'dashboard::ib_t6' },
            { label: bt('6.2 經典設計、功能與形式', '6.2 Classic Design, Function, and Form'), url: '#', internalTarget: createIBSubtopicKey('ib_t6', '6.2') },
          ],
        },
      },
      {
        code: '6.2',
        title: bt('經典設計、功能與形式', 'Classic Design, Function, and Form'),
        summary: bt('這部分要求學生檢視 form follows function 是否真的成立，並比較那些看似直覺、但其實同時依賴文化語言與技術發展的經典產品。', 'This section asks students to test whether form truly follows function and to compare classic products whose intuitive use also depends on cultural language and technological development.'),
        resources: [
          { label: bt('設計收藏', 'Design Collections'), url: '#', internalTarget: 'ib_resource::design_collections' },
          { label: bt('好設計十原則', '10 Principles for Good Design'), url: '#', internalTarget: 'ib_resource::rams_10_principles' },
        ],
      },
    ],
  },
  {
    id: 'ib_t7',
    number: bt('主題 7', 'Topic 7'),
    title: bt('用戶中心設計', 'User-Centred Design'),
    icon: Users,
    color: '#D5896F',
    instruction: bt('所有設計判斷都要回到真實用戶證據，包括訪談、觀察、可用性測試和情境分析。', 'Bring every design decision back to real user evidence, including interviews, observation, usability tests, and context analysis.'),
    knowledge: [
      bt('Persona、scenario、journey、task analysis 與 usability metrics 都要會用。', 'Use personas, scenarios, journeys, task analysis, and usability metrics appropriately.'),
      bt('能解釋 accessibility、inclusion、learnability、error prevention 和 feedback。', 'Explain accessibility, inclusion, learnability, error prevention, and feedback.'),
      bt('知道 UCD 與單純市場調查不同，重點是深入理解使用行為。', 'Know that UCD is different from basic market research because it focuses on deep behaviour understanding.'),
    ],
    example: bt('例子：校園借用系統、醫療登記介面或自助服務流程都適合用來討論 user needs、流程簡化與 accessibility。', 'Example: a campus booking system, medical check-in interface, or self-service process can be used to discuss user needs, simplification, and accessibility.'),
    references: [
      { label: bt('Topic 7: 用戶中心設計', 'Topic 7: User-Centered Design'), url: '#', internalTarget: 'dashboard::ib_t7' },
      { label: bt('7.3 用戶研究策略', '7.3 Strategies for User Research'), url: '#', internalTarget: createIBSubtopicKey('ib_t7', '7.3') },
      { label: bt('7.5 超越可用性', '7.5 Beyond Usability'), url: '#', internalTarget: createIBSubtopicKey('ib_t7', '7.5') },
    ],
    subtopics: [
      {
        code: '7.1',
        title: bt('用戶中心設計', 'User-Centred Design (UCD)'),
        summary: bt('7.1 要學生把設計周期每一階段都建立在真實用戶資料之上，避免憑設計者自己的假設去代替觀察、訪談和分析。', '7.1 asks students to ground every stage of the design cycle in real user evidence rather than replacing observation, interviews, and analysis with designer assumptions.'),
        resources: [
          { label: bt('UCD 五個階段', '5 Stages of UCD'), url: '#', internalTarget: 'ib_resource::ucd_five_stages' },
        ],
      },
      {
        code: '7.2',
        title: bt('可用性', 'Usability'),
        summary: bt('7.2 聚焦 learnability、efficiency、error prevention 與 user satisfaction，重點不是產品能否運作，而是使用者能否自然、穩定而低風險地完成任務。', '7.2 focuses on learnability, efficiency, error prevention, and user satisfaction, asking not merely whether a product works, but whether users can complete tasks naturally, consistently, and with low risk.'),
      },
      {
        code: '7.3',
        title: bt('用戶研究策略', 'Strategies for User Research'),
        summary: bt('這部分要求學生按情境選擇 research methods，例如 observation、interviews、questionnaires、personas 和 scenarios，並說明每種方法能揭示哪一類 user needs。', 'This subtopic asks students to choose research methods for the context, such as observation, interviews, questionnaires, personas, and scenarios, and explain what type of user need each method can reveal.'),
      },
      {
        code: '7.4',
        title: bt('用戶中心設計策略', 'Strategies for User-Centred Design'),
        summary: bt('7.4 把研究結果帶回設計決策，重點是如何透過觀察、回饋與 iteration，逐步提升 acceptability、accessibility 與整體 usability。', '7.4 brings research findings back into design decisions, focusing on how observation, feedback, and iteration progressively improve acceptability, accessibility, and overall usability.'),
        resources: [
          { label: bt('用戶研究策略與資源', 'User Research Strategies and Resources'), url: '#', internalTarget: 'ib_resource::user_research_strategies' },
        ],
      },
      {
        code: '7.5',
        title: bt('超越可用性', 'Beyond Usability'),
        summary: bt('7.5 要求學生再向前一步，分析 pleasure、emotion、expectation 與 brand perception 如何影響人對產品、服務和系統的理解與依附。', '7.5 pushes beyond usability to analyse how pleasure, emotion, expectation, and brand perception shape how people interpret and connect with products, services, and systems.'),
      },
    ],
  },
  {
    id: 'ib_t8',
    number: bt('主題 8', 'Topic 8'),
    title: bt('可持續性', 'Sustainability'),
    icon: Globe,
    color: '#8A9A5B',
    instruction: bt('HL 可持續性要超越「環保材料」口號，能用數據與系統圖去比較設計對環境、社會和商業的影響。', 'HL sustainability should go beyond eco-material slogans and compare environmental, social, and business impact through data and systems thinking.'),
    knowledge: [
      bt('懂得 circular economy、repairability、service models、decarbonisation 和 trade-offs。', 'Understand circular economy, repairability, service models, decarbonisation, and trade-offs.'),
      bt('能比較 durability、recycled content、packaging、transport 與 end-of-life recovery。', 'Compare durability, recycled content, packaging, transport, and end-of-life recovery.'),
      bt('知道 sustainability decision 需要平衡排放、成本、效能與使用體驗。', 'Know that sustainability decisions must balance emissions, cost, performance, and user experience.'),
    ],
    example: bt('例子：可維修照明產品、循環包裝服務或二次翻新設備都可以用來討論延長壽命與循環模式。', 'Example: a repairable lighting product, circular packaging service, or refurbished device can be used to discuss life extension and circular models.'),
    references: [
      { label: bt('Topic 8: 可持續性', 'Topic 8: Sustainability'), url: '#', internalTarget: 'dashboard::ib_t8' },
      { label: bt('8.3 可持續設計', '8.3 Sustainable Design'), url: '#', internalTarget: createIBSubtopicKey('ib_t8', '8.3') },
      { label: bt('8.4 可持續創新', '8.4 Sustainable Innovation'), url: '#', internalTarget: createIBSubtopicKey('ib_t8', '8.4') },
    ],
    subtopics: [
      {
        code: '8.1',
        title: bt('可持續發展', 'Sustainable Development'),
        summary: bt('8.1 強調 sustainable development 不是單一環保功能，而是要在美感、成本、社會文化因素、能源、材料、健康與可用性之間做系統性平衡。', '8.1 emphasizes that sustainable development is not one environmental feature, but a systems-level balance among aesthetics, cost, sociocultural factors, energy, materials, health, and usability.'),
      },
      {
        code: '8.2',
        title: bt('可持續消費', 'Sustainable Consumption'),
        summary: bt('8.2 要學生分析如何在滿足基本需要和提升生活質素的同時，減少資源消耗、毒性材料、廢物與整個 life cycle 的污染排放。', '8.2 asks students to analyse how products, services, and systems can meet real needs and improve quality of life while reducing resource use, toxic materials, waste, and pollution across the life cycle.'),
      },
      {
        code: '8.3',
        title: bt('可持續設計', 'Sustainable Design'),
        summary: bt('8.3 把 LCA 和 eco-design 放進最早的設計階段，要求學生先找出環境熱點，再用材料、製造、配送或 end-of-life 的改動去降低影響。', '8.3 places LCA and eco-design in the earliest design stages, asking students to identify environmental hotspots first and then reduce them through changes to materials, manufacturing, distribution, or end-of-life planning.'),
      },
      {
        code: '8.4',
        title: bt('可持續創新', 'Sustainable Innovation'),
        summary: bt('8.4 把 sustainability 視為創新機會，讓學生比較法規、成本節省、品牌定位與新商業模式如何同時帶來 environmental gains 與 market returns。', '8.4 treats sustainability as an innovation opportunity, asking students to compare how regulation, cost reduction, brand positioning, and new business models can deliver both environmental gains and market returns.'),
      },
    ],
  },
  {
    id: 'ib_t9',
    number: bt('主題 9', 'Topic 9'),
    title: bt('創新與市場', 'Innovation and Markets'),
    icon: TrendingUp,
    color: '#CCA068',
    instruction: bt('從目標市場開始，把價值主張、顧客痛點、競品差異和商業可行性說清楚。', 'Start with the target market and make the value proposition, customer pain points, competitive difference, and business viability explicit.'),
    knowledge: [
      bt('要會 market pull / technology push、segmentation、USP、adoption 與 branding。', 'Know market pull / technology push, segmentation, USP, adoption, and branding.'),
      bt('Value Proposition Canvas 很適合用來把 jobs、pains、gains 寫清楚。', 'The Value Proposition Canvas is useful for clarifying jobs, pains, and gains.'),
      bt('商業化不只看產品本身，還包括渠道、價格、包裝與信任。', 'Commercialisation is not only about the product itself, but also channel, pricing, packaging, and trust.'),
    ],
    example: bt('例子：面向特定運動族群或通勤族的產品提案，很適合用來分析 target segment、value proposition 與 commercial viability。', 'Example: a product proposal for a specific sports group or commuter segment is useful for analysing target segment, value proposition, and commercial viability.'),
    references: [
      { label: bt('Topic 9: 創新與市場', 'Topic 9: Innovation and Markets'), url: '#', internalTarget: 'dashboard::ib_t9' },
      { label: bt('9.4 市場研究', '9.4 Market Research'), url: '#', internalTarget: createIBSubtopicKey('ib_t9', '9.4') },
      { label: bt('9.5 品牌建立', '9.5 Branding'), url: '#', internalTarget: createIBSubtopicKey('ib_t9', '9.5') },
    ],
    subtopics: [
      {
        code: '9.1',
        title: bt('企業策略', 'Corporate Strategies'),
        summary: bt('9.1 要學生把設計決策放進公司 objectives 之中，理解產品、服務和系統的評估如何影響企業選擇 growth、differentiation 或 niche focus 等策略。', '9.1 asks students to place design decisions within company objectives and understand how the evaluation of products, services, and systems informs strategies such as growth, differentiation, or niche focus.'),
      },
      {
        code: '9.2',
        title: bt('市場範疇與區隔', 'Market Sectors and Segments'),
        summary: bt('9.2 的重點是界定 target audience，分析 whole market 與 segmented market 的差異，並說明設計者為何必須理解使用者共同特徵與消費情境。', '9.2 focuses on defining the target audience, comparing whole-market and segmented-market approaches, and explaining why designers must understand shared user characteristics and consumption contexts.'),
      },
      {
        code: '9.3',
        title: bt('市場營銷組合', 'Marketing Mix'),
        summary: bt('9.3 把 empathy 和 market analysis 連到 product、price、place 與 promotion，要求學生解釋質量、分銷、定價和發布訊息如何共同影響成敗。', '9.3 links empathy and market analysis to product, price, place, and promotion, asking students to explain how quality expectations, distribution, pricing, and launch messaging combine to affect success.'),
      },
      {
        code: '9.4',
        title: bt('市場研究', 'Market Research'),
        summary: bt('9.4 要學生說明 market research 如何界定 user expectations、可接受價格與設計限制，並把資料收集變成改良產品與提高成功機會的工具。', '9.4 asks students to explain how market research defines user expectations, acceptable price points, and design constraints, turning data collection into a tool for product improvement and stronger chances of success.'),
        resources: [
          { label: bt('市場研究策略', 'Market Research Strategies'), url: '#', internalTarget: 'ib_resource::market_research_strategies' },
        ],
      },
      {
        code: '9.5',
        title: bt('品牌建立', 'Branding'),
        summary: bt('9.5 把品牌視為 company identity 與 user experience 的整合，要求學生分析 value proposition、內容設計、語氣、廣告與推廣如何把產品帶進市場。', '9.5 treats branding as the integration of company identity and user experience, asking students to analyse how value proposition, content design, tone, advertising, and promotion diffuse a product into the market.'),
      },
    ],
  },
  {
    id: 'ib_t10',
    number: bt('主題 10', 'Topic 10'),
    title: bt('商業生產', 'Commercial Production'),
    icon: ShoppingCart,
    color: '#8A9A5B',
    instruction: bt('先判斷生產量與品質要求，再選擇 batch、mass 或 continuous approaches，並說明人力、自動化與物流安排。', 'Judge production scale and quality demands first, then choose batch, mass, or continuous approaches and explain labour, automation, and logistics.'),
    knowledge: [
      bt('熟悉 Just-in-Time、jidoka、lean、economies of scale、standardisation 與 workflow control。', 'Be familiar with Just-in-Time, jidoka, lean, economies of scale, standardisation, and workflow control.'),
      bt('能比較 local production、global supply chains、automation 與 resilience。', 'Compare local production, global supply chains, automation, and resilience.'),
      bt('知道高效率不等於好答案，仍要分析品質、風險、倫理與彈性。', 'Know that high efficiency is not automatically the best answer; quality, risk, ethics, and flexibility still matter.'),
    ],
    example: bt('例子：同一個產品如果分別用 batch、lean 和 computer-integrated production 去製造，就可以比較 waste reduction、flow、quality control 與成本。', 'Example: manufacturing the same product through batch, lean, and computer-integrated production provides a good comparison of waste reduction, flow, quality control, and cost.'),
    references: [
      { label: bt('Topic 10: 商業生產', 'Topic 10: Commercial Production'), url: '#', internalTarget: 'dashboard::ib_t10' },
      { label: bt('10.2 精益生產', '10.2 Lean Production'), url: '#', internalTarget: createIBSubtopicKey('ib_t10', '10.2') },
      { label: bt('10.4 品質管理', '10.4 Quality Management'), url: '#', internalTarget: createIBSubtopicKey('ib_t10', '10.4') },
    ],
    subtopics: [
      {
        code: '10.1',
        title: bt('Just in Time 與 Just in Case', 'Just in Time and Just in Case'),
        summary: bt('10.1 要學生比較低庫存效率與安全庫存彈性，分析不同市場與供應情況下，JIT 和 JIC 如何在成本、風險與資源浪費之間取捨。', '10.1 asks students to compare low-inventory efficiency with buffer-stock resilience, analysing how JIT and JIC trade off cost, risk, and resource waste under different market and supply conditions.'),
      },
      {
        code: '10.2',
        title: bt('精益生產', 'Lean Production'),
        summary: bt('10.2 把 lean production 看成長期策略，而不是一次性的流程改善，重點是持續減少 waste、改善 flow，並把 product 與 process design 一起優化。', '10.2 treats lean production as a long-term strategy rather than a one-off process fix, focusing on continual waste reduction, improved flow, and the joint optimization of product and process design.'),
      },
      {
        code: '10.3',
        title: bt('電腦整合製造', 'Computer-Integrated Manufacturing (CIM)'),
        summary: bt('10.3 要學生理解電腦如何從設計早期就整合進 manufacture，支援 automation、reduced error 和 higher output，同時要求對可用製程有足夠技術理解。', '10.3 asks students to understand how computers are integrated into manufacture from the earliest design stages, supporting automation, reduced error, and higher output while demanding strong understanding of available processes.'),
      },
      {
        code: '10.4',
        title: bt('品質管理', 'Quality Management'),
        summary: bt('10.4 強調 quality requirements 不只靠最後檢查，而要透過 QC、QA 和 SPC 在整個生產流程中維持一致品質並減少資源浪費。', '10.4 emphasizes that quality is not achieved only through final inspection, but through QC, QA, and SPC across the whole production process to maintain consistency and reduce wasted resources.'),
      },
      {
        code: '10.5',
        title: bt('經濟可行性', 'Economic Viability'),
        summary: bt('10.5 把材料、製造方法、勞工、產量與零售價格連成同一組商業判斷，要求學生分析設計階段哪些決策最能提高 affordability 與 financial return。', '10.5 connects materials, manufacturing method, labour, production scale, and retail price into one commercial judgement, asking students to analyse which design-stage choices most improve affordability and financial return.'),
      },
    ],
  },
];