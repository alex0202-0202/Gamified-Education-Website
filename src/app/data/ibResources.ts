type BilingualText = { zh: string; en: string };
const bt = (zh: string, en: string): BilingualText => ({ zh, en });

type IBResourceSection = {
  title: BilingualText;
  paragraphs?: BilingualText[];
  bullets?: BilingualText[];
  links?: { label: BilingualText; url: string }[];
  table?: { headers: BilingualText[]; rows: BilingualText[][] };
};

export type IBResourcePage = {
  id: string;
  title: BilingualText;
  parentTopicId: string;
  topicColor: string;
  overview: BilingualText;
  sections: IBResourceSection[];
};

export const ibResourcePages: IBResourcePage[] = [
  // ─── Topic 1 ───────────────────────────────────────────────────────
  {
    id: 'ergonomic_tool_design',
    title: bt('人體工學工具設計', 'Ergonomic Tool Design'),
    parentTopicId: 'ib_t1',
    topicColor: '#D5896F',
    overview: bt(
      '工具設計中的人體工學，是指透過分析使用者的手部解剖學、握姿類型與施力模式，來設計出更安全、更有效率、疲勞更少的手持工具。',
      'Ergonomics in tool design involves analysing hand anatomy, grip types, and force patterns to create hand-held tools that are safer, more efficient, and less fatiguing.'
    ),
    sections: [
      {
        title: bt('手部解剖學與握力', 'Hand Anatomy and Grip Strength'),
        paragraphs: [
          bt(
            '人的手部由 27 塊骨頭、多組肌肉和肌腱組成，不同部位適合不同的力量輸出。握持工具時，設計師需要理解力量是由前臂肌肉透過肌腱傳遞到手指和手掌，而不是由手部本身產生。',
            'The human hand consists of 27 bones, multiple muscle groups, and tendons. Grip strength is generated in the forearm and transmitted through tendons rather than originating in the hand itself.'
          ),
          bt(
            '成年男性平均握力約 400–500 N，女性約 250–350 N。第五百分位（弱勢使用者）的握力可低至 150 N，因此工具設計應讓弱勢用戶也能有效使用，不應只優化中位數用戶。',
            'Average grip force for adult males is approximately 400–500 N and for females 250–350 N. The 5th-percentile user may have grip strength as low as 150 N, so tools should be designed so that weaker users can still operate them effectively, not just the median user.'
          ),
        ],
      },
      {
        title: bt('三種主要握持類型', 'Three Primary Grip Types'),
        bullets: [
          bt(
            '力量握持（Power Grip）：整個手掌包覆工具，如鎚子、鋸子。適合傳遞大力，但精確度較低。',
            'Power Grip: the whole hand wraps around the tool, as in a hammer or handsaw. Best for transmitting large forces with lower precision.'
          ),
          bt(
            '精確握持（Precision Grip）：拇指與食指（有時加中指）夾持工具，如鉛筆、手術刀。力量小但控制精確。',
            'Precision Grip: thumb and index finger (sometimes middle finger) pinch the tool, as in a pencil or scalpel. Less force but fine control.'
          ),
          bt(
            '側面握持（Lateral Pinch）：拇指對食指側面施力，常用於鑰匙或薄卡。屬於日常功能性動作。',
            'Lateral Pinch: thumb presses against the side of the index finger, as in using a key. Common for everyday functional tasks.'
          ),
        ],
      },
      {
        title: bt('手柄幾何形狀的設計原則', 'Handle Geometry Design Principles'),
        bullets: [
          bt(
            '直徑：力量握持的最佳手柄直徑為 30–45 mm；精確握持則約 8–16 mm。過細或過粗均增加疲勞。',
            'Diameter: optimal handle diameter for power grip is 30–45 mm; for precision grip approximately 8–16 mm. Too thin or too thick both increase fatigue.'
          ),
          bt(
            '長度：手柄應至少 100 mm，以讓整個手掌參與，避免僅末端手指受力。',
            'Length: handles should be at least 100 mm long so the full palm is engaged, avoiding load concentration on fingertips only.'
          ),
          bt(
            '截面形狀：圓形手柄允許旋轉動作（如螺絲批），橢圓形或三角形截面可防止旋轉並對準施力方向。',
            'Cross-section: circular handles allow rotation (as in a screwdriver); oval or triangular sections prevent rotation and align force direction.'
          ),
          bt(
            '表面紋理：適度的橡膠或紋理表面可在 30–50% 的情況下降低所需握力，同時減少打滑，但過度的紋理反而會傷害皮膚。',
            'Surface texture: moderate rubber or textured surfaces can reduce required grip force by 30–50% while reducing slip, but excessive texture can cause skin damage.'
          ),
        ],
      },
      {
        title: bt('腕部中性位置與重複性損傷', 'Wrist Neutral Position and Repetitive Strain'),
        paragraphs: [
          bt(
            '手腕在中性（直立）位置時，力量傳遞效率最高，腕管壓力最小。設計應讓使用者在正常操作時保持腕部直立，不需彎曲或扭轉。原則是「彎曲工具，而不是彎曲手腕」。',
            'The wrist at its neutral (straight) position has the highest force-transmission efficiency and lowest carpal tunnel pressure. Tools should be designed so the wrist stays straight during normal use — the principle is "bend the tool, not the wrist".'
          ),
          bt(
            '重複性勞損（RSI）是長期重複動作導致的軟組織傷害，影響腕管、肌腱和關節。工具設計通過減少偏轉角度、降低觸發力量和提供更好支撐，可顯著降低 RSI 風險。',
            'Repetitive strain injury (RSI) results from sustained repetitive motion causing soft-tissue damage in the carpal tunnel, tendons, and joints. Reducing deviation angle, lowering trigger force, and providing better support can significantly reduce RSI risk.'
          ),
        ],
      },
      {
        title: bt('IB 設計分析應用', 'IB Design Analysis Application'),
        bullets: [
          bt(
            '比較設計取捨：圓柱形手柄有更廣的適用性，但專用形狀可針對特定任務提供更好的性能與舒適度。',
            'Compare trade-offs: cylindrical handles are more universal, but specialist shapes can provide better performance and comfort for specific tasks.'
          ),
          bt(
            '從多個百分位考慮：兒童工具、老年用工具和職業工具在手柄直徑、重量分佈和觸發力要求上差異顯著。',
            'Consider multiple percentiles: children\'s tools, elderly-user tools, and professional tools differ significantly in handle diameter, weight distribution, and trigger-force requirements.'
          ),
          bt(
            '案例研究：比較傳統廚師刀（直手柄）和人體工學廚師刀（彎曲手柄），分析各自如何處理腕部角度、力量傳遞和使用疲勞。',
            'Case study: compare a traditional chef\'s knife (straight handle) with an ergonomic version (bent handle), analysing how each addresses wrist angle, force transmission, and user fatigue.'
          ),
        ],
      },
    ],
  },

  // ─── Topic 3 ───────────────────────────────────────────────────────
  {
    id: 'flowcharts_for_designers',
    title: bt('設計流程圖', 'Flowcharts for Designers'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '流程圖是設計者用來視覺化系統流程、用戶旅程或決策邏輯的工具，讓複雜的設計意圖變得容易溝通、分析和改進。',
      'Flowcharts are visual tools designers use to map system processes, user journeys, or decision logic, making complex design intent easier to communicate, analyse, and improve.'
    ),
    sections: [
      {
        title: bt('流程圖的四大標準符號', 'Four Standard Flowchart Symbols'),
        bullets: [
          bt('橢圓 / 圓角矩形：流程的起點或終點（Terminator）', 'Oval / rounded rectangle: start or end of a process (Terminator)'),
          bt('矩形：一個操作步驟或行動（Process）', 'Rectangle: one action or operation step (Process)'),
          bt('菱形：需要作出決定的分支點（Decision），有兩個出口（是 / 否）', 'Diamond: a decision point requiring a choice (Decision), with two exits (Yes / No)'),
          bt('平行四邊形：資料輸入或輸出（Input / Output）', 'Parallelogram: data input or output (Input / Output)'),
        ],
      },
      {
        title: bt('設計中的三種流程圖', 'Three Types of Flowcharts in Design'),
        bullets: [
          bt(
            '系統流程圖（System Flowchart）：顯示信息或材料在系統內的流動，適用於說明製造流程、服務系統或數位產品後端邏輯。',
            'System Flowchart: shows how information or material flows through a system, suited for manufacturing processes, service systems, or digital product back-end logic.'
          ),
          bt(
            '用戶流程圖（User Flow Diagram）：追蹤用戶在產品或服務中的路徑，顯示每個接觸點和決策節點，是 UX/UI 設計的必要工具。',
            'User Flow Diagram: tracks the path a user takes through a product or service, showing each touchpoint and decision node. Essential in UX / UI design.'
          ),
          bt(
            '決策流程圖（Decision Flowchart）：集中展示需要判斷的情況和可能的結果，幫助設計師識別設計方案中的問題路徑。',
            'Decision Flowchart: focuses on situations requiring judgement and the possible outcomes, helping designers identify problem paths in a design solution.'
          ),
        ],
      },
      {
        title: bt('如何在 IB IA 中使用流程圖', 'How to Use Flowcharts in IB IA'),
        paragraphs: [
          bt(
            '在 IA 的分析階段，流程圖可以用來梳理現有系統的問題所在，例如：用戶完成某任務的步驟中，哪些步驟最費時或最容易出錯？',
            'In the analysis phase of IA, flowcharts can map an existing system to reveal where problems occur, such as which steps in a user task are most time-consuming or error-prone.'
          ),
          bt(
            '在概念設計階段，流程圖可以比較兩種方案的邏輯複雜度。步驟越少、決策點越少的方案，通常更易使用，也更易製造。',
            'In the conceptual design phase, flowcharts can compare the logical complexity of two solutions. Fewer steps and fewer decision points usually indicate a simpler, more manufacturable design.'
          ),
        ],
      },
    ],
  },
  {
    id: 'sketching_presentation',
    title: bt('草圖與展示繪圖', 'Sketching and Presentation Drawing'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '草圖與展示繪圖是設計師在概念探索和方案溝通時最快速的視覺化工具，從粗略縮略圖到精確展示圖均有不同用途。',
      'Sketching and presentation drawing are the fastest visualisation tools designers use for exploring concepts and communicating solutions, ranging from rough thumbnails to precise presentation renderings.'
    ),
    sections: [
      {
        title: bt('草圖的三個層次', 'Three Levels of Sketching'),
        bullets: [
          bt(
            '縮略圖草圖（Thumbnail Sketches）：快速、小型、不精確的速寫，用於腦力激盪時探索盡量多的構思。目的是量，不是質。',
            'Thumbnail Sketches: quick, small, and imprecise drawings used during brainstorming to explore as many ideas as possible. The goal is quantity, not quality.'
          ),
          bt(
            '概念草圖（Concept Sketches）：選出最有潛力的構思後，用更多細節和比例感表達形態、功能和組件關係。通常配合標注說明。',
            'Concept Sketches: drawn after selecting the most promising ideas, these show form, function, and component relationships with greater detail and proportional accuracy. Usually accompanied by annotations.'
          ),
          bt(
            '展示圖（Presentation Drawings）：為了向客戶、用戶或評鑑者溝通最終設計方案，需要加入陰影、材質感、比例和背景，讓觀者能理解設計意圖。',
            'Presentation Drawings: produced to communicate the final design to clients, users, or evaluators. Includes shading, material texture, proportion, and context so the viewer understands the design intent.'
          ),
        ],
      },
      {
        title: bt('關鍵繪圖技巧', 'Key Drawing Techniques'),
        bullets: [
          bt(
            '線條粗細（Line Weight）：用粗線條表示輪廓，細線條表示細節，幫助視覺層次清晰。',
            'Line Weight: use thick lines for outlines and thin lines for detail to create clear visual hierarchy.'
          ),
          bt(
            '陰影（Shading）：用影線（hatching）或漸變表達光源方向和立體感，讓平面草圖看起來有三維效果。',
            'Shading: use hatching or blending to indicate light source direction and three-dimensionality, making flat sketches appear volumetric.'
          ),
          bt(
            '標注（Annotation）：簡短文字說明材料、功能、尺寸或製程考量，把視覺信息與設計理由連起來。',
            'Annotation: brief notes explaining materials, function, dimensions, or process considerations, linking visual information to design rationale.'
          ),
          bt(
            '比例人（Scale Figure）：在繪圖中加入人體輪廓，幫助觀者理解產品的實際大小，特別對傢具和空間設計重要。',
            'Scale Figure: including a human silhouette helps the viewer understand the real scale of the product, especially important for furniture and spatial design.'
          ),
        ],
      },
      {
        title: bt('IB IA 中的草圖要求', 'Sketching Requirements in IB IA'),
        paragraphs: [
          bt(
            '在 IA 的概念設計部分（Criterion B），學生需要展示多個截然不同的構思方案。每個方案應有清晰的草圖，並說明為甚麼這個方案可以解決設計問題。',
            'In IA Criterion B, students must show multiple distinct design ideas. Each should have a clear sketch and explanation of why it addresses the design problem.'
          ),
          bt(
            '展示圖不必手繪——使用數碼工具（如 Procreate、Adobe Illustrator、Fusion 360 Render）是完全被接受的，但設計者仍需說明設計意圖，不能只展示漂亮的效果圖。',
            'Presentation drawings do not need to be hand-drawn. Digital tools such as Procreate, Adobe Illustrator, or Fusion 360 Render are fully acceptable, but the designer must still explain design intent rather than just showing a polished rendering.'
          ),
        ],
      },
    ],
  },
  {
    id: 'digital_drawing',
    title: bt('數碼繪圖', 'Digital Drawing'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '數碼繪圖工具讓設計者能更精確、更快速地創建、修改和分享設計，從草圖到技術圖紙均有對應的軟件工具。',
      'Digital drawing tools let designers create, revise, and share designs more precisely and quickly than traditional media, with dedicated software for everything from sketches to technical drawings.'
    ),
    sections: [
      {
        title: bt('向量圖 vs 位圖', 'Vector vs Raster Graphics'),
        bullets: [
          bt(
            '向量圖（Vector）：由數學路徑和曲線定義，可無限放大而不失真。適合標誌、技術圖紙、說明圖。常用格式：SVG、AI、PDF。',
            'Vector: defined by mathematical paths and curves, can be scaled infinitely without loss. Ideal for logos, technical drawings, and explainer diagrams. Common formats: SVG, AI, PDF.'
          ),
          bt(
            '位圖（Raster）：由像素陣列構成，放大後會失真。適合照片、質感渲染圖、數碼繪圖。常用格式：JPG、PNG、PSD。',
            'Raster: composed of pixel grids, loses quality when scaled up. Suited for photographs, textured renderings, and digital painting. Common formats: JPG, PNG, PSD.'
          ),
        ],
      },
      {
        title: bt('設計中常用的數碼繪圖工具', 'Common Digital Drawing Tools in Design'),
        bullets: [
          bt(
            'Adobe Illustrator / Inkscape：向量繪圖工具，用於展示圖、說明圖和圖形設計。Inkscape 是免費替代品。',
            'Adobe Illustrator / Inkscape: vector drawing tools for presentation drawings, explainer diagrams, and graphic design. Inkscape is a free alternative.'
          ),
          bt(
            'Procreate（iPad）：模擬手繪體驗的數碼畫板，適合概念草圖和展示渲染圖。',
            'Procreate (iPad): simulates a hand-drawing experience, suited for concept sketching and presentation renderings.'
          ),
          bt(
            'Autodesk Fusion 360：CAD 軟件，支援 3D 建模、2D 工程圖和 CAM 路徑，適合產品設計的完整技術文件。',
            'Autodesk Fusion 360: CAD software supporting 3D modelling, 2D engineering drawings, and CAM toolpaths — suitable for complete product design documentation.'
          ),
          bt(
            'Canva / Google Slides：用於設計展示板（mood boards、presentation panels），不用於技術繪圖。',
            'Canva / Google Slides: used for design boards (mood boards, presentation panels), not for technical drawing.'
          ),
        ],
      },
      {
        title: bt('IB IA 中的數碼繪圖應用', 'Using Digital Drawing in IB IA'),
        paragraphs: [
          bt(
            '數碼繪圖在 IA 中最常用於三個地方：概念草圖（可用 Procreate 或 Illustrator）、展示渲染圖（Fusion 360 或 Keyshot）、以及最終技術圖紙（Fusion 360 Drawing 工作台）。',
            'Digital drawing appears most often in IA in three places: concept sketches (using Procreate or Illustrator), presentation renderings (Fusion 360 or Keyshot), and final technical drawings (Fusion 360 Drawing workspace).'
          ),
        ],
      },
    ],
  },
  {
    id: 'planning_drawings',
    title: bt('製作規劃圖', 'Creating Planning Drawings'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '規劃圖（又稱工程圖或技術圖紙）是設計師向製造者、技術人員或評鑑者精確傳達設計的標準化圖紙，包含形狀、尺寸、公差和材料信息。',
      'Planning drawings (also called engineering or technical drawings) are standardised drawings that precisely communicate a design to manufacturers, technicians, or evaluators, containing shape, dimensions, tolerances, and material information.'
    ),
    sections: [
      {
        title: bt('正射投影：第一角與第三角', 'Orthographic Projection: First vs Third Angle'),
        paragraphs: [
          bt(
            '正射投影將三維物體展示為二維視圖的集合，通常包括正視圖（Front）、側視圖（Side）和俯視圖（Top/Plan）。',
            'Orthographic projection presents a 3D object as a set of 2D views, typically including Front, Side, and Top (Plan) views.'
          ),
          bt(
            '第一角投影（歐洲標準，ISO）：視圖投影到物體後面。第三角投影（美國標準，ANSI）：視圖投影到物體前面。兩者都是合法標準，但圖紙必須標明使用哪種。IB 設計學生在 IA 中通常使用第一角（歐洲）。',
            'First Angle Projection (European standard, ISO): views are projected behind the object. Third Angle Projection (American standard, ANSI): views are projected in front of the object. Both are valid; drawings must state which is used. IB Design students typically use First Angle (European) in IA.'
          ),
        ],
      },
      {
        title: bt('尺寸標注規範', 'Dimensioning Conventions'),
        bullets: [
          bt('所有尺寸以毫米（mm）為單位，除非另有說明。', 'All dimensions in millimetres (mm) unless stated otherwise.'),
          bt('尺寸線不應與其他尺寸線或零件線交叉，需保持整潔。', 'Dimension lines must not cross other dimension lines or part lines and must be kept clean.'),
          bt('半徑用 R 標注，直徑用 Ø 標注。', 'Radius is denoted R, diameter is denoted Ø.'),
          bt('公差（Tolerance）說明製造誤差的允許範圍，如 50 ± 0.5 mm。', 'Tolerances state the permitted manufacturing error range, e.g. 50 ± 0.5 mm.'),
        ],
      },
      {
        title: bt('等角投影圖', 'Isometric Drawing'),
        paragraphs: [
          bt(
            '等角投影圖不是真實透視，而是三條軸互成 120° 的技術繪圖法，讓三維形狀在不失比例的情況下呈現。它常用於展示複雜形狀如何組合，比正射投影更直觀易讀。',
            'Isometric drawing is not true perspective but a technical method where three axes meet at 120°, showing 3D shapes without distorting proportions. It is often used to show how complex shapes fit together and is more intuitively readable than orthographic views.'
          ),
        ],
      },
    ],
  },
  {
    id: 'fusion360_drawings',
    title: bt('Fusion 360 規劃圖製作', 'Fusion 360: Creating Planning Drawings'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      'Autodesk Fusion 360 是一個集 3D 建模、2D 工程圖、CAM 加工路徑與協作於一身的設計平台，IB IA 學生可以用它製作從概念草圖到最終技術圖紙的完整設計文件。',
      'Autodesk Fusion 360 is an integrated platform for 3D modelling, 2D engineering drawings, CAM toolpaths, and collaboration. IB IA students can use it to produce a complete design documentation workflow from concept to technical drawings.'
    ),
    sections: [
      {
        title: bt('Fusion 360 設計工作流程', 'Fusion 360 Design Workflow'),
        bullets: [
          bt('Sketch（草圖）工作台：在平面上繪制 2D 輪廓，作為 3D 建模的基礎。', 'Sketch workspace: draw 2D profiles on a plane as the foundation for 3D modelling.'),
          bt('Design（設計）工作台：用 Extrude、Revolve、Loft 等工具把 2D 草圖轉換為 3D 模型。', 'Design workspace: use Extrude, Revolve, Loft, and other tools to convert 2D sketches into 3D models.'),
          bt('Drawing（工程圖）工作台：從 3D 模型自動生成正射投影視圖、標注尺寸和添加公差。', 'Drawing workspace: automatically generate orthographic projection views from the 3D model, then add dimensions and tolerances.'),
          bt('Render（渲染）工作台：為展示目的添加材質、光源和環境，輸出照片級效果圖。', 'Render workspace: add materials, lighting, and environments for presentation-quality photo-realistic images.'),
        ],
      },
      {
        title: bt('在 Drawing 工作台製作技術圖紙的步驟', 'Steps to Create Technical Drawings in the Drawing Workspace'),
        bullets: [
          bt('1. 從 Design 工作台選擇完成的模型，進入 Drawing 工作台。', '1. Select the completed model from the Design workspace and enter the Drawing workspace.'),
          bt('2. 選擇圖紙大小（A4/A3）和投影角度（第一角或第三角）。', '2. Choose sheet size (A4/A3) and projection angle (First or Third Angle).'),
          bt('3. 放置前視圖，Fusion 會自動生成側視圖和俯視圖。', '3. Place the Front view; Fusion automatically generates Side and Top views.'),
          bt('4. 用 Dimension 工具添加所有關鍵尺寸，包括直徑、半徑和孔位。', '4. Add all critical dimensions using the Dimension tool, including diameters, radii, and hole positions.'),
          bt('5. 在 Title Block 填寫設計者、比例、單位和日期。', '5. Complete the Title Block with designer name, scale, units, and date.'),
        ],
      },
      {
        title: bt('IB IA 建議', 'IB IA Recommendations'),
        paragraphs: [
          bt(
            'Fusion 360 的工程圖對 IA Criterion C（詳細設計發展）非常有用，因為它顯示你已將設計發展到可製造的精確度。確保每個零件都有獨立的工程圖，並標注材料和表面處理要求。',
            'Fusion 360 engineering drawings are highly useful for IA Criterion C (Development of a Detailed Design) because they demonstrate that you have taken the design to a manufacturable level of precision. Ensure each component has its own drawing with material and finish annotations.'
          ),
        ],
      },
    ],
  },
  {
    id: 'architectural_drawings',
    title: bt('建築圖學', 'Architectural Drawings'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '建築圖學是設計空間、建築和環境的標準視覺語言，包括平面圖、立面圖和剖面圖，讓設計者能精確表達空間關係和建造要求。',
      'Architectural drawing is the standard visual language for designing spaces, buildings, and environments, using floor plans, elevations, and sections to precisely communicate spatial relationships and construction requirements.'
    ),
    sections: [
      {
        title: bt('建築圖的三個主要視圖', 'Three Primary Architectural Drawing Types'),
        bullets: [
          bt(
            '平面圖（Floor Plan）：從上方俯視建築的水平截面，顯示房間佈局、門窗位置和牆體厚度。比例通常為 1:50 或 1:100。',
            'Floor Plan: a horizontal section viewed from above, showing room layout, door and window positions, and wall thickness. Typical scale: 1:50 or 1:100.'
          ),
          bt(
            '立面圖（Elevation）：建築外表面的正射投影，顯示高度、開口和外觀材料。不顯示內部。',
            'Elevation: an orthographic projection of the exterior surface, showing height, openings, and cladding materials. Does not show interior.'
          ),
          bt(
            '剖面圖（Section）：通過切割建築的垂直截面，顯示內部高度、樓層關係、牆厚和結構細節。',
            'Section: a vertical cut through the building showing internal heights, floor relationships, wall thickness, and structural details.'
          ),
        ],
      },
      {
        title: bt('比例與標注慣例', 'Scale and Annotation Conventions'),
        bullets: [
          bt('建築圖必須標注比例，如 1:50（意味著圖紙上 1 mm = 實際 50 mm）。', 'Architectural drawings must state their scale, e.g. 1:50 (meaning 1 mm on drawing = 50 mm in reality).'),
          bt('牆體用雙線表示，剖到的部分（截面）塗黑或用斜線填充。', 'Walls are shown with double lines; cut elements (in section) are filled solid or with hatching.'),
          bt('門的開閉弧度、窗戶的象徵符號、樓梯方向箭頭均有標準規定。', 'Door swings, window symbols, and stair direction arrows all have standardised representations.'),
        ],
      },
      {
        title: bt('在 IB 設計中使用建築圖', 'Using Architectural Drawing in IB Design'),
        paragraphs: [
          bt(
            '當設計項目涉及空間使用、室內設計或環境設計時，建築圖紙是必要的。例如，設計一個校園共享空間或醫院等候區，需要用平面圖說明傢具佈局、人流動線和無障礙考量。',
            'Architectural drawings become necessary when a design project involves spatial use, interior design, or environmental design. For example, designing a campus shared space or hospital waiting area requires floor plans to show furniture layout, circulation flow, and accessibility considerations.'
          ),
        ],
      },
    ],
  },
  {
    id: 'cardboard_modelling',
    title: bt('紙板模型製作', 'Cardboard Modelling'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '紙板模型製作是設計師最快速、最低成本的實體原型製作方法之一，用於在材料和加工投入之前測試形態、比例、結構和人機交互。',
      'Cardboard modelling is one of the fastest and lowest-cost physical prototyping methods, used to test form, proportion, structure, and human interaction before committing to materials and manufacturing.'
    ),
    sections: [
      {
        title: bt('常用材料', 'Common Materials'),
        bullets: [
          bt('瓦楞紙板（Corrugated Cardboard）：適合測試大型結構和產品整體比例，有一定剛性但容易彎折。', 'Corrugated Cardboard: suited for testing large structures and overall product proportions; provides some rigidity but bends readily.'),
          bt('灰板（Greyboard / Bookbinders Board）：厚而密實，適合製作精確機械部件的原型，可用美工刀精確切割。', 'Greyboard (Bookbinders Board): thick and dense, suited for prototyping precise mechanical components; can be cut accurately with a craft knife.'),
          bt('泡沫板（Foamboard）：輕、硬、易切割，適合展示模型和建築模型，但不能承受物理壓力測試。', 'Foamboard: light, rigid, and easy to cut — suited for presentation models and architectural models, but cannot withstand physical stress testing.'),
          bt('白色灰板（White Card）：最薄的選項，適合快速包裝設計原型和小型容器形式測試。', 'White Card: the thinnest option, suited for quick packaging design prototypes and small container form testing.'),
        ],
      },
      {
        title: bt('關鍵製作技巧', 'Key Making Techniques'),
        bullets: [
          bt('刻線（Scoring）：在紙板背面用刀輕劃（不穿透），讓紙板沿預定線折疊，得到乾淨的折邊。', 'Scoring: lightly cut the reverse side of cardboard without cutting through, allowing it to fold along a predetermined line with a clean edge.'),
          bt('層積（Lamination）：把多層紙板黏合，製作所需厚度的材料，模擬木材或塑膠板的厚度。', 'Lamination: glue multiple cardboard layers together to achieve required thickness, simulating wood or plastic sheet material.'),
          bt('套接（Slot and Tab Joints）：在兩個部件上切割相對應的缺口，直接套合，無需黏合，方便拆開修改。', 'Slot and Tab Joints: cut matching notches in two components so they slot together without adhesive, making it easy to disassemble and modify.'),
        ],
      },
      {
        title: bt('紙板模型在 IB 設計中的地位', 'Role of Cardboard Models in IB Design'),
        paragraphs: [
          bt(
            '在 IA 的「創建解決方案」和「詳細設計發展」階段，紙板模型是記錄迭代過程的有力證據。學生應拍攝多個迭代版本，並說明每次修改的原因，顯示設計是通過測試和反思演化的，而不是一次性完成。',
            'In the "Creating the Solution" and "Development" stages of IA, cardboard models provide powerful evidence of iteration. Students should photograph multiple versions and explain the reason for each change, demonstrating that the design evolved through testing and reflection rather than being completed in one go.'
          ),
        ],
      },
    ],
  },
  {
    id: 'prototyping_tips',
    title: bt('原型與模型製作技巧', 'Prototyping and Model-making Tips'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      '選擇適合設計階段的原型材料和技術，可以更快速地驗證設計假設，減少後期修改成本，並為 IB IA 提供可見的設計過程記錄。',
      'Selecting materials and techniques that match the design stage allows faster validation of design assumptions, reduces late-stage revision costs, and provides visible design process evidence for IB IA.'
    ),
    sections: [
      {
        title: bt('原型保真度（Fidelity）', 'Prototype Fidelity'),
        bullets: [
          bt(
            '低保真原型（Lo-Fi）：速度快、成本低，用於測試基本形態、比例和概念。材料包括紙張、紙板、泡沫。此階段不應投入精細製作，因為概念很可能需要修改。',
            'Low-Fidelity (Lo-Fi) Prototype: fast and cheap, used to test basic form, proportion, and concept. Materials: paper, cardboard, foam. Avoid fine craft at this stage since the concept is likely to change.'
          ),
          bt(
            '中保真原型（Mid-Fi）：加入部分功能和材料特性，用於用戶測試和性能初步驗證。材料可包括 3D 列印零件、MDF 和複合材料。',
            'Mid-Fidelity (Mid-Fi) Prototype: adds some functional and material properties for user testing and preliminary performance validation. Materials may include 3D-printed components, MDF, and composites.'
          ),
          bt(
            '高保真原型（Hi-Fi）：接近最終產品的外觀和功能，用於展示和最終評鑑。可能涉及最終材料、塗裝和真實電子元件。',
            'High-Fidelity (Hi-Fi) Prototype: close to final product appearance and function, used for presentation and final evaluation. May involve actual materials, finishing, and real electronic components.'
          ),
        ],
      },
      {
        title: bt('按材料選擇原型技術', 'Choosing Prototyping Technique by Material'),
        bullets: [
          bt('測試人機交互（操作流程）→ 紙板或紙張原型（Paper Prototyping）最快速。', 'Testing human interaction (usage flow) → paper or cardboard prototyping is fastest.'),
          bt('測試結構強度 → 使用 3D 列印（FDM/PLA）或 MDF 激光切割件。', 'Testing structural strength → use 3D printing (FDM/PLA) or MDF laser-cut components.'),
          bt('測試外觀和美感 → 使用泡沫雕刻（blue foam / grey foam）加表面塗裝。', 'Testing appearance and aesthetics → use foam carving (blue or grey foam) with surface finishing.'),
          bt('測試電子功能 → 使用麵包板（Breadboard）和 Arduino 快速搭建電路。', 'Testing electronic function → use a breadboard and Arduino to build circuits quickly.'),
        ],
      },
    ],
  },
  {
    id: '3d_filaments',
    title: bt('3D 列印材料與應用', '3D Filaments and Applications'),
    parentTopicId: 'ib_t3',
    topicColor: '#CCA068',
    overview: bt(
      'FDM（熔融沉積成型）3D 列印使用不同成分的絲料，每種材料有獨特的機械性能、耐熱性、韌性和後處理特性，選擇正確的絲料對 IB IA 原型的成功至關重要。',
      'FDM (Fused Deposition Modelling) 3D printing uses filaments with different compositions; each material has distinct mechanical properties, heat resistance, toughness, and post-processing characteristics. Choosing the right filament is critical for a successful IB IA prototype.'
    ),
    sections: [
      {
        title: bt('最常用的 FDM 絲料比較', 'Comparison of the Most Common FDM Filaments'),
        bullets: [
          bt(
            'PLA（聚乳酸）：最常用，易打印，相對硬而脆，低溫下可能變形。適合展示模型、靜態部件。環保（生物可降解）。',
            'PLA (Polylactic Acid): most common, easy to print, relatively hard and brittle, may deform at low temperatures. Good for display models and static components. Eco-friendly (biodegradable).'
          ),
          bt(
            'ABS（丙烯腈 - 丁二烯 - 苯乙烯）：韌性好、耐衝擊、耐熱，但打印需要密封環境（否則容易翹曲）。適合功能性部件。',
            'ABS (Acrylonitrile Butadiene Styrene): tough, impact-resistant, and heat-tolerant, but requires an enclosed print environment to avoid warping. Good for functional components.'
          ),
          bt(
            'PETG（聚對苯二甲酸乙二醇酯改性）：結合 PLA 易打印性和 ABS 韌性，透明度好，食品接觸安全，層間黏合力強。',
            'PETG (Glycol-modified PET): combines PLA\'s ease of printing with ABS\'s toughness, good clarity, food-contact safe, strong layer adhesion.'
          ),
          bt(
            'TPU（熱塑性聚氨酯）：柔性材料，像橡膠，用於握把套、柔性接頭、鞋底原型。打印速度需降低。',
            'TPU (Thermoplastic Polyurethane): flexible, rubber-like material, used for grips, flex joints, and sole prototypes. Print speed must be reduced.'
          ),
          bt(
            'Nylon：強度高、耐磨，適合齒輪、鉸鍊等受力部件，但吸水性強，需密封存放絲料。',
            'Nylon: high strength and wear resistance, suited for gears, hinges, and load-bearing components, but absorbs moisture easily so filament must be stored sealed.'
          ),
        ],
      },
      {
        title: bt('層厚和填充率的影響', 'Layer Height and Infill Effects'),
        bullets: [
          bt('層厚（Layer Height）：0.1 mm → 光滑但慢；0.3 mm → 粗糙但快。IA 展示原型建議 0.15–0.2 mm。', 'Layer Height: 0.1 mm → smooth but slow; 0.3 mm → rough but fast. IA presentation prototypes: 0.15–0.2 mm recommended.'),
          bt('填充率（Infill %）：展示模型用 15%；承載部件用 40–60%；最高強度用 80–100%。', 'Infill %: display models 15%; load-bearing parts 40–60%; maximum strength 80–100%.'),
          bt('填充圖案（Infill Pattern）：Gyroid 和 Cubic 填充在所有方向均有較好強度，比 Grid 更各向同性。', 'Infill Pattern: Gyroid and Cubic infill provide better multi-directional strength than Grid, making them more isotropic.'),
        ],
      },
    ],
  },

  // ─── Topic 4 ───────────────────────────────────────────────────────
  {
    id: 'paper_pulp_board',
    title: bt('紙張、紙板、紙漿與合成紙', 'Paper, Pulp, Board, and Synthetic Papers'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      '紙基材料是設計師最廣泛使用的材料之一，涵蓋從薄紙到厚紙板、從天然木漿到合成纖維的廣泛類別，每種都有獨特的克重、強度、可折疊性和環境特性。',
      'Paper-based materials are among the most widely used by designers, covering a broad range from thin paper to thick board and from natural wood pulp to synthetic fibres, each with distinct gsm, strength, foldability, and environmental properties.'
    ),
    sections: [
      {
        title: bt('四大材料類別', 'Four Material Categories'),
        bullets: [
          bt(
            '紙張（Paper）：250 gsm 以下，柔性，可薄至薄紙（tissue paper），厚至名片厚度。用於書籍、宣傳材料和包裝（如薄棉紙）。',
            'Paper: under 250 gsm, flexible, ranging from tissue-paper thinness up to business-card thickness. Used in books, promotional materials, and packaging (tissue paper).'
          ),
          bt(
            '紙板（Paperboard）：250 gsm 以上，類似卡紙。特性是可折疊性和剛性兩者兼備。常用於包裝。',
            'Paperboard: above 250 gsm, like card. Its attributes are foldability and rigidity. Often used in packaging.'
          ),
          bt(
            '紙漿（Pulp）：從木材分離的纖維材料，是造紙和紙板的原料。也可以壓製成模具形狀，設計師常用於模塑包裝。',
            'Pulp: fibrous material separated from wood, used in making paper and cardboard. It can also be pressed into moulds — commonly used by designers for moulded packaging.'
          ),
          bt(
            '瓦楞紙板（Corrugated Cardboard）：由一層或多層波浪形紙板夾在一或多層平面紙板之間組成，常用於包裝和原型製作。',
            'Corrugated Cardboard: one or more fluted card layers laminated between flat sheets. Often used in packaging and prototyping.'
          ),
        ],
      },
      {
        title: bt('紙張的 GSM 與常用用途', 'Paper GSM and Common Uses'),
        paragraphs: [
          bt(
            'GSM（每平方米克重）是最通用的紙張重量標準。數字越高，紙越重越厚。採購紙張時，可向供應商索取「色板本」（Swatch Book），比較不同 GSM、質感和顏色的實物樣本。',
            'GSM (grams per square metre) is the most universal paper-weight standard. The higher the number, the heavier and thicker the paper. When sourcing paper, request a Swatch Book from suppliers to compare physical samples of different GSM, textures, and colours.'
          ),
        ],
        bullets: [
          bt('Bond Paper（膠版紙）：74 gsm — 印表機和影印機的標準用紙。', 'Bond Paper: 74 gsm — standard for printers and photocopiers.'),
          bt('Book Paper（書本紙）：89–162 gsm — 書本正文頁面的標準用紙。', 'Book Paper: 89–162 gsm — standard for book text pages.'),
          bt('Cover Paper（封面紙）：216–271 gsm — 明顯較厚且較硬，用於軟封面書籍封面。', 'Cover Paper: 216–271 gsm — noticeably thicker and stiffer, used for soft-cover book covers.'),
          bt('卡紙（Card）：298–460 gsm — 名片、文件夾、賀卡所用的厚紙類型。', 'Card: 298–460 gsm — used for business cards, folders, and greeting cards.'),
        ],
      },
      {
        title: bt('紙板（Paperboard）的特性', 'Paperboard Characteristics'),
        bullets: [
          bt(
            '單層（Single-ply）紙板在彎折外側面時容易裂開或撕裂。',
            'Single-ply paperboard tends to crack or tear on the outer face of a fold.'
          ),
          bt(
            '多層（Multiple-ply）紙板不會裂開，但在折疊的內側容易出現皺紋。',
            'Multiple-ply paperboard does not crack but tends to wrinkle on the inside of a fold.'
          ),
          bt(
            '紙板適合原型製作（prototyping），因為其可折疊性讓設計師快速探索三維形態。',
            'Paperboard is ideal for prototyping because its foldability lets designers quickly explore three-dimensional forms.'
          ),
          bt(
            '紙板也適合激光切割，材料密度允許激光製作精細而複雜的圖案。',
            'Paperboard is suitable for laser cutting; its density allows lasers to produce fine and intricate patterns.'
          ),
        ],
      },
      {
        title: bt('紙漿（Pulp）的設計應用', 'Pulp Design Applications'),
        paragraphs: [
          bt(
            '紙漿可以壓模成各種形狀，常見於雞蛋托、電子產品的緩衝包裝和模製托盤。部分設計師也探索紙漿的美學和可持續性潛力，將其用於燈具、傢具和產品外殼。著名例子包括 David Gardener 的 Pulp Lamp，其概念是包裝即產品。',
            'Pulp can be press-moulded into various forms, commonly seen in egg trays, electronics cushion packaging, and moulded trays. Some designers have started exploring pulp\'s aesthetic and sustainability qualities in lamps, furniture, and product housings. A well-known example is David Gardener\'s Pulp Lamp, where the packaging forms the product.'
          ),
        ],
      },
      {
        title: bt('瓦楞紙板的種類', 'Types of Corrugated Cardboard'),
        paragraphs: [
          bt(
            '瓦楞紙板有不同類型，主要區別在於楞（flute，波浪形部分）的數量。楞越多，紙板越厚越堅固，但也越重。選用時需具體說明所用類型。',
            'Corrugated cardboard comes in different configurations. The key distinction is the number of flutes (wavy sections). More flutes mean greater thickness and strength, but also more weight. When specifying a type, be explicit.'
          ),
        ],
        bullets: [
          bt('單面瓦楞（Single Face）：一層楞黏在一層平面紙上，可彎曲，用於包裝緩衝材料。', 'Single Face Corrugated: one fluted layer bonded to one flat sheet; can curve; used as cushioning wrap.'),
          bt('單瓦楞（Single Wall）：一層楞夾在兩層平面紙之間，最常見的箱體材料。', 'Single Wall Corrugated: one fluted layer between two flat sheets; the most common box material.'),
          bt('雙瓦楞（Double Wall）：兩層楞夾在三層平面紙之間，用於重型包裝和運輸箱。', 'Double Wall Corrugated: two fluted layers between three flat sheets; used for heavy-duty packaging and shipping boxes.'),
          bt('蜂巢紙板（Honeycomb Cardboard）：蜂窩狀結構，重量極輕但壓縮強度高，用於傢具芯材和大型包裝。', 'Honeycomb Cardboard: honeycomb-cell structure, very light but with high compressive strength; used in furniture core and large packaging.'),
        ],
      },
      {
        title: bt('合成紙', 'Synthetic Papers'),
        paragraphs: [
          bt(
            '合成紙結合天然纖維紙的部分特性（可印刷性）與特殊性能（防水、強度）。分為薄膜型（類塑料薄膜）和纖維型（以合成纖維代替天然纖維）兩大類。大多數合成紙以品牌名稱為人所知。',
            'Synthetic papers combine some properties of natural fibre papers (printability) with special properties such as waterproofness or strength. They are either film-based (plastic-like films) or fibre-based (substitute synthetic fibres for natural ones). Most synthetic papers are known by their trade names.'
          ),
          bt(
            '杜邦 Tyvek 是最廣為人知的合成紙材料，由高密度聚乙烯纖維組成，防水、耐撕、可印刷、可熱封，廣泛用於郵寄信封、戶外廣告、建築防水膜，以及設計師的燈具、袋具和傢具設計。',
            'DuPont Tyvek is the most widely known synthetic paper, made from high-density polyethylene fibres. It is waterproof, tear-resistant, printable, and heat-sealable, widely used in mailing envelopes, outdoor signage, building wrap, and by designers in luminaires, bags, and furniture.'
          ),
        ],
      },
    ],
  },
  {
    id: 'additive_manufacturing',
    title: bt('加法製造技術', 'Additive Manufacturing Techniques'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      '加法製造（AM）是通過逐層添加材料來建立三維物體的製造技術，與傳統減法製造相反，它幾乎不產生廢料，並能製作傳統方法難以實現的複雜幾何形狀。',
      'Additive manufacturing (AM) builds three-dimensional objects by depositing material layer by layer, the opposite of subtractive manufacturing. It generates almost no waste and can produce complex geometries that are difficult or impossible using traditional methods.'
    ),
    sections: [
      {
        title: bt('主要 AM 工藝類型', 'Main AM Process Types'),
        bullets: [
          bt(
            'FDM / FFF（熔融沉積成型）：最常見的桌面 3D 列印技術。塑料絲材（如 PLA、ABS、PETG）被加熱熔融後通過噴嘴擠出，逐層堆積。適合原型製作和低成本生產。',
            'FDM / FFF (Fused Deposition Modelling): the most common desktop 3D printing technology. Plastic filament (PLA, ABS, PETG) is melted and extruded through a nozzle in layers. Suitable for prototyping and low-cost production.'
          ),
          bt(
            'SLA（立體光固化）：使用紫外線激光固化光敏樹脂，層間精度遠高於 FDM，表面光滑但材料較脆。適合牙科、珠寶和高精度零件。',
            'SLA (Stereolithography): uses a UV laser to cure photosensitive resin, achieving much higher layer precision than FDM with smooth surfaces, but materials are brittle. Suited for dental, jewellery, and high-precision parts.'
          ),
          bt(
            'SLS（選擇性激光燒結）：激光燒結尼龍粉末，無需支撐結構，可生產具功能性、耐用性的複雜形狀。常用於工業和航空航天。',
            'SLS (Selective Laser Sintering): laser sinters nylon powder without need for supports, producing functional, durable complex shapes. Common in industrial and aerospace applications.'
          ),
          bt(
            'DMLS / SLM（直接金屬激光燒結 / 選擇性激光熔融）：用激光燒結金屬粉末（鋁、鈦、不鏽鋼），用於航空、醫療植入物等高要求零件。',
            'DMLS / SLM (Direct Metal Laser Sintering / Selective Laser Melting): laser sinters metal powders (aluminium, titanium, stainless steel) for aerospace and medical implant applications.'
          ),
        ],
      },
      {
        title: bt('加法製造的設計優勢', 'Design Advantages of Additive Manufacturing'),
        bullets: [
          bt('可製作具有內腔、晶格結構和懸臂的複雜幾何形狀，傳統模具無法實現。', 'Can produce complex geometries with internal cavities, lattice structures, and undercuts that are impossible with traditional moulding.'),
          bt('適合客製化（每件物品可個性化），無需新的模具。', 'Ideal for customisation (each item can be personalised) without requiring new tooling.'),
          bt('原型製作速度快，從 CAD 文件到物理原型只需數小時。', 'Fast prototyping: from CAD file to physical prototype in hours.'),
          bt('小量生產（1–1000件）的成本競爭力優於射出成型（射出成型模具成本極高）。', 'Competitive cost for low volumes (1–1000 parts) compared with injection moulding, which has very high tooling costs.'),
        ],
      },
      {
        title: bt('加法製造的局限與 IB 設計取捨', 'Limitations and IB Design Trade-offs'),
        bullets: [
          bt('層積紋（Layer Lines）：FDM 製品在垂直方向強度較弱，且表面有明顯層紋，需後處理（打磨、塗裝）改善外觀。', 'Layer lines: FDM parts are weaker perpendicular to layers and show visible seams; post-processing (sanding, painting) is needed to improve appearance.'),
          bt('材料選擇有限：AM 可用的材料比傳統製造少得多。', 'Limited material range: AM materials are far fewer than those available in traditional manufacturing.'),
          bt('大批量生產成本高：當需要數千件時，射出成型或金屬沖壓的單位成本遠低於 AM。', 'High volume cost: when thousands of parts are needed, injection moulding or metal stamping has far lower unit cost than AM.'),
        ],
      },
    ],
  },
  {
    id: 'subtractive_manufacturing',
    title: bt('減法製造技術', 'Subtractive Manufacturing Techniques'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      '減法製造是從固體材料坯料中去除多餘材料，以獲得最終形狀的製造方法，涵蓋銑削、車削、鑽孔等一系列切削工藝。',
      'Subtractive manufacturing removes unwanted material from a solid stock to produce the final shape, covering a range of cutting processes including milling, turning, and drilling.'
    ),
    sections: [
      {
        title: bt('主要減法製造工藝', 'Main Subtractive Manufacturing Processes'),
        bullets: [
          bt(
            'CNC 銑削（Milling）：旋轉刀具沿 X、Y、Z 三個或更多軸線移動，從平面或塊體材料上去除材料。3 軸銑床適合大多數平面和槽型加工；5 軸銑床可加工複雜曲面。',
            'CNC Milling: a rotating cutter moves along three or more axes to remove material from flat or block stock. 3-axis mills suit most flat and slotted features; 5-axis mills handle complex curved surfaces.'
          ),
          bt(
            'CNC 車削（Turning/Lathe）：工件旋轉，刀具固定或線性移動。適合生產圓柱形、圓錐形和螺紋零件，如螺栓、軸和管件。',
            'CNC Turning (Lathe): the workpiece rotates while the tool remains stationary or moves linearly. Suited for cylindrical, conical, and threaded parts such as bolts, shafts, and fittings.'
          ),
          bt(
            '鑽孔（Drilling）：旋轉鑽頭沿軸向切入材料，製作孔洞。擴孔（Boring）用單刃刀具精確擴大已有孔的直徑和圓度。',
            'Drilling: a rotating drill bit cuts axially into material to produce holes. Boring uses a single-point tool to precisely enlarge an existing hole\'s diameter and roundness.'
          ),
          bt(
            '線切割 EDM（Wire EDM）：用電火花侵蝕導電材料（通常是鋼和鈦），適合切割極薄壁或複雜輪廓，常用於模具製造。',
            'Wire EDM: electrical sparks erode conductive material (usually steel and titanium), suited for extremely thin walls or complex contours. Common in tooling and die manufacturing.'
          ),
        ],
      },
      {
        title: bt('CNC 加工的材料相容性', 'Material Compatibility in CNC Machining'),
        bullets: [
          bt('金屬（鋁、鋼、銅、鈦）：CNC 銑削和車削的主要應用對象，鋁最易加工，鈦最難。', 'Metals (aluminium, steel, copper, titanium): primary applications of CNC milling and turning. Aluminium is easiest to machine; titanium is most challenging.'),
          bt('工程塑料（Acetal / POM、Nylon、PEEK）：可以精確加工，用於醫療和食品行業的零件，因為它們不能使用傳統金屬塗層。', 'Engineering plastics (Acetal/POM, Nylon, PEEK): can be machined precisely for medical and food-industry components where traditional metal coatings are unsuitable.'),
          bt('木材和 MDF：用於傢具原型和建築模型，加工速度快，但表面細節不如金屬清晰。', 'Wood and MDF: used for furniture prototypes and architectural models, machined quickly but with less crisp detail than metal.'),
        ],
      },
      {
        title: bt('IB 設計取捨分析', 'IB Design Trade-off Analysis'),
        bullets: [
          bt('精度高：CNC 機械加工可達到 ±0.01 mm 的公差，遠超 FDM 3D 列印（通常 ±0.3 mm）。', 'High precision: CNC machining achieves tolerances of ±0.01 mm, far better than FDM 3D printing (typically ±0.3 mm).'),
          bt('材料浪費：減法製造會產生大量切屑廢料，雖然大部分金屬可回收，但材料使用效率不如加法製造。', 'Material waste: subtractive manufacturing generates significant chip waste; while most metal chips can be recycled, material efficiency is lower than additive manufacturing.'),
          bt('模具成本：CNC 不需要模具，因此適合小量高精度零件；大批量生產則注射成型或衝壓更具成本效益。', 'Tooling cost: CNC requires no moulds, making it cost-effective for small quantities of high-precision parts; injection moulding or stamping is more economical at high volumes.'),
        ],
      },
    ],
  },
  {
    id: 'shaping_techniques',
    title: bt('成形製造技術', 'Shaping Manufacturing Techniques'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      '成形製造通過對材料施加力或熱，使其達到所需形狀，而不是切除材料，因此材料浪費最少，適合大批量生產。',
      'Shaping manufacturing applies force or heat to material to achieve the required shape without removing material, resulting in minimal waste and suitability for high-volume production.'
    ),
    sections: [
      {
        title: bt('鑄造（Casting）', 'Casting'),
        bullets: [
          bt(
            '砂型鑄造（Sand Casting）：在砂模中澆入熔融金屬，冷卻後取出。適合複雜形狀的大型零件（如發動機缸體），但表面粗糙，通常需後加工。',
            'Sand Casting: molten metal is poured into a sand mould and removed once cooled. Suited for complex large parts (e.g. engine blocks) but has rough surfaces and usually needs post-machining.'
          ),
          bt(
            '壓鑄（Die Casting）：熔融金屬在高壓下注入永久鋼模，生產精確、薄壁的鋅、鋁和鎂合金零件，廣泛用於汽車和消費品。',
            'Die Casting: molten metal is injected under high pressure into permanent steel dies, producing precise, thin-walled zinc, aluminium, and magnesium parts. Widely used in automotive and consumer goods.'
          ),
        ],
      },
      {
        title: bt('注射成型（Injection Moulding）', 'Injection Moulding'),
        paragraphs: [
          bt(
            '注射成型是最廣泛使用的塑料製品製造方法。塑料顆粒被加熱熔融後，在高壓下注入鋼製或鋁製模具型腔，冷卻後開模取出成品。',
            'Injection moulding is the most widely used process for plastic products. Plastic pellets are melted and injected under high pressure into steel or aluminium mould cavities, then cooled and ejected as finished parts.'
          ),
          bt(
            '注射成型的模具（Tooling）成本高（數萬至數十萬港元），但每件產品成本極低，適合大批量（>10,000 件）生產。模具壽命通常可達 100 萬次以上注射。',
            'Injection moulding tooling is expensive (tens of thousands to hundreds of thousands HKD), but unit cost is very low, making it ideal for high volumes (>10,000 parts). Moulds typically last more than one million shots.'
          ),
        ],
      },
      {
        title: bt('擠壓（Extrusion）與吹塑（Blow Moulding）', 'Extrusion and Blow Moulding'),
        bullets: [
          bt(
            '擠壓成型：熔融塑料或鋁通過固定形狀的模頭（Die）連續擠出，製作具有均勻截面的型材（如窗框鋁型材、水管）。',
            'Extrusion: molten plastic or aluminium is continuously forced through a die to produce sections with a uniform cross-section (e.g. window frame aluminium profiles, pipes).'
          ),
          bt(
            '吹塑成型（Blow Moulding）：用於製作空心容器（瓶子、桶）。先擠出或注射出塑料型坯，然後充氣將其脹開貼合模具內壁，冷卻後取出。',
            'Blow Moulding: used to produce hollow containers (bottles, drums). A plastic parison is first extruded or injected, then inflated with air to expand against the mould walls, and cooled before ejection.'
          ),
        ],
      },
      {
        title: bt('鍛造（Forging）', 'Forging'),
        paragraphs: [
          bt(
            '鍛造通過施加大壓力（衝擊或擠壓）使金屬變形，可以在熱態（Hot Forging）或冷態（Cold Forging）下進行。鍛造改善了金屬的晶粒結構，使其比鑄造或機械加工件具有更高的強度。常用於高強度零件如飛機零件、汽車連桿和廚師刀刀身。',
            'Forging applies large compressive force (impact or squeezing) to deform metal, performed either hot (Hot Forging) or cold (Cold Forging). Forging refines the grain structure, giving higher strength than cast or machined equivalents. Used for high-strength parts: aircraft components, automotive connecting rods, and chef\'s knife blades.'
          ),
        ],
      },
    ],
  },
  {
    id: 'joining_techniques',
    title: bt('接合製造技術', 'Joining Manufacturing Techniques'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      '接合技術將兩個或多個零件連接在一起，分為永久性接合（不可逆）和非永久性接合（可拆卸）兩大類，選擇接合方式直接影響維修性、可回收性和製造成本。',
      'Joining techniques connect two or more components and are divided into permanent (irreversible) and non-permanent (removable) categories. The choice of joining method directly affects repairability, recyclability, and manufacturing cost.'
    ),
    sections: [
      {
        title: bt('永久性接合', 'Permanent Joining'),
        bullets: [
          bt(
            '熔焊（Fusion Welding）：用熱量熔化兩個金屬零件的接合面，形成金屬結合。包括 MIG 焊（惰性氣體金屬電弧焊）、TIG 焊（鎢惰性氣體焊）和點焊（Spot Welding，用於薄鋼板）。',
            'Fusion Welding: heat melts the joint surfaces of two metal components, forming a metallic bond. Includes MIG (Metal Inert Gas), TIG (Tungsten Inert Gas), and Spot Welding (for thin steel sheet).'
          ),
          bt(
            '釬焊（Brazing / Soldering）：使用低熔點填料金屬（焊料），在比母材熔點更低的溫度下結合兩個金屬件。焊錫用於電子電路板；銀釺用於自行車框架和金屬管件。',
            'Brazing / Soldering: uses a low-melting filler metal at temperatures below the parent material\'s melting point. Solder is used in electronic circuits; silver brazing in bicycle frames and metal tubes.'
          ),
          bt(
            '黏合劑（Adhesives）：多組分環氧膠（Epoxy）、氰基丙烯酸酯（Superglue）和結構膠可以結合異種材料，重量分佈均勻，但一旦固化通常無法拆除。',
            'Adhesives: two-part epoxy, cyanoacrylate (superglue), and structural adhesives can bond dissimilar materials, distribute load evenly, but usually cannot be removed once cured.'
          ),
          bt(
            '鉚接（Riveting）：鋁鉚釘穿過預鑽孔，通過鉚頭變形永久固定。比焊接輕，常用於飛機蒙皮和金屬標誌。',
            'Riveting: aluminium rivets pass through pre-drilled holes and are deformed to permanently secure the joint. Lighter than welding; common in aircraft skin panels and metal signage.'
          ),
        ],
      },
      {
        title: bt('非永久性接合', 'Non-permanent Joining'),
        bullets: [
          bt(
            '螺栓與螺母（Bolts and Nuts）：最通用的可拆接合件，可傳遞大力，允許設計拆卸後重新組裝。',
            'Bolts and Nuts: the most versatile removable fasteners, capable of transmitting large forces and allowing disassembly and reassembly.'
          ),
          bt(
            '卡扣（Snap-fits）：零件上的彈性鉤或卡爪，可以無需工具扣合，常用於塑料外殼（電池蓋、遙控器殼）。',
            'Snap-fits: resilient hooks or catches on components that engage without tools, commonly used in plastic housings (battery covers, remote control shells).'
          ),
          bt(
            '過盈配合 / 壓入配合（Press-fit）：零件尺寸設計成輕微過盈，通過壓力裝配後摩擦力保持接合，可在特殊工具輔助下拆除。',
            'Press-fit / Interference Fit: components are designed with a slight size interference; friction maintains the joint after pressing together, and can be removed with special tooling.'
          ),
        ],
      },
      {
        title: bt('IB 設計中接合技術的取捨', 'Joining Trade-offs in IB Design'),
        paragraphs: [
          bt(
            '可持續設計視角：永久性接合（尤其是結合異種材料的黏合劑）會阻礙產品在使用壽命結束後的材料分離和回收。IB 設計學生應說明為何在可維修性或可回收性重要的情況下，選擇非永久性接合。',
            'Sustainability perspective: permanent joining (especially adhesives bonding dissimilar materials) prevents material separation and recycling at end-of-life. IB students should justify why non-permanent joining is chosen when repairability or recyclability matters.'
          ),
        ],
      },
    ],
  },
  {
    id: 'design_for_manufacture',
    title: bt('為製造而設計（DfM）', 'Design for Manufacture (DfM)'),
    parentTopicId: 'ib_t4',
    topicColor: '#8A9A5B',
    overview: bt(
      'DfM（Design for Manufacture）是一套在設計階段系統性考慮製造限制、降低生產成本和提高產品質素的設計方法論，目標是在保持設計意圖的前提下，讓產品盡可能容易、快速和低成本地製造。',
      'DfM (Design for Manufacture) is a methodology for systematically considering manufacturing constraints during the design stage, reducing production cost, and improving product quality while preserving design intent — making the product as easy, fast, and inexpensive to manufacture as possible.'
    ),
    sections: [
      {
        title: bt('DfM 的核心原則', 'Core DfM Principles'),
        bullets: [
          bt(
            '減少零件數量：每多一個零件，就多一道裝配步驟和一個潛在的品質問題來源。目標是用更少的零件達到同樣的功能，例如將幾個小零件整合為一個注射成型件。',
            'Minimise part count: every additional part adds an assembly step and a potential quality issue. The goal is to achieve the same function with fewer parts, e.g. consolidating several small parts into one injection-moulded component.'
          ),
          bt(
            '使用標準零件：螺栓、螺母、彈簧和軸承等標準件比定製零件便宜得多，供應鏈也更可靠。盡量設計成使用現有標準規格的零件。',
            'Use standard components: standard fasteners, springs, and bearings are far cheaper than custom parts and have more reliable supply chains. Design to use existing standard specifications wherever possible.'
          ),
          bt(
            '設計以便裝配（DfA）：確保零件只能以正確方式裝配（防差錯，Poka-Yoke），減少裝配時間和錯誤率。例如，不對稱的零件形狀防止反向安裝。',
            'Design for Assembly (DfA): ensure parts can only be assembled correctly (Poka-Yoke), reducing assembly time and error rates. For example, asymmetric part geometry prevents reversed installation.'
          ),
          bt(
            '設計公差合理化：過於嚴格的公差會大幅增加加工成本。只在功能上確實需要的地方指定嚴格公差，其餘使用寬鬆公差。',
            'Rationalise tolerances: excessively tight tolerances dramatically increase machining cost. Specify tight tolerances only where functionally necessary and use loose tolerances elsewhere.'
          ),
        ],
      },
      {
        title: bt('針對注射成型的 DfM 指引', 'DfM Guidelines for Injection Moulding'),
        bullets: [
          bt('脫模斜度（Draft Angle）：在所有垂直於分模線的面上添加至少 1–2° 的脫模斜度，以便零件順利脫模。', 'Draft Angle: add at least 1–2° draft to all faces perpendicular to the parting line so the part ejects cleanly.'),
          bt('均勻壁厚：壁厚應盡量均勻（通常 2–4 mm），避免因冷卻速度不一致導致縮痕和翹曲。', 'Uniform Wall Thickness: keep wall thickness consistent (typically 2–4 mm) to avoid sink marks and warping caused by uneven cooling.'),
          bt('避免底切（Undercuts）：底切需要側向抽芯機構，大幅增加模具成本。盡量通過重新設計消除底切。', 'Avoid Undercuts: undercuts require side-action cores in the mould, significantly increasing tooling cost. Redesign to eliminate undercuts wherever possible.'),
        ],
      },
      {
        title: bt('DfM 在 IB IA 中的應用', 'DfM in IB IA'),
        paragraphs: [
          bt(
            '在 IA 的「詳細設計發展」或 HL「商業生產方式」部分，學生應說明他們的設計如何考慮製造可行性。例如：解釋為甚麼選擇 1.5 mm 而不是 0.5 mm 的壁厚，以減少零件破損和模具維修成本。',
            'In IA "Development of a Detailed Design" or HL "Commercial Production" sections, students should explain how their design accounts for manufacturability. For example: justify why 1.5 mm rather than 0.5 mm wall thickness was chosen to reduce part breakage and mould maintenance cost.'
          ),
        ],
      },
    ],
  },

  // ─── Topic 6 ───────────────────────────────────────────────────────
  {
    id: 'design_collections',
    title: bt('設計典藏與博物館', 'Design Collections and Museums'),
    parentTopicId: 'ib_t6',
    topicColor: '#6B9080',
    overview: bt(
      '設計博物館收藏和展示具有文化、歷史和設計重要性的物件，提供設計師研究經典設計、了解設計運動演變和比較不同時代設計語言的第一手資源。',
      'Design museums collect and display objects of cultural, historical, and design significance, providing designers with first-hand resources for studying classic design, tracing the evolution of design movements, and comparing design languages across eras.'
    ),
    sections: [
      {
        title: bt('主要設計博物館典藏', 'Major Design Museum Collections'),
        links: [
          { label: bt('V&A 博物館線上典藏', 'V&A Museum Online Collection'), url: 'https://collections.vam.ac.uk/' },
          { label: bt('MoMA 典藏（紐約現代藝術博物館）', 'MoMA Collection (Museum of Modern Art)'), url: 'https://www.moma.org/collection/' },
          { label: bt('設計博物館·倫敦 — 所有設計物件', 'Design Museum London — All Design Objects'), url: 'https://designmuseum.org/discover-design/all-design-objects' },
          { label: bt('Cooper Hewitt 史密森尼設計博物館典藏', 'Cooper Hewitt Smithsonian Design Museum Collection'), url: 'https://collection.cooperhewitt.org/' },
        ],
        bullets: [
          bt('V&A（英國倫敦）：全球最大的裝飾藝術和設計博物館，館藏超過 230 萬件，涵蓋陶瓷、傢具、時裝、珠寶和工業設計。', 'V&A (London, UK): the world\'s largest museum of decorative arts and design. Over 2.3 million objects spanning ceramics, furniture, fashion, jewellery, and industrial design.'),
          bt('MoMA（紐約，美國）：收藏大量 20 世紀現代主義設計，以包浩斯和國際風格的代表作著稱。', 'MoMA (New York, USA): extensive 20th-century modernist design, especially notable for Bauhaus and International Style masterpieces.'),
          bt('設計博物館（倫敦）：專注當代設計和建築。「設計師製造者用戶」永久展覽是研究設計思維的優良資源。', 'Design Museum (London): focuses on contemporary design and architecture. The permanent "Designers, Makers, Users" exhibition is an excellent resource for studying design thinking.'),
          bt('Cooper Hewitt（紐約）：史密森尼博物館體系中唯一專注設計的機構，線上典藏提供超過 21 萬件藏品的數字化訪問。', 'Cooper Hewitt (New York): the only Smithsonian museum dedicated to design. Online collection provides digital access to over 210,000 objects.'),
        ],
      },
      {
        title: bt('設計經典與標誌性物件', 'Design Classics and Iconic Objects'),
        links: [
          { label: bt('Complex: 50 件日常物品的標誌性設計', 'Complex: 50 Iconic Designs of Everyday Objects'), url: 'https://www.complex.com/style/2014/09/50-iconic-designs-of-everyday-objects' },
          { label: bt('Designorate: 20 世紀十大產品設計偶像', 'Designorate: 10 Product Design Icons of the 20th Century'), url: 'https://www.designorate.com/10-product-design-icons/' },
          { label: bt('Eames Office: Eames 拉椒成型椅歷史', 'Eames Office: History of the Eames Molded Plastic Chairs'), url: 'https://www.eamesoffice.com/the-work/eames-plastic-chairs/' },
          { label: bt('Vitsoe: Dieter Rams 好設計的定義', 'Vitsoe: Dieter Rams on Good Design'), url: 'https://www.vitsoe.com/gb/about/good-design' },
          { label: bt('Dezeen: 設計偶像档案', 'Dezeen: Design Icons Archive'), url: 'https://www.dezeen.com/tag/design-icons/' },
        ],
        bullets: [
          bt('博物館典藏記錄了設計師的原始意圖、製造技術和材料，而不是現代的複刻版本。', 'Museum collections document the designer\'s original intent, manufacturing technique, and materials rather than modern reproductions.'),
          bt('館藏常附有製作日期、材料、技術和製造商信息，可直接引用為 IA 或 EE 的第一手資料。', 'Collection records often include date, materials, technique, and manufacturer — directly citable as primary sources for IA or EE.'),
          bt('比較同一時期不同設計師處理相同問題（如座椅、照明）的方式，是分析設計運動最有效的方法。', 'Comparing how designers of the same period addressed the same problem (e.g. seating, lighting) is the most effective way to analyse design movements.'),
        ],
      },
      {
        title: bt('當代設計趨勢資源', 'Contemporary Design Resources'),
        links: [
          { label: bt('Form Trends: 產品設計分析', 'Form Trends: Product Design Analysis'), url: 'https://formtrends.com/category/product-design/' },
          { label: bt('Core77: 工業設計新聞', 'Core77: Industrial Design News'), url: 'https://www.core77.com/' },
          { label: bt('Dezeen: 設計與建築新聞', 'Dezeen: Design and Architecture News'), url: 'https://www.dezeen.com/design/' },
          { label: bt('Wallpaper*: 時尚與設計知道', 'Wallpaper*: Design and Style'), url: 'https://www.wallpaper.com/design' },
        ],
        bullets: [
          bt('當代設計資源適合尋找當前設計師如何回應技術變化和社會需求。', 'Contemporary design resources are useful for finding how current designers respond to technological change and social needs.'),
          bt('將當代作品與經典設計進行比較，分析設計語言如何演變。', 'Cross-reference contemporary work with classic design to analyse how design language has evolved.'),
        ],
      },
    ],
  },
  {
    id: 'rams_10_principles',
    title: bt('好設計的十項原則', '10 Principles for Good Design (Dieter Rams)'),
    parentTopicId: 'ib_t6',
    topicColor: '#6B9080',
    overview: bt(
      '德國設計師 Dieter Rams 在 1970–80 年代為 Braun 工作時，總結出「好設計的十項原則」，這套框架至今仍是設計分析和評鑑的重要工具，IB 設計學生在分析經典設計時經常使用。',
      'German designer Dieter Rams, working at Braun during the 1970s–80s, articulated the "10 Principles of Good Design". This framework remains a key tool for design analysis and evaluation; IB Design students regularly apply it when studying classic design.'
    ),
    sections: [
      {
        title: bt('十項原則（附例子）', '10 Principles with Examples'),
        bullets: [
          bt(
            '1. 好設計是創新的（Innovative）：設計應在技術或形式上探索新可能性，但創新並非目的本身，而是解決問題的手段。例：第一代 iPhone 的觸控界面在 2007 年徹底改變了人機交互範式。',
            '1. Good design is innovative: design should explore new possibilities in technology or form, but innovation is a means to solve problems, not an end. Example: the first iPhone\'s multi-touch interface fundamentally changed human-computer interaction in 2007.'
          ),
          bt(
            '2. 好設計讓產品有用（Useful）：產品的基本用途必須首先得到滿足，美學其次。一個美麗但無法使用的設計是失敗的。例：Braun T3 收音機的所有控制按鈕均清晰標示且功能一致。',
            '2. Good design makes a product useful: a product\'s primary purpose must be fulfilled first; aesthetics are secondary. A beautiful but unusable design has failed. Example: the Braun T3 radio\'s controls are all clearly labelled and functionally consistent.'
          ),
          bt(
            '3. 好設計是美觀的（Aesthetic）：產品的美感影響使用者的幸福感和使用意願。美不是裝飾，而是功能與形式的自然結果。',
            '3. Good design is aesthetic: the beauty of a product affects users\' wellbeing and desire to use it. Aesthetics is not decoration but the natural outcome of function and form.'
          ),
          bt(
            '4. 好設計讓產品易於理解（Understandable）：產品應清晰傳達其功能，理想情況下無需說明書。用戶應能通過觀察和直覺掌握使用方式。',
            '4. Good design makes a product understandable: a product should clearly communicate its function, ideally without instructions. Users should learn through observation and intuition.'
          ),
          bt(
            '5. 好設計是低調的（Unobtrusive）：產品和系統應像工具一樣服務用戶，而不是成為關注焦點。設計不應表達太強的個性，以留給用戶自我表達的空間。',
            '5. Good design is unobtrusive: products and systems should serve users like tools without demanding attention. Design should not project too strong a personality, leaving room for user self-expression.'
          ),
          bt(
            '6. 好設計是誠實的（Honest）：設計不應誇大產品的能力，也不應試圖欺騙或操控用戶。承諾它無法履行的東西是不誠實的。',
            '6. Good design is honest: it does not over-claim the product\'s capabilities or try to deceive or manipulate. Promising what it cannot deliver is dishonest.'
          ),
          bt(
            '7. 好設計是耐久的（Long-lasting）：設計應避免時尚流行，追求歷久不衰的質素。Braun 的設計在幾十年後仍然看起來現代，因為它們不追趕過眼雲煙的設計趨勢。',
            '7. Good design is long-lasting: design should avoid fashionable trends and pursue timeless quality. Braun products still look modern decades later because they did not follow fleeting design trends.'
          ),
          bt(
            '8. 好設計精確到最後一個細節（Thorough to the last detail）：對細節的關注表示對用戶的尊重，沒有甚麼是任意的或偶然的，一切均經過深思熟慮。',
            '8. Good design is thorough down to the last detail: care for detail expresses respect for the user; nothing is arbitrary or accidental; everything is considered.'
          ),
          bt(
            '9. 好設計是環保的（Environmentally friendly）：設計應為環境保護作貢獻，减少資源消耗，並考慮整個生命週期的環境影響。',
            '9. Good design is environmentally friendly: design should contribute to environmental conservation, reduce resource use, and consider environmental impact across the whole life cycle.'
          ),
          bt(
            '10. 好設計盡量少設計（As little design as possible）：少即是多。設計應集中於本質，讓形式和功能回到最純粹的狀態，避免不必要的裝飾。',
            '10. Good design is as little design as possible: less is more. Design should concentrate on the essential, returning form and function to their purest state, and avoiding unnecessary embellishments.'
          ),
        ],
      },
      {
        title: bt('在 IB 設計分析中使用這些原則', 'Applying These Principles in IB Design Analysis'),
        paragraphs: [
          bt(
            '在 IB 分析題（如 Describe、Evaluate、Discuss）中，Rams 的原則提供了一個結構化框架來評估設計。選擇 2–3 條最相關的原則，用具體的設計特徵和例子說明該設計如何滿足（或未能滿足）這些原則。避免只是列出原則，而不連結到具體的設計證據。',
            'In IB analysis questions (such as Describe, Evaluate, Discuss), Rams\' principles provide a structured framework for evaluating a design. Select 2–3 most relevant principles and explain with specific design features and examples how the design meets (or fails to meet) them. Avoid simply listing principles without connecting them to specific design evidence.'
          ),
        ],
      },
    ],
  },

  // ─── Topic 7 ───────────────────────────────────────────────────────
  {
    id: 'ucd_five_stages',
    title: bt('用戶中心設計的五個階段', '5 Stages of User-Centred Design'),
    parentTopicId: 'ib_t7',
    topicColor: '#D5896F',
    overview: bt(
      '用戶中心設計（UCD）的五個階段是一個系統化的框架，確保設計決策始終建立在對真實用戶需要、行為和限制的理解上，而不是設計師的假設。',
      'The five stages of User-Centred Design (UCD) provide a systematic framework ensuring design decisions are always grounded in understanding real user needs, behaviours, and constraints rather than designer assumptions.'
    ),
    sections: [
      {
        title: bt('五個階段概覽', 'Five-Stage Overview'),
        bullets: [
          bt(
            '1. 理解（Understand / Empathize）：通過觀察、訪談和現有數據深入理解用戶的需要、行為、困難和目標。目標是清除偏見，真正站在用戶立場看問題。',
            '1. Understand / Empathize: deeply understand user needs, behaviours, difficulties, and goals through observation, interviews, and existing data. The goal is to remove bias and genuinely see the problem from the user\'s perspective.'
          ),
          bt(
            '2. 定義（Define）：根據理解階段的發現，清晰定義核心設計問題（Problem Statement）。好的定義應包含用戶是誰、他們需要做甚麼、以及為甚麼現有方案不足夠。',
            '2. Define: based on Understand-phase findings, articulate the core design problem (Problem Statement). A good definition identifies who the user is, what they need to do, and why existing solutions are insufficient.'
          ),
          bt(
            '3. 構思（Ideate）：在明確問題定義後，發散性地探索盡可能多的解決方案，不要過早評判。工具包括腦力激盪（Brainstorming）、思維圖（Mind Mapping）和 SCAMPER。',
            '3. Ideate: with a clear problem definition, divergently explore as many solutions as possible without premature judgement. Tools include brainstorming, mind mapping, and SCAMPER.'
          ),
          bt(
            '4. 原型（Prototype）：為最有潛力的構思建立低成本、可測試的原型。原型的保真度應與測試目的相符——測試概念用低保真，測試細節用高保真。',
            '4. Prototype: build low-cost, testable representations of the most promising ideas. Fidelity should match the testing purpose — low-fidelity for concept testing, high-fidelity for detail testing.'
          ),
          bt(
            '5. 測試（Test）：把原型交給真實用戶，觀察他們如何使用，記錄困難和誤解。測試的目的是發現問題，而不是確認設計已經完美。結果通常導致重新回到較早的階段進行迭代。',
            '5. Test: put prototypes in front of real users, observe how they use them, and record difficulties and misunderstandings. The purpose is to discover problems, not to confirm the design is already perfect. Results typically send the process back to an earlier stage for iteration.'
          ),
        ],
      },
      {
        title: bt('UCD 不是線性流程', 'UCD Is Not a Linear Process'),
        paragraphs: [
          bt(
            'ISO 9241-210 標準明確指出 UCD 是一個迭代過程，任何階段的發現都可能觸發回到前一個階段。例如，測試結果顯示用戶完全不理解某個交互元素，設計師可能需要回到「定義」階段，重新思考核心問題。',
            'ISO 9241-210 explicitly states that UCD is an iterative process where findings at any stage may trigger return to an earlier stage. For example, if testing reveals that users completely misunderstand an interaction element, the designer may need to return to "Define" to rethink the core problem.'
          ),
        ],
      },
      {
        title: bt('IB IA 與五個 UCD 階段的對應', 'Mapping IB IA to the Five UCD Stages'),
        bullets: [
          bt('IA Criterion A（分析設計機遇）→ 理解（Understand）和定義（Define）', 'IA Criterion A (Analysis) → Understand and Define'),
          bt('IA Criterion B（概念設計）→ 構思（Ideate）和早期原型（early Prototype）', 'IA Criterion B (Conceptual Design) → Ideate and early Prototype'),
          bt('IA Criterion C（創建解決方案）→ 原型（Prototype）迭代', 'IA Criterion C (Creating the Solution) → Prototype iteration'),
          bt('IA Criterion D（測試與評鑑）→ 測試（Test）', 'IA Criterion D (Testing & Evaluation) → Test'),
        ],
      },
    ],
  },
  {
    id: 'user_research_strategies',
    title: bt('用戶研究策略', 'User Research Strategies'),
    parentTopicId: 'ib_t7',
    topicColor: '#D5896F',
    overview: bt(
      '用戶研究策略是 UCD 的核心工具，幫助設計師系統性地收集關於用戶需要、行為、態度和使用情境的信息，以指導設計決策。不同方法揭示不同類型的信息，選擇合適的方法是研究成功的關鍵。',
      'User research strategies are core UCD tools that help designers systematically gather information about user needs, behaviours, attitudes, and usage contexts to guide design decisions. Different methods reveal different types of information; choosing the right method is key to research success.'
    ),
    sections: [
      {
        title: bt('五種主要研究方法', 'Five Primary Research Methods'),
        bullets: [
          bt(
            '觀察（Observation）：在用戶的自然使用情境中觀察他們如何與產品、服務或環境互動，不干預或提問。可揭示用戶未能言語表達的隱性需求和習慣行為。',
            'Observation: watching users interact with products, services, or environments in their natural context without intervention or prompts. Reveals implicit needs and habitual behaviours that users cannot articulate.'
          ),
          bt(
            '訪談（Interviews）：一對一的深度對話。半結構式訪談（有大綱但允許跟進問題）最適合設計研究，可以深入了解用戶的動機、心理模型和痛點。',
            'Interviews: one-to-one in-depth conversations. Semi-structured interviews (with an outline but allowing follow-up questions) work best for design research, revealing user motivations, mental models, and pain points.'
          ),
          bt(
            '問卷 / 調查（Questionnaires / Surveys）：收集大量用戶的量化數據。適合驗證假設和比較不同用戶群的偏好，但無法解釋行為背後的原因。',
            'Questionnaires / Surveys: collecting quantitative data from large numbers of users. Suited for validating hypotheses and comparing preferences across user groups, but cannot explain the reasons behind behaviours.'
          ),
          bt(
            '人物誌（Personas）：基於研究數據建立的虛構代表性用戶，集合了目標用戶群的關鍵特徵、需求、目標和痛點。幫助設計師在整個設計過程中保持以用戶為中心的視角。',
            'Personas: fictional representative users created from research data, combining key characteristics, needs, goals, and frustrations of the target user group. Helps designers maintain a user-centred perspective throughout the design process.'
          ),
          bt(
            '情境（Scenarios）：描述特定用戶（通常是人物誌中的人物）在特定情況下使用設計方案的故事，用於測試設計邏輯是否符合真實使用情境。',
            'Scenarios: narrative descriptions of a specific user (usually a persona) using a design solution in a particular situation, used to test whether design logic matches real usage contexts.'
          ),
        ],
      },
      {
        title: bt('質化 vs 量化研究', 'Qualitative vs Quantitative Research'),
        bullets: [
          bt(
            '質化研究（Qualitative）：深度、少量受訪者、探索原因和感受。例：訪談 8 位用戶了解他們為甚麼不使用某功能。適合設計早期的探索性研究。',
            'Qualitative: deep, few participants, explores reasons and feelings. Example: interviewing 8 users about why they avoid a particular feature. Suited for early-stage exploratory research.'
          ),
          bt(
            '量化研究（Quantitative）：廣度、大量受訪者、統計數據。例：問卷調查 200 人，統計各年齡段對產品的滿意度分數。適合驗證假設或比較方案。',
            'Quantitative: broad, many participants, statistical data. Example: surveying 200 people to compare satisfaction scores by age group. Suited for validating hypotheses or comparing solutions.'
          ),
        ],
      },
      {
        title: bt('IB IA 中的研究建議', 'Research Recommendations for IB IA'),
        paragraphs: [
          bt(
            '在 IA 分析階段，至少應使用兩種研究方法（如觀察加訪談），以從不同角度了解用戶需要。說明每種方法為甚麼適合這個設計情境，以及它揭示了甚麼具體信息，是如何影響設計方向的。',
            'In the IA analysis phase, at least two research methods (e.g. observation plus interviews) should be used to understand user needs from different angles. Explain why each method suits this design context and what specific information it revealed and how it shaped the design direction.'
          ),
        ],
      },
    ],
  },

  // ─── Topic 9 ───────────────────────────────────────────────────────
  {
    id: 'market_research_strategies',
    title: bt('市場研究策略', 'Market Research Strategies'),
    parentTopicId: 'ib_t9',
    topicColor: '#CCA068',
    overview: bt(
      '市場研究是設計師和商業決策者用來了解目標市場、用戶期望、競品情況和可接受價格的系統性信息收集過程，為設計和商業化決策提供客觀依據。',
      'Market research is a systematic information-gathering process used by designers and business decision-makers to understand target markets, user expectations, competitive situations, and acceptable price points, providing objective evidence for design and commercialisation decisions.'
    ),
    sections: [
      {
        title: bt('初級研究 vs 二級研究', 'Primary vs Secondary Research'),
        bullets: [
          bt(
            '初級研究（Primary Research）：直接從目標市場收集的第一手數據，如調查問卷、焦點小組、訪談和觀察。數據是原創的，但收集成本高、耗時。',
            'Primary Research: first-hand data collected directly from the target market, such as surveys, focus groups, interviews, and observation. Data is original but costly and time-consuming to collect.'
          ),
          bt(
            '二級研究（Secondary Research）：使用已有的數據和報告，如政府統計、行業報告（如 Euromonitor、Mintel）、學術研究和競品分析。成本低、速度快，但數據可能不完全符合特定設計情境。',
            'Secondary Research: using existing data and reports such as government statistics, industry reports (e.g. Euromonitor, Mintel), academic research, and competitive analyses. Low cost and fast, but data may not perfectly match the specific design context.'
          ),
        ],
      },
      {
        title: bt('量化市場研究方法', 'Quantitative Market Research Methods'),
        bullets: [
          bt(
            '調查問卷（Surveys）：通過問卷向大量消費者收集結構化數據，適合了解市場偏好分佈、消費習慣和價格接受度。在線問卷（如 Google Forms）可快速觸達大量受訪者。',
            'Surveys: structured data collection from large numbers of consumers via questionnaires, suited for understanding market preference distribution, consumption habits, and price acceptance. Online surveys (e.g. Google Forms) reach large audiences quickly.'
          ),
          bt(
            '可接受價格測試（Price Sensitivity Testing）：通過問卷了解消費者認為產品太便宜（品質疑慮）、可接受、昂貴或完全無法接受的價格區間，幫助確定最佳定價策略。',
            'Price Sensitivity Testing: use surveys to identify price ranges consumers consider too cheap (quality doubts), acceptable, expensive, or completely unacceptable, helping determine optimal pricing strategy.'
          ),
        ],
      },
      {
        title: bt('質化市場研究方法', 'Qualitative Market Research Methods'),
        bullets: [
          bt(
            '焦點小組（Focus Groups）：6–10 名目標消費者在主持人引導下討論產品、概念或廣告，深入了解態度、情感反應和未被滿足的需求。',
            'Focus Groups: 6–10 target consumers discuss a product, concept, or advertisement under a moderator, revealing attitudes, emotional responses, and unmet needs.'
          ),
          bt(
            '深度訪談（In-depth Interviews）：與個別消費者進行長時間（30–90 分鐘）的深度對話，探索購買動機、使用習慣和對現有產品的不滿。',
            'In-depth Interviews: long (30–90 minute) one-on-one conversations with individual consumers exploring purchase motivation, usage habits, and dissatisfaction with existing products.'
          ),
          bt(
            '民族志研究（Ethnographic Research）：研究人員在用戶的真實環境中長期觀察（如在家庭、工作場所），了解產品如何融入日常生活，發現用戶自己未意識到的需求和痛點。',
            'Ethnographic Research: researchers observe users in their real environment over extended periods (e.g. at home or in workplaces), understanding how products fit into daily life and discovering needs and frustrations users are not conscious of.'
          ),
        ],
      },
      {
        title: bt('常用市場分析工具', 'Common Market Analysis Tools'),
        bullets: [
          bt('SWOT 分析：分析設計方案或企業的優勢（Strengths）、劣勢（Weaknesses）、機遇（Opportunities）和威脅（Threats）。', 'SWOT Analysis: assesses Strengths, Weaknesses, Opportunities, and Threats of a design solution or company.'),
          bt('感知圖 / 定位圖（Perceptual Map）：在兩個維度（如價格 vs 品質、傳統 vs 創新）上標示競品位置，識別市場空白。', 'Perceptual Map: plots competing products on two dimensions (e.g. price vs quality, traditional vs innovative) to identify market gaps.'),
          bt('競品分析（Competitive Analysis）：系統性比較競爭對手的產品特性、定價、目標市場和品牌定位。', 'Competitive Analysis: systematically compares competitors\' product features, pricing, target markets, and brand positioning.'),
        ],
      },
      {
        title: bt('IB IA HL 中的市場研究', 'Market Research in IB IA HL'),
        paragraphs: [
          bt(
            '在 HL IA 的 Criterion E（商業生產方式）部分，學生應展示他們如何用市場研究的發現來驗證設計的商業可行性。例如：說明問卷調查顯示 70% 的目標用戶願意為這個功能支付 HK$200–300，並解釋這如何影響材料選擇和生產規模決策。',
            'In HL IA Criterion E (Commercial Production), students should show how market research findings validate the commercial viability of the design. For example: explaining that a survey showed 70% of target users would pay HK$200–300 for this feature, and how this informed material choices and production scale decisions.'
          ),
        ],
      },
    ],
  },
];

export const findIBResourceById = (id: string): IBResourcePage | undefined =>
  ibResourcePages.find((page) => page.id === id);
