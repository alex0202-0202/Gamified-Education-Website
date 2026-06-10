import { useState, type FormEvent, type ReactNode } from 'react';
import { CalendarCheck, CheckCircle2, Clock, Edit3, Filter, Shield, UserRound, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  bookingPurposes,
  bookingStatusLabels,
  createBooking,
  dtTeachers,
  isSchoolEmail,
  isStudentOwner,
  listBookings,
  timeSlotLabels,
  updateBookingStatusWithEmail,
  updateBooking,
  yearGroups,
  type DTBookingRequest,
  type DTBookingStatus,
} from '../../../data/dtWorkshop';
import clsx from 'clsx';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

const inputClass = 'w-full rounded-xl border border-[#D8D1C7] bg-white px-3 py-2.5 text-sm text-[#2C2A26] outline-none focus:border-[#D5896F] focus:ring-4 focus:ring-[#D5896F]/15';
const labelClass = 'text-xs font-black uppercase tracking-widest text-[#8C857B]';

const statusColor: Record<DTBookingStatus, string> = {
  SUBMITTED: 'bg-blue-50 text-blue-700 border-blue-100',
  CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  NEED_CHANGE: 'bg-orange-50 text-orange-700 border-orange-100',
  COMPLETED: 'bg-green-50 text-green-700 border-green-100',
  CANCELLED: 'bg-stone-100 text-stone-700 border-stone-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-100',
};

const statusOptions: DTBookingStatus[] = ['SUBMITTED', 'CONFIRMED', 'NEED_CHANGE', 'COMPLETED', 'CANCELLED', 'REJECTED'];

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block space-y-2">
    <span className={labelClass}>{label}</span>
    {children}
  </label>
);

const StatusBadge = ({ status }: { status: DTBookingStatus }) => (
  <span className={clsx('rounded-full border px-3 py-1 text-xs font-black', statusColor[status])}>
    {bookingStatusLabels[status]}
  </span>
);

