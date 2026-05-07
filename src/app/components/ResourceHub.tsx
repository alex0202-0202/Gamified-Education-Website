import { BookOpen, Download, Layers, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';

type ResourceHubProps = {
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

export const ResourceHub = ({ activeTopic, onNavigate }: ResourceHubProps) => {
  const { selectedLevel } = useGame();
  const { t } = useLanguage();

  type DatResource = {
    id: string;
    title: string;
    desc: string;
    icon: LucideIcon;
    action: () => void;
    cta: string;
  };

  if (selectedLevel === 'IB') {
    return (
      <div className="space-y-8 pb-20">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EFE9] rounded-xl">
              <BookOpen className="w-6 h-6 text-[#D5896F]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">IB Support Routing</div>
              <h1 className="text-3xl font-bold text-[#2C2A26]">{t('IB 資源已獨立管理', 'IB Resources Are Managed Separately')}</h1>
              <p className="text-sm text-[#6B665E] mt-2 max-w-3xl">
                {t('這個共享資源頁現在只保留 HKDSE / DAT 內容。IB Design Technology 請使用獨立的 IB 資源中心，以避免與 DSE 內容重疊。', 'This shared resource page now stays HKDSE / DAT only. Use the dedicated IB Resource Library for IB Design Technology so the two curricula do not overlap.')}
              </p>
              <button onClick={() => onNavigate('ib_resources')} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
                {t('前往 IB 資源中心', 'Open IB Resource Library')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const datResources: DatResource[] = [
    {
      id: 'materials-cheatsheet',
      title: t('材料特性速查表', 'Material Properties Cheat Sheet'),
      desc: t('快速比較金屬、聚合物、木材與複合材料的特性。', 'Quickly compare the properties of metals, polymers, wood, and composite materials.'),
      icon: Layers,
      action: () => onNavigate('materials_db'),
      cta: t('前往材料資料庫', 'Open Materials Database'),
    },
    {
      id: 'laser-safety',
      title: t('鐳射切割安全守則', 'Laser Cutting Safety Guide'),
      desc: t('對應工作坊安全與風險管理重點。', 'Aligned with workshop safety and risk management key points.'),
      icon: ShieldCheck,
      action: () => onNavigate('senior_module', 'value_impact'),
      cta: t('前往價值與影響', 'Open Value and Impact'),
    },
    {
      id: '3d-printing-guide',
      title: t('3D 打印設定指南', '3D Printing Setup Guide'),
      desc: t('配合 CAD、STL、G-code 與快速原型工作流程。', 'Supports CAD, STL, G-code, and rapid prototyping workflows.'),
      icon: Wrench,
      action: () => onNavigate('senior_module', 'visualisation_cad'),
      cta: t('前往 CAD 模組', 'Open CAD Module'),
    },
  ];

  const resources = datResources;

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#F2EFE9] rounded-xl">
            <Download className="w-6 h-6 text-[#D5896F]" />
          </div>
          <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">Design Technology Resources</div>
              <h1 className="text-3xl font-bold text-[#2C2A26]">{t('設計科技資源中心', 'Design Technology Resource Hub')}</h1>
              <p className="text-sm text-[#6B665E] mt-2 max-w-3xl">
                {t('這裡整理 HKDSE DAT / Design Technology 的材料、工場安全、CAD、製造與設計項目支援入口。', 'This page collects HKDSE DAT / Design Technology entry points for materials, workshop safety, CAD, manufacturing, and design project support.')}
              </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((resource) => {
          const isActive = activeTopic === resource.id;
          const Icon = resource.icon;
          return (
            <div key={resource.id} className={`bg-white rounded-2xl border shadow-sm p-6 ${isActive ? 'border-[#D5896F]' : 'border-[#E5E0D8]'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#F9F8F6]">
                  <Icon className="w-5 h-5 text-[#D5896F]" />
                </div>
                <div>
                  <h2 className="font-bold text-[#2C2A26]">{resource.title}</h2>
                  {isActive && <div className="text-[10px] font-bold uppercase tracking-widest text-[#D5896F]">{t('目前重點', 'Current Focus')}</div>}
                </div>
              </div>
              <p className="text-sm text-[#6B665E] mb-5">{resource.desc}</p>
              <button onClick={resource.action} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
                {resource.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
