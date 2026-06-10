import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Box,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronDown,
  Clock,
  ClipboardList,
  Eye,
  FileUp,
  Filter,
  HelpCircle,
  History,
  Inbox,
  Megaphone,
  MessageCircle,
  Paperclip,
  PenTool,
  Plus,
  Search,
  Send,
  Sparkles,
  Target,
  UploadCloud,
  Users,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  addClassroomActivity,
  announcementTypeLabels,
  classroomAdapter,
  eventTypeLabels,
  getClassGroupsForUser,
  getStudentBookings,
  getStudentSubmissions,
  listClassroomActivity,
  listClassGroups,
  priorityLabels,
  sendClassroomAnnouncementEmail,
  taskTypeLabels,
  type ClassroomFilter,
  type DTAnnouncement,
  type DTCalendarEvent,
  type DTClassGroup,
  type DTClassMessage,
  type DTClassTask,
  type DTClassTaskSubmission,
  type DTModule,
  type DTNotification,
  type Priority,
} from '../../../data/dtClassroom';
import { listBookings, listSubmissions } from '../../../data/dtWorkshop';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

type ClassroomTab = 'dashboard' | 'modules' | 'calendar' | 'inbox' | 'history' | 'help';
type QuickAction = { label: string; caption?: string; icon: LucideIcon; action: () => void; adminOnly?: boolean };
type QuickActionGroup = { title: string; items: QuickAction[] };
type ToolLink = { label: string; screen: string; icon: LucideIcon; color: string };
type VisualStat = { label: string; value: number; icon: LucideIcon; color: string };

const tabs: Array<{ id: ClassroomTab; label: string; icon: typeof Megaphone; color: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: Megaphone, color: 'text-blue-500' },
  { id: 'modules', label: 'Modules', icon: BookOpen, color: 'text-emerald-500' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, color: 'text-violet-500' },
  { id: 'inbox', label: 'Inbox', icon: Inbox, color: 'text-orange-500' },
  { id: 'history', label: 'History', icon: History, color: 'text-slate-500' },
  { id: 'help', label: 'Help', icon: HelpCircle, color: 'text-sky-500' },
];

const priorityClass: Record<Priority, string> = {
  LOW: 'bg-[#F5F4F1] text-[#68635B] border-[#E7E2DA]',
  NORMAL: 'bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]',
  HIGH: 'bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]',
  URGENT: 'bg-[#FFF0F0] text-[#934B4B] border-[#EECBCB]',
};

const priorityDot: Record<Priority, string> = {
  LOW: 'bg-[#A9A299]',
  NORMAL: 'bg-[#7CADCC]',
  HIGH: 'bg-[#D8A15D]',
  URGENT: 'bg-[#D87373]',
};

const announcementTypeColor: Record<DTAnnouncement['type'], string> = {
  GENERAL_NOTICE: 'bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]',
  HOMEWORK_REMINDER: 'bg-[#F5F1FA] text-[#6D5D88] border-[#E5DDF0]',
  DEADLINE_WARNING: 'bg-[#FFF0F0] text-[#934B4B] border-[#EECBCB]',
  MATERIAL_REMINDER: 'bg-[#FFF8E8] text-[#8A6A2A] border-[#EFE2BB]',
  SUBMISSION_NOTICE: 'bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]',
  LESSON_PREPARATION: 'bg-[#EFF8F2] text-[#4D725C] border-[#D9EBDD]',
  COMPETITION_NOTICE: 'bg-[#FFF1F7] text-[#8C5270] border-[#EECFDE]',
  URGENT_NOTICE: 'bg-[#FFF0F0] text-[#934B4B] border-[#EECBCB]',
};

const eventVisual: Record<DTCalendarEvent['type'], { className: string; icon: typeof CalendarDays; short: string }> = {
  LESSON: { className: 'bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]', icon: BookOpen, short: 'Lesson' },
  DEADLINE: { className: 'bg-[#FFF0F0] text-[#934B4B] border-[#EECBCB]', icon: AlertTriangle, short: 'Due' },
  SUBMISSION_CUTOFF: { className: 'bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]', icon: FileUp, short: 'Cut-off' },
  BOOKING_SLOT: { className: 'bg-[#EFF8F2] text-[#4D725C] border-[#D9EBDD]', icon: CalendarPlus, short: 'Slot' },
  COMPETITION: { className: 'bg-[#FFF1F7] text-[#8C5270] border-[#EECFDE]', icon: Target, short: 'Comp' },
  WORKSHOP_SESSION: { className: 'bg-[#F5F1FA] text-[#6D5D88] border-[#E5DDF0]', icon: Wrench, short: 'Shop' },
  REMINDER: { className: 'bg-[#F5F4F1] text-[#68635B] border-[#E7E2DA]', icon: Bell, short: 'Note' },
};

const announcementTypes: DTAnnouncement['type'][] = [
  'GENERAL_NOTICE',
  'HOMEWORK_REMINDER',
  'DEADLINE_WARNING',
  'MATERIAL_REMINDER',
  'SUBMISSION_NOTICE',
  'LESSON_PREPARATION',
  'COMPETITION_NOTICE',
  'URGENT_NOTICE',
];

const eventTypes: DTCalendarEvent['type'][] = [
  'LESSON',
  'DEADLINE',
  'SUBMISSION_CUTOFF',
  'BOOKING_SLOT',
  'COMPETITION',
  'WORKSHOP_SESSION',
  'REMINDER',
];