export const DesignBookingPage = ({ onNavigate }: Props) => {
  const { user, isAdmin } = useAuth();
  const [, setVersion] = useState(0);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [editing, setEditing] = useState<DTBookingRequest | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{ booking: DTBookingRequest; newStatus: DTBookingStatus; remarks?: string } | null>(null);
  const [filters, setFilters] = useState({ teacherId: 'ALL', status: 'ALL', date: '' });
  const [form, setForm] = useState({
    studentEmail: user?.id.includes('@') ? user.id : '',
    studentName: user?.displayName ?? '',
    designClassNo: '',
    yearGroup: 'S4',
    teacherId: 'mr-mok',
    purpose: bookingPurposes[0],
    preferredDate: '',
    preferredTimeSlot: timeSlotLabels[0],
    alternativeTimeSlot: '',
    notes: '',
  });

  const bookings = (() => {
    const all = listBookings();
    const visible = isAdmin
      ? all
      : all.filter((booking) => isStudentOwner(booking.studentEmail, booking.studentName, user?.id ?? ''));
    return visible.filter((booking) => {
      if (filters.teacherId !== 'ALL' && booking.teacherId !== filters.teacherId) return false;
      if (filters.status !== 'ALL' && booking.status !== filters.status) return false;
      if (filters.date && booking.preferredDate !== filters.date) return false;
      return true;
    });
  })();

  const refresh = () => setVersion((value) => value + 1);

  const resetForm = () => {
    setEditing(null);
    setForm({
      studentEmail: user?.id.includes('@') ? user.id : '',
      studentName: user?.displayName ?? '',
      designClassNo: '',
      yearGroup: 'S4',
      teacherId: 'mr-mok',
      purpose: bookingPurposes[0],
      preferredDate: '',
      preferredTimeSlot: timeSlotLabels[0],
      alternativeTimeSlot: '',
      notes: '',
    });
  };

  const submitBooking = (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    if (!form.studentEmail || !form.studentName || !form.designClassNo || !form.yearGroup || !form.preferredDate || !form.preferredTimeSlot) {
      setMessage('Please complete all required booking fields.');
      return;
    }
    if (!isSchoolEmail(form.studentEmail)) {
      setMessage('Use a valid school email address.');
      return;
    }
    const teacher = dtTeachers.find((item) => item.id === form.teacherId) ?? dtTeachers[0];
    if (editing) {
      updateBooking(editing.id, {
        ...form,
        teacherName: teacher.name,
      });
      setMessage(`Updated booking ${editing.bookingNumber}.`);
    } else {
      const created = createBooking({ ...form, teacherName: teacher.name });
      setMessage(`Submitted booking ${created.bookingNumber}.`);
    }
    resetForm();
    refresh();
  };

  const startEdit = (booking: DTBookingRequest) => {
    setEditing(booking);
    setForm({
      studentEmail: booking.studentEmail,
      studentName: booking.studentName,
      designClassNo: booking.designClassNo,
      yearGroup: booking.yearGroup,
      teacherId: booking.teacherId,
      purpose: booking.purpose,
      preferredDate: booking.preferredDate,
      preferredTimeSlot: booking.preferredTimeSlot,
      alternativeTimeSlot: booking.alternativeTimeSlot ?? '',
      notes: booking.notes ?? '',
    });
  };

  const requestAdminStatusUpdate = (booking: DTBookingRequest, status: DTBookingStatus, remarks?: string) => {
    if (booking.status === status) return;
    setPendingStatus({ booking, newStatus: status, remarks: remarks ?? booking.adminRemarks ?? booking.studentVisibleRemarks });
  };

  const saveAdminRemarks = (booking: DTBookingRequest, adminRemarks: string) => {
    updateBooking(booking.id, { adminRemarks, studentVisibleRemarks: adminRemarks });
    refresh();
  };

  const confirmBookingStatusUpdate = async () => {
    if (!pendingStatus || !user) return;
    const result = await updateBookingStatusWithEmail({
      bookingId: pendingStatus.booking.id,
      newStatus: pendingStatus.newStatus,
      studentVisibleRemarks: pendingStatus.remarks,
      internalAdminNote: pendingStatus.remarks,
      changedBy: user.displayName,
    });
    setPendingStatus(null);
    setStatusMessage(result.emailResult?.success === false
      ? 'Status updated, but email could not be sent. Please check email service or send manually.'
      : 'Status updated and email notification sent.');
    refresh();
  };

  const cancelOwn = (booking: DTBookingRequest) => {
    updateBooking(booking.id, { status: 'CANCELLED' });
    refresh();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#2C2A26] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#F4D7C8]">
              <CalendarCheck className="h-4 w-4" />
              /design-booking
            </div>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">Design Teacher Booking</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#E8DED0] md:text-base">
              Book a Design Technology consultation with a teacher to get support for your design project, portfolio, model making, competition preparation, or prototype planning.
            </p>
          </div>
          <button type="button" onClick={() => onNavigate('dashboard')} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#2C2A26] hover:bg-[#F2EFE9]">
            Back to Study Curriculum
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <form onSubmit={submitBooking} className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={labelClass}>Student booking form</div>
              <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">{editing ? `Edit ${editing.bookingNumber}` : 'Submit a Booking'}</h2>
            </div>
            {editing && <button type="button" onClick={resetForm} className="rounded-xl border border-[#E5E0D8] px-3 py-2 text-xs font-black text-[#6B665E]">Cancel edit</button>}
          </div>

          {message && <div className="mt-4 rounded-2xl bg-[#FDF7EC] p-4 text-sm font-bold text-[#8A6430]">{message}</div>}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="School email *"><input className={inputClass} value={form.studentEmail} onChange={(e) => setForm({ ...form, studentEmail: e.target.value })} placeholder="name@school.edu" /></Field>
            <Field label="Full name *"><input className={inputClass} value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} /></Field>
            <Field label="Design class no. *"><input className={inputClass} value={form.designClassNo} onChange={(e) => setForm({ ...form, designClassNo: e.target.value })} placeholder="e.g. 10DT-03" /></Field>
            <Field label="Year group *">
              <select className={inputClass} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}>
                {yearGroups.map((year) => <option key={year}>{year}</option>)}
              </select>
            </Field>
            <Field label="Teacher *">
              <select className={inputClass} value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}>
                {dtTeachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name} · {teacher.role}</option>)}
              </select>
            </Field>
            <Field label="Booking purpose *">
              <select className={inputClass} value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>
                {bookingPurposes.map((purpose) => <option key={purpose}>{purpose}</option>)}
              </select>
            </Field>
            <Field label="Preferred date *"><input type="date" className={inputClass} value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} /></Field>
            <Field label="Preferred time slot *">
              <select className={inputClass} value={form.preferredTimeSlot} onChange={(e) => setForm({ ...form, preferredTimeSlot: e.target.value })}>
                {timeSlotLabels.map((slot) => <option key={slot}>{slot}</option>)}
              </select>
            </Field>
            <Field label="Alternative time slot">
              <select className={inputClass} value={form.alternativeTimeSlot} onChange={(e) => setForm({ ...form, alternativeTimeSlot: e.target.value })}>
                <option value="">No alternative selected</option>
                {timeSlotLabels.map((slot) => <option key={slot}>{slot}</option>)}
              </select>
            </Field>
            <Field label="Booking notes"><textarea rows={4} className={inputClass} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
          </div>

          <button type="submit" className="mt-5 rounded-2xl bg-[#D5896F] px-5 py-3 text-sm font-black text-white hover:bg-[#C4785E]">
            {editing ? 'Update Booking' : 'Submit Booking'}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
              <Clock className="h-4 w-4" />
              Timeslot structure
            </div>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">
              Demo slots are data-driven labels now. A future admin page can replace these with dated capacity-controlled teacher slots.
            </p>
            <div className="mt-3 space-y-2">
              {timeSlotLabels.map((slot) => <div key={slot} className="rounded-xl bg-[#F9F8F6] px-3 py-2 text-sm font-bold text-[#2C2A26]">{slot}</div>)}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
              <UserRound className="h-4 w-4" />
              Available teacher
            </div>
            {dtTeachers.map((teacher) => (
              <div key={teacher.id} className="mt-3 rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <div className="text-base font-black text-[#2C2A26]">{teacher.name}</div>
                <div className="mt-1 text-sm text-[#6B665E]">{teacher.role}</div>
                <div className="mt-2 text-xs font-bold text-[#6B9080]">{teacher.available ? 'Available' : 'Unavailable'}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
              {isAdmin ? <Shield className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
              {isAdmin ? 'Admin booking view' : 'My booking records'}
            </div>
            <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">{isAdmin ? 'All Bookings' : 'Your Bookings'}</h2>
          </div>

          <div className="grid gap-2 md:grid-cols-3">
            <select className={inputClass} value={filters.teacherId} onChange={(e) => setFilters({ ...filters, teacherId: e.target.value })}>
              <option value="ALL">All teachers</option>
              {dtTeachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)}
            </select>
            <select className={inputClass} value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="ALL">All statuses</option>
              {statusOptions.map((status) => <option key={status} value={status}>{bookingStatusLabels[status]}</option>)}
            </select>
            <input type="date" className={inputClass} value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
          </div>
        </div>

        {statusMessage && <div className="mt-4 rounded-2xl bg-[#FDF7EC] p-4 text-sm font-bold text-[#8A6430]">{statusMessage}</div>}

        <div className="mt-5 grid gap-3">
          {bookings.length === 0 && (
            <div className="rounded-2xl bg-[#F9F8F6] p-6 text-sm font-bold text-[#8C857B]">No booking records found.</div>
          )}
          {bookings.map((booking) => (
            <article key={booking.id} className="rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-lg font-black text-[#2C2A26]">{booking.bookingNumber}</div>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[#6B665E]">
                    {booking.studentName} · {booking.studentEmail} · {booking.designClassNo} · {booking.yearGroup}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-[#6B665E]">
                    {booking.purpose} with {booking.teacherName} · {booking.preferredDate} · {booking.preferredTimeSlot}
                  </div>
                  {booking.adminRemarks && <div className="mt-2 rounded-xl bg-white p-3 text-sm text-[#6B665E]">Admin remarks: {booking.adminRemarks}</div>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {!isAdmin && booking.status === 'SUBMITTED' && (
                    <>
                      <button type="button" onClick={() => startEdit(booking)} className="inline-flex items-center gap-1 rounded-xl border border-[#E5E0D8] px-3 py-2 text-xs font-black text-[#6B665E]"><Edit3 className="h-3.5 w-3.5" /> Update</button>
                      <button type="button" onClick={() => cancelOwn(booking)} className="inline-flex items-center gap-1 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-black text-red-700"><XCircle className="h-3.5 w-3.5" /> Cancel</button>
                    </>
                  )}
                  {isAdmin && (
                    <div className="flex flex-wrap gap-2">
                      <select className="rounded-xl border border-[#D8D1C7] bg-white px-3 py-2 text-xs font-bold" value={booking.status} onChange={(e) => requestAdminStatusUpdate(booking, e.target.value as DTBookingStatus, booking.adminRemarks)}>
                        {statusOptions.map((status) => <option key={status} value={status}>{bookingStatusLabels[status]}</option>)}
                      </select>
                      <button type="button" onClick={() => requestAdminStatusUpdate(booking, 'COMPLETED', booking.adminRemarks)} className="inline-flex items-center gap-1 rounded-xl bg-[#E8EFE6] px-3 py-2 text-xs font-black text-[#3F6658]"><CheckCircle2 className="h-3.5 w-3.5" /> Complete</button>
                    </div>
                  )}
                </div>
              </div>
              {isAdmin && (
                <div className="mt-3 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-[#8C857B]" />
                  <input className={inputClass} value={booking.adminRemarks ?? ''} onChange={(e) => saveAdminRemarks(booking, e.target.value)} placeholder="Student-visible remarks" />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      {pendingStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-black text-[#2C2A26]">Confirm Status Update</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#6B665E]">
              <p>You are changing this request from:</p>
              <div className="rounded-2xl bg-[#F9F8F6] p-3 font-black text-[#2C2A26]">{bookingStatusLabels[pendingStatus.booking.status]}</div>
              <p>to:</p>
              <div className="rounded-2xl bg-[#FFF5F0] p-3 font-black text-[#C4785E]">{bookingStatusLabels[pendingStatus.newStatus]}</div>
              <p>This action will update the record and send an email notification to:</p>
              <div className="rounded-2xl bg-[#F9F8F6] p-3 font-bold text-[#2C2A26]">{pendingStatus.booking.studentEmail}</div>
              <p>Do you want to continue?</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => setPendingStatus(null)} className="rounded-xl border border-[#E5E0D8] px-4 py-2 text-sm font-black text-[#6B665E]">Cancel</button>
              <button type="button" onClick={() => void confirmBookingStatusUpdate()} className="rounded-xl bg-[#D5896F] px-4 py-2 text-sm font-black text-white">Confirm and Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
