import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Gamepad2, CheckSquare, ArrowRight, ChevronRight, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { useGame } from '../context/GameContext';
import { moduleData } from '../data/modules';

type ModuleViewerProps = {
  moduleId: keyof typeof moduleData;
  children?: React.ReactNode;
  onComplete?: () => void;
  onBack: () => void;
};

const moduleToneClasses: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  purple: 'bg-purple-100 text-purple-700',
  stone: 'bg-stone-100 text-stone-700',
};

export const ModuleViewer = ({ moduleId, children, onComplete, onBack }: ModuleViewerProps) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'activity' | 'review'>('knowledge');
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const data = moduleData[moduleId];
  const { completeModule } = useGame();

  if (!data) return <div>Module not found</div>;

  const handleQuizSubmit = (index: number, optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const checkQuiz = () => {
    setShowQuizResult(true);
    const correctCount = data.review.reduce((acc, q, idx) => {
      return acc + (q.answer === quizAnswers[idx] ? 1 : 0);
    }, 0);
    
    if (correctCount === data.review.length) {
      completeModule(moduleId);
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9F8F6]">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-[#E5E0D8]">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-[#6B665E] hover:text-[#2C2A26] font-bold text-sm flex items-center">
            <ChevronRight className="rotate-180 mr-1" size={16} /> 返回
          </button>
          <div className="h-6 w-px bg-[#E5E0D8]" />
          <div className={`p-2 rounded-lg ${moduleToneClasses[data.color] ?? moduleToneClasses.stone}`}>
            <data.icon size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#8C857B] uppercase tracking-wider">{data.code}</div>
            <h1 className="text-xl font-bold text-[#2C2A26]">{data.title}</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#F2EFE9] p-1 rounded-lg">
          {[
            { id: 'knowledge', label: '基礎知識', icon: BookOpen },
            { id: 'activity', label: '互動練習', icon: Gamepad2 },
            { id: 'review', label: '溫習測驗', icon: CheckSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-white text-[#2C2A26] shadow-sm" 
                  : "text-[#8C857B] hover:text-[#4A4741]"
              )}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto h-full">
          <AnimatePresence mode="wait">
            
            {/* Knowledge Tab */}
            {activeTab === 'knowledge' && (
              <motion.div 
                key="knowledge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12 pb-20"
              >
                {data.sections.map((section, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                      <h3 className="text-2xl font-bold text-[#2C2A26] mb-4">{section.title}</h3>
                      <div className="prose prose-stone text-[#4A4741] whitespace-pre-line leading-relaxed">
                        {section.content}
                      </div>
                    </div>
                    <div className={`relative h-64 rounded-2xl overflow-hidden shadow-md border border-[#E5E0D8] ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                      <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center pt-10">
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className="flex items-center space-x-2 px-8 py-3 bg-[#2C2A26] text-white rounded-xl font-bold hover:bg-[#4A4741] transition-colors"
                  >
                    <span>開始互動練習</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <motion.div 
                key="activity"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                {children ? children : (
                   <div className="h-full flex flex-col items-center justify-center text-[#8C857B] bg-white rounded-2xl border border-[#E5E0D8]">
                      <Gamepad2 size={48} className="mb-4 opacity-50" />
                      <p className="font-bold">本單元暫無互動練習</p>
                      <button onClick={() => setActiveTab('review')} className="mt-4 text-[#D5896F] underline">前往溫習測驗</button>
                   </div>
                )}
              </motion.div>
            )}

            {/* Review Tab */}
            {activeTab === 'review' && (
              <motion.div 
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto py-10"
              >
                 <div className="bg-white p-8 rounded-2xl border border-[#E5E0D8] shadow-sm">
                   <h3 className="text-xl font-bold text-[#2C2A26] mb-8 flex items-center">
                     <CheckSquare className="mr-3 text-[#D5896F]" />
                     單元小測 (Unit Quiz)
                   </h3>
                   
                   <div className="space-y-8">
                     {data.review.map((q, idx) => (
                       <div key={idx} className="space-y-3">
                         <p className="font-bold text-[#4A4741]">{idx + 1}. {q.question}</p>
                         <div className="grid grid-cols-1 gap-2">
                           {q.options.map((opt, optIdx) => (
                             <button
                               key={optIdx}
                               disabled={showQuizResult}
                               onClick={() => handleQuizSubmit(idx, optIdx)}
                               className={clsx(
                                 "text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium",
                                 showQuizResult && optIdx === q.answer 
                                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                    : showQuizResult && quizAnswers[idx] === optIdx && optIdx !== q.answer
                                    ? "bg-red-50 border-red-200 text-red-700"
                                    : quizAnswers[idx] === optIdx
                                    ? "bg-[#2C2A26] text-white border-[#2C2A26]"
                                    : "bg-white border-[#E5E0D8] hover:bg-[#F9F8F6]"
                               )}
                             >
                               {opt}
                             </button>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>

                   <div className="mt-10 pt-6 border-t border-[#E5E0D8] flex justify-between items-center">
                     {showQuizResult ? (
                       <div className="flex items-center space-x-4">
                         <span className="font-bold text-lg">
                           得分: {data.review.reduce((acc, q, idx) => acc + (q.answer === quizAnswers[idx] ? 1 : 0), 0)} / {data.review.length}
                         </span>
                         <button 
                           onClick={() => { setShowQuizResult(false); setQuizAnswers([]); }}
                           className="flex items-center space-x-2 text-[#6B665E] hover:text-[#2C2A26]"
                         >
                           <RefreshCw size={16} /> <span>重試</span>
                         </button>
                       </div>
                     ) : (
                       <div className="text-xs text-[#8C857B]">完成所有題目以提交</div>
                     )}
                     
                     {!showQuizResult && (
                       <button
                         onClick={checkQuiz}
                         disabled={quizAnswers.length !== data.review.length}
                         className="px-6 py-3 bg-[#D5896F] text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#C07A60] transition-colors"
                       >
                         提交答案
                       </button>
                     )}
                   </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
