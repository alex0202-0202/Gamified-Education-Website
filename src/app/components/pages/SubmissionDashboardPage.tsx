import { useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  Filter,
  Gauge,
  RefreshCw,
  Shield,
  SlidersHorizontal,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import {
  createDeadlineRule,
  getQueueHealth,
  issueLabels,
  listAuditLogs,
  listDeadlineRules,
  listNotifications,
  listSubmissions,
  machineLabels,
  submissionStatusLabels,
  updateSubmissionStatusWithEmail,
  type DTMachineType,
  type DTSubmissionRequest,
  type DTSubmissionSource,
  type DTSubmissionStatus,
  type QueueHealth,
  type SubmissionIssueType,
} from '../../../data/dtWorkshop';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

type LaneId = 'ALL' | 'REVIEW' | 'WAITING' | 'READY' | 'PRODUCTION' | 'SPECIAL' | 'LASER' | 'PRINT' | 'DONE';

const inputClass = 'w-full rounded-xl border border-[#D8D1C7] bg-white px-3 py-2.5 text-sm text-[#2C2A26] outline-none focus:border-[#D5896F] focus:ring-4 focus:ring-[#D5896F]/15';
const labelClass = 'text-xs font-black uppercase tracking-widest text-[#8C857B]';

const statuses: DTSubmissionStatus[] = ['SUBMITTED', 'NEEDS_FIX', 'APPROVED', 'IN_QUEUE', 'IN_PRODUCTION', 'COMPLETED', 'REJECTED', 'CANCELLED'];
const issues: SubmissionIssueType[] = ['WRONG_FILE_FORMAT', 'MULTIPLE_ARTBOARDS', 'DIMENSION_PROBLEM', 'MATERIAL_NOT_ALLOWED', 'MISSING_PREVIEW', 'DESIGN_TOO_LARGE', 'FILE_NOT_OPENING', 'OTHER'];

const laneLabels: Array<{ id: LaneId; label: string }> = [
  { id: 'ALL', label: 'All Work' },
  { id: 'REVIEW', label: 'Review Now' },
  { id: 'WAITING', label: 'Waiting on Student' },
  { id: 'READY', label: 'Ready for Production' },
  { id: 'PRODUCTION', label: 'In Production' },
  { id: 'SPECIAL', label: 'Special' },
  { id: 'LASER', label: 'Laser' },
  { id: 'PRINT', label: '3D Print' },
  { id: 'DONE', label: 'Done / Rejected' },
];

const healthClass: Record<QueueHealth, string> = {
  CALM: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  BUSY: 'bg-amber-50 text-amber-700 border-amber-100',
  OVERLOADED: 'bg-red-50 text-red-700 border-red-100',
};

const laneMatch = (submission: DTSubmissionRequest, lane: LaneId) => {
  switch (lane) {
    case 'REVIEW': return submission.status === 'SUBMITTED';
    case 'WAITING': return submission.status === 'NEEDS_FIX';
    case 'READY': return submission.status === 'APPROVED' || submission.status === 'IN_QUEUE';
    case 'PRODUCTION': return submission.status === 'IN_PRODUCTION';
    case 'SPECIAL': return submission.source === 'SPECIAL_REQUEST';
    case 'LASER': return submission.machine === 'LASER_CUT';
    case 'PRINT': return submission.machine === 'THREE_D_PRINT';
    case 'DONE': return ['COMPLETED', 'REJECTED', 'CANCELLED'].includes(submission.status);
    default: return true;
  }
};

const SummaryCard = ({ label, value, tone = 'neutral' }: { label: string; value: string | number; tone?: 'neutral' | 'warn' | 'good' }) => (
  <div className={clsx('rounded-2xl border p-4 shadow-sm', tone === 'good' ? 'border-emerald-100 bg-emerald-50' : tone === 'warn' ? 'border-orange-100 bg-orange-50' : 'border-[#E5E0D8] bg-white')}>
    <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{label}</div>
    <div className="mt-2 text-2xl font-black text-[#2C2A26]">{value}</div>
  </div>
);

export const SubmissionDashboardPage = ({ onNavigate }: Props) => {
  const { user, isAdmin } = useAuth();
  const [, setVersion] = useState(0);
  const [lane, setLane] = useState<LaneId>('ALL');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [pendingStatus, setPendingStatus] = useState<{ submission: DTSubmissionRequest; newStatus: DTSubmissionStatus } | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    source: 'ALL',
    yearGroup: '',
    machine: 'ALL',
    material: '',
    status: 'ALL',
    teacherName: '',
    designClassNo: '',
    studentEmail: '',
  });
  const [review, setReview] = useState({
    status: 'SUBMITTED' as DTSubmissionStatus,
    issueType: '' as '' | SubmissionIssueType,
    studentVisibleRemarks: '',
    adminRemarks: '',
  });
  const [deadline, setDeadline] = useState({
    yearGroup: 'S4',
    designClassNo: '',
    machine: 'ALL' as DTMachineType | 'ALL',
    source: 'ALL' as DTSubmissionSource | 'ALL',
    deadline: '',
    enabled: true,
    blockAfterDeadline: true,
    studentMessage: 'This submission queue is closed for your class or year group. Please speak to your teacher.',
  });

  const search = filters.search.trim().toLowerCase();
  const allSubmissions = listSubmissions();
  const submissions = allSubmissions.filter((submission) => {
    if (!laneMatch(submission, lane)) return false;
    if (filters.source !== 'ALL' && submission.source !== filters.source) return false;
    if (filters.yearGroup && submission.yearGroup !== filters.yearGroup) return false;
    if (filters.machine !== 'ALL' && submission.machine !== filters.machine) return false;
    if (filters.material && !submission.material.toLowerCase().includes(filters.material.toLowerCase())) return false;
    if (filters.status !== 'ALL' && submission.status !== filters.status) return false;
    if (filters.teacherName && !submission.teacherName.toLowerCase().includes(filters.teacherName.toLowerCase())) return false;
    if (filters.designClassNo && !submission.designClassNo.toLowerCase().includes(filters.designClassNo.toLowerCase())) return false;
    if (filters.studentEmail && !submission.studentEmail.toLowerCase().includes(filters.studentEmail.toLowerCase())) return false;
    if (search && !`${submission.caseNumber} ${submission.studentName} ${submission.studentEmail} ${submission.designClassNo}`.toLowerCase().includes(search)) return false;
    return true;
  });
  const selected = selectedId ? allSubmissions.find((submission) => submission.id === selectedId) : undefined;
  const audits = listAuditLogs().filter((log) => selected && (log.submissionId === selected.id || log.requestId === selected.id));
  const notices = listNotifications().filter((notice) => selected && (notice.submissionId === selected.id || notice.requestId === selected.id));

  const activeWork = allSubmissions.filter((item) => !['COMPLETED', 'REJECTED', 'CANCELLED'].includes(item.status));
  const health = getQueueHealth(allSubmissions);
  const oldestActive = activeWork
    .map((item) => new Date(item.submittedAt).getTime())
    .sort((a, b) => a - b)[0];

  const refresh = () => setVersion((value) => value + 1);

  const openReview = (submission: DTSubmissionRequest) => {
    setSelectedId(submission.id);
    setReview({
      status: submission.status,
      issueType: submission.issueType ?? '',
      studentVisibleRemarks: submission.studentVisibleRemarks ?? '',
      adminRemarks: submission.adminRemarks ?? '',
    });
  };

  const requestStatusUpdate = (status = review.status) => {
    if (!selected || selected.status === status) return;
    setPendingStatus({ submission: selected, newStatus: status });
  };

  const confirmSubmissionStatusUpdate = async () => {
    if (!pendingStatus || !user) return;
    const result = await updateSubmissionStatusWithEmail({
      submissionId: pendingStatus.submission.id,
      newStatus: pendingStatus.newStatus,
      issueType: review.issueType || undefined,
      studentVisibleRemarks: review.studentVisibleRemarks,
      internalAdminNote: review.adminRemarks,
      changedBy: user.displayName,
    });
    setPendingStatus(null);
    setStatusMessage(result.emailResult?.success === false
      ? 'Status updated, but email could not be sent. Please check email service or send manually.'
      : 'Status updated and email notification sent.');
    refresh();
  };

  const createRule = (event: FormEvent) => {
    event.preventDefault();
    if (!deadline.deadline) return;
    createDeadlineRule(deadline);
    refresh();
  };

  if (!isAdmin) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-red-800">
        <div className="flex items-center gap-3 text-xl font-black"><Shield className="h-6 w-6" /> Admin only</div>
        <p className="mt-3 text-sm leading-6">Students cannot access the submission queue dashboard.</p>
        <button type="button" onClick={() => onNavigate('dt_submission')} className="mt-5 rounded-2xl bg-white px-5 py-3 text-sm font-black text-red-700">Back to Student View</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#2C2A26] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#F4D7C8]">
              <Shield className="h-4 w-4" />
              Admin View
            </div>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">Submission Dashboard</h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#E8DED0] md:text-base">
              Review student laser cutting and 3D printing submissions, download working files, and update request status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => onNavigate('dt_submission')} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#2C2A26]">Student View</button>
            <button type="button" className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white">Open Sheet</button>
            <button type="button" onClick={refresh} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Refresh</button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">
        <SummaryCard label="Total" value={allSubmissions.length} />
        <SummaryCard label="Submitted" value={allSubmissions.filter((s) => s.status === 'SUBMITTED').length} tone="warn" />
        <SummaryCard label="Needs Fix" value={allSubmissions.filter((s) => s.status === 'NEEDS_FIX').length} tone="warn" />
        <SummaryCard label="Approved" value={allSubmissions.filter((s) => s.status === 'APPROVED').length} />
        <SummaryCard label="In Queue" value={allSubmissions.filter((s) => s.status === 'IN_QUEUE').length} />
        <SummaryCard label="In Production" value={allSubmissions.filter((s) => s.status === 'IN_PRODUCTION').length} />
        <SummaryCard label="Done" value={allSubmissions.filter((s) => s.status === 'COMPLETED').length} tone="good" />
        <SummaryCard label="Rejected" value={allSubmissions.filter((s) => s.status === 'REJECTED').length} />
      </section>

      {statusMessage && <div className="rounded-2xl bg-[#FDF7EC] p-4 text-sm font-bold text-[#8A6430]">{statusMessage}</div>}

      <details className="rounded-3xl border border-[#E5E0D8] bg-white p-4 shadow-sm">
        <summary className="cursor-pointer text-sm font-black text-[#2C2A26]">Other queue signals</summary>
        <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <SummaryCard label="Active Work" value={activeWork.length} />
          <SummaryCard label="Review Now" value={allSubmissions.filter((s) => s.status === 'SUBMITTED').length} />
          <SummaryCard label="Production Lane" value={allSubmissions.filter((s) => ['IN_QUEUE', 'IN_PRODUCTION'].includes(s.status)).length} />
          <SummaryCard label="Oldest Active" value={oldestActive ? new Date(oldestActive).toLocaleDateString() : 'None'} />
          <SummaryCard label="Special Requests" value={allSubmissions.filter((s) => s.source === 'SPECIAL_REQUEST').length} />
          <SummaryCard label="Laser Jobs" value={allSubmissions.filter((s) => s.machine === 'LASER_CUT').length} />
          <SummaryCard label="3D Print Jobs" value={allSubmissions.filter((s) => s.machine === 'THREE_D_PRINT').length} />
          <SummaryCard label="Repeat Risk" value={allSubmissions.filter((s) => s.status === 'NEEDS_FIX').length} tone="warn" />
          <div className={clsx('rounded-2xl border p-4 shadow-sm', healthClass[health])}>
            <div className="text-xs font-black uppercase tracking-widest">Queue Health</div>
            <div className="mt-2 flex items-center gap-2 text-2xl font-black"><Gauge className="h-6 w-6" /> {health}</div>
          </div>
          <SummaryCard label="Queue Workload" value={activeWork.length} />
          <SummaryCard label="Production-ready" value={allSubmissions.filter((s) => ['APPROVED', 'IN_QUEUE'].includes(s.status)).length} />
          <SummaryCard label="Waiting on Student" value={allSubmissions.filter((s) => s.status === 'NEEDS_FIX').length} />
          <SummaryCard label="Repeat Flags" value={allSubmissions.filter((s) => s.issueType).length} />
        </div>
      </details>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]"><Filter className="h-4 w-4" /> Queue lanes and filters</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {laneLabels.map((item) => (
            <button key={item.id} type="button" onClick={() => setLane(item.id)} className={clsx('rounded-full border px-3 py-2 text-xs font-black', lane === item.id ? 'border-[#D5896F] bg-[#FFF6F0] text-[#D5896F]' : 'border-[#E5E0D8] bg-white text-[#6B665E]')}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4 xl:grid-cols-8">
          <input className={inputClass} value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} placeholder="Case search" />
          <select className={inputClass} value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value })}><option value="ALL">Source</option><option value="DT_PROJECT">DT coursework</option><option value="SPECIAL_REQUEST">Special</option></select>
          <input className={inputClass} value={filters.yearGroup} onChange={(e) => setFilters({ ...filters, yearGroup: e.target.value })} placeholder="Year" />
          <select className={inputClass} value={filters.machine} onChange={(e) => setFilters({ ...filters, machine: e.target.value })}><option value="ALL">Machine</option><option value="LASER_CUT">Laser</option><option value="THREE_D_PRINT">3D Print</option></select>
          <input className={inputClass} value={filters.material} onChange={(e) => setFilters({ ...filters, material: e.target.value })} placeholder="Material" />
          <select className={inputClass} value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="ALL">Status</option>{statuses.map((status) => <option key={status} value={status}>{submissionStatusLabels[status]}</option>)}</select>
          <input className={inputClass} value={filters.teacherName} onChange={(e) => setFilters({ ...filters, teacherName: e.target.value })} placeholder="Teacher" />
          <input className={inputClass} value={filters.designClassNo} onChange={(e) => setFilters({ ...filters, designClassNo: e.target.value })} placeholder="Class" />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="overflow-hidden rounded-3xl border border-[#E5E0D8] bg-white shadow-sm">
          <div className="border-b border-[#E5E0D8] p-5">
            <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Queue records table</div>
            <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">{submissions.length} records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-[#F9F8F6] text-xs font-black uppercase tracking-widest text-[#8C857B]">
                <tr>
                  {['Case Number', 'Requester', 'Email', 'Class', 'Teacher', 'Year', 'Machine', 'Material', 'Dimensions', 'Status', 'Source', 'Submitted Date', 'Last Updated', 'Action'].map((head) => <th key={head} className="px-4 py-3">{head}</th>)}
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id} className="border-t border-[#E5E0D8]">
                    <td className="px-4 py-3 font-black text-[#2C2A26]">{submission.caseNumber}</td>
                    <td className="px-4 py-3">{submission.studentName}</td>
                    <td className="px-4 py-3">{submission.studentEmail}</td>
                    <td className="px-4 py-3">{submission.designClassNo}</td>
                    <td className="px-4 py-3">{submission.teacherName}</td>
                    <td className="px-4 py-3">{submission.yearGroup}</td>
                    <td className="px-4 py-3">{machineLabels[submission.machine]}</td>
                    <td className="px-4 py-3">{submission.material}</td>
                    <td className="px-4 py-3">{submission.width}×{submission.height}{submission.depth ? `×${submission.depth}` : ''} mm</td>
                    <td className="px-4 py-3">{submissionStatusLabels[submission.status]}</td>
                    <td className="px-4 py-3">{submission.source === 'DT_PROJECT' ? 'DT coursework' : 'Special'}</td>
                    <td className="px-4 py-3">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{new Date(submission.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><button type="button" onClick={() => openReview(submission)} className="rounded-xl bg-[#2C2A26] px-3 py-2 text-xs font-black text-white">Review request</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]"><SlidersHorizontal className="h-4 w-4" /> Review panel</div>
            {selected ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-[#F9F8F6] p-4">
                  <h3 className="font-black text-[#2C2A26]">{selected.caseNumber}</h3>
                  <div className="mt-2 text-sm leading-6 text-[#6B665E]">Awaiting technician review or queue action.</div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold text-[#6B665E]">
                    <span>Submitted: {new Date(selected.submittedAt).toLocaleDateString()}</span>
                    <span>Last Updated: {new Date(selected.updatedAt).toLocaleDateString()}</span>
                    <span>Next Owner: {selected.status === 'NEEDS_FIX' ? 'Student' : 'Technician'}</span>
                    <span>Recent Activity: {audits.length}</span>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-[#6B665E]">
                  <div><b>Student:</b> {selected.studentName} · {selected.studentEmail}</div>
                  <div><b>Class:</b> {selected.designClassNo} · {selected.yearGroup} · {selected.teacherName}</div>
                  <div><b>Fabrication:</b> {machineLabels[selected.machine]} · {selected.material} · {selected.width}×{selected.height}{selected.depth ? `×${selected.depth}` : ''} mm</div>
                  <div className="rounded-2xl border border-[#E5E0D8] bg-white p-3">
                    <b>Working File:</b> {selected.workingFileName}
                    <div className="mt-2">
                      {selected.workingFileDataUrl ? (
                        <a
                          className="inline-flex rounded-xl bg-[#2C2A26] px-3 py-2 text-xs font-black text-white"
                          href={selected.workingFileDataUrl}
                          download={selected.workingFileName}
                        >
                          Download working file
                        </a>
                      ) : (
                        <span className="text-xs font-bold text-[#8C857B]">File data is not available for older local-demo records.</span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#E5E0D8] bg-white p-3">
                    <b>Preview:</b> {selected.previewImageName ?? 'No preview uploaded'}
                    {selected.previewImageDataUrl && (
                      <div className="mt-2">
                        <a
                          className="inline-flex rounded-xl border border-[#E5E0D8] bg-white px-3 py-2 text-xs font-black text-[#2C2A26]"
                          href={selected.previewImageDataUrl}
                          download={selected.previewImageName}
                        >
                          Download preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <label className="block space-y-2"><span className={labelClass}>Set Status</span><select className={inputClass} value={review.status} onChange={(e) => setReview({ ...review, status: e.target.value as DTSubmissionStatus })}>{statuses.map((status) => <option key={status} value={status}>{submissionStatusLabels[status]}</option>)}</select></label>
                <label className="block space-y-2"><span className={labelClass}>Issue, optional</span><select className={inputClass} value={review.issueType} onChange={(e) => setReview({ ...review, issueType: e.target.value as '' | SubmissionIssueType })}><option value="">No issue</option>{issues.map((issue) => <option key={issue} value={issue}>{issueLabels[issue]}</option>)}</select></label>
                <label className="block space-y-2"><span className={labelClass}>Remarks, student-visible</span><textarea rows={3} className={inputClass} value={review.studentVisibleRemarks} onChange={(e) => setReview({ ...review, studentVisibleRemarks: e.target.value })} /></label>
                <label className="block space-y-2"><span className={labelClass}>Internal admin note</span><textarea rows={3} className={inputClass} value={review.adminRemarks} onChange={(e) => setReview({ ...review, adminRemarks: e.target.value })} /></label>

                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => requestStatusUpdate()} className="rounded-xl bg-[#2C2A26] px-3 py-2 text-xs font-black text-white">Save Review</button>
                  <button type="button" onClick={() => requestStatusUpdate('COMPLETED')} className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white">Mark Completed</button>
                  <button type="button" onClick={() => requestStatusUpdate('REJECTED')} className="rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white">Reject</button>
                  <button type="button" onClick={() => requestStatusUpdate('NEEDS_FIX')} className="rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white">Request Fix</button>
                </div>

                <div className="rounded-2xl bg-[#F9F8F6] p-4">
                  <div className={labelClass}>Audit trail</div>
                  <div className="mt-2 max-h-36 space-y-2 overflow-y-auto text-xs text-[#6B665E]">
                    {audits.length === 0 ? 'No audit entries yet.' : audits.map((audit) => <div key={audit.id}>{new Date(audit.changedAt).toLocaleString()} · {audit.action} · {audit.oldStatus ?? '-'} → {audit.newStatus ?? '-'}</div>)}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F9F8F6] p-4">
                  <div className={labelClass}>Simulated email notifications</div>
                  <div className="mt-2 max-h-36 space-y-2 overflow-y-auto text-xs text-[#6B665E]">
                    {notices.length === 0 ? 'No simulated notifications yet.' : notices.map((notice) => <div key={notice.id}>{new Date(notice.createdAt).toLocaleString()} · {notice.subject} · {notice.recipient}</div>)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-[#F9F8F6] p-5 text-sm font-bold text-[#8C857B]">No submission selected.</div>
            )}
          </div>

          <details className="rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-sm">
            <summary className="flex cursor-pointer items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
              <AlertTriangle className="h-4 w-4" />
              Admin cut-off button
            </summary>
            <form onSubmit={createRule} className="mt-3 grid gap-2">
              <input className={inputClass} value={deadline.yearGroup} onChange={(e) => setDeadline({ ...deadline, yearGroup: e.target.value })} placeholder="Year group" />
              <input className={inputClass} value={deadline.designClassNo} onChange={(e) => setDeadline({ ...deadline, designClassNo: e.target.value })} placeholder="Class optional" />
              <select className={inputClass} value={deadline.machine} onChange={(e) => setDeadline({ ...deadline, machine: e.target.value as DTMachineType | 'ALL' })}><option value="ALL">All machines</option><option value="LASER_CUT">Laser Cut</option><option value="THREE_D_PRINT">3D Print</option></select>
              <select className={inputClass} value={deadline.source} onChange={(e) => setDeadline({ ...deadline, source: e.target.value as DTSubmissionSource | 'ALL' })}><option value="ALL">All types</option><option value="DT_PROJECT">DT coursework</option><option value="SPECIAL_REQUEST">Special request</option></select>
              <input className={inputClass} type="datetime-local" value={deadline.deadline} onChange={(e) => setDeadline({ ...deadline, deadline: e.target.value })} />
              <label className="flex items-center gap-2 text-sm font-bold text-[#6B665E]"><input type="checkbox" checked={deadline.enabled} onChange={(e) => setDeadline({ ...deadline, enabled: e.target.checked })} /> Enabled</label>
              <label className="flex items-center gap-2 text-sm font-bold text-[#6B665E]"><input type="checkbox" checked={deadline.blockAfterDeadline} onChange={(e) => setDeadline({ ...deadline, blockAfterDeadline: e.target.checked })} /> Block after deadline</label>
              <textarea className={inputClass} rows={3} value={deadline.studentMessage} onChange={(e) => setDeadline({ ...deadline, studentMessage: e.target.value })} />
              <button type="submit" className="rounded-xl bg-[#D5896F] px-4 py-2 text-sm font-black text-white">Create deadline rule</button>
              <div className="rounded-2xl bg-[#F9F8F6] p-3 text-xs leading-5 text-[#6B665E]">
                {listDeadlineRules().length} deadline rules saved in local demo storage.
              </div>
            </form>
          </details>
        </aside>
      </section>
      {pendingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-[#2C2A26]">Confirm Status Update</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#6B665E]">
              <p>You are changing this request from:</p>
              <div className="rounded-2xl bg-[#F9F8F6] p-3 font-black text-[#2C2A26]">{submissionStatusLabels[pendingStatus.submission.status]}</div>
              <p>to:</p>
              <div className="rounded-2xl bg-[#FFF5F0] p-3 font-black text-[#C4785E]">{submissionStatusLabels[pendingStatus.newStatus]}</div>
              <p>This action will update the record and send an email notification to:</p>
              <div className="rounded-2xl bg-[#F9F8F6] p-3 font-bold text-[#2C2A26]">{pendingStatus.submission.studentEmail}</div>
              <p>Do you want to continue?</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => setPendingStatus(null)} className="rounded-xl border border-[#E5E0D8] px-4 py-2 text-sm font-black text-[#6B665E]">Cancel</button>
              <button type="button" onClick={() => void confirmSubmissionStatusUpdate()} className="rounded-xl bg-[#D5896F] px-4 py-2 text-sm font-black text-white">Confirm and Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
