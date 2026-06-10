export type DTTeacher = {
  id: string;
  name: string;
  email: string;
  role: string;
  available: boolean;
};

export type WorkshopUserRole = 'student' | 'teacher' | 'admin' | 'technician';

export type BookingTimeSlot = {
  id: string;
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  label: string;
  capacity: number;
  bookedCount: number;
  available: boolean;
};

export type DTBookingStatus =
  | 'SUBMITTED'
  | 'CONFIRMED'
  | 'NEED_CHANGE'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

export type DTBookingRequest = {
  id: string;
  bookingNumber: string;
  submittedAt: string;
  updatedAt: string;
  studentEmail: string;
  studentName: string;
  designClassNo: string;
  yearGroup: string;
  teacherId: string;
  teacherName: string;
  purpose: string;
  preferredDate: string;
  preferredTimeSlot: string;
  alternativeTimeSlot?: string;
  notes?: string;
  status: DTBookingStatus;
  adminRemarks?: string;
  studentVisibleRemarks?: string;
  internalAdminNote?: string;
};

export type DTSubmissionStatus =
  | 'SUBMITTED'
  | 'NEEDS_FIX'
  | 'APPROVED'
  | 'IN_QUEUE'
  | 'IN_PRODUCTION'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export type DTSubmissionSource = 'DT_PROJECT' | 'SPECIAL_REQUEST';
export type DTPrototypeType = 'LO_FI_PROTOTYPE' | 'HI_FI_PROTOTYPE' | 'FINAL_PRODUCT' | 'NA';
export type DTMachineType = 'LASER_CUT' | 'THREE_D_PRINT';

export type SubmissionIssueType =
  | 'WRONG_FILE_FORMAT'
  | 'MULTIPLE_ARTBOARDS'
  | 'DIMENSION_PROBLEM'
  | 'MATERIAL_NOT_ALLOWED'
  | 'MISSING_PREVIEW'
  | 'DESIGN_TOO_LARGE'
  | 'FILE_NOT_OPENING'
  | 'OTHER';

export type DTSubmissionRequest = {
  id: string;
  caseNumber: string;
  source: DTSubmissionSource;
  submittedAt: string;
  updatedAt: string;
  studentEmail: string;
  studentName: string;
  designClassNo: string;
  yearGroup: string;
  teacherName: string;
  prototypeType: DTPrototypeType;
  machine: DTMachineType;
  material: string;
  units: 'mm';
  width: number;
  height: number;
  depth?: number;
  quantity: number;
  workingFileName: string;
  workingFileUrl?: string;
  workingFileDataUrl?: string;
  workingFileType: string;
  previewImageName?: string;
  previewImageUrl?: string;
  previewImageDataUrl?: string;
  additionalNotes?: string;
  status: DTSubmissionStatus;
  issueType?: SubmissionIssueType;
  adminRemarks?: string;
  studentVisibleRemarks?: string;
  completedAt?: string;
  completedBy?: string;
};

export type SubmissionDeadlineRule = {
  id: string;
  yearGroup: string;
  designClassNo?: string;
  machine?: DTMachineType | 'ALL';
  source?: DTSubmissionSource | 'ALL';
  deadline: string;
  enabled: boolean;
  blockAfterDeadline: boolean;
  studentMessage: string;
};

export type SubmissionAuditLog = {
  id: string;
  requestType?: 'SUBMISSION' | 'BOOKING';
  requestId?: string;
  submissionId?: string;
  bookingId?: string;
  action: string;
  oldStatus?: string;
  newStatus?: string;
  changedBy: string;
  changedAt: string;
  remarks?: string;
  studentVisibleRemarks?: string;
  internalAdminNote?: string;
  emailSent?: boolean;
  emailError?: string;
};

export type DemoNotificationLog = {
  id: string;
  requestType: 'SUBMISSION' | 'BOOKING';
  requestId: string;
  requestNumber: string;
  submissionId?: string;
  bookingId?: string;
  caseNumber?: string;
  bookingNumber?: string;
  type: 'STATUS_UPDATE_EMAIL' | 'COMPLETED_EMAIL' | 'NEEDS_FIX_EMAIL';
  recipient: string;
  subject: string;
  body: string;
  oldStatus?: string;
  newStatus?: string;
  success: boolean;
  error?: string;
  createdAt: string;
};

