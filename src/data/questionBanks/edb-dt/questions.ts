import type { QuestionItem, QuestionYearGroup } from '../types';

const q = (
  id: string,
  yearGroup: QuestionYearGroup,
  topicId: string,
  topicTitle: string,
  difficulty: QuestionItem['difficulty'],
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  relatedTerms: string[],
): QuestionItem => ({
  id,
  curriculum: 'EDB DT',
  yearGroup,
  topicId,
  topicTitle,
  difficulty,
  gameMode: ['quiz', 'checkpoint', 'flashcard-review'],
  question,
  options,
  correctAnswer,
  explanation,
  relatedTerms,
  sourceTopic: 'EDB S1-S3 Design and Technology add-on summaries',
});

export const edbDtQuestionBank: QuestionItem[] = [
  q('edb-s1-safety-ppe', 'S1', 'edb-s1-workshop-safety', 'S1 Workshop Safety', 'beginner', 'What should students do before using workshop equipment?', ['Ask permission and wear appropriate PPE', 'Start quickly before the lesson ends', 'Use the machine without checking', 'Remove safety guards'], 'Ask permission and wear appropriate PPE', 'Safe workshop practice starts with teacher permission, correct PPE and awareness of hazards.', ['PPE', 'workshop safety', 'risk']),
  q('edb-s1-design-process', 'S1', 'edb-s1-design-process', 'S1 Design Process', 'beginner', 'What is usually the first step in a design task?', ['Identify the problem and users', 'Paint the final product', 'Choose the most expensive material', 'Write the evaluation first'], 'Identify the problem and users', 'Design and Technology projects start by understanding the need, context and target user.', ['design process', 'problem', 'user']),
  q('edb-s1-sketching', 'S1', 'edb-s1-sketching', 'S1 Sketching and Communication', 'intermediate', 'Why should an idea sketch include labels?', ['To explain features, materials and how the idea works', 'To hide the design intention', 'To avoid making models', 'To replace all testing'], 'To explain features, materials and how the idea works', 'Labels turn a sketch into a communication tool by explaining key design decisions.', ['sketching', 'annotation', 'design communication']),
  q('edb-s1-material-natural', 'S1', 'edb-s1-materials', 'S1 Materials', 'beginner', 'Which is a natural material?', ['Oak wood', 'PVC', 'ABS plastic', 'Acrylic'], 'Oak wood', 'Oak wood comes from trees; the other options are manufactured polymers.', ['materials', 'timber', 'natural material']),
  q('edb-s1-ipo', 'S1', 'edb-s1-systems', 'S1 Input-Process-Output', 'intermediate', 'In a simple torch system, what is the output?', ['Light from the bulb or LED', 'The battery stored inside', 'The switch being pressed', 'The plastic casing colour'], 'Light from the bulb or LED', 'Output is what the system produces after processing an input and using energy.', ['input', 'process', 'output']),
  q('edb-s1-structure-force', 'S1', 'edb-s1-structures', 'S1 Structures', 'advanced', 'When a shelf bends under load, which type of evidence helps improve the design?', ['Measured deflection under different loads', 'A guess that it looks strong', 'Only a final photo', 'A colour preference'], 'Measured deflection under different loads', 'Testing structural performance gives evidence for improving thickness, supports or material choice.', ['structures', 'load', 'testing']),

  q('edb-s2-material-testing', 'S2', 'edb-s2-material-testing', 'S2 Material Testing', 'intermediate', 'Why should students compare material samples before choosing one?', ['To match material properties with the design requirement', 'To avoid research', 'To pick the brightest colour only', 'To make evaluation unnecessary'], 'To match material properties with the design requirement', 'Material testing helps justify strength, weight, flexibility, finish and sustainability decisions.', ['material properties', 'testing', 'selection']),
  q('edb-s2-mechanisms', 'S2', 'edb-s2-mechanisms', 'S2 Mechanisms', 'beginner', 'What can a cam mechanism commonly change?', ['Rotary motion into reciprocating motion', 'Metal into plastic', 'A sketch into a photograph', 'A battery into a switch'], 'Rotary motion into reciprocating motion', 'Cams can convert rotation into repeated up-and-down or back-and-forth motion.', ['cam', 'mechanism', 'motion']),
  q('edb-s2-control-loop', 'S2', 'edb-s2-control-systems', 'S2 Control Systems', 'intermediate', 'What is the main feature of a closed-loop control system?', ['It uses feedback to adjust output', 'It has no sensor', 'It never changes output', 'It only uses manual drawing'], 'It uses feedback to adjust output', 'Closed-loop systems compare feedback with a target and make adjustments.', ['closed loop', 'feedback', 'control']),
  q('edb-s2-project-plan', 'S2', 'edb-s2-project-management', 'S2 Project Planning', 'beginner', 'What should a simple project plan include?', ['Tasks, materials, tools, time and safety checks', 'Only the final mark', 'Only a mood board', 'Only the product name'], 'Tasks, materials, tools, time and safety checks', 'Planning supports safer, more organised making and helps students track progress.', ['planning', 'tools', 'safety']),
  q('edb-s2-tool-choice', 'S2', 'edb-s2-making-skills', 'S2 Making Skills', 'intermediate', 'Why should tool choice be justified?', ['Different tools affect accuracy, safety and finish', 'Tools do not affect outcomes', 'The largest tool is always best', 'It replaces measurement'], 'Different tools affect accuracy, safety and finish', 'Choosing the correct tool helps students make products safely and accurately.', ['tools', 'accuracy', 'finish']),
  q('edb-s2-manufacturing-constraints', 'S2', 'edb-s2-manufacturing', 'S2 Manufacturing Constraints', 'advanced', 'A school product must be made in two lessons with limited materials. What kind of constraint is this?', ['Time and resource constraint', 'Aesthetic only', 'No constraint', 'A market segment'], 'Time and resource constraint', 'Constraints are limits that affect the design and production choices.', ['constraints', 'resources', 'production']),

  q('edb-s3-cad-purpose', 'S3', 'edb-s3-cad', 'S3 CAD and Modelling', 'beginner', 'What is one useful purpose of CAD in a DT project?', ['Develop and communicate accurate design models', 'Avoid all design decisions', 'Replace user research completely', 'Guarantee the product is sustainable'], 'Develop and communicate accurate design models', 'CAD supports visualisation, refinement, dimensions and sometimes digital manufacture.', ['CAD', 'modelling', 'visualisation']),
  q('edb-s3-product-analysis', 'S3', 'edb-s3-product-analysis', 'S3 Product Analysis', 'intermediate', 'Which product analysis point is most useful?', ['The handle shape supports grip for smaller hands', 'The product is famous', 'The product has a logo', 'The product looks okay'], 'The handle shape supports grip for smaller hands', 'Useful analysis links product features to user needs, function and design decisions.', ['product analysis', 'ergonomics', 'user needs']),
  q('edb-s3-sustainability', 'S3', 'edb-s3-sustainability', 'S3 Sustainable Design', 'advanced', 'Which redesign is strongest for sustainability?', ['Use less material, make repair easier and keep the product safe', 'Make the product disposable', 'Mix materials so they cannot be separated', 'Increase packaging only'], 'Use less material, make repair easier and keep the product safe', 'Sustainable DT decisions should reduce impact while maintaining function and safety.', ['sustainability', 'repairability', 'material efficiency']),
  q('edb-s3-system-integration', 'S3', 'edb-s3-systems', 'S3 Systems Integration', 'intermediate', 'In a night-light, which combination best describes a system?', ['Light sensor input, circuit process, LED output', 'Paint input, logo process, box output', 'User opinion only', 'A final photo only'], 'Light sensor input, circuit process, LED output', 'A technological system can be described through input, process and output.', ['systems', 'sensor', 'LED']),
  q('edb-s3-cam', 'S3', 'edb-s3-cam', 'S3 CAM and Digital Manufacture', 'beginner', 'What does CAM help students do?', ['Use computer-controlled tools to make parts from digital designs', 'Write essays automatically', 'Replace all hand skills', 'Collect user consent'], 'Use computer-controlled tools to make parts from digital designs', 'CAM can connect CAD files to tools such as laser cutters, CNC machines and 3D printers.', ['CAM', 'digital manufacture', 'CAD']),
  q('edb-s3-evaluation', 'S3', 'edb-s3-evaluation', 'S3 Evaluation', 'advanced', 'What makes a DT evaluation convincing?', ['It uses test data and user feedback to judge the design against criteria', 'It only says the product is nice', 'It only shows final photos', 'It avoids mentioning problems'], 'It uses test data and user feedback to judge the design against criteria', 'Evaluation should use evidence and explain how the design could improve.', ['evaluation', 'criteria', 'user feedback']),
];
