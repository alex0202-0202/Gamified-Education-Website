export type OrthographicViewId =
  | 'plan'
  | 'front'
  | 'back'
  | 'left'
  | 'right'
  | 'isometric'
  | 'section';

export type OrthographicViewGuide = {
  id: OrthographicViewId;
  title: string;
  titleZh: string;
  explanation: string;
  lookFor: string;
  commonMistake: string;
  drawingTip: string;
  practiceTask: string;
};

export const orthographicViewGuides: OrthographicViewGuide[] = [
  {
    id: 'plan',
    title: 'Plan View',
    titleZh: '平面圖',
    explanation: 'Plan view shows the object from above. It communicates width and depth.',
    lookFor: 'Top outline, holes, slots and positions on the horizontal surface.',
    commonMistake: 'Drawing height details that only belong in an elevation.',
    drawingTip: 'Imagine looking straight down. Keep vertical height out of this view.',
    practiceTask: 'Draw the plan view of a cuboid with a circular hole on top.',
  },
  {
    id: 'front',
    title: 'Front Elevation',
    titleZh: '正立面圖',
    explanation: 'Front elevation shows the object from the front. It communicates width and height.',
    lookFor: 'Main face, visible edges, height, width and front details.',
    commonMistake: 'Using perspective instead of a flat elevation.',
    drawingTip: 'Keep all vertical and horizontal edges true to size.',
    practiceTask: 'Draw the front elevation of a phone stand.',
  },
  {
    id: 'back',
    title: 'Back Elevation',
    titleZh: '背立面圖',
    explanation: 'Back elevation shows the object from the rear side.',
    lookFor: 'Rear outline, back fixings and details hidden from the front.',
    commonMistake: 'Copying the front view when the back has different features.',
    drawingTip: 'Check whether slots, screws or labels are on the back face.',
    practiceTask: 'Compare front and back views of a simple product body.',
  },
  {
    id: 'left',
    title: 'Left View',
    titleZh: '左視圖',
    explanation: 'Left view shows the object from the left-hand side. It communicates depth and height.',
    lookFor: 'Side profile, thickness, slopes and side openings.',
    commonMistake: 'Mixing left and right details.',
    drawingTip: 'Mark the object orientation before drawing side elevations.',
    practiceTask: 'Identify which side elevation matches a block with a stepped top.',
  },
  {
    id: 'right',
    title: 'Right View',
    titleZh: '右視圖',
    explanation: 'Right view shows the object from the right-hand side.',
    lookFor: 'Right-side outline, thickness, side holes and profile changes.',
    commonMistake: 'Mirroring the wrong side without checking the object.',
    drawingTip: 'Use light construction lines to align height with the front elevation.',
    practiceTask: 'Draw both left and right views of an asymmetrical block.',
  },
  {
    id: 'isometric',
    title: 'Isometric View',
    titleZh: '等角圖',
    explanation: 'Isometric view shows width, depth and height together as a simple 3D drawing.',
    lookFor: 'Three visible axes, parallel edges and the overall 3D form.',
    commonMistake: 'Using vanishing-point perspective instead of parallel isometric lines.',
    drawingTip: 'Use vertical lines and 30-degree receding lines where possible.',
    practiceTask: 'Convert a rectangle into a simple 3D block.',
  },
  {
    id: 'section',
    title: 'Section View',
    titleZh: '剖面圖',
    explanation: 'Section view imagines the object is cut open so hidden internal details can be shown.',
    lookFor: 'Cut surface, internal outline and hatched material areas.',
    commonMistake: 'Showing the cut as a broken object rather than a controlled drawing view.',
    drawingTip: 'Use a clear cutting plane and hatch the material that has been cut.',
    practiceTask: 'Show a section through the middle of a simple block.',
  },
];

export const orthographicPracticeTasks = [
  'Draw a cuboid from plan and front view.',
  'Identify the correct side elevation for an asymmetrical object.',
  'Convert a rectangle into a 3D block using extrusion.',
  'Create a simple product body and label its dimensions.',
  'Show a section through a simple model and hatch the cut area.',
];