export type SubmissionReviewUpdate = {
  issueType?: SubmissionIssueType;
  adminRemarks?: string;
  studentVisibleRemarks?: string;
  changedBy: string;
};

export type SubmissionFilter = Partial<{
  source: DTSubmissionSource;
  yearGroup: string;
  machine: DTMachineType;
  material: string;
  status: DTSubmissionStatus;
  teacherName: string;
  designClassNo: string;
  studentEmail: string;
  search: string;
}>;

export type QueueHealth = 'CALM' | 'BUSY' | 'OVERLOADED';

export type EmailNotificationPayload = {
  to: string;
  subject: string;
  body: string;
  requestType: 'SUBMISSION' | 'BOOKING';
  requestId: string;
  oldStatus: string;
  newStatus: string;
};

export interface DTSubmissionStorageAdapter {
  createSubmission(data: DTSubmissionRequest): Promise<DTSubmissionRequest>;
  updateSubmissionStatus(
    id: string,
    status: DTSubmissionRequest['status'],
    review: SubmissionReviewUpdate
  ): Promise<DTSubmissionRequest>;
  listSubmissions(filter?: SubmissionFilter): Promise<DTSubmissionRequest[]>;
  getSubmissionById(id: string): Promise<DTSubmissionRequest | null>;
}

export const dtTeachers: DTTeacher[] = [
  {
    id: 'mr-mok',
    name: 'Mr. Mok',
    email: 'cmok@vsa.edu.hk',
    role: 'Design Technology Teacher / Technician',
    available: true,
  },
];

export const bookingPurposes = [
  'Design project consultation',
  'Portfolio support',
  'Model support',
  'Competition support',
  'Prototype planning',
  'CAD / laser cutting support',
  '3D printing support',
  'Other DT support',
];

export const timeSlotLabels = ['Lunch time', 'After school', 'Period 7 / free period', 'By teacher arrangement'];
export const yearGroups = [
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6',
  'Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12',
  'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12',
  'MYP', 'DP', 'IGCSE', 'AS Level', 'A2 Level',
];
export const prototypeTypeLabels: Record<DTPrototypeType, string> = {
  LO_FI_PROTOTYPE: 'Lo-fi Prototype',
  HI_FI_PROTOTYPE: 'Hi-fi Prototype',
  FINAL_PRODUCT: 'Final Product',
  NA: 'N/A',
};

export const machineLabels: Record<DTMachineType, string> = {
  LASER_CUT: 'Laser Cut',
  THREE_D_PRINT: '3D Print',
};

export const submissionStatusLabels: Record<DTSubmissionStatus, string> = {
  SUBMITTED: 'Submitted',
  NEEDS_FIX: 'Needs Fix',
  APPROVED: 'Approved',
  IN_QUEUE: 'In Queue',
  IN_PRODUCTION: 'In Production',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

export const bookingStatusLabels: Record<DTBookingStatus, string> = {
  SUBMITTED: 'Submitted',
  CONFIRMED: 'Confirmed',
  NEED_CHANGE: 'Need Change',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  REJECTED: 'Rejected',
};

export const issueLabels: Record<SubmissionIssueType, string> = {
  WRONG_FILE_FORMAT: 'Wrong file format',
  MULTIPLE_ARTBOARDS: 'Multiple artboards',
  DIMENSION_PROBLEM: 'Dimension problem',
  MATERIAL_NOT_ALLOWED: 'Material not allowed',
  MISSING_PREVIEW: 'Missing preview',
  DESIGN_TOO_LARGE: 'Design too large',
  FILE_NOT_OPENING: 'File not opening',
  OTHER: 'Other',
};

const submissionEmailStatuses: DTSubmissionStatus[] = ['NEEDS_FIX', 'APPROVED', 'IN_QUEUE', 'IN_PRODUCTION', 'COMPLETED', 'REJECTED', 'CANCELLED'];
const bookingEmailStatuses: DTBookingStatus[] = ['CONFIRMED', 'NEED_CHANGE', 'COMPLETED', 'CANCELLED', 'REJECTED'];

export const laserMaterials = ['3mm Wood Sheets', '3mm MDF', '3mm Acrylic', 'Cardboard'];
export const printMaterials = ['PLA', 'PETG'];
export const workingFileExtensions = ['afdesign', 'svg', 'dxf', 'stl'];
export const previewFileExtensions = ['png', 'jpg', 'jpeg'];

const bookingKey = 'dt-workshop-bookings-v1';
const submissionKey = 'dt-workshop-submissions-v1';
const deadlineKey = 'dt-workshop-deadlines-v1';
const auditKey = 'dt-workshop-audit-v1';
const notificationKey = 'dt-workshop-notifications-v1';

const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

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

export const makeBookingNumber = () => `BK-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
export const makeCaseNumber = () => `DT-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export const getFileExtension = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? '';
export const isSchoolEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email.trim());
export const isStudentOwner = (recordEmail: string, recordName: string, userId: string) => {
  const key = userId.trim().toLowerCase();
  return Boolean(key && (recordEmail.toLowerCase() === key || recordName.toLowerCase() === key));
};

