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
  topicId: 'design-skill-orthographic-projection',
  topicTitle: 'Orthographic Projection & Beginner CAD',
  difficulty,
  gameMode: ['quiz', 'checkpoint', 'cad-practice'],
  question,
  options,
  correctAnswer,
  explanation,
  relatedTerms,
  sourceTopic: 'Shared Design Technology skill module: orthographic projection and beginner CAD',
});

export const orthographicProjectionQuestions: QuestionItem[] = [
  q('ortho-q01', 'beginner', 'What does a plan view show?', ['The object from above', 'The object from inside only', 'A perspective drawing', 'Only the back face'], 'The object from above', 'Plan view is the view looking down on the object, usually showing width and depth.', ['plan view', 'width', 'depth']),
  q('ortho-q02', 'beginner', 'Which view usually shows height and width from the front?', ['Front elevation', 'Plan view', 'Section hatch', 'Material list'], 'Front elevation', 'A front elevation is a flat view from the front of the object.', ['front elevation', 'height', 'width']),
  q('ortho-q03', 'beginner', 'What does an isometric view help students see?', ['Width, depth and height together', 'Only a hidden cut surface', 'Only material cost', 'Only the top outline'], 'Width, depth and height together', 'Isometric drawings show a simple 3D form using parallel axes.', ['isometric', '3D form']),
  q('ortho-q04', 'beginner', 'What is extrusion in beginner CAD?', ['Turning a 2D profile into a 3D form by adding depth or height', 'Deleting every drawing line', 'Changing material colour only', 'Printing a worksheet'], 'Turning a 2D profile into a 3D form by adding depth or height', 'Extrusion is a core CAD idea: a flat shape can become a 3D body.', ['extrusion', 'CAD', '2D to 3D']),
  q('ortho-q05', 'intermediate', 'A plan view of a block is a rectangle. The front elevation shows its height. What extra information does the side view help confirm?', ['Depth and side profile', 'Brand name', 'Glue type', 'Class mark'], 'Depth and side profile', 'Side elevation helps communicate depth, thickness, slopes or side details.', ['side elevation', 'depth']),
  q('ortho-q06', 'intermediate', 'Why are dimensions important in CAD drawings?', ['They define accurate size for making and checking', 'They make the drawing decorative only', 'They replace all views', 'They hide design intent'], 'They define accurate size for making and checking', 'Dimensions turn drawings into usable design communication for modelling, making and checking.', ['dimensions', 'accuracy']),
  q('ortho-q07', 'intermediate', 'What does section view show that normal outside views may not show?', ['Internal details revealed by an imagined cut', 'Only the object colour', 'Only the product price', 'A random perspective'], 'Internal details revealed by an imagined cut', 'A section view cuts through an object to communicate hidden internal features.', ['section view', 'cut plane']),
  q('ortho-q08', 'advanced', 'A student draws the plan view with object height included. What is the mistake?', ['Plan view should show top width/depth, not vertical height', 'Plan view must always be shaded', 'Plan view cannot have outlines', 'Plan view is the same as a section view'], 'Plan view should show top width/depth, not vertical height', 'Each orthographic view communicates specific directions; height belongs in elevations.', ['orthographic projection', 'plan view']),
  q('ortho-q09', 'advanced', 'Why might a designer use both orthographic and isometric views?', ['Orthographic views give accurate faces; isometric view helps visualise the 3D form', 'They are always identical', 'One removes the need for dimensions', 'They only decorate the portfolio'], 'Orthographic views give accurate faces; isometric view helps visualise the 3D form', 'Together, the views support accurate making and easier spatial understanding.', ['orthographic', 'isometric']),
  q('ortho-q10', 'advanced', 'In product design, why is CAD useful before prototyping?', ['It helps test size, form and communication before using final materials', 'It guarantees no user research is needed', 'It replaces safety checks', 'It only creates colourful images'], 'It helps test size, form and communication before using final materials', 'CAD supports design development, checking, iteration and prototype planning.', ['CAD modelling', 'prototyping']),
];
