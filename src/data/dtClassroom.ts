import { listBookings, listSubmissions } from './dtWorkshop';
import type { DTBookingRequest, DTSubmissionRequest } from './dtWorkshop';

export type ClassroomRole = 'student' | 'teacher' | 'admin' | 'technician';
export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type DTClassGroup = {
  id: string;
  classNo: string;
  yearGroup: string;
  teacherName: string;
  studentEmails: string[];
};

export type DTResource = {
  id: string;
  title: string;
  type: 'PDF' | 'IMAGE' | 'VIDEO' | 'LINK' | 'SLIDES' | 'WORKSHEET' | 'CAD_FILE';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
};

export type DTModuleLesson = {
  id: string;
  title: string;
  lessonNumber: string;
  description: string;
  learningObjectives: string[];
  successCriteria: string[];
  resources: DTResource[];
  taskInstructions?: string;
};

export type DTModule = {
  id: string;
  title: string;
  description: string;
  classGroups: string[];
  yearGroups: string[];
  teacherName: string;
  startDate?: string;
  endDate?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  lessons: DTModuleLesson[];
  resources: DTResource[];
};

export type DTClassTask = {
  id: string;
  title: string;
  classGroups: string[];
  yearGroups: string[];
  moduleId?: string;
  dueDateTime: string;
  category: string;
  type: 'FORMATIVE' | 'SUMMATIVE' | 'PRACTICE' | 'PORTFOLIO';
  details: string;
  dropboxEnabled: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
};

export type DTClassTaskSubmission = {
  id: string;
  taskId: string;
  studentEmail: string;
  studentName: string;
  fileName?: string;
  note?: string;
  submittedAt: string;
  status: 'SUBMITTED' | 'REVIEWED' | 'RETURNED';
  teacherFeedback?: string;
};

export type DTAnnouncement = {
  id: string;
  title: string;
  body: string;
  classGroups: string[];
  yearGroups: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  type:
    | 'GENERAL_NOTICE'
    | 'HOMEWORK_REMINDER'
    | 'DEADLINE_WARNING'
    | 'MATERIAL_REMINDER'
    | 'SUBMISSION_NOTICE'
    | 'LESSON_PREPARATION'
    | 'COMPETITION_NOTICE'
    | 'URGENT_NOTICE';
  priority: Priority;
  publishAt?: string;
  expiresAt?: string;
  attachmentUrls?: string[];
  relatedModuleId?: string;
  relatedSubmissionDeadlineId?: string;
  notificationSent: boolean;
};

export type DTNotification = {
  id: string;
  recipientEmail: string;
  classGroupId: string;
  title: string;
  message: string;
  sourceType: 'ANNOUNCEMENT' | 'MODULE' | 'TASK' | 'CALENDAR' | 'SUBMISSION' | 'BOOKING' | 'FEEDBACK';
  sourceId: string;
  createdAt: string;
  readAt?: string;
  priority: Priority;
};

export type DTCalendarEvent = {
  id: string;
  title: string;
  description?: string;
  classGroups: string[];
  yearGroups: string[];
  startDateTime: string;
  endDateTime?: string;
  type: 'LESSON' | 'DEADLINE' | 'SUBMISSION_CUTOFF' | 'BOOKING_SLOT' | 'COMPETITION' | 'WORKSHOP_SESSION' | 'REMINDER';
  location?: string;
  relatedModuleId?: string;
  createdBy: string;
};

export type DTClassMessage = {
  id: string;
  senderEmail: string;
  senderName: string;
  classGroups: string[];
  subject: string;
  body: string;
  createdAt: string;
  attachments?: DTResource[];
  priority: Priority;
};

export type DTClassroomActivityLog = {
  id: string;
  actorEmail: string;
  actorRole: ClassroomRole;
  action: string;
  targetType: 'ANNOUNCEMENT' | 'MODULE' | 'TASK' | 'CALENDAR' | 'MESSAGE' | 'SUBMISSION' | 'BOOKING' | 'CLASS';
  targetId: string;
  createdAt: string;
  details?: string;
};