export const listBookings = () => readJson<DTBookingRequest[]>(bookingKey, []);
export const saveBookings = (bookings: DTBookingRequest[]) => writeJson(bookingKey, bookings);
export const createBooking = (booking: Omit<DTBookingRequest, 'id' | 'bookingNumber' | 'submittedAt' | 'updatedAt' | 'status'>) => {
  const now = new Date().toISOString();
  const next: DTBookingRequest = {
    ...booking,
    id: uid('booking'),
    bookingNumber: makeBookingNumber(),
    submittedAt: now,
    updatedAt: now,
    status: 'SUBMITTED',
  };
  saveBookings([next, ...listBookings()]);
  return next;
};

export const updateBooking = (id: string, update: Partial<DTBookingRequest>) => {
  let updated: DTBookingRequest | undefined;
  const bookings = listBookings().map((booking) => {
    if (booking.id !== id) return booking;
    updated = { ...booking, ...update, updatedAt: new Date().toISOString() };
    return updated;
  });
  saveBookings(bookings);
  return updated;
};

export const listSubmissions = () => readJson<DTSubmissionRequest[]>(submissionKey, []);
export const saveSubmissions = (submissions: DTSubmissionRequest[]) => writeJson(submissionKey, submissions);
export const listDeadlineRules = () => readJson<SubmissionDeadlineRule[]>(deadlineKey, []);
export const saveDeadlineRules = (rules: SubmissionDeadlineRule[]) => writeJson(deadlineKey, rules);
export const listAuditLogs = () => readJson<SubmissionAuditLog[]>(auditKey, []);
export const listNotifications = () => readJson<DemoNotificationLog[]>(notificationKey, []);

const addAuditLog = (log: Omit<SubmissionAuditLog, 'id' | 'changedAt'>) => {
  const entry: SubmissionAuditLog = { ...log, id: uid('audit'), changedAt: new Date().toISOString() };
  writeJson(auditKey, [entry, ...listAuditLogs()]);
  return entry;
};

const addNotificationLog = (
  payload: EmailNotificationPayload,
  result: { success: boolean; messageId?: string; error?: string },
  requestNumber: string,
) => {
  const entry: DemoNotificationLog = {
    id: uid('notice'),
    requestType: payload.requestType,
    requestId: payload.requestId,
    requestNumber,
    submissionId: payload.requestType === 'SUBMISSION' ? payload.requestId : undefined,
    bookingId: payload.requestType === 'BOOKING' ? payload.requestId : undefined,
    caseNumber: payload.requestType === 'SUBMISSION' ? requestNumber : undefined,
    bookingNumber: payload.requestType === 'BOOKING' ? requestNumber : undefined,
    type: 'STATUS_UPDATE_EMAIL',
    recipient: payload.to,
    subject: payload.subject,
    body: payload.body,
    oldStatus: payload.oldStatus,
    newStatus: payload.newStatus,
    success: result.success,
    error: result.error,
    createdAt: new Date().toISOString(),
  };
  writeJson(notificationKey, [entry, ...listNotifications()]);
  return entry;
};

