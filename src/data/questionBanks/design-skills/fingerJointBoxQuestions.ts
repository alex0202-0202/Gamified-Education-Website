import type { QuestionItem } from '../types';

const q = (
  id: string,
  difficulty: QuestionItem['difficulty'],
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  relatedTerms: string[],
): QuestionItem => ({
  id,
  curriculum: 'Shared Design Skills',
  yearGroup: 'S1',
  topicId: 'design-skill-finger-joint-box',
  topicTitle: '榫接 / Finger Joint Box Maker',
  difficulty,
  gameMode: ['quiz', 'checkpoint', 'materials-practice'],
  question,
  options,
  correctAnswer,
  explanation,
  relatedTerms,
  sourceTopic: 'Shared Design Technology skill module: 榫接 finger-joint box generation and laser-cut case design',
});

export const fingerJointBoxQuestions: QuestionItem[] = [
  q('box-maker-q01', 'beginner', 'What is the main purpose of a 榫接 / finger joint in a laser-cut box?', ['To interlock panels and increase bonding area', 'To remove all need for measurement', 'To make the box impossible to assemble', 'To replace all material testing'], 'To interlock panels and increase bonding area', '榫接 finger joints use alternating tenons/tabs and slots so panels align and have more contact area for assembly.', ['榫接', 'finger joint', 'tabs', 'slots']),
  q('box-maker-q02', 'beginner', 'Which input is essential when designing a finger-joint box?', ['Material thickness', 'Screen brightness', 'Paint colour only', 'Student age only'], 'Material thickness', 'The tab depth depends on material thickness, so the generator needs this value for accurate joints.', ['material thickness', 'tab depth']),
  q('box-maker-q03', 'beginner', 'What does kerf describe in laser cutting?', ['The width of material removed by the laser beam', 'The height of the finished box', 'The name of a wood joint', 'The colour of the cut line'], 'The width of material removed by the laser beam', 'Kerf compensation helps the physical joint fit because the laser burns away a small amount of material.', ['kerf', 'laser cutting']),
  q('box-maker-q04', 'beginner', 'Which box type usually has no top panel?', ['Open box', 'Closed box', 'Project case', 'Six-panel cube'], 'Open box', 'An open box keeps the bottom and side panels but removes the lid/top panel.', ['open box', 'tray']),
  q('box-maker-q05', 'intermediate', 'A student chooses 3 mm plywood and 1 mm fingers. What is the best warning?', ['Finger size is too small and may be weak', 'The material is automatically waterproof', 'The box will not need kerf testing', 'The joint will become a hinge'], 'Finger size is too small and may be weak', 'Finger size should normally be at least as large as the material thickness to avoid fragile tabs.', ['finger size', 'strength']),
  q('box-maker-q06', 'intermediate', 'Why might a designer choose inside dimensions for a storage box?', ['To protect the usable internal space', 'To hide all panel labels', 'To remove the bottom panel', 'To avoid measuring thickness'], 'To protect the usable internal space', 'Inside dimensions are useful when the box must hold a specific object, because material thickness is added outside that space.', ['inside dimensions', 'storage']),
  q('box-maker-q07', 'intermediate', 'A joint is too loose after cutting. Which parameter is usually adjusted during calibration?', ['Kerf compensation', 'Student name label', 'Sidebar colour', 'Browser zoom'], 'Kerf compensation', 'Kerf is calibrated through test cuts; changing it can make slots tighter or looser in the final material.', ['kerf calibration', 'fit']),
  q('box-maker-q08', 'advanced', 'Why should a tall narrow box trigger a design warning?', ['It may be unstable or flex during use', 'It proves the drawing is wrong', 'It always needs no bottom panel', 'It cannot be made from any material'], 'It may be unstable or flex during use', 'Tall structures with small bases can tip or flex, so designers should consider proportions, bracing and material thickness.', ['stability', 'proportion']),
  q('box-maker-q09', 'advanced', 'Why is a test corner useful before cutting a full finger-joint box?', ['It checks real material fit, kerf and laser settings with less waste', 'It replaces the whole design process', 'It removes the need for safety supervision', 'It guarantees every material behaves the same'], 'It checks real material fit, kerf and laser settings with less waste', 'Laser machines and materials vary, so a small test joint gives evidence before spending material on the full layout.', ['test cut', 'prototype', 'kerf']),
  q('box-maker-q10', 'advanced', 'Which evidence would best support an IB MYP or DAT portfolio page about the box generator?', ['Dimension choices, material reasoning, test-cut photos and assembly evaluation', 'Only a screenshot with no explanation', 'A copied design with no measurements', 'A colour preference with no testing'], 'Dimension choices, material reasoning, test-cut photos and assembly evaluation', 'Portfolio evidence should show design decisions, technical reasoning, prototype testing and reflection.', ['portfolio evidence', 'evaluation']),
];
