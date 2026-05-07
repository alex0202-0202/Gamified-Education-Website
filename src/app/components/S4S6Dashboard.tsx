import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Lightbulb, 
  Settings, 
  Globe, 
  Cpu, 
  MonitorPlay, 
  Hammer, 
  CircuitBoard, 
  Monitor,
  Download,
  CheckCircle2,
  Circle
} from 'lucide-react';

export const S4S6Dashboard = ({ onNavigate }: { onNavigate: (screen: string, topic?: string) => void }) => {
  const { t } = useLanguage();

  const electiveModules = [
    { id: 'elec1', topic: 'automation', title: t('模組一：自動化操作', 'Module 1: Automation'), subtitle: 'Automation', icon: Cpu, tags: [t('[理論]', '[Theory]'), t('[實作]', '[Practical]'), t('[編程]', '[Programming]')], desc: t('氣動系統、微控制器 (Arduino/Micro:bit)、傳感器、自動化生產線原理。', 'Pneumatic systems, microcontrollers (Arduino/Micro:bit), sensors, and automated production-line principles.') },
    { id: 'elec2', topic: 'creative_digital_media', title: t('模組二：創意數碼媒體', 'Module 2: Creative Digital Media'), subtitle: 'Creative Digital Media', icon: MonitorPlay, tags: [t('[實作]', '[Practical]'), t('[電腦軟件]', '[Software]')], desc: t('圖像處理 (2D/3D)、動畫製作、聲音與影像編輯、介面設計 (UI/UX)。', 'Image processing (2D/3D), animation, audio and video editing, and interface design (UI/UX).') },
    { id: 'elec3', topic: 'design_material_processing', title: t('模組三：設計實踐及材料處理', 'Module 3: Design Practice and Material Processing'), subtitle: 'Design & Material Processing', icon: Hammer, tags: [t('[實作]', '[Practical]'), t('[進階]', '[Advanced]')], desc: t('測試材料強度、鑄造、模具設計、熱處理、大量生產與質量保證 (QA/QC)。', 'Material strength testing, casting, mold design, heat treatment, mass production, and QA/QC.') },
    { id: 'elec4', topic: 'electronics', title: t('模組四：電子學', 'Module 4: Electronics'), subtitle: 'Electronics', icon: CircuitBoard, tags: [t('[理論]', '[Theory]'), t('[實作]', '[Practical]')], desc: t('運算放大器 (OP-AMP)、邏輯門、電路板製作、焊接與電子測試。', 'Operational amplifiers, logic gates, PCB making, soldering, and electronics testing.') },
    { id: 'elec5', topic: 'visualisation_cad', title: t('模組五：視覺化及電腦輔助設計', 'Module 5: Visualisation and CAD'), subtitle: 'Visualisation and CAD', icon: Monitor, tags: [t('[實作]', '[Practical]'), t('[電腦軟件]', '[Software]')], desc: t('正投影圖、等角圖、3D建模軟件 (SolidWorks)、CAM、快速原型製作。', 'Orthographic drawing, isometric drawing, 3D modelling software (SolidWorks), CAM, and rapid prototyping.') },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Banner S4-S6 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2C2A26] to-[#4A4741] rounded-3xl p-10 text-white shadow-lg border border-[#E5E0D8]/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D5896F] rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#6B9080] rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#E5E0D8] mb-4 backdrop-blur-sm">
              {t('高中課程地圖', 'S4 - S6 Curriculum Map')}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t('HKDSE 設計與應用科技', 'HKDSE Design and Applied Technology')}<br/>({t('DAT 知識庫', 'DAT Knowledge Hub')})
            </h1>
            <p className="text-lg text-[#D1DCD0] max-w-xl font-medium">
              {t('涵蓋中四至中六必修與選修單元，助你掌握設計與工程的必備技能。準備你的校本評核 (SBA) 與公開試。', 'Covers the compulsory and elective senior secondary units to help you master essential design and engineering skills for both SBA and public examination preparation.')}
            </p>
          </div>
          
          {/* Progress Tracker Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full md:w-80 flex-shrink-0">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#E5E0D8] mb-4 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-[#6B9080]" /> {t('學習進度', 'Progress')}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-[#D1DCD0]">
                  <span>{t('必修單元', 'Compulsory Modules')}</span>
                  <span>{t('1/3 完成', '1/3 Complete')}</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D5896F] w-1/3 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-[#D1DCD0]">
                  <span>{t('選修單元', 'Elective Modules')}</span>
                  <span>{t('0/2 完成', '0/2 Complete')}</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#CCA068] w-0 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-[#D1DCD0]">
                  <span>{t('SBA 準備', 'SBA Preparation')}</span>
                  <span>{t('進行中', 'In Progress')}</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6B9080] w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
        
        {/* Compulsory Part */}
        <section>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-1.5 h-8 rounded-full bg-[#D5896F]" />
            <h2 className="text-2xl font-bold text-[#2C2A26]">{t('必修部分', 'Compulsory Part')}</h2>
            <span className="text-xs font-bold text-[#D5896F] bg-[#F9F8F6] border border-[#E5E0D8] px-3 py-1 rounded-full">{t('DSE 必考', 'Required in DSE')}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Core 1 */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#D5896F] transition-all group cursor-pointer" onClick={() => onNavigate('senior_module', 'design_innovation')}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-[#D5896F]/10 rounded-xl text-[#D5896F]">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2A26] leading-tight group-hover:text-[#D5896F] transition-colors">{t('1. 設計與創新', '1. Design and Innovation')}<br/><span className="text-xs text-[#8C857B] font-medium">Design & Innovation</span></h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#D5896F]/50" />{t('設計過程 — 考察、構思、設計、評鑒 (Explore→Ideate→Design→Evaluate)', 'Design process — explore, ideate, design, and evaluate.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#D5896F]/50" />{t('設計與商業 — 企業精神、專利保護、产品貢獻實例分析', 'Design and business — entrepreneurship, patent protection, and product impact case studies.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#D5896F]/50" />{t('創新策略 — 仿生學、設計思維、逆向工程', 'Innovation strategies — biomimicry, design thinking, and reverse engineering.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#D5896F]/50" />{t('涵蓋 Paper 1 多項選擇題及 Paper 2 結構題主要考核範圍', 'Key coverage area in Paper 1 MC and Paper 2 structured questions.')}</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-[#F2EFE9] text-[#6B665E] rounded">{t('[理論]', '[Theory]')}</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#F2EFE9] text-[#6B665E] rounded">{t('[實作]', '[Practical]')}</span>
              </div>
            </motion.div>

            {/* Core 2 */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#6B9080] transition-all group cursor-pointer" onClick={() => onNavigate('senior_module', 'technological_principles')}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-[#6B9080]/10 rounded-xl text-[#6B9080]">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2A26] leading-tight group-hover:text-[#6B9080] transition-colors">{t('2. 科技原理', '2. Technological Principles')}<br/><span className="text-xs text-[#8C857B] font-medium">Technological Principles</span></h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#6B9080]/50" />{t('材料分類 — 金屬、聚合物、木材、複合材料特性與測試', 'Material classification — properties and tests for metals, polymers, wood, and composites.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#6B9080]/50" />{t('系統及控制 — 齒輪、凸輪、連串機構及電子控制原理', 'Systems and control — gears, cams, linkage systems, and electronic control principles.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#6B9080]/50" />{t('生產及製作程序 — 機器加工、模具製作、CNC加工、3D列印', 'Production and manufacturing processes — machining, mold making, CNC, and 3D printing.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#6B9080]/50" />{t('標準元件与規格 — ISO標準、公差配合、QA/QC', 'Standard parts and specifications — ISO standards, tolerances, and QA/QC.')}</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-[#F2EFE9] text-[#6B665E] rounded">{t('[理論]', '[Theory]')}</span>
                <span className="text-[10px] font-bold px-2 py-1 bg-[#F2EFE9] text-[#6B665E] rounded">{t('[實作]', '[Practical]')}</span>
              </div>
            </motion.div>

            {/* Core 3 */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-sm hover:border-[#CCA068] transition-all group cursor-pointer" onClick={() => onNavigate('senior_module', 'value_impact')}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-[#CCA068]/10 rounded-xl text-[#CCA068]">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2C2A26] leading-tight group-hover:text-[#CCA068] transition-colors">{t('3. 價值與影響', '3. Value and Impact')}<br/><span className="text-xs text-[#8C857B] font-medium">Value and Impact</span></h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#CCA068]/50" />{t('科技對社會的影響 — 生活素質、職業與就業機會變化', 'Impact of technology on society — quality of life, careers, and employment changes.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#CCA068]/50" />{t('可持續發展 — 5R原則 (Reduce/Reuse/Recycle/Repair/Refuse)、LCA', 'Sustainability — the 5R principles and life-cycle assessment.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#CCA068]/50" />{t('職業安全與健康 (OSH) — 工作場所安全法例、風險評估', 'Occupational safety and health — workplace safety law and risk assessment.')}</li>
                <li className="flex items-start text-sm text-[#6B665E]"><Circle className="w-3 h-3 mr-2 mt-1 text-[#CCA068]/50" />{t('技術與權利 — 版權、商標、專利法下的責任', 'Technology and rights — copyright, trademarks, and patent responsibilities.')}</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-bold px-2 py-1 bg-[#F2EFE9] text-[#6B665E] rounded">{t('[理論]', '[Theory]')}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Elective Part */}
        <section>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-1.5 h-8 rounded-full bg-[#6B9080]" />
            <div>
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('選修部分', 'Elective Modules')}</h2>
              <p className="text-sm text-[#8C857B] mt-1">{t('DSE 規定學生須「五選二」，點擊進入了解各模組內容。', 'DSE students choose two of the five electives. Click to explore each module.')}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {electiveModules.map((module) => (
              <motion.div key={module.id} variants={item} whileHover={{ y: -4 }} className="bg-white rounded-xl p-5 border border-[#E5E0D8] shadow-sm hover:border-[#6B9080] group cursor-pointer transition-all flex flex-col h-full" onClick={() => onNavigate('senior_module', module.topic)}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2.5 bg-[#F9F8F6] text-[#4A4741] rounded-lg group-hover:bg-[#6B9080] group-hover:text-white transition-colors">
                    <module.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C2A26] group-hover:text-[#6B9080] transition-colors leading-tight">{module.title}</h4>
                    <span className="text-[10px] text-[#8C857B] font-medium">{module.subtitle}</span>
                  </div>
                </div>
                <p className="text-sm text-[#6B665E] mb-4 flex-1">{module.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F0F0F0]">
                  <div className="flex gap-1.5">
                    {module.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-1.5 py-0.5 bg-[#F9F8F6] text-[#8C857B] border border-[#E5E0D8] rounded">{tag}</span>
                    ))}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A8A29A] group-hover:text-[#6B9080] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Assessment Structure */}
        <section>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-1.5 h-8 rounded-full bg-[#CCA068]" />
            <h2 className="text-2xl font-bold text-[#2C2A26]">{t('評估結構', 'Assessment')}</h2>
            <span className="text-xs font-bold text-[#CCA068] bg-[#F9F8F6] border border-[#E5E0D8] px-3 py-1 rounded-full">{t('DSE 公開考試 + 校本評核', 'DSE Public Exam + SBA')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#D5896F]/10 flex items-center justify-center text-[#D5896F] font-black text-lg">P1</div>
                <div>
                  <div className="font-bold text-[#2C2A26] text-sm">{t('卷一', 'Paper 1')}</div>
                  <div className="text-xs text-[#8C857B]">{t('必修指定項目 · 多項選擇題', 'Compulsory content · Multiple-choice questions')}</div>
                </div>
              </div>
              <div className="text-3xl font-black text-[#D5896F] mb-2">30%</div>
              <ul className="text-xs text-[#6B665E] space-y-1">
                <li>• {t('40 項多項選擇題 (MC)', '40 multiple-choice questions')}</li>
                <li>• {t('涉及全部必修內容', 'Covers all compulsory content')}</li>
                <li>• {t('考試時間：1 小時', 'Exam time: 1 hour')}</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#6B9080]/10 flex items-center justify-center text-[#6B9080] font-black text-lg">P2</div>
                <div>
                  <div className="font-bold text-[#2C2A26] text-sm">{t('卷二', 'Paper 2')}</div>
                  <div className="text-xs text-[#8C857B]">{t('必修 + 選修 · 結構問答', 'Compulsory + elective · Structured questions')}</div>
                </div>
              </div>
              <div className="text-3xl font-black text-[#6B9080] mb-2">30%</div>
              <ul className="text-xs text-[#6B665E] space-y-1">
                <li>• {t('必修區 + 選修區各一題', 'One compulsory and one elective question')}</li>
                <li>• {t('需要綜合設計、計算及模型分析能力', 'Requires coordinated design, calculation, and modelling answers')}</li>
                <li>• {t('考試時間：2 小時', 'Exam time: 2 hours')}</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6 border-[#8A9A5B]" style={{borderColor:'#8A9A5B'}}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#8A9A5B]/10 flex items-center justify-center text-[#8A9A5B] font-black text-sm">SBA</div>
                <div>
                  <div className="font-bold text-[#2C2A26] text-sm">{t('校本評核', 'SBA')}</div>
                  <div className="text-xs text-[#8C857B]">{t('設計項目', 'Design Project')}</div>
                </div>
              </div>
              <div className="text-3xl font-black text-[#8A9A5B] mb-2">40%</div>
              <ul className="text-xs text-[#6B665E] space-y-1">
                <li>• {t('自選設計問題並提出解決方案', 'Choose and solve a self-selected design problem')}</li>
                <li>• {t('包括調查、構思、製作、評鑒', 'Includes investigation, ideation, making, and evaluation')}</li>
                <li>• {t('提交原型／產品及 Portfolio 檔案', 'Includes a prototype/product and portfolio record')}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resource Download Section */}
        <section>
          <div className="bg-[#F2EFE9] rounded-2xl p-8 border border-[#E5E0D8]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#2C2A26] mb-2">{t('學習資源下載區', 'Resource Downloads')}</h3>
                <p className="text-sm text-[#6B665E]">{t('獲取DSE必備的筆記、速查表與操作指南，幫助你隨時溫習與實作準備。', 'Access essential DSE notes, quick-reference sheets, and operation guides for study and practical preparation.')}</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[250px]">
                <button onClick={() => onNavigate('resource_hub', 'materials-cheatsheet')} className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-[#E5E0D8] hover:border-[#D5896F] text-sm font-medium text-[#4A4741] transition-colors group">
                  <span className="truncate pr-4">{t('材料特性速查表 (PDF)', 'Material Properties Cheat Sheet (PDF)')}</span>
                  <Download className="w-4 h-4 text-[#8C857B] group-hover:text-[#D5896F]" />
                </button>
                <button onClick={() => onNavigate('resource_hub', 'laser-safety')} className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-[#E5E0D8] hover:border-[#D5896F] text-sm font-medium text-[#4A4741] transition-colors group">
                  <span className="truncate pr-4">{t('鐳射切割安全守則', 'Laser Cutting Safety Guide')}</span>
                  <Download className="w-4 h-4 text-[#8C857B] group-hover:text-[#D5896F]" />
                </button>
                <button onClick={() => onNavigate('resource_hub', '3d-printing-guide')} className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-[#E5E0D8] hover:border-[#D5896F] text-sm font-medium text-[#4A4741] transition-colors group">
                  <span className="truncate pr-4">{t('3D 打印設定指南', '3D Printing Setup Guide')}</span>
                  <Download className="w-4 h-4 text-[#8C857B] group-hover:text-[#D5896F]" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </motion.div>
    </div>
  );
};