// TODO: For production, point VITE_STATUS_EMAIL_ENDPOINT at a secure backend
// route such as Apps Script, Power Automate, Supabase Edge Function, Node API,
// or Firebase Function. Never expose email credentials or private API keys in
// frontend code. Without an endpoint, local demo mode records a simulated email.
export async function sendStatusUpdateEmail(
  payload: EmailNotificationPayload,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const endpoint = import.meta.env.VITE_STATUS_EMAIL_ENDPOINT as string | undefined;
  if (!endpoint) {
    return { success: true, messageId: `demo-email-${uid('mail')}` };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return { success: false, error: `Email endpoint returned ${response.status}` };
    }
    const body = await response.json().catch(() => ({}));
    return { success: true, messageId: body.messageId ?? `email-${Date.now()}` };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Email request failed' };
  }
}

export function getSubmissionNextStepMessage(status: DTSubmissionStatus): string {
  switch (status) {
    case 'NEEDS_FIX':
      return 'Please check the remarks, revise your file if needed, and submit again.';
    case 'APPROVED':
      return 'Your file has been approved and will move into the production queue.';
    case 'IN_QUEUE':
      return 'Your job is now waiting in the production queue.';
    case 'IN_PRODUCTION':
      return 'Your job is currently being produced.';
    case 'COMPLETED':
      return "Your job has been completed. Please collect it according to your teacher or technician's instruction.";
    case 'REJECTED':
      return 'Your request has been rejected. Please check the remarks for the reason.';
    case 'CANCELLED':
      return 'Your request has been cancelled.';
    default:
      return 'Please check your submission dashboard for the latest update.';
  }
}

export function getBookingNextStepMessage(status: DTBookingStatus): string {
  switch (status) {
    case 'CONFIRMED':
      return 'Your booking has been confirmed. Please attend at the confirmed time.';
    case 'NEED_CHANGE':
      return 'Your booking needs changes. Please check the remarks and choose another time if required.';
    case 'COMPLETED':
      return 'Your consultation has been marked as completed.';
    case 'CANCELLED':
      return 'Your booking has been cancelled.';
    case 'REJECTED':
      return 'Your booking request has been rejected. Please check the remarks for details.';
    default:
      return 'Please check your booking dashboard for the latest update.';
  }
}

export const buildSubmissionStatusEmail = (
  submission: DTSubmissionRequest,
  oldStatus: DTSubmissionStatus,
  newStatus: DTSubmissionStatus,
): EmailNotificationPayload => ({
  to: submission.studentEmail,
  subject: `DT Submission Status Updated: ${submission.caseNumber}`,
  requestType: 'SUBMISSION',
  requestId: submission.id,
  oldStatus,
  newStatus,
  body: `Hi ${submission.studentName},

Your DT submission status has been updated.

Case Number: ${submission.caseNumber}
New Status: ${submissionStatusLabels[newStatus]}

Machine: ${machineLabels[submission.machine]}
Material: ${submission.material}
Submitted Date: ${new Date(submission.submittedAt).toLocaleString()}

Remarks:
${submission.studentVisibleRemarks ?? ''}

Next Step:
${getSubmissionNextStepMessage(newStatus)}

Thank you.
DT Department`,
});

export const buildBookingStatusEmail = (
  booking: DTBookingRequest,
  oldStatus: DTBookingStatus,
  newStatus: DTBookingStatus,
): EmailNotificationPayload => ({
  to: booking.studentEmail,
  subject: `Design Teacher Booking Status Updated: ${booking.bookingNumber}`,
  requestType: 'BOOKING',
  requestId: booking.id,
  oldStatus,
  newStatus,
  body: `Hi ${booking.studentName},

Your Design Teacher Booking status has been updated.

Booking Number: ${booking.bookingNumber}
Teacher: ${booking.teacherName}
Purpose: ${booking.purpose}
Preferred Date: ${booking.preferredDate}
Preferred Time Slot: ${booking.preferredTimeSlot}

New Status: ${bookingStatusLabels[newStatus]}

Remarks:
${booking.studentVisibleRemarks ?? booking.adminRemarks ?? ''}

Next Step:
${getBookingNextStepMessage(newStatus)}

Thank you.
DT Department`,
});

