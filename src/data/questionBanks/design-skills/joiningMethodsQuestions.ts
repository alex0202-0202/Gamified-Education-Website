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
  topicId: 'design-skill-joining-methods',
  topicTitle: 'Joining Methods & Adhesives',
  difficulty,
  gameMode: ['quiz', 'checkpoint', 'materials-practice'],
  question,
  options,
  correctAnswer,
  explanation,
  relatedTerms,
  sourceTopic: 'Shared Design Technology skill module: joining methods and adhesives',
});

export const joiningMethodsQuestions: QuestionItem[] = [
  q('join-q01', 'beginner', 'Which adhesive is commonly suitable for wood-to-wood joints?', ['PVA wood glue', 'Acrylic solvent cement', 'Water only', 'Masking tape only'], 'PVA wood glue', 'PVA wood glue is commonly used for timber joints when parts are clamped while drying.', ['PVA', 'wood glue']),
  q('join-q02', 'beginner', 'Which joining method is useful for cardboard models?', ['Tab-and-slot', 'Welding', 'Acrylic solvent cement only', 'Mortise and tenon only'], 'Tab-and-slot', 'Tabs and slots help locate card parts and can reduce reliance on glue alone.', ['tab-and-slot', 'cardboard']),
  q('join-q03', 'beginner', 'Why is PVA wood glue not suitable for acrylic?', ['It does not bond acrylic strongly', 'It is too strong for every material', 'It turns acrylic into metal', 'It works only as a drill bit'], 'It does not bond acrylic strongly', 'Acrylic usually needs acrylic solvent cement or mechanical fixing, not ordinary PVA wood glue.', ['acrylic', 'adhesive compatibility']),
  q('join-q04', 'beginner', 'Which fastener can often be removed for repair?', ['Screw or bolt', 'Permanent weld only', 'Dried paint', 'One-piece casting'], 'Screw or bolt', 'Mechanical fixings such as screws and bolts can often be removed and repaired.', ['screws', 'bolts', 'repair']),
  q('join-q05', 'intermediate', 'A cardboard phone stand bends too easily. Which improvement is most suitable?', ['Add folded tabs, layering or lamination', 'Use more water on the card', 'Remove all folds', 'Use acrylic solvent cement'], 'Add folded tabs, layering or lamination', 'Card strength can be improved by folded forms, layers and better joint design.', ['cardboard', 'lamination', 'folding']),
  q('join-q06', 'intermediate', 'What is the main advantage of a finger joint?', ['It increases contact area and helps alignment', 'It removes all need for accurate cutting', 'It only works with fabric', 'It makes parts flexible'], 'It increases contact area and helps alignment', 'Finger joints interlock and provide more bonding area than a simple butt joint.', ['finger joint', 'alignment']),
  q('join-q07', 'intermediate', 'Which method is most appropriate for joining acrylic to acrylic in a clean display stand?', ['Acrylic solvent cement with accurate fit', 'PVA wood glue only', 'Staples', 'Loose tape'], 'Acrylic solvent cement with accurate fit', 'Solvent cement can create a strong, clean acrylic-to-acrylic joint when used safely.', ['acrylic solvent cement', 'display stand']),
  q('join-q08', 'advanced', 'Why might screws and brackets be better than glue for wood-to-acrylic joining?', ['Mixed materials may need mechanical fixing for strength and repairability', 'Acrylic always absorbs PVA', 'Brackets remove all safety risks', 'Glue is never used in design'], 'Mixed materials may need mechanical fixing for strength and repairability', 'Different materials often bond poorly with one adhesive, so mechanical fixing can be more reliable.', ['mixed materials', 'mechanical fixing']),
  q('join-q09', 'advanced', 'A student uses too much liquid glue on thin card and it warps. What should they learn?', ['Adhesive amount and drying method affect material shape and finish', 'Cardboard cannot ever be joined', 'More glue always makes stronger products', 'Warping is unrelated to glue'], 'Adhesive amount and drying method affect material shape and finish', 'Thin card can deform when too wet, so glue amount and pressure matter.', ['cardboard', 'warping', 'glue amount']),
  q('join-q10', 'advanced', 'Why should surface preparation matter when bonding metal?', ['Smooth or dirty metal can make adhesive joints weak', 'Metal does not need safety checks', 'Surface condition never affects bonding', 'Only colour matters'], 'Smooth or dirty metal can make adhesive joints weak', 'Cleaning and roughening can improve adhesive grip on metal, but mechanical fixing may still be stronger.', ['metal', 'surface preparation', 'epoxy']),
];