export type ClassroomFilter = Partial<{
  classGroupId: string;
  yearGroup: string;
  type: string;
  search: string;
}>;

export interface DTClassroomStorageAdapter {
  listClassGroups(): Promise<DTClassGroup[]>;
  createClassGroup(data: Omit<DTClassGroup, 'id'>): Promise<DTClassGroup>;
  listAnnouncements(filter?: ClassroomFilter): Promise<DTAnnouncement[]>;
  createAnnouncement(data: DTAnnouncement): Promise<DTAnnouncement>;
  updateAnnouncement(id: string, data: Partial<DTAnnouncement>): Promise<DTAnnouncement>;
  deleteAnnouncement(id: string): Promise<void>;
  listNotifications(email: string): Promise<DTNotification[]>;
  markNotificationRead(notificationId: string): Promise<void>;
  listModules(filter?: ClassroomFilter): Promise<DTModule[]>;
  listCalendarEvents(filter?: ClassroomFilter): Promise<DTCalendarEvent[]>;
  listMessages(filter?: ClassroomFilter): Promise<DTClassMessage[]>;
  listTasks(filter?: ClassroomFilter): Promise<DTClassTask[]>;
  createTask(data: Omit<DTClassTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<DTClassTask>;
  listTaskSubmissions(taskId?: string): Promise<DTClassTaskSubmission[]>;
  submitHomework(data: Omit<DTClassTaskSubmission, 'id' | 'submittedAt' | 'status'>): Promise<DTClassTaskSubmission>;
}

export type ClassroomEmailPayload = {
  to: string[];
  subject: string;
  body: string;
  announcementId: string;
};

const classGroupKey = 'dt-classroom-class-groups-v1';
const announcementKey = 'dt-classroom-announcements-v1';
const notificationKey = 'dt-classroom-notifications-v1';
const moduleKey = 'dt-classroom-modules-v1';
const calendarKey = 'dt-classroom-calendar-v1';
const messageKey = 'dt-classroom-messages-v1';
const activityKey = 'dt-classroom-activity-v1';
const taskKey = 'dt-classroom-tasks-v1';
const taskSubmissionKey = 'dt-classroom-task-submissions-v1';

const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
const nowIso = () => new Date().toISOString();

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T,>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const announcementTypeLabels: Record<DTAnnouncement['type'], string> = {
  GENERAL_NOTICE: 'General Notice',
  HOMEWORK_REMINDER: 'Homework Reminder',
  DEADLINE_WARNING: 'Deadline Warning',
  MATERIAL_REMINDER: 'Material Reminder',
  SUBMISSION_NOTICE: 'Laser Cut / 3D Print Notice',
  LESSON_PREPARATION: 'Lesson Preparation',
  COMPETITION_NOTICE: 'Competition Notice',
  URGENT_NOTICE: 'Urgent Notice',
};

export const priorityLabels: Record<Priority, string> = {
  LOW: 'Low',
  NORMAL: 'Normal',
  HIGH: 'High',
  URGENT: 'Urgent',
};

export const eventTypeLabels: Record<DTCalendarEvent['type'], string> = {
  LESSON: 'Lesson',
  DEADLINE: 'Deadline',
  SUBMISSION_CUTOFF: 'Submission Cut-off',
  BOOKING_SLOT: 'Booking Slot',
  COMPETITION: 'Competition',
  WORKSHOP_SESSION: 'Workshop Session',
  REMINDER: 'Reminder',
};

export const taskTypeLabels: Record<DTClassTask['type'], string> = {
  FORMATIVE: 'Formative',
  SUMMATIVE: 'Summative',
  PRACTICE: 'Practice',
  PORTFOLIO: 'Portfolio',
};

export const dtClassGroups: DTClassGroup[] = [
  { id: 'class-8-1', classNo: '8.1', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: ['demo@student.school.edu', 'student@school.edu'] },
  { id: 'class-8-2', classNo: '8.2', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-8-3', classNo: '8.3', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-8-4', classNo: '8.4', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-8-8', classNo: '8.8', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-9-1', classNo: '9.1', yearGroup: 'Y9', teacherName: 'Mr. Mok', studentEmails: ['9.1@student.school.edu'] },
  { id: 'class-9-6', classNo: '9.6', yearGroup: 'Y9', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-10-1', classNo: '10.1', yearGroup: 'Y10', teacherName: 'Mr. Mok', studentEmails: ['10.1@student.school.edu'] },
  { id: 'class-10-2', classNo: '10.2', yearGroup: 'Y10', teacherName: 'Mr. Mok', studentEmails: [] },
  { id: 'class-11-1', classNo: '11.1', yearGroup: 'Y11', teacherName: 'Mr. Mok', studentEmails: ['11.1@student.school.edu'] },
];

const makeResource = (title: string, url: string): DTResource => ({
  id: uid('resource'),
  title,
  type: 'LINK',
  url,
  uploadedBy: 'Mr. Mok',
  uploadedAt: nowIso(),
});

const seededModules = (): DTModule[] => [
  {
    id: 'module-fusion-door-stop',
    title: 'Fusion 360 Door Stop Modelling',
    description: 'CAD modelling, constraints, dimensions and export checks for a practical classroom object.',
    classGroups: ['class-8-1', 'class-8-2', 'class-8-3', 'class-8-4', 'class-8-8'],
    yearGroups: ['Y8'],
    teacherName: 'Mr. Mok',
    startDate: nowIso().slice(0, 10),
    status: 'PUBLISHED',
    resources: [makeResource('Fusion 360 guide', '#')],
    lessons: [
      {
        id: 'lesson-door-stop-1',
        title: 'Sketch, constrain and dimension',
        lessonNumber: '1',
        description: 'Create a stable profile and use dimensions to control size.',
        learningObjectives: ['Use CAD constraints', 'Set accurate dimensions', 'Explain design intent'],
        successCriteria: ['Profile is fully constrained', 'Dimensions match the brief', 'Model can be edited cleanly'],
        resources: [],
        taskInstructions: 'Create the basic door stop profile and screenshot your dimensioned sketch.',
      },
    ],
  },
  {
    id: 'module-laser-box',
    title: 'Laser Cut Box Design',
    description: 'Kerf, tolerance, tabs, slots and safe laser file preparation.',
    classGroups: ['class-10-1', 'class-10-2', 'class-11-1'],
    yearGroups: ['Y10', 'Y11'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [makeResource('Finger joint box maker', '#')],
    lessons: [
      {
        id: 'lesson-box-1',
        title: 'Kerf and press fit',
        lessonNumber: '1',
        description: 'Measure material and create a test-fit corner before cutting the full box.',
        learningObjectives: ['Explain kerf', 'Set press-fit tolerance', 'Prepare a clean SVG'],
        successCriteria: ['Slot is slightly smaller than tab', 'Test corner is labelled', 'SVG has one artboard'],
        resources: [],
      },
    ],
  },
  {
    id: 'module-joining-methods',
    title: 'Joining Methods',
    description: 'Select practical joints and adhesives based on material, strength, appearance and repairability.',
    classGroups: ['class-9-1', 'class-9-6', 'class-10-1', 'class-10-2'],
    yearGroups: ['Y9', 'Y10'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
  {
    id: 'module-orthographic',
    title: 'Orthographic Projection',
    description: 'Plan, front elevation, side view, section and dimensioning for technical communication.',
    classGroups: ['class-8-1', 'class-9-1', 'class-10-1'],
    yearGroups: ['Y8', 'Y9', 'Y10'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
  {
    id: 'module-material-selection',
    title: 'Material Selection',
    description: 'Compare material properties, processing methods, cost, finish and sustainability.',
    classGroups: ['class-8-1', 'class-9-1', 'class-10-1', 'class-11-1'],
    yearGroups: ['Y8', 'Y9', 'Y10', 'Y11'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
  {
    id: 'module-y9-dispenser',
    title: 'Y9 Dispenser Project',
    description: 'Product analysis, mechanism choice, modelling and testing against specification.',
    classGroups: ['class-9-1', 'class-9-6'],
    yearGroups: ['Y9'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
  {
    id: 'module-y8-redesign',
    title: 'Y8 Product Redesign',
    description: 'Identify user problems, generate ideas and test a simple improvement.',
    classGroups: ['class-8-1', 'class-8-2', 'class-8-3', 'class-8-4', 'class-8-8'],
    yearGroups: ['Y8'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
  {
    id: 'module-sustainable-design',
    title: 'Sustainable Design',
    description: 'Life cycle thinking, repairability, material choices and responsible manufacturing.',
    classGroups: ['class-10-1', 'class-10-2', 'class-11-1'],
    yearGroups: ['Y10', 'Y11'],
    teacherName: 'Mr. Mok',
    status: 'PUBLISHED',
    resources: [],
    lessons: [],
  },
];

const seededAnnouncements = (): DTAnnouncement[] => [
  {
    id: 'announcement-welcome',
    title: 'Welcome to the DT Classroom Hub',
    body: 'Check this page for Design Technology notices, module tasks, submission reminders and booking updates.',
    classGroups: ['class-8-1'],
    yearGroups: ['Y8'],
    createdBy: 'Mr. Mok',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    type: 'GENERAL_NOTICE',
    priority: 'NORMAL',
    notificationSent: true,
  },
  {
    id: 'announcement-file-rule',
    title: 'Laser files must use one page only',
    body: 'For laser cutting, submit one working file with one page or one artboard only. A second page must be submitted as a new request.',
    classGroups: ['class-10-1', 'class-10-2', 'class-11-1'],
    yearGroups: ['Y10', 'Y11'],
    createdBy: 'Mr. Mok',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    type: 'SUBMISSION_NOTICE',
    priority: 'HIGH',
    notificationSent: true,
  },
];

const seededCalendarEvents = (): DTCalendarEvent[] => [
  {
    id: 'event-laser-cutoff',
    title: 'Laser cutting submission cut-off',
    description: 'Submit final SVG / DXF files before the class deadline.',
    classGroups: ['class-10-1', 'class-10-2'],
    yearGroups: ['Y10'],
    startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    type: 'SUBMISSION_CUTOFF',
    location: 'DT Workshop',
    createdBy: 'Mr. Mok',
  },
  {
    id: 'event-y8-module',
    title: 'Y8 Product Redesign checkpoint',
    description: 'Bring sketches and one test model for teacher feedback.',
    classGroups: ['class-8-1'],
    yearGroups: ['Y8'],
    startDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    type: 'DEADLINE',
    createdBy: 'Mr. Mok',
  },
];

const seededMessages = (): DTClassMessage[] => [
  {
    id: 'message-starter',
    senderEmail: 'cmok@school.edu',
    senderName: 'Mr. Mok',
    classGroups: ['class-8-1'],
    subject: 'Bring your project sketchbook',
    body: 'Please bring your sketchbook and any prototype photos to the next lesson.',
    createdAt: nowIso(),
    priority: 'NORMAL',
  },
];

const seededTasks = (): DTClassTask[] => [
  {
    id: 'task-y8-door-stop-screenshot',
    title: 'Door stop CAD screenshot',
    classGroups: ['class-8-1'],
    yearGroups: ['Y8'],
    moduleId: 'module-fusion-door-stop',
    dueDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
    category: 'CAD evidence',
    type: 'PRACTICE',
    details: 'Upload one screenshot showing your fully constrained door stop profile with clear dimensions.',
    dropboxEnabled: true,
    createdBy: 'Mr. Mok',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'PUBLISHED',
  },
  {
    id: 'task-y10-box-test-corner',
    title: 'Laser box test corner',
    classGroups: ['class-10-1', 'class-10-2'],
    yearGroups: ['Y10'],
    moduleId: 'module-laser-box',
    dueDateTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    category: 'Prototype evidence',
    type: 'FORMATIVE',
    details: 'Submit a photo or file note showing your kerf value, tab size and slot adjustment before the full cut.',
    dropboxEnabled: true,
    createdBy: 'Mr. Mok',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    status: 'PUBLISHED',
  },
];

const notificationFromAnnouncement = (announcement: DTAnnouncement, classGroup: DTClassGroup, email: string): DTNotification => ({
  id: uid('notification'),
  recipientEmail: email,
  classGroupId: classGroup.id,
  title: announcement.title,
  message: announcement.body,
  sourceType: 'ANNOUNCEMENT',
  sourceId: announcement.id,
  createdAt: nowIso(),
  priority: announcement.priority,
});

const notificationFromTask = (task: DTClassTask, classGroup: DTClassGroup, email: string): DTNotification => ({
  id: uid('notification'),
  recipientEmail: email,
  classGroupId: classGroup.id,
  title: `Homework: ${task.title}`,
  message: `${task.details}\nDue: ${new Date(task.dueDateTime).toLocaleString()}`,
  sourceType: 'TASK',
  sourceId: task.id,
  createdAt: nowIso(),
  priority: task.type === 'SUMMATIVE' || task.type === 'PORTFOLIO' ? 'HIGH' : 'NORMAL',
});

export const seedClassroomData = () => {
  if (typeof window === 'undefined') return;
  if (!window.localStorage.getItem(classGroupKey)) writeJson(classGroupKey, dtClassGroups);
  if (!window.localStorage.getItem(moduleKey)) writeJson(moduleKey, seededModules());
  if (!window.localStorage.getItem(calendarKey)) writeJson(calendarKey, seededCalendarEvents());
  if (!window.localStorage.getItem(messageKey)) writeJson(messageKey, seededMessages());
  if (!window.localStorage.getItem(taskKey)) writeJson(taskKey, seededTasks());
  if (!window.localStorage.getItem(taskSubmissionKey)) writeJson(taskSubmissionKey, []);
  if (!window.localStorage.getItem(announcementKey)) writeJson(announcementKey, seededAnnouncements());
  if (!window.localStorage.getItem(notificationKey)) {
    const announcements = readJson<DTAnnouncement[]>(announcementKey, []);
    const groups = readJson<DTClassGroup[]>(classGroupKey, dtClassGroups);
    const notifications = announcements.flatMap((announcement) =>
      announcement.classGroups.flatMap((classGroupId) => {
        const group = groups.find((item) => item.id === classGroupId);
        return group ? group.studentEmails.map((email) => notificationFromAnnouncement(announcement, group, email)) : [];
      }),
    );
    writeJson(notificationKey, notifications);
  }
  if (!window.localStorage.getItem(activityKey)) writeJson(activityKey, []);
};

export const listClassGroups = () => {
  seedClassroomData();
  return readJson<DTClassGroup[]>(classGroupKey, dtClassGroups);
};

export const getClassGroupsForUser = (userId: string, isAdmin: boolean) => {
  const groups = listClassGroups();
  if (isAdmin) return groups;
  const key = userId.trim().toLowerCase();
  return groups.filter((group) => group.studentEmails.some((email) => email.toLowerCase() === key));
};

export const listClassroomActivity = () => {
  seedClassroomData();
  return readJson<DTClassroomActivityLog[]>(activityKey, []);
};

export const addClassroomActivity = (entry: Omit<DTClassroomActivityLog, 'id' | 'createdAt'>) => {
  const next: DTClassroomActivityLog = { ...entry, id: uid('activity'), createdAt: nowIso() };
  writeJson(activityKey, [next, ...listClassroomActivity()]);
  return next;
};

const applyFilter = <T extends { classGroups: string[]; yearGroups?: string[]; title?: string; subject?: string; type?: string }>(
  items: T[],
  filter?: ClassroomFilter,
) => {
  if (!filter) return items;
  const search = filter.search?.trim().toLowerCase();
  return items.filter((item) => {
    if (filter.classGroupId && !item.classGroups.includes(filter.classGroupId)) return false;
    if (filter.yearGroup && item.yearGroups && !item.yearGroups.includes(filter.yearGroup)) return false;
    if (filter.type && item.type !== filter.type) return false;
    const text = `${item.title ?? ''} ${item.subject ?? ''}`.toLowerCase();
    if (search && !text.includes(search)) return false;
    return true;
  });
};

export class LocalDemoClassroomAdapter implements DTClassroomStorageAdapter {
  async listClassGroups() {
    return listClassGroups();
  }

  async createClassGroup(data: Omit<DTClassGroup, 'id'>) {
    seedClassroomData();
    const classGroup: DTClassGroup = {
      ...data,
      id: uid(`class-${data.classNo.replace(/\W+/g, '-').toLowerCase()}`),
      studentEmails: data.studentEmails.map((email) => email.trim().toLowerCase()).filter(Boolean),
    };
    writeJson(classGroupKey, [...readJson<DTClassGroup[]>(classGroupKey, dtClassGroups), classGroup]);
    addClassroomActivity({
      actorEmail: data.teacherName,
      actorRole: 'teacher',
      action: 'Class created',
      targetType: 'CLASS',
      targetId: classGroup.id,
      details: `${classGroup.classNo} · ${classGroup.yearGroup}`,
    });
    return classGroup;
  }

  async listAnnouncements(filter?: ClassroomFilter) {
    seedClassroomData();
    return applyFilter(readJson<DTAnnouncement[]>(announcementKey, []), filter);
  }

  async createAnnouncement(data: DTAnnouncement) {
    seedClassroomData();
    writeJson(announcementKey, [data, ...readJson<DTAnnouncement[]>(announcementKey, [])]);
    const groups = listClassGroups().filter((group) => data.classGroups.includes(group.id));
    const currentNotifications = readJson<DTNotification[]>(notificationKey, []);
    const nextNotifications = groups.flatMap((group) => group.studentEmails.map((email) => notificationFromAnnouncement(data, group, email)));
    writeJson(notificationKey, [...nextNotifications, ...currentNotifications]);
    addClassroomActivity({
      actorEmail: data.createdBy,
      actorRole: 'teacher',
      action: 'Announcement created',
      targetType: 'ANNOUNCEMENT',
      targetId: data.id,
      details: data.title,
    });
    return data;
  }

  async updateAnnouncement(id: string, data: Partial<DTAnnouncement>) {
    seedClassroomData();
    let updated: DTAnnouncement | undefined;
    const next = readJson<DTAnnouncement[]>(announcementKey, []).map((announcement) => {
      if (announcement.id !== id) return announcement;
      updated = { ...announcement, ...data, updatedAt: nowIso() };
      return updated;
    });
    writeJson(announcementKey, next);
    if (!updated) throw new Error('Announcement not found');
    return updated;
  }

  async deleteAnnouncement(id: string) {
    seedClassroomData();
    writeJson(announcementKey, readJson<DTAnnouncement[]>(announcementKey, []).filter((announcement) => announcement.id !== id));
  }

  async listNotifications(email: string) {
    seedClassroomData();
    return readJson<DTNotification[]>(notificationKey, []).filter((notification) => notification.recipientEmail.toLowerCase() === email.toLowerCase());
  }

  async markNotificationRead(notificationId: string) {
    seedClassroomData();
    writeJson(notificationKey, readJson<DTNotification[]>(notificationKey, []).map((notification) =>
      notification.id === notificationId ? { ...notification, readAt: notification.readAt ?? nowIso() } : notification,
    ));
  }

  async listModules(filter?: ClassroomFilter) {
    seedClassroomData();
    return applyFilter(readJson<DTModule[]>(moduleKey, []), filter);
  }

  async listCalendarEvents(filter?: ClassroomFilter) {
    seedClassroomData();
    return applyFilter(readJson<DTCalendarEvent[]>(calendarKey, []), filter);
  }

  async listMessages(filter?: ClassroomFilter) {
    seedClassroomData();
    return applyFilter(readJson<DTClassMessage[]>(messageKey, []), filter);
  }

  async listTasks(filter?: ClassroomFilter) {
    seedClassroomData();
    return applyFilter(readJson<DTClassTask[]>(taskKey, []), filter);
  }

  async createTask(data: Omit<DTClassTask, 'id' | 'createdAt' | 'updatedAt'>) {
    seedClassroomData();
    const task: DTClassTask = {
      ...data,
      id: uid('task'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    writeJson(taskKey, [task, ...readJson<DTClassTask[]>(taskKey, [])]);
    const event: DTCalendarEvent = {
      id: uid('event-task'),
      title: task.title,
      description: task.details,
      classGroups: task.classGroups,
      yearGroups: task.yearGroups,
      startDateTime: task.dueDateTime,
      type: 'DEADLINE',
      relatedModuleId: task.moduleId,
      createdBy: task.createdBy,
    };
    writeJson(calendarKey, [event, ...readJson<DTCalendarEvent[]>(calendarKey, [])]);
    const groups = listClassGroups().filter((group) => task.classGroups.includes(group.id));
    const taskNotifications = groups.flatMap((group) => group.studentEmails.map((email) => notificationFromTask(task, group, email)));
    writeJson(notificationKey, [...taskNotifications, ...readJson<DTNotification[]>(notificationKey, [])]);
    addClassroomActivity({
      actorEmail: task.createdBy,
      actorRole: 'teacher',
      action: 'Homework task created',
      targetType: 'TASK',
      targetId: task.id,
      details: `${task.title} · ${taskTypeLabels[task.type]}`,
    });
    return task;
  }

  async listTaskSubmissions(taskId?: string) {
    seedClassroomData();
    const submissions = readJson<DTClassTaskSubmission[]>(taskSubmissionKey, []);
    return taskId ? submissions.filter((submission) => submission.taskId === taskId) : submissions;
  }

  async submitHomework(data: Omit<DTClassTaskSubmission, 'id' | 'submittedAt' | 'status'>) {
    seedClassroomData();
    const submission: DTClassTaskSubmission = {
      ...data,
      id: uid('homework'),
      submittedAt: nowIso(),
      status: 'SUBMITTED',
    };
    writeJson(taskSubmissionKey, [submission, ...readJson<DTClassTaskSubmission[]>(taskSubmissionKey, [])]);
    addClassroomActivity({
      actorEmail: data.studentEmail,
      actorRole: 'student',
      action: 'Homework submitted',
      targetType: 'TASK',
      targetId: data.taskId,
      details: data.fileName || data.note || 'Submitted from Classroom Hub',
    });
    return submission;
  }
}

export class GoogleSheetsClassroomAdapter extends LocalDemoClassroomAdapter {}
export class MicrosoftExcelClassroomAdapter extends LocalDemoClassroomAdapter {}
export class SupabaseClassroomAdapter extends LocalDemoClassroomAdapter {}

export const classroomAdapter = new LocalDemoClassroomAdapter();

export async function sendClassroomAnnouncementEmail(
  payload: ClassroomEmailPayload,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const endpoint = import.meta.env.VITE_CLASSROOM_EMAIL_ENDPOINT as string | undefined;
  if (!endpoint) return { success: true, messageId: `demo-classroom-email-${uid('mail')}` };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { success: false, error: `Email endpoint returned ${response.status}` };
    const body = await response.json().catch(() => ({}));
    return { success: true, messageId: body.messageId ?? `classroom-email-${Date.now()}` };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Email request failed' };
  }
}

export const getStudentSubmissions = (userId: string): DTSubmissionRequest[] => {
  const key = userId.trim().toLowerCase();
  return listSubmissions().filter((submission) =>
    submission.studentEmail.toLowerCase() === key || submission.studentName.toLowerCase() === key,
  );
};

export const getStudentBookings = (userId: string): DTBookingRequest[] => {
  const key = userId.trim().toLowerCase();
  return listBookings().filter((booking) =>
    booking.studentEmail.toLowerCase() === key || booking.studentName.toLowerCase() === key,
  );
};