export class LocalDemoSubmissionAdapter implements DTSubmissionStorageAdapter {
  async createSubmission(data: DTSubmissionRequest) {
    saveSubmissions([data, ...listSubmissions()]);
    addAuditLog({
      submissionId: data.id,
      action: 'Created',
      newStatus: data.status,
      changedBy: data.studentName,
      remarks: 'Student created local demo submission.',
    });
    return data;
  }

  async updateSubmissionStatus(id: string, status: DTSubmissionStatus, review: SubmissionReviewUpdate) {
    const now = new Date().toISOString();
    let updated: DTSubmissionRequest | undefined;
    const submissions = listSubmissions().map((submission) => {
      if (submission.id !== id) return submission;
      updated = {
        ...submission,
        status,
        issueType: review.issueType,
        adminRemarks: review.adminRemarks,
        studentVisibleRemarks: review.studentVisibleRemarks,
        updatedAt: now,
        completedAt: status === 'COMPLETED' ? now : submission.completedAt,
        completedBy: status === 'COMPLETED' ? review.changedBy : submission.completedBy,
      };
      return updated;
    });
    saveSubmissions(submissions);
    if (!updated) throw new Error('Submission not found');
    return updated;
  }

  async listSubmissions(filter?: SubmissionFilter) {
    const all = listSubmissions();
    if (!filter) return all;
    const search = filter.search?.trim().toLowerCase();
    return all.filter((item) => {
      if (filter.source && item.source !== filter.source) return false;
      if (filter.yearGroup && item.yearGroup !== filter.yearGroup) return false;
      if (filter.machine && item.machine !== filter.machine) return false;
      if (filter.material && item.material !== filter.material) return false;
      if (filter.status && item.status !== filter.status) return false;
      if (filter.teacherName && item.teacherName !== filter.teacherName) return false;
      if (filter.designClassNo && item.designClassNo !== filter.designClassNo) return false;
      if (filter.studentEmail && item.studentEmail !== filter.studentEmail) return false;
      if (search && !`${item.caseNumber} ${item.studentName} ${item.studentEmail} ${item.designClassNo}`.toLowerCase().includes(search)) return false;
      return true;
    });
  }

  async getSubmissionById(id: string) {
    return listSubmissions().find((submission) => submission.id === id) ?? null;
  }
}

export class GoogleSheetsSubmissionAdapter extends LocalDemoSubmissionAdapter {}
export class MicrosoftExcelSubmissionAdapter extends LocalDemoSubmissionAdapter {}
export class SupabaseSubmissionAdapter extends LocalDemoSubmissionAdapter {}

export const submissionAdapter = new LocalDemoSubmissionAdapter();

export const createSubmission = (input: Omit<DTSubmissionRequest, 'id' | 'caseNumber' | 'submittedAt' | 'updatedAt' | 'status'>) => {
  const now = new Date().toISOString();
  const submission: DTSubmissionRequest = {
    ...input,
    id: uid('submission'),
    caseNumber: makeCaseNumber(),
    submittedAt: now,
    updatedAt: now,
    status: 'SUBMITTED',
  };
  return submissionAdapter.createSubmission(submission);
};

export const getBookingById = (bookingId: string) => listBookings().find((booking) => booking.id === bookingId) ?? null;
export const getSubmissionById = (submissionId: string) => listSubmissions().find((submission) => submission.id === submissionId) ?? null;

