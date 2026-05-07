import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Layers, Zap, Flame, Droplet, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const materialsData = [
  // 木材 Wood
  { id: 'm1', category: '軟木 (Softwood)', name: '松木 (Pine)', properties: ['容易加工', '較輕', '紋理直'], uses: '傢俱、建築框架', tags: ['木材', '易加工'], icon: Layers, hardness: 'HB 1.7', tensile: '~40 MPa' },
  { id: 'm2', category: '軟木 (Softwood)', name: '杉木 (Fir)', properties: ['耐腐蝕', '有香味', '直紋'], uses: '戶外傢俱、地板', tags: ['木材', '戶外'], icon: Layers, hardness: 'HB 1.8', tensile: '~38 MPa' },
  { id: 'm3', category: '硬木 (Hardwood)', name: '櫸木 (Beech)', properties: ['堅硬', '紋理密', '不易變形'], uses: '優質傢俱、工具手柄', tags: ['木材', '堅硬'], icon: Layers, hardness: 'HB 3.8', tensile: '~80 MPa' },
  { id: 'm4', category: '硬木 (Hardwood)', name: '柚木 (Teak)', properties: ['極耐腐蝕', '含天然油脂', '防水'], uses: '船隻甲板、高級戶外傢俱', tags: ['木材', '防水'], icon: Layers, hardness: 'HB 4.4', tensile: '~100 MPa' },
  { id: 'm5', category: '硬木 (Hardwood)', name: '橡木 (Oak)', properties: ['耐磨', '木紋美觀', '耐久'], uses: '地板、酒桶、傢俱', tags: ['木材', '耐磨', '耐久'], icon: Layers, hardness: 'HB 3.7', tensile: '~90 MPa' },
  { id: 'm6', category: '人造板 (Man-made)', name: '中密度纖維板 (MDF)', properties: ['表面平滑', '無木紋', '易加工', '均質'], uses: '平價傢俱、音箱板材', tags: ['木材', '人造', '平滑'], icon: Layers, hardness: 'HB 2.5', tensile: '~28 MPa' },
  { id: 'm7', category: '人造板 (Man-made)', name: '膠合板 (Plywood)', properties: ['多層交叉', '不易開裂', '輕巧'], uses: '建築模板、船底板', tags: ['木材', '人造', '多層'], icon: Layers, hardness: 'HB 2.2', tensile: '~35 MPa' },

  // 金屬 Metals
  { id: 'm8', category: '含鐵金屬 (Ferrous)', name: '低碳鋼 (Mild Steel)', properties: ['易焊接', '延展性強', '廉價'], uses: '結構鋼架、螺絲螺帽', tags: ['金屬', '易焊接', '延展'], icon: Zap, hardness: 'HB 143', tensile: '~400 MPa' },
  { id: 'm9', category: '含鐵金屬 (Ferrous)', name: '高碳鋼 (High Carbon Steel)', properties: ['極硬', '脆', '可熱處理'], uses: '切削工具、彈簧、刀片', tags: ['金屬', '硬', '可熱處理'], icon: Zap, hardness: 'HB 200–650', tensile: '~800 MPa' },
  { id: 'm10', category: '含鐵金屬 (Ferrous)', name: '不銹鋼 (Stainless Steel)', properties: ['防鏽', '硬度高', '衛生'], uses: '廚具、醫療器械、海洋設備', tags: ['金屬', '防鏽'], icon: Zap, hardness: 'HB 200', tensile: '~515 MPa' },
  { id: 'm11', category: '非含鐵金屬 (Non-ferrous)', name: '鋁合金 (Aluminium Alloy)', properties: ['輕巧', '防鏽', '導熱良', '易加工'], uses: '飛機零件、窗框、散熱器', tags: ['金屬', '輕巧', '防鏽'], icon: Zap, hardness: 'HB 60–100', tensile: '~276 MPa' },
  { id: 'm12', category: '非含鐵金屬 (Non-ferrous)', name: '黃銅 (Brass)', properties: ['易切削', '抗腐蝕', '導電良', '美觀'], uses: '電子零件、裝飾品、門把', tags: ['金屬', '導電'], icon: Zap, hardness: 'HB 55–180', tensile: '~550 MPa' },
  { id: 'm13', category: '非含鐵金屬 (Non-ferrous)', name: '銅 (Copper)', properties: ['導電性極佳', '軟', '延展性強'], uses: '電線、電路板、水管', tags: ['金屬', '導電', '延展'], icon: Zap, hardness: 'HB 35', tensile: '~210 MPa' },
  { id: 'm14', category: '非含鐵金屬 (Non-ferrous)', name: '鈦合金 (Titanium Alloy)', properties: ['極輕', '高強度', '耐腐蝕', '昂貴'], uses: '航太、醫療植入物、頂級單車', tags: ['金屬', '輕巧', '高強度'], icon: Zap, hardness: 'HB 334', tensile: '~950 MPa' },

  // 塑膠 Polymers
  { id: 'm15', category: '熱塑性 (Thermoplastic)', name: '亞加力 (PMMA/Acrylic)', properties: ['透明度高', '易碎', '可熱彎', '耐候'], uses: '展示架、燈罩、水族缸', tags: ['塑膠', '透明', '熱彎'], icon: Droplet, hardness: 'HB ~200', tensile: '~70 MPa' },
  { id: 'm16', category: '熱塑性 (Thermoplastic)', name: 'ABS 塑膠', properties: ['抗衝擊高', '表面光澤', '易著色'], uses: '安全帽、玩具 (樂高)、3D 打印', tags: ['塑膠', '抗衝擊', '3D打印'], icon: Droplet, hardness: 'HB ~105', tensile: '~40 MPa' },
  { id: 'm17', category: '熱塑性 (Thermoplastic)', name: '聚乙烯 HDPE', properties: ['化學惰性', '輕巧', '食品安全', '耐衝擊'], uses: '食品容器、水管、購物袋', tags: ['塑膠', '食品安全', '輕巧'], icon: Droplet, hardness: 'HB ~60', tensile: '~25 MPa' },
  { id: 'm18', category: '熱塑性 (Thermoplastic)', name: '聚氯乙烯 PVC', properties: ['耐化學品', '絕緣', '硬或軟（配方）'], uses: '電線絕緣、水管、地板', tags: ['塑膠', '絕緣', '耐化學'], icon: Droplet, hardness: 'HB ~80', tensile: '~55 MPa' },
  { id: 'm19', category: '熱塑性 (Thermoplastic)', name: '聚碳酸酯 PC', properties: ['高透明度', '韌性極高', '耐熱'], uses: 'CD/DVD 光碟、安全眼鏡、防彈玻璃', tags: ['塑膠', '透明', '高韌性'], icon: Droplet, hardness: 'HB ~118', tensile: '~70 MPa' },
  { id: 'm20', category: '熱固性 (Thermosetting)', name: '環氧樹脂 (Epoxy)', properties: ['絕緣好', '耐熱', '黏合力強', '不可回收'], uses: '黏合劑、電路板基材、碳纖維基體', tags: ['塑膠', '耐熱', '絕緣'], icon: Flame, hardness: 'HB ~200', tensile: '~85 MPa' },
  { id: 'm21', category: '熱固性 (Thermosetting)', name: '尿素甲醛樹脂 (Urea-Formaldehyde)', properties: ['硬而脆', '耐熱', '廉價'], uses: '插座面板、膠合板膠水', tags: ['塑膠', '耐熱', '硬'], icon: Flame, hardness: 'HB ~300', tensile: '~50 MPa' },
  { id: 'm22', category: '彈性體 (Elastomers)', name: '矽膠 (Silicone)', properties: ['極耐熱', '柔軟', '無毒', '生物相容'], uses: '烘焙模具、醫療用品、密封件', tags: ['塑膠', '耐熱', '無毒'], icon: Droplet, hardness: 'Shore A 20–80', tensile: '~7 MPa' },

  // 複合與智能 Smart & Composites
  { id: 'm23', category: '複合材料 (Composite)', name: '碳纖維強化塑膠 CFRP', properties: ['極輕', '抗拉強度極高', '剛性好', '昂貴'], uses: '賽車車身、高端單車、航太結構', tags: ['複合', '輕', '高強度'], icon: Layers, hardness: 'HV ~800', tensile: '~3500 MPa' },
  { id: 'm24', category: '複合材料 (Composite)', name: '玻璃纖維強化塑膠 GRP', properties: ['輕巧', '耐腐蝕', '成本適中'], uses: '船體、浴缸、風力葉片', tags: ['複合', '防腐', '輕'], icon: Layers, hardness: 'HB ~60', tensile: '~300 MPa' },
  { id: 'm25', category: '智能材料 (Smart)', name: '形狀記憶合金 (SMA / Nitinol)', properties: ['加熱恢復原狀', '超彈性'], uses: '牙齒矯正線、火災灑水、自展衛星', tags: ['智能', '受熱變形', '記憶'], icon: Zap, hardness: 'HB ~250', tensile: '~900 MPa' },
  { id: 'm26', category: '智能材料 (Smart)', name: '壓電材料 (Piezoelectric)', properties: ['受力產生電壓', '雙向效應'], uses: '打火機點火、超聲波傳感、麥克風', tags: ['智能', '壓電', '感應'], icon: Zap, hardness: '—', tensile: '~65 MPa' },
];