const makeAnnouncement = (input: {
  title: string;
  body: string;
  type: DTAnnouncement['type'];
  priority: Priority;
  classGroups: string[];
  yearGroups: string[];
  createdBy: string;
  expiresAt?: string;
  attachmentUrls?: string[];
}): DTAnnouncement => {
  const now = new Date().toISOString();
  return {
    id: `announcement-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    body: input.body,
    type: input.type,
    priority: input.priority,
    classGroups: input.classGroups,
    yearGroups: input.yearGroups,
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
    expiresAt: input.expiresAt || undefined,
    attachmentUrls: input.attachmentUrls?.filter(Boolean),
    notificationSent: false,
  };
};

const formatDate = (value?: string) => value ? new Date(value).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Not set';
const formatDay = (value: string) => new Date(value).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
const formatTime = (value: string) => new Date(value).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
const shortText = (value: string, max = 92) => value.length > max ? `${value.slice(0, max).trim()}...` : value;

const EmptyState = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-2xl border border-dashed border-[#D8D1C7] bg-white p-6 text-center">
    <div className="text-base font-black text-[#2C2A26]">{title}</div>
    <p className="mt-2 text-sm text-[#6B665E]">{body}</p>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: typeof Bell; color: string }) => (
  <div className={`rounded-2xl border p-5 shadow-sm ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs font-black uppercase tracking-widest opacity-70">{label}</div>
        <div className="mt-2 text-3xl font-black">{value}</div>
      </div>
      <div className="rounded-2xl bg-white/70 p-3">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);


export const DTClassroomHubPage = ({ onNavigate }: Props) => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<ClassroomTab>('dashboard');
  const [classGroups, setClassGroups] = useState<DTClassGroup[]>([]);
  const [visibleClasses, setVisibleClasses] = useState<DTClassGroup[]>([]);
  const [announcements, setAnnouncements] = useState<DTAnnouncement[]>([]);
  const [modules, setModules] = useState<DTModule[]>([]);
  const [tasks, setTasks] = useState<DTClassTask[]>([]);
  const [taskSubmissions, setTaskSubmissions] = useState<DTClassTaskSubmission[]>([]);
  const [events, setEvents] = useState<DTCalendarEvent[]>([]);
  const [messages, setMessages] = useState<DTClassMessage[]>([]);
  const [notifications, setNotifications] = useState<DTNotification[]>([]);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'agenda'>('agenda');
  const [filter, setFilter] = useState<ClassroomFilter>({});
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [showComposer, setShowComposer] = useState(false);
  const [showClassCreator, setShowClassCreator] = useState(false);
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [homeworkTask, setHomeworkTask] = useState<DTClassTask | null>(null);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [publishPreview, setPublishPreview] = useState<DTAnnouncement | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [classForm, setClassForm] = useState({
    classNo: '',
    yearGroup: 'Y8',
    teacherName: 'Mr. Mok',
    studentEmails: '',
  });
  const [taskForm, setTaskForm] = useState({
    title: '',
    classGroupId: '',
    moduleId: '',
    dueDate: '',
    dueTime: '',
    category: 'Homework',
    type: 'FORMATIVE' as DTClassTask['type'],
    details: '',
    dropboxEnabled: true,
  });
  const [homeworkForm, setHomeworkForm] = useState({
    fileName: '',
    note: '',
  });
  const [form, setForm] = useState({
    title: '',
    body: '',
    type: 'GENERAL_NOTICE' as DTAnnouncement['type'],
    priority: 'NORMAL' as Priority,
    classGroups: [] as string[],
    yearGroup: '',
    expiresAt: '',
    attachmentUrl: '',
    sendEmail: false,
  });

  const userId = user?.id ?? '';
  const activityLogs = listClassroomActivity();
  const unreadCount = notifications.filter((notice) => !notice.readAt).length;
  const selectedClassIds = visibleClasses.map((group) => group.id);
  const filteredAnnouncements = announcements.filter((announcement) =>
    isAdmin || announcement.classGroups.some((classId) => selectedClassIds.includes(classId)),
  );
  const visibleTasks = tasks.filter((task) =>
    isAdmin || task.classGroups.some((classId) => selectedClassIds.includes(classId)),
  );
  const openTasks = visibleTasks.filter((task) => task.status === 'PUBLISHED');
  const upcomingEvents = events
    .filter((event) => new Date(event.startDateTime).getTime() >= Date.now())
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  const deadlines = upcomingEvents.filter((event) => event.type === 'DEADLINE' || event.type === 'SUBMISSION_CUTOFF');
  const studentSubmissions = getStudentSubmissions(userId);
  const studentBookings = getStudentBookings(userId);
  const pendingSubmissions = studentSubmissions.filter((submission) => !['COMPLETED', 'REJECTED', 'CANCELLED'].includes(submission.status));
  const upcomingBooking = studentBookings.find((booking) => ['SUBMITTED', 'CONFIRMED', 'NEED_CHANGE'].includes(booking.status));
  const quickMenuGroups: QuickActionGroup[] = [
    {
      title: 'Lesson',
      items: [
        { label: 'Start DT Lesson', icon: Sparkles, action: () => { setActiveTab('modules'); setStatusMessage('Lesson view opened. Live lesson hosting is planned for backend integration.'); } },
        { label: 'Schedule Workshop', icon: CalendarPlus, action: () => { setActiveTab('calendar'); setStatusMessage('Calendar opened. Use this area to plan workshop sessions.'); } },
      ],
    },
    {
      title: 'Classwork',
      items: [
        { label: 'Create Class', icon: Users, action: () => setShowClassCreator(true) },
        { label: 'Post Notice', icon: Megaphone, action: () => setShowComposer(true) },
        { label: 'Add Homework', icon: ClipboardList, action: () => setShowTaskCreator(true) },
        { label: 'Post Message', icon: MessageCircle, action: () => { setActiveTab('inbox'); setStatusMessage('Inbox opened for class messages.'); } },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Add Resource', icon: Paperclip, action: () => { setActiveTab('modules'); setStatusMessage('Resource upload needs backend file storage; local demo shows module resources.'); } },
        { label: 'Add Goal', icon: Target, action: () => { setActiveTab('modules'); setStatusMessage('Goal tracking placeholder opened.'); } },
        { label: 'Post Reflection', icon: PenTool, action: () => { setActiveTab('history'); setStatusMessage('Reflection log placeholder opened in History.'); } },
      ],
    },
  ];
  const moduleStats: VisualStat[] = [
    { label: 'Live', value: modules.filter((module) => module.status === 'PUBLISHED').length, icon: BookOpen, color: 'bg-[#EFF8F2] text-[#4D725C] border-[#D9EBDD]' },
    { label: 'Tasks', value: openTasks.length, icon: ClipboardList, color: 'bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]' },
    { label: 'Resources', value: modules.reduce((total, module) => total + module.resources.length, 0), icon: Paperclip, color: 'bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]' },
    { label: 'Classes', value: visibleClasses.length, icon: Users, color: 'bg-[#F5F1FA] text-[#6D5D88] border-[#E5DDF0]' },
  ];
  const toolLinks: ToolLink[] = [
    { label: 'Files', screen: 'dt_submission', icon: UploadCloud, color: 'bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]' },
    { label: 'Booking', screen: 'design_booking', icon: CalendarDays, color: 'bg-[#F5F1FA] text-[#6D5D88] border-[#E5DDF0]' },
    { label: 'Knowledge', screen: 'dashboard', icon: Sparkles, color: 'bg-[#EFF8F2] text-[#4D725C] border-[#D9EBDD]' },
    { label: 'CAD', screen: 'orthographic_projection', icon: PenTool, color: 'bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]' },
  ];
  const globalResults = globalSearch.trim()
    ? [
      ...filteredAnnouncements.map((item) => ({ type: 'Notice', title: item.title, tab: 'inbox' as ClassroomTab, color: 'bg-orange-50 text-orange-700' })),
      ...modules.map((item) => ({ type: 'Module', title: item.title, tab: 'modules' as ClassroomTab, color: 'bg-emerald-50 text-emerald-700' })),
      ...visibleTasks.map((item) => ({ type: 'Homework', title: item.title, tab: 'modules' as ClassroomTab, color: 'bg-blue-50 text-blue-700' })),
      ...events.map((item) => ({ type: eventVisual[item.type].short, title: item.title, tab: 'calendar' as ClassroomTab, color: eventVisual[item.type].className })),
      ...messages.map((item) => ({ type: 'Message', title: item.subject, tab: 'inbox' as ClassroomTab, color: 'bg-blue-50 text-blue-700' })),
    ].filter((item) => item.title.toLowerCase().includes(globalSearch.trim().toLowerCase())).slice(0, 8)
    : [];

  const runQuickAction = (action: QuickAction) => {
    action.action();
    setShowQuickMenu(false);
  };

  const refresh = async () => {
    const groups = listClassGroups();
    const classes = getClassGroupsForUser(userId, isAdmin);
    const classFilter = filter.classGroupId
      ? filter
      : classes.length > 0 && !isAdmin
        ? { ...filter, classGroupId: classes[0].id }
        : filter;
    setClassGroups(groups);
    setVisibleClasses(classes);
    setAnnouncements(await classroomAdapter.listAnnouncements(classFilter));
    setModules(await classroomAdapter.listModules(classFilter));
    setTasks(await classroomAdapter.listTasks(classFilter));
    setTaskSubmissions(await classroomAdapter.listTaskSubmissions());
    setEvents(await classroomAdapter.listCalendarEvents(classFilter));
    setMessages(await classroomAdapter.listMessages(classFilter));
    setNotifications(userId ? await classroomAdapter.listNotifications(userId) : []);
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isAdmin, filter.classGroupId, filter.yearGroup, filter.type]);

  const classNameForIds = (ids: string[]) => ids.map((id) => classGroups.find((group) => group.id === id)?.classNo ?? id).join(', ');
  const taskSubmissionForUser = (taskId: string) => taskSubmissions.find((submission) =>
    submission.taskId === taskId && submission.studentEmail.toLowerCase() === userId.toLowerCase(),
  );
  const taskSubmissionCount = (taskId: string) => taskSubmissions.filter((submission) => submission.taskId === taskId).length;

  const markRead = async (notificationId: string) => {
    await classroomAdapter.markNotificationRead(notificationId);
    addClassroomActivity({
      actorEmail: userId,
      actorRole: isAdmin ? 'admin' : 'student',
      action: 'Notification marked read',
      targetType: 'ANNOUNCEMENT',
      targetId: notificationId,
    });
    await refresh();
  };

  const createClass = async () => {
    if (!classForm.classNo.trim() || !classForm.yearGroup.trim() || !classForm.teacherName.trim()) {
      setStatusMessage('Class number, year group and teacher are required.');
      return;
    }
    await classroomAdapter.createClassGroup({
      classNo: classForm.classNo.trim(),
      yearGroup: classForm.yearGroup.trim(),
      teacherName: classForm.teacherName.trim(),
      studentEmails: classForm.studentEmails.split(/[\n,;]/).map((email) => email.trim()).filter(Boolean),
    });
    setShowClassCreator(false);
    setClassForm({ classNo: '', yearGroup: 'Y8', teacherName: 'Mr. Mok', studentEmails: '' });
    setStatusMessage('Class created. Students listed in the class can now see matching notices, tasks and calendar items.');
    await refresh();
  };

  const createHomeworkTask = async () => {
    const selectedClass = classGroups.find((group) => group.id === taskForm.classGroupId);
    if (!taskForm.title.trim() || !selectedClass || !taskForm.dueDate || !taskForm.dueTime || !taskForm.details.trim()) {
      setStatusMessage('Homework title, class, due date/time and instructions are required.');
      return;
    }
    await classroomAdapter.createTask({
      title: taskForm.title.trim(),
      classGroups: [selectedClass.id],
      yearGroups: [selectedClass.yearGroup],
      moduleId: taskForm.moduleId || undefined,
      dueDateTime: new Date(`${taskForm.dueDate}T${taskForm.dueTime}`).toISOString(),
      category: taskForm.category.trim() || 'Homework',
      type: taskForm.type,
      details: taskForm.details.trim(),
      dropboxEnabled: taskForm.dropboxEnabled,
      createdBy: user?.displayName ?? userId,
      status: 'PUBLISHED',
    });
    setShowTaskCreator(false);
    setTaskForm({ title: '', classGroupId: '', moduleId: '', dueDate: '', dueTime: '', category: 'Homework', type: 'FORMATIVE', details: '', dropboxEnabled: true });
    setStatusMessage('Homework created. Notifications and a calendar deadline were added for the selected class.');
    await refresh();
  };

  const submitHomework = async () => {
    if (!homeworkTask) return;
    if (!homeworkTask.dropboxEnabled) {
      setStatusMessage('Dropbox is disabled for this homework.');
      return;
    }
    if (!homeworkForm.fileName.trim() && !homeworkForm.note.trim()) {
      setStatusMessage('Add a file name or note before submitting homework.');
      return;
    }
    await classroomAdapter.submitHomework({
      taskId: homeworkTask.id,
      studentEmail: userId,
      studentName: user?.displayName ?? userId,
      fileName: homeworkForm.fileName.trim() || undefined,
      note: homeworkForm.note.trim() || undefined,
    });
    setHomeworkTask(null);
    setHomeworkForm({ fileName: '', note: '' });
    setStatusMessage('Homework submitted. Your teacher can see it in the task submission count.');
    await refresh();
  };

  const openPreview = (mode: 'draft' | 'publish' | 'notify') => {
    const targetClasses = form.classGroups.length ? form.classGroups : visibleClasses.map((group) => group.id);
    if (!form.title.trim() || !form.body.trim() || targetClasses.length === 0) {
      setStatusMessage('Title, message and class group are required.');
      return;
    }
    setPublishPreview(makeAnnouncement({
      title: form.title.trim(),
      body: form.body.trim(),
      type: form.type,
      priority: form.priority,
      classGroups: targetClasses,
      yearGroups: form.yearGroup ? [form.yearGroup] : classGroups.filter((group) => targetClasses.includes(group.id)).map((group) => group.yearGroup),
      createdBy: user?.displayName ?? userId,
      expiresAt: form.expiresAt,
      attachmentUrls: form.attachmentUrl ? [form.attachmentUrl] : [],
    }));
    setForm((current) => ({ ...current, sendEmail: mode === 'notify' || current.sendEmail }));
  };

  const publishAnnouncement = async () => {
    if (!publishPreview) return;
    const created = await classroomAdapter.createAnnouncement({ ...publishPreview, notificationSent: true });
    if ((created.priority === 'HIGH' || created.priority === 'URGENT' || form.sendEmail) && created.classGroups.length) {
      const recipients = classGroups
        .filter((group) => created.classGroups.includes(group.id))
        .flatMap((group) => group.studentEmails);
      // TODO: Production email must run through backend, Apps Script, Power Automate or a secure serverless function.
      await sendClassroomAnnouncementEmail({
        to: recipients,
        subject: `DT Class Notice: ${created.title}`,
        announcementId: created.id,
        body: `A new Design Technology notice has been posted.\n\nTitle: ${created.title}\nPriority: ${priorityLabels[created.priority]}\n\n${created.body}`,
      });
    }
    setPublishPreview(null);
    setShowComposer(false);
    setForm({ title: '', body: '', type: 'GENERAL_NOTICE', priority: 'NORMAL', classGroups: [], yearGroup: '', expiresAt: '', attachmentUrl: '', sendEmail: false });
    setStatusMessage('Announcement published and notifications created.');
    await refresh();
  };

  const inboxItems = notifications
    .filter((notice) => !unreadOnly || !notice.readAt)
    .filter((notice) => !search.trim() || `${notice.title} ${notice.message}`.toLowerCase().includes(search.trim().toLowerCase()));

  const renderAnnouncementCard = (announcement: DTAnnouncement) => (
    <article key={announcement.id} className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-sm">
      <div className={`h-2 ${priorityDot[announcement.priority]}`} />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${announcementTypeColor[announcement.type]}`}>
            <Megaphone className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-black text-[#2C2A26]">{announcement.title}</h3>
              <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${priorityClass[announcement.priority]}`}>{priorityLabels[announcement.priority]}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-black">
              <span className={`rounded-full border px-2.5 py-1 ${announcementTypeColor[announcement.type]}`}>{announcementTypeLabels[announcement.type]}</span>
              <span className="rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-2.5 py-1 text-[#6B665E]">{classNameForIds(announcement.classGroups)}</span>
              <span className="rounded-full bg-[#F2EFE9] px-2.5 py-1 text-[#8C857B]">{formatDate(announcement.createdAt)}</span>
            </div>
            <p className="mt-3 text-sm leading-5 text-[#4A4741]">{shortText(announcement.body)}</p>
          </div>
        </div>
        {announcement.attachmentUrls?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {announcement.attachmentUrls.map((url) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#E5E0D8] bg-[#FAF9F6] px-3 py-1 text-xs font-black text-[#6B665E] hover:bg-[#F2EFE9]">
                <Paperclip className="h-3 w-3" /> File
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );

  const renderTaskCard = (task: DTClassTask) => {
    const userSubmission = taskSubmissionForUser(task.id);
    const module = modules.find((item) => item.id === task.moduleId);
    return (
      <article key={task.id} className="overflow-hidden rounded-2xl border border-[#E7E2DA] bg-white shadow-sm">
        <div className="h-2 bg-[#9DBBD4]" />
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] text-[#356487]">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-black text-[#2C2A26]">{task.title}</h3>
                <span className="rounded-full border border-[#D7E8F8] bg-[#EEF6FF] px-2.5 py-1 text-[11px] font-black text-[#356487]">{taskTypeLabels[task.type]}</span>
                <span className="rounded-full border border-[#F1DDC5] bg-[#FFF5EA] px-2.5 py-1 text-[11px] font-black text-[#9A6636]">Due {formatDay(task.dueDateTime)}</span>
              </div>
              <p className="mt-2 text-sm leading-5 text-[#5F5A52]">{shortText(task.details, 120)}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black">
                <span className="rounded-full border border-[#E7E2DA] bg-[#F8F6F2] px-2.5 py-1 text-[#68635B]">{classNameForIds(task.classGroups)}</span>
                <span className="rounded-full border border-[#E5DDF0] bg-[#F5F1FA] px-2.5 py-1 text-[#6D5D88]">{task.category}</span>
                {module ? <span className="rounded-full border border-[#D9EBDD] bg-[#EFF8F2] px-2.5 py-1 text-[#4D725C]">{module.title}</span> : null}
                {task.dropboxEnabled ? <span className="rounded-full border border-[#D9EBDD] bg-[#EFF8F2] px-2.5 py-1 text-[#4D725C]">Dropbox</span> : null}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EFEAE3] pt-3">
            <span className="text-xs font-bold text-[#8C857B]">
              {isAdmin ? `${taskSubmissionCount(task.id)} submission${taskSubmissionCount(task.id) === 1 ? '' : 's'}` : userSubmission ? `Submitted ${formatDate(userSubmission.submittedAt)}` : 'Not submitted'}
            </span>
            {isAdmin ? (
              <button onClick={() => setActiveTab('inbox')} className="rounded-full border border-[#D7E8F8] bg-[#EEF6FF] px-4 py-2 text-xs font-black text-[#356487]">
                View class notices
              </button>
            ) : (
              <button
                disabled={Boolean(userSubmission) || !task.dropboxEnabled}
                onClick={() => {
                  setHomeworkTask(task);
                  setHomeworkForm({ fileName: '', note: '' });
                }}
                className={`rounded-full px-4 py-2 text-xs font-black ${
                  userSubmission || !task.dropboxEnabled
                    ? 'border border-[#E7E2DA] bg-[#F5F4F1] text-[#8C857B]'
                    : 'bg-[#356487] text-white'
                }`}
              >
                {userSubmission ? 'Submitted' : 'Submit Homework'}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  const renderDashboard = () => {
    if (!isAdmin && visibleClasses.length === 0) {
      return <EmptyState title="Your DT class is not linked yet." body="Please contact your teacher so your student email can be connected to the correct Design Technology class." />;
    }

    return (
      <div className="space-y-6">
        <section className="overflow-hidden rounded-3xl border border-[#D9E5F6] bg-white shadow-sm">
          <div className="h-2 bg-[#9DBBD4]" />
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-xs font-black text-[#356487]">DT Hub</span>
                <span className="rounded-full bg-[#EFF8F2] px-3 py-1 text-xs font-black text-[#4D725C]">{isAdmin ? 'Teacher tools' : visibleClasses[0]?.classNo}</span>
                <span className="rounded-full bg-[#FFF5EA] px-3 py-1 text-xs font-black text-[#9A6636]">{unreadCount} unread</span>
              </div>
              <h1 className="mt-3 text-3xl font-black text-[#2C2A26]">{user?.displayName ?? 'Student'}</h1>
              <p className="mt-1 text-sm font-bold text-[#6B665E]">
                {isAdmin ? `${visibleClasses.length} classes · ${filteredAnnouncements.length} notices` : `${visibleClasses[0]?.teacherName} · ${visibleClasses[0]?.yearGroup}`}
              </p>
            </div>
            <div className="grid gap-2 p-4 lg:w-[380px]">
              <div className="rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] p-4 text-[#356487]">
                <div className="flex items-center gap-2 text-sm font-black"><Users className="h-4 w-4" /> Class lens</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {visibleClasses.slice(0, 8).map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setFilter((current) => ({ ...current, classGroupId: group.id }))}
                      className={`rounded-full px-3 py-1 text-xs font-black ${filter.classGroupId === group.id ? 'bg-[#356487] text-white' : 'bg-white/80 text-[#356487]'}`}
                    >
                      {group.classNo}
                    </button>
                  ))}
                  {isAdmin ? (
                    <button onClick={() => setShowClassCreator(true)} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#356487] shadow-sm">
                      + Class
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setActiveTab('calendar')} className="rounded-2xl border border-[#EECBCB] bg-[#FFF0F0] p-3 text-left text-[#934B4B]">
                  <Clock className="h-5 w-5" />
                  <div className="mt-2 text-xl font-black">{deadlines.length}</div>
                  <div className="text-[11px] font-black">Due</div>
                </button>
                <button onClick={() => setActiveTab('modules')} className="rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] p-3 text-left text-[#356487]">
                  <BookOpen className="h-5 w-5" />
                  <div className="mt-2 text-xl font-black">{openTasks.length}</div>
                  <div className="text-[11px] font-black">Tasks</div>
                </button>
                <button onClick={() => setActiveTab('inbox')} className="rounded-2xl border border-[#F1DDC5] bg-[#FFF5EA] p-3 text-left text-[#9A6636]">
                  <Bell className="h-5 w-5" />
                  <div className="mt-2 text-xl font-black">{unreadCount}</div>
                  <div className="text-[11px] font-black">Unread</div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Notices" value={unreadCount} icon={Bell} color="bg-[#FFF5EA] text-[#9A6636] border-[#F1DDC5]" />
          <StatCard label="Deadlines" value={deadlines.length} icon={Clock} color="bg-[#FFF0F0] text-[#934B4B] border-[#EECBCB]" />
          <StatCard label="Tasks" value={openTasks.length} icon={ClipboardList} color="bg-[#EEF6FF] text-[#356487] border-[#D7E8F8]" />
          <StatCard label="Files" value={isAdmin ? listSubmissions().length : pendingSubmissions.length} icon={UploadCloud} color="bg-[#EFF8F2] text-[#4D725C] border-[#D9EBDD]" />
          <StatCard label="Bookings" value={isAdmin ? listBookings().length : upcomingBooking ? '1' : '0'} icon={CalendarDays} color="bg-[#F5F1FA] text-[#6D5D88] border-[#E5DDF0]" />
        </section>

        <section className="grid gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-[#2C2A26]">Notices</h2>
              <button onClick={() => setActiveTab('inbox')} className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-3 py-2 text-xs font-black text-[#6B665E]">
                <Eye className="h-3.5 w-3.5" /> All
              </button>
            </div>
            {filteredAnnouncements.length ? filteredAnnouncements.slice(0, 3).map(renderAnnouncementCard) : <EmptyState title="No announcements yet" body="Class notices will appear here." />}
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-xl font-black text-[#2C2A26]">Homework</h2>
              {isAdmin ? (
                <button onClick={() => setShowTaskCreator(true)} className="inline-flex items-center gap-2 rounded-full border border-[#D7E8F8] bg-[#EEF6FF] px-3 py-2 text-xs font-black text-[#356487]">
                  <Plus className="h-3.5 w-3.5" /> Add
                </button>
              ) : null}
            </div>
            {openTasks.length ? openTasks.slice(0, 3).map(renderTaskCard) : <EmptyState title="No homework yet" body="Homework tasks and dropbox submissions will appear here." />}
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#2C2A26]">Next</h2>
            {upcomingEvents.slice(0, 4).map((event) => {
              const Icon = eventVisual[event.type].icon;
              return (
                <button key={event.id} onClick={() => setActiveTab('calendar')} className={`w-full rounded-2xl border p-4 text-left shadow-sm ${eventVisual[event.type].className}`}>
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="text-sm font-black">{event.title}</div>
                      <div className="text-xs font-bold opacity-75">{formatDay(event.startDateTime)} · {formatTime(event.startDateTime)}</div>
                    </div>
                  </div>
                </button>
              );
            })}
            <h2 className="pt-2 text-xl font-black text-[#2C2A26]">Tools</h2>
            {toolLinks.map(({ label, screen, icon: Icon, color }) => (
              <button key={label} onClick={() => onNavigate(screen)} className={`inline-flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-black shadow-sm ${color}`}>
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderModules = () => (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E7E2DA] bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-[#2C2A26]">Modules and Homework</h2>
          <p className="mt-1 text-sm font-bold text-[#6B665E]">Class units, lesson resources, deadlines and student dropbox tasks.</p>
        </div>
        {isAdmin ? (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowClassCreator(true)} className="inline-flex items-center gap-2 rounded-2xl border border-[#D9EBDD] bg-[#EFF8F2] px-4 py-3 text-sm font-black text-[#4D725C]">
              <Users className="h-4 w-4" /> Create Class
            </button>
            <button onClick={() => setShowTaskCreator(true)} className="inline-flex items-center gap-2 rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] px-4 py-3 text-sm font-black text-[#356487]">
              <ClipboardList className="h-4 w-4" /> Add Homework
            </button>
          </div>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {moduleStats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`rounded-2xl border p-4 ${color}`}>
            <Icon className="h-5 w-5" />
            <div className="mt-2 text-2xl font-black">{value}</div>
            <div className="text-xs font-black uppercase opacity-70">{label}</div>
          </div>
        ))}
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        {openTasks.length ? openTasks.map(renderTaskCard) : <EmptyState title="No homework tasks" body="Create homework from Quick Add, or wait for your teacher to publish one." />}
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
      {modules.map((module) => (
        <article key={module.id} className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-sm">
          <div className="h-2 bg-[#A9CDB4]" />
          <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D9EBDD] bg-[#EFF8F2] text-[#4D725C]">
                <Box className="h-6 w-6" />
              </div>
              <div>
              <h3 className="text-lg font-black text-[#2C2A26]">{module.title}</h3>
              <p className="mt-1 text-sm leading-5 text-[#6B665E]">{shortText(module.description, 82)}</p>
              </div>
            </div>
            <span className="rounded-full border border-[#D9EBDD] bg-[#EFF8F2] px-3 py-1 text-xs font-black text-[#4D725C]">{module.status}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
            <span className="rounded-full bg-[#F2EFE9] px-3 py-1 text-[#6B665E]">{classNameForIds(module.classGroups)}</span>
            <span className="rounded-full bg-[#EEF6FF] px-3 py-1 text-[#356487]">{module.lessons.length} lessons</span>
            <span className="rounded-full bg-[#FFF5EA] px-3 py-1 text-[#9A6636]">{module.resources.length} files</span>
            <span className="rounded-full bg-[#F5F1FA] px-3 py-1 text-[#6D5D88]">{openTasks.filter((task) => task.moduleId === module.id).length} tasks</span>
          </div>
          {module.lessons.length ? (
            <div className="mt-4 space-y-3">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="rounded-xl border border-[#D9EBDD] bg-[#EFF8F2] p-4">
                  <div className="flex items-center gap-2 font-black text-[#4D725C]">
                    <Check className="h-4 w-4" /> {lesson.lessonNumber}. {lesson.title}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lesson.successCriteria.slice(0, 3).map((criteria) => (
                      <span key={criteria} className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-[#4D725C]">{criteria}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          </div>
        </article>
      ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex items-center gap-2 text-sm font-black text-blue-800">
          <Eye className="h-4 w-4" /> Agenda View is best for accessibility.
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-black">
          {eventTypes.map((type) => {
            const Icon = eventVisual[type].icon;
            return (
              <span key={type} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${eventVisual[type].className}`}>
                <Icon className="h-3 w-3" /> {eventVisual[type].short}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 rounded-2xl border border-[#E5E0D8] bg-white p-3 shadow-sm">
        {(['month', 'week', 'agenda'] as const).map((view) => (
          <button key={view} onClick={() => setCalendarView(view)} className={`rounded-full px-4 py-2 text-sm font-black ${calendarView === view ? 'bg-blue-600 text-white' : 'bg-[#F9F8F6] text-[#6B665E] border border-[#E5E0D8]'}`}>
            {view[0].toUpperCase() + view.slice(1)} View
          </button>
        ))}
        <select value={filter.classGroupId ?? ''} onChange={(event) => setFilter((current) => ({ ...current, classGroupId: event.target.value || undefined }))} className="rounded-full border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-bold">
          <option value="">All classes</option>
          {visibleClasses.map((group) => <option key={group.id} value={group.id}>{group.classNo}</option>)}
        </select>
        <select value={filter.type ?? ''} onChange={(event) => setFilter((current) => ({ ...current, type: event.target.value || undefined }))} className="rounded-full border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-bold">
          <option value="">All event types</option>
          {eventTypes.map((type) => <option key={type} value={type}>{eventTypeLabels[type]}</option>)}
        </select>
      </div>
      {calendarView !== 'agenda' ? (
        <div className={`grid gap-2 ${calendarView === 'week' ? 'lg:grid-cols-7' : 'sm:grid-cols-2 lg:grid-cols-7'}`}>
          {Array.from({ length: calendarView === 'week' ? 7 : 14 }, (_, index) => {
            const day = new Date();
            day.setDate(day.getDate() + index);
            const key = day.toISOString().slice(0, 10);
            const dayEvents = events.filter((event) => event.startDateTime.slice(0, 10) === key);
            return (
              <div key={key} className="min-h-36 rounded-2xl border border-[#DDE7F4] bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#EEF3F8] pb-2">
                  <span className="text-xs font-black uppercase text-[#8C857B]">{day.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-black ${index === 0 ? 'bg-blue-600 text-white' : 'bg-[#F2EFE9] text-[#6B665E]'}`}>{day.getDate()}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {dayEvents.length ? dayEvents.map((event) => {
                    const Icon = eventVisual[event.type].icon;
                    return (
                      <button key={event.id} className={`w-full rounded-xl border px-2.5 py-2 text-left text-[11px] font-black ${eventVisual[event.type].className}`}>
                        <div className="flex items-center gap-1.5">
                          <Icon className="h-3 w-3" />
                          <span className="truncate">{event.title}</span>
                        </div>
                        <div className="mt-1 opacity-75">{formatTime(event.startDateTime)}</div>
                      </button>
                    );
                  }) : <div className="rounded-xl border border-dashed border-[#E5E0D8] py-5 text-center text-[11px] font-bold text-[#B0AAA2]">Free</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => {
            const Icon = eventVisual[event.type].icon;
            return (
              <article key={event.id} className={`rounded-2xl border p-5 shadow-sm ${eventVisual[event.type].className}`}>
                <div className="grid gap-4 sm:grid-cols-[90px_1fr_auto] sm:items-center">
                  <div className="rounded-2xl bg-white/80 p-3 text-center">
                    <div className="text-xs font-black uppercase opacity-70">{new Date(event.startDateTime).toLocaleDateString(undefined, { month: 'short' })}</div>
                    <div className="text-3xl font-black">{new Date(event.startDateTime).getDate()}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <h3 className="truncate text-base font-black">{event.title}</h3>
                      <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black">{eventVisual[event.type].short}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-black opacity-80">
                      <span>{formatTime(event.startDateTime)}</span>
                      <span>{classNameForIds(event.classGroups)}</span>
                      {event.location && <span>{event.location}</span>}
                    </div>
                  </div>
                  <button className="rounded-full bg-white/80 px-4 py-2 text-xs font-black">
                    Details
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderInbox = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 rounded-2xl border border-[#E5E0D8] bg-white p-3 shadow-sm">
        <label className="flex min-w-64 flex-1 items-center gap-2 rounded-2xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-3 text-sm font-bold">
          <Search className="h-4 w-4 text-[#8C857B]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search notices" className="w-full bg-transparent outline-none" />
        </label>
        <button onClick={() => setUnreadOnly((current) => !current)} className={`rounded-2xl px-4 py-3 text-sm font-black ${unreadOnly ? 'bg-[#2C2A26] text-white' : 'border border-[#E5E0D8] bg-white text-[#6B665E]'}`}>
          <Filter className="mr-2 inline h-4 w-4" /> Unread
        </button>
      </div>
      {inboxItems.length ? inboxItems.map((notice) => (
        <article key={notice.id} className={`rounded-2xl border p-5 shadow-sm ${notice.readAt ? 'border-[#E5E0D8] bg-white' : 'border-orange-100 bg-orange-50'}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${notice.readAt ? 'bg-[#F2EFE9] text-[#6B665E]' : 'bg-orange-100 text-orange-700'}`}>
                <Bell className="h-5 w-5" />
              </div>
              <div>
              <h3 className="text-lg font-black text-[#2C2A26]">{notice.title}</h3>
              <p className="mt-1 text-sm text-[#6B665E]">{shortText(notice.message, 90)}</p>
              </div>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-black ${priorityClass[notice.priority]}`}>{priorityLabels[notice.priority]}</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-[#8C857B]">{notice.readAt ? `Read ${formatDate(notice.readAt)}` : 'Unread DT notice'}</span>
            {!notice.readAt && <button onClick={() => void markRead(notice.id)} className="rounded-full bg-[#6B9080] px-4 py-2 text-xs font-black text-white">Mark as read</button>}
          </div>
        </article>
      )) : <EmptyState title="No inbox notices" body="Unread and read DT class notices will appear here." />}
      {isAdmin && (
        <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <h3 className="flex items-center gap-2 font-black text-[#2C2A26]"><MessageCircle className="h-4 w-4 text-orange-500" /> Class Messages</h3>
          {messages.map((message) => (
            <div key={message.id} className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="font-black">{message.subject}</div>
              <div className="mt-1 text-sm text-[#6B665E]">{shortText(message.body, 70)}</div>
              <div className="mt-2 inline-flex rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-orange-700">{classNameForIds(message.classGroups)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-3">
      {activityLogs.length ? activityLogs.map((log) => (
        <div key={log.id} className="grid gap-3 rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-sm sm:grid-cols-[44px_1fr_auto] sm:items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
            <History className="h-5 w-5" />
          </div>
          <div>
            <div className="font-black text-[#2C2A26]">{log.action}</div>
            <div className="mt-1 text-sm text-[#6B665E]">{log.details ?? log.targetType}</div>
          </div>
          <div className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-bold text-[#8C857B]">{formatDate(log.createdAt)}</div>
        </div>
      )) : <EmptyState title="No activity yet" body="Classroom actions, notice reads and teacher changes will be logged here." />}
    </div>
  );

  const renderHelp = () => (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[
        { item: 'Notices', icon: Megaphone, hint: 'Read and mark done', color: 'bg-blue-50 text-blue-700 border-blue-100' },
        { item: 'Modules', icon: BookOpen, hint: 'Open lesson files', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
        { item: 'Deadlines', icon: CalendarDays, hint: 'Use Agenda view', color: 'bg-red-50 text-red-700 border-red-100' },
        { item: 'Submit', icon: UploadCloud, hint: 'One file per job', color: 'bg-orange-50 text-orange-700 border-orange-100' },
        { item: 'Booking', icon: CalendarPlus, hint: 'Choose a time', color: 'bg-violet-50 text-violet-700 border-violet-100' },
        { item: 'Missing class', icon: HelpCircle, hint: 'Ask your teacher', color: 'bg-slate-100 text-slate-700 border-slate-200' },
      ].map(({ item, icon: Icon, hint, color }) => (
        <div key={item} className={`rounded-2xl border p-5 shadow-sm ${color}`}>
          <Icon className="h-6 w-6" />
          <div className="mt-3 font-black">{item}</div>
          <p className="mt-1 text-sm font-bold opacity-75">{hint}</p>
        </div>
      ))}
    </div>
  );

  const renderTab = () => {
    if (activeTab === 'dashboard') return renderDashboard();
    if (activeTab === 'modules') return renderModules();
    if (activeTab === 'calendar') return renderCalendar();
    if (activeTab === 'inbox') return renderInbox();
    if (activeTab === 'history') return renderHistory();
    return renderHelp();
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-3 bg-blue-500" />
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl bg-[#EEF6FF] px-3 py-1 text-xs font-black text-[#356487]">Classroom</span>
              <span className="rounded-xl bg-[#EFF8F2] px-3 py-1 text-xs font-black text-[#4D725C]">{isAdmin ? 'Teacher tools' : 'Student view'}</span>
              <span className="rounded-xl bg-[#FFF5EA] px-3 py-1 text-xs font-black text-[#9A6636]">{unreadCount} unread</span>
            </div>
            <h1 className="mt-3 text-3xl font-black text-[#2C2A26]">DT Classroom Hub</h1>
            <p className="mt-1 text-sm font-bold text-[#6B665E]">Class updates, homework, deadlines and workshop actions.</p>
          </div>
          <div className="relative p-4 lg:w-[560px]">
            <div className="flex items-center gap-2">
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-[#D8E2F0] bg-[#F8FBFF] px-4 py-3 text-sm font-bold text-[#4A5668]">
                <Search className="h-4 w-4 text-blue-500" />
                <input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder="Search classes, units, notices..."
                  className="w-full bg-transparent outline-none"
                />
              </label>
              {isAdmin ? (
                <button
                  onClick={() => setShowQuickMenu((current) => !current)}
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-blue-600 px-4 text-sm font-black text-white shadow-sm"
                >
                  <Plus className="h-5 w-5" />
                  Quick Add
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => onNavigate('dt_submission')} className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#356487] px-4 text-sm font-black text-white shadow-sm">
                  <UploadCloud className="h-5 w-5" /> Submit
                </button>
              )}
            </div>
            {globalResults.length > 0 && (
              <div className="absolute left-4 right-4 top-[72px] z-30 overflow-hidden rounded-2xl border border-[#D8E2F0] bg-white shadow-xl">
                {globalResults.map((result) => (
                  <button
                    key={`${result.type}-${result.title}`}
                    onClick={() => {
                      setActiveTab(result.tab);
                      setGlobalSearch('');
                    }}
                    className="flex w-full items-center justify-between gap-3 border-b border-[#EEF3F8] px-4 py-3 text-left last:border-b-0 hover:bg-[#F8FBFF]"
                  >
                    <span className="truncate text-sm font-black text-[#2C2A26]">{result.title}</span>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${result.color}`}>{result.type}</span>
                  </button>
                ))}
              </div>
            )}
            {showQuickMenu && isAdmin && (
              <div className="absolute right-4 top-[72px] z-40 w-full max-w-sm overflow-hidden rounded-2xl border border-[#D8E2F0] bg-white shadow-xl">
                {quickMenuGroups.map((group) => (
                  <div key={group.title} className="border-b border-[#EEF3F8] last:border-b-0">
                    <div className="bg-[#F8FBFF] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#708096]">{group.title}</div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button key={item.label} onClick={() => runQuickAction(item)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#F8FBFF]">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="text-sm font-black text-[#2C2A26]">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {statusMessage && (
        <div className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-800">{statusMessage}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-[#E5E0D8] bg-white p-3 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mb-2 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-black transition-colors ${
                  activeTab === tab.id ? 'bg-[#2C2A26] text-white' : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
                  {tab.label}
                </span>
                {tab.id === 'inbox' && unreadCount > 0 ? (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] text-white">{unreadCount}</span>
                ) : null}
              </button>
            );
          })}
        </aside>

        <main className="min-w-0">{renderTab()}</main>
      </div>

      {showComposer && isAdmin && (
        <div className="rounded-3xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#2C2A26]">Create DT Announcement</h2>
            <button onClick={() => setShowComposer(false)} className="rounded-full border border-[#E5E0D8] px-4 py-2 text-xs font-black text-[#6B665E]">Cancel</button>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title *" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
            <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as DTAnnouncement['type'] }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
              {announcementTypes.map((type) => <option key={type} value={type}>{announcementTypeLabels[type]}</option>)}
            </select>
            <select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as Priority }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
              {Object.entries(priorityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <input type="date" value={form.expiresAt} onChange={(event) => setForm((current) => ({ ...current, expiresAt: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
            <textarea value={form.body} onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))} placeholder="Message *" rows={5} className="lg:col-span-2 rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
            <input value={form.attachmentUrl} onChange={(event) => setForm((current) => ({ ...current, attachmentUrl: event.target.value }))} placeholder="Attachment URL, optional" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
            <label className="flex items-center gap-2 rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold text-[#4A4741]">
              <input type="checkbox" checked={form.sendEmail} onChange={(event) => setForm((current) => ({ ...current, sendEmail: event.target.checked }))} />
              Send email notification
            </label>
          </div>
          <div className="mt-5">
            <div className="mb-2 text-sm font-black text-[#2C2A26]">Class group *</div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {classGroups.map((group) => (
                <label key={group.id} className="flex items-center gap-2 rounded-xl border border-[#E5E0D8] px-3 py-2 text-sm font-bold text-[#4A4741]">
                  <input
                    type="checkbox"
                    checked={form.classGroups.includes(group.id)}
                    onChange={(event) => setForm((current) => ({
                      ...current,
                      classGroups: event.target.checked
                        ? [...current.classGroups, group.id]
                        : current.classGroups.filter((id) => id !== group.id),
                    }))}
                  />
                  {group.classNo}
                </label>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => openPreview('draft')} className="rounded-2xl border border-[#E5E0D8] bg-[#FAF9F6] px-5 py-3 text-sm font-black text-[#4A4741]">Save Draft</button>
            <button onClick={() => openPreview('publish')} className="rounded-2xl bg-[#2C2A26] px-5 py-3 text-sm font-black text-white">Publish</button>
            <button onClick={() => openPreview('notify')} className="inline-flex items-center gap-2 rounded-2xl bg-[#6B9080] px-5 py-3 text-sm font-black text-white">
              <Send className="h-4 w-4" /> Publish and Notify
            </button>
          </div>
        </div>
      )}

      {showClassCreator && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#2C2A26]">Create DT Class</h2>
                <p className="mt-1 text-sm font-bold text-[#6B665E]">Add a class group so notices, homework and calendar items can target students.</p>
              </div>
              <button onClick={() => setShowClassCreator(false)} className="rounded-full border border-[#E5E0D8] px-4 py-2 text-xs font-black text-[#6B665E]">Cancel</button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input value={classForm.classNo} onChange={(event) => setClassForm((current) => ({ ...current, classNo: event.target.value }))} placeholder="Class No. * e.g. 8.5" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <select value={classForm.yearGroup} onChange={(event) => setClassForm((current) => ({ ...current, yearGroup: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
                {['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10', 'Y11', 'Y12', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12'].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <input value={classForm.teacherName} onChange={(event) => setClassForm((current) => ({ ...current, teacherName: event.target.value }))} placeholder="Teacher *" className="sm:col-span-2 rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <textarea
                value={classForm.studentEmails}
                onChange={(event) => setClassForm((current) => ({ ...current, studentEmails: event.target.value }))}
                placeholder="Student emails, one per line or separated by commas"
                rows={5}
                className="sm:col-span-2 rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowClassCreator(false)} className="rounded-2xl border border-[#E5E0D8] px-5 py-3 text-sm font-black text-[#6B665E]">Cancel</button>
              <button onClick={() => void createClass()} className="rounded-2xl bg-[#4D725C] px-5 py-3 text-sm font-black text-white">Create Class</button>
            </div>
          </div>
        </div>
      )}

      {showTaskCreator && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#2C2A26]">Create Homework</h2>
                <p className="mt-1 text-sm font-bold text-[#6B665E]">Creates a class task, student notification and calendar deadline.</p>
              </div>
              <button onClick={() => setShowTaskCreator(false)} className="rounded-full border border-[#E5E0D8] px-4 py-2 text-xs font-black text-[#6B665E]">Cancel</button>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <input value={taskForm.title} onChange={(event) => setTaskForm((current) => ({ ...current, title: event.target.value }))} placeholder="Homework title *" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <select value={taskForm.classGroupId} onChange={(event) => setTaskForm((current) => ({ ...current, classGroupId: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
                <option value="">Choose class *</option>
                {classGroups.map((group) => <option key={group.id} value={group.id}>{group.classNo} · {group.yearGroup}</option>)}
              </select>
              <select value={taskForm.moduleId} onChange={(event) => setTaskForm((current) => ({ ...current, moduleId: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
                <option value="">No module link</option>
                {modules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={taskForm.dueDate} onChange={(event) => setTaskForm((current) => ({ ...current, dueDate: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
                <input type="time" value={taskForm.dueTime} onChange={(event) => setTaskForm((current) => ({ ...current, dueTime: event.target.value }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              </div>
              <input value={taskForm.category} onChange={(event) => setTaskForm((current) => ({ ...current, category: event.target.value }))} placeholder="Category" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <select value={taskForm.type} onChange={(event) => setTaskForm((current) => ({ ...current, type: event.target.value as DTClassTask['type'] }))} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none">
                {Object.entries(taskTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
              <textarea value={taskForm.details} onChange={(event) => setTaskForm((current) => ({ ...current, details: event.target.value }))} placeholder="Instructions *" rows={5} className="lg:col-span-2 rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <label className="lg:col-span-2 flex items-center gap-2 rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] px-4 py-3 text-sm font-black text-[#356487]">
                <input type="checkbox" checked={taskForm.dropboxEnabled} onChange={(event) => setTaskForm((current) => ({ ...current, dropboxEnabled: event.target.checked }))} />
                Enable homework submission button
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowTaskCreator(false)} className="rounded-2xl border border-[#E5E0D8] px-5 py-3 text-sm font-black text-[#6B665E]">Cancel</button>
              <button onClick={() => void createHomeworkTask()} className="rounded-2xl bg-[#356487] px-5 py-3 text-sm font-black text-white">Publish Homework</button>
            </div>
          </div>
        </div>
      )}

      {homeworkTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#2C2A26]">Submit Homework</h2>
                <p className="mt-1 text-sm font-bold text-[#6B665E]">{homeworkTask.title}</p>
              </div>
              <button onClick={() => setHomeworkTask(null)} className="rounded-full border border-[#E5E0D8] px-4 py-2 text-xs font-black text-[#6B665E]">Cancel</button>
            </div>
            <div className="mt-5 rounded-2xl border border-[#D7E8F8] bg-[#EEF6FF] p-4 text-sm font-bold text-[#356487]">
              Local demo stores file name and notes only. Real file upload should connect to approved school storage later.
            </div>
            <div className="mt-5 grid gap-4">
              <input value={homeworkForm.fileName} onChange={(event) => setHomeworkForm((current) => ({ ...current, fileName: event.target.value }))} placeholder="File name, e.g. door-stop-screenshot.png" className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
              <textarea value={homeworkForm.note} onChange={(event) => setHomeworkForm((current) => ({ ...current, note: event.target.value }))} placeholder="Student note, optional" rows={4} className="rounded-2xl border border-[#E5E0D8] px-4 py-3 text-sm font-bold outline-none" />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setHomeworkTask(null)} className="rounded-2xl border border-[#E5E0D8] px-5 py-3 text-sm font-black text-[#6B665E]">Cancel</button>
              <button onClick={() => void submitHomework()} className="rounded-2xl bg-[#356487] px-5 py-3 text-sm font-black text-white">Submit Homework</button>
            </div>
          </div>
        </div>
      )}

      {publishPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-black text-[#2C2A26]">Preview Announcement</h2>
            <div className="mt-4 rounded-2xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
              <div className="font-black">{publishPreview.title}</div>
              <div className="mt-2 text-sm text-[#6B665E]">{publishPreview.body}</div>
              <div className="mt-3 text-xs font-bold text-[#8C857B]">To: {classNameForIds(publishPreview.classGroups)}</div>
            </div>
            <p className="mt-4 text-sm text-[#6B665E]">This will create notifications for selected students.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setPublishPreview(null)} className="rounded-2xl border border-[#E5E0D8] px-5 py-3 text-sm font-black text-[#6B665E]">Cancel</button>
              <button onClick={() => void publishAnnouncement()} className="rounded-2xl bg-[#2C2A26] px-5 py-3 text-sm font-black text-white">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
