import { lazy, Suspense, useEffect, useState } from 'react';
import { GameProvider } from './context/GameContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './components/LoginPage';
import { LevelSelect } from './components/LevelSelect';
import { SafetyInspector } from './components/modules/SafetyInspector';
import { DestructOMeter } from './components/modules/DestructOMeter';
import { XRayArchitect } from './components/modules/XRayArchitect';
import { AutomataBuilder } from './components/modules/AutomataBuilder';
import { LogicGatePuzzle } from './components/modules/LogicGatePuzzle';
import { MaterialsDatabase } from './components/MaterialsDatabase';
import { HKDSEResources } from './components/HKDSEResources';
import { SeniorModuleStudio } from './components/SeniorModuleStudio';
import { ResourceHub } from './components/ResourceHub';
import { IBResourceHub } from './components/IBResourceHub';
import { IBSubtopicDetail } from './components/IBSubtopicDetail';
import { IBResourceDetail } from './components/IBResourceDetail';
import { ProjectHub } from './components/ProjectHub';
import { OrthographicProjectionPanel } from '../features/cad-learning/OrthographicProjectionPanel';
import { JoiningMethodsPanel } from '../features/materials-joining/JoiningMethodsPanel';
import { FingerJointBoxMakerPanel } from '../features/box-maker/FingerJointBoxMakerPanel';
import {
  DATCaseStudiesPage,
  DATSbaSupportPage,
  DATThematicResourcesPage,
  EDBJuniorDesignTechnologyPage,
  IBCaseStudiesPage,
  IBCurrent2026Page,
  IBMypDesignPage,
  IBIASupportPage,
  IBNew2027Page,
  IBResearchForDesignPage,
  SourceMetadataPage,
} from './components/pages/CurriculumPages';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'sonner';
import type { SeniorModuleId } from './data/seniorModules';

const FunLearning = lazy(() => import('./components/FunLearning').then((module) => ({ default: module.FunLearning })));
const DrivingGame = lazy(() => import('./components/DrivingGame').then((module) => ({ default: module.DrivingGame })));

function AppContent() {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [activeTopic, setActiveTopic] = useState<string | undefined>(undefined);

  const handleNavigate = (screen: string, topic?: string) => {
    setCurrentScreen(screen);
    setActiveTopic(topic);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      document.querySelector('[data-main-scroll]')?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, [currentScreen, activeTopic]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'hkdse_thematic_resources':
        return <DATThematicResourcesPage activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'hkdse_case_studies':
        return <DATCaseStudiesPage activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'hkdse_sba_support':
        return <DATSbaSupportPage />;
      case 'edb_junior_dt':
        return <EDBJuniorDesignTechnologyPage activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_myp_design':
        return <IBMypDesignPage />;
      case 'ib_current_2026':
        return <IBCurrent2026Page activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_new_2027':
        return <IBNew2027Page activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_ia_support':
        return <IBIASupportPage />;
      case 'ib_case_studies':
        return <IBCaseStudiesPage activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_research_for_design':
        return <IBResearchForDesignPage />;
      case 'source_metadata':
        return <SourceMetadataPage />;
      case 'dashboard':
        return <LevelSelect onNavigate={handleNavigate} activeTopic={activeTopic} />;
      case 'safety':
        return <SafetyInspector />;
      case 'materials':
        return <DestructOMeter />;
      case 'design':
        return <XRayArchitect />;
      case 'mechanisms':
        return <AutomataBuilder />;
      case 'systems':
        return <LogicGatePuzzle />;
      case 'materials_db':
        return <MaterialsDatabase />;
      case 'hkdse_resources':
        return <HKDSEResources activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'senior_module':
        return activeTopic ? <SeniorModuleStudio moduleId={activeTopic as SeniorModuleId} onNavigate={handleNavigate} /> : <LevelSelect onNavigate={handleNavigate} activeTopic={activeTopic} />;
      case 'resource_hub':
        return <ResourceHub activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_resources':
        return <IBResourceHub activeTopic={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_subtopic':
        return <IBSubtopicDetail subtopicKey={activeTopic} onNavigate={handleNavigate} />;
      case 'ib_resource':
        return <IBResourceDetail resourceId={activeTopic} onNavigate={handleNavigate} />;
      case 'project_hub':
        return <ProjectHub onNavigate={handleNavigate} />;
      case 'orthographic_projection':
        return <OrthographicProjectionPanel onNavigate={handleNavigate} />;
      case 'joining_methods':
        return <JoiningMethodsPanel onNavigate={handleNavigate} />;
      case 'finger_joint_box_maker':
        return <FingerJointBoxMakerPanel onNavigate={handleNavigate} />;
      case 'fun_learning':
        return (
          <Suspense fallback={<div className="text-sm text-[#8C857B]">Loading Design Technology practice...</div>}>
            <FunLearning activeTopic={activeTopic} onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'driving_game':
        return (
          <Suspense fallback={<div className="text-sm text-[#8C857B]">Loading Design Technology game...</div>}>
            <DrivingGame onBack={() => handleNavigate('fun_learning')} />
          </Suspense>
        );
      default:
        return <LevelSelect onNavigate={handleNavigate} activeTopic={activeTopic} />;
    }
  };

  if (!user) return <LoginPage />;

  return (
    <Layout currentScreen={currentScreen} onNavigate={handleNavigate} activeTopic={activeTopic}>
      {renderScreen()}
    </Layout>
  );
}

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LanguageProvider>
        <AuthProvider>
          <GameProvider>
            <AppContent />
            <Toaster position="top-right" theme="dark" />
          </GameProvider>
        </AuthProvider>
      </LanguageProvider>
    </DndProvider>
  );
}