const categories = ['全部 (All)', '木材 (Wood)', '金屬 (Metals)', '塑膠 (Polymers)', '複合及智能材料 (Smart/Composites)'];

export const MaterialsDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部 (All)');
  const { t, tr } = useLanguage();

  const filteredMaterials = materialsData.filter(m => {
    const query = searchTerm.toLowerCase();
    const searchPool = [
      m.name,
      tr(m.name),
      m.category,
      tr(m.category),
      m.uses,
      tr(m.uses),
      ...m.properties,
      ...m.properties.map((property) => tr(property)),
      ...m.tags,
      ...m.tags.map((tag) => tr(tag)),
    ].join(' ').toLowerCase();

    const matchesSearch = searchPool.includes(query);
    
    if (activeCategory === '全部 (All)') return matchesSearch;
    if (activeCategory === '木材 (Wood)') return matchesSearch && (m.category.includes('木') || m.category.includes('人造板'));
    if (activeCategory === '金屬 (Metals)') return matchesSearch && m.category.includes('金屬');
    if (activeCategory === '塑膠 (Polymers)') return matchesSearch && (m.category.includes('塑性') || m.category.includes('固性') || m.category.includes('彈性'));
    if (activeCategory === '複合及智能材料 (Smart/Composites)') return matchesSearch && (m.category.includes('複合') || m.category.includes('智能'));
    
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-2xl p-8 border border-[#E5E0D8] shadow-sm">
        <h1 className="text-3xl font-bold text-[#2C2A26] mb-3 tracking-tight flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-[#6B9080]" /> {t('材料資料庫', 'Materials Database')}
        </h1>
        <p className="text-[#6B665E] max-w-3xl mb-8">
          {t('探索木材、金屬、聚合物及智能材料的屬性與應用。利用過濾器或搜尋功能快速尋找合適的材料，為你的設計與製作打好基礎。', 'Explore the properties and uses of woods, metals, polymers, and smart materials. Use filters and search to quickly find suitable options for your design and making work.')}
        </p>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C857B] w-5 h-5" />
            <input 
              type="text" 
              placeholder={t('搜尋材料名稱、用途或特性...', 'Search material name, use, or properties...')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F9F8F6] border border-[#E5E0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B9080] focus:border-transparent transition-all text-[#2C2A26]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E5E0D8] pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-[#6B9080] text-white shadow-sm' 
                  : 'bg-[#F9F8F6] text-[#6B665E] hover:bg-[#EAE6DF] border border-[#E5E0D8]'
              }`}
            >
              {tr(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredMaterials.map((material) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={material.id}
              className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden hover:shadow-md hover:border-[#6B9080] transition-all group"
            >
              <div className="p-5 border-b border-[#F0F0F0] flex items-start justify-between bg-[#FDFCFB]">
                <div>
                  <div className="text-[10px] font-bold text-[#8C857B] uppercase tracking-wider mb-1">{tr(material.category)}</div>
                  <h3 className="text-lg font-bold text-[#2C2A26] leading-tight group-hover:text-[#6B9080] transition-colors">{tr(material.name)}</h3>
                </div>
                <div className={`p-2 rounded-lg ${
                  material.category.includes('木') ? 'bg-[#CCA068]/10 text-[#CCA068]' : 
                  material.category.includes('金屬') ? 'bg-[#8C857B]/10 text-[#8C857B]' : 
                  'bg-[#D5896F]/10 text-[#D5896F]'
                }`}>
                  <material.icon className="w-5 h-5" />
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-bold text-[#A8A29A] mb-2">{t('主要特性', 'Key Properties')}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {material.properties.map((prop, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] rounded-md">
                        {tr(prop)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-bold text-[#A8A29A] mb-1">{t('常見用途', 'Common Uses')}</div>
                  <p className="text-sm text-[#6B665E]">{tr(material.uses)}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#F0F0F0]">
                  <div className="bg-[#F9F8F6] rounded-lg px-2 py-1.5">
                    <div className="text-[9px] font-bold text-[#A8A29A] uppercase mb-0.5">{t('硬度', 'Hardness')}</div>
                    <div className="text-xs font-mono font-bold text-[#4A4741]">{(material as any).hardness ?? '—'}</div>
                  </div>
                  <div className="bg-[#F9F8F6] rounded-lg px-2 py-1.5">
                    <div className="text-[9px] font-bold text-[#A8A29A] uppercase mb-0.5">{t('抗拉強度', 'Tensile Strength')}</div>
                    <div className="text-xs font-mono font-bold text-[#4A4741]">{(material as any).tensile ?? '—'}</div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-[#F9F8F6] border-t border-[#F0F0F0] flex items-center justify-between text-xs font-medium text-[#8C857B] group-hover:bg-[#F2EFE9] transition-colors cursor-pointer">
                <span>{t('查看詳細數據', 'View Detailed Data')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:text-[#6B9080] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMaterials.length === 0 && (
          <div className="col-span-full py-20 text-center text-[#8C857B]">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">{t('找不到符合條件的材料。', 'No matching materials found.')}</p>
            <button onClick={() => { setSearchTerm(''); setActiveCategory('全部 (All)'); }} className="mt-4 text-[#6B9080] font-medium hover:underline">
              {t('清除搜尋條件', 'Clear Search')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