export async function updateSubmissionStatusWithEmail({
  submissionId,
  newStatus,
  issueType,
  studentVisibleRemarks,
  internalAdminNote,
  changedBy,
}: {
  submissionId: string;
  newStatus: DTSubmissionRequest['status'];
  issueType?: DTSubmissionRequest['issueType'];
  studentVisibleRemarks?: string;
  internalAdminNote?: string;
  changedBy: string;
}) {
  const submission = getSubmissionById(submissionId);
  if (!submission) throw new Error('Submission not found');
  const oldStatus = submission.status;
  let emailResult: { success: boolean; messageId?: string; error?: string } | undefined;

  const updatedSubmission = await submissionAdapter.updateSubmissionStatus(submissionId, newStatus, {
    issueType,
    studentVisibleRemarks,
    adminRemarks: internalAdminNote,
    changedBy,
  });

  if (oldStatus !== newStatus) {
    if (submissionEmailStatuses.includes(newStatus)) {
      const emailPayload = buildSubmissionStatusEmail(updatedSubmission, oldStatus, newStatus);
      emailResult = await sendStatusUpdateEmail(emailPayload);
      addNotificationLog(emailPayload, emailResult, updatedSubmission.caseNumber);
    }
    addAuditLog({
      requestType: 'SUBMISSION',
      requestId: submissionId,
      submissionId,
      action: emailResult ? (emailResult.success ? 'STATUS_CHANGED_AND_EMAIL_SENT' : 'EMAIL_FAILED') : 'STATUS_CHANGED',
      oldStatus,
      newStatus,
      changedBy,
      remarks: studentVisibleRemarks,
      studentVisibleRemarks,
      internalAdminNote,
      emailSent: emailResult?.success ?? false,
      emailError: emailResult?.error,
    });
  }

  return { updatedSubmission, emailResult };
}

export async function updateBookingStatusWithEmail({
  bookingId,
  newStatus,
  studentVisibleRemarks,
  internalAdminNote,
  changedBy,
}: {
  bookingId: string;
  newStatus: DTBookingRequest['status'];
  studentVisibleRemarks?: string;
  internalAdminNote?: string;
  changedBy: string;
}) {
  const booking = getBookingById(bookingId);
  if (!booking) throw new Error('Booking not found');
  const oldStatus = booking.status;
  let emailResult: { success: boolean; messageId?: string; error?: string } | undefined;
  const updatedBooking = updateBooking(bookingId, {
    status: newStatus,
    studentVisibleRemarks,
    adminRemarks: studentVisibleRemarks,
    internalAdminNote,
  });
  if (!updatedBooking) throw new Error('Booking not found');

  if (oldStatus !== newStatus) {
    if (bookingEmailStatuses.includes(newStatus)) {
      const emailPayload = buildBookingStatusEmail(updatedBooking, oldStatus, newStatus);
      emailResult = await sendStatusUpdateEmail(emailPayload);
      addNotificationLog(emailPayload, emailResult, updatedBooking.bookingNumber);
    }
    addAuditLog({
      requestType: 'BOOKING',
      requestId: bookingId,
      bookingId,
      action: emailResult ? (emailResult.success ? 'STATUS_CHANGED_AND_EMAIL_SENT' : 'EMAIL_FAILED') : 'STATUS_CHANGED',
      oldStatus,
      newStatus,
      changedBy,
      remarks: studentVisibleRemarks,
      studentVisibleRemarks,
      internalAdminNote,
      emailSent: emailResult?.success ?? false,
      emailError: emailResult?.error,
    });
  }

  return { updatedBooking, emailResult };
}

export const matchingDeadlineRule = (submission: Pick<DTSubmissionRequest, 'yearGroup' | 'designClassNo' | 'machine' | 'source'>) => {
  const now = Date.now();
  return listDeadlineRules().find((rule) => {
    if (!rule.enabled) return false;
    if (rule.yearGroup !== submission.yearGroup) return false;
    if (rule.designClassNo && rule.designClassNo !== submission.designClassNo) return false;
    if (rule.machine && rule.machine !== 'ALL' && rule.machine !== submission.machine) return false;
    if (rule.source && rule.source !== 'ALL' && rule.source !== submission.source) return false;
    return new Date(rule.deadline).getTime() < now;
  });
};

export const createDeadlineRule = (rule: Omit<SubmissionDeadlineRule, 'id'>) => {
  const next = { ...rule, id: uid('deadline') };
  saveDeadlineRules([next, ...listDeadlineRules()]);
  return next;
};

export const getQueueHealth = (submissions: DTSubmissionRequest[]): QueueHealth => {
  const active = submissions.filter((item) => !['COMPLETED', 'REJECTED', 'CANCELLED'].includes(item.status)).length;
  if (active >= 18) return 'OVERLOADED';
  if (active >= 10) return 'BUSY';
  return 'CALM';
};
