import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Clock, FileUp, Layers, Printer, School, Star, UploadCloud } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext';
import {
  createSubmission,
  getFileExtension,
  isSchoolEmail,
  isStudentOwner,
  laserMaterials,
  listSubmissions,
  machineLabels,
  matchingDeadlineRule,
  previewFileExtensions,
  printMaterials,
  prototypeTypeLabels,
  submissionStatusLabels,
  workingFileExtensions,
  yearGroups,
  type DTMachineType,
  type DTPrototypeType,
  type DTSubmissionSource,
} from '../../../data/dtWorkshop';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

const inputClass = 'w-full rounded-xl border border-[#D8D1C7] bg-white px-3 py-2.5 text-sm text-[#2C2A26] outline-none focus:border-[#D5896F] focus:ring-4 focus:ring-[#D5896F]/15';
const labelClass = 'text-xs font-black uppercase tracking-widest text-[#8C857B]';

const sourceCards: Array<{ source: DTSubmissionSource; title: string; subtitle: string; icon: typeof School }> = [
  {
    source: 'DT_PROJECT',
    title: 'DT coursework',
    subtitle: 'Class project or prototype. Use this for normal DT laser cutting or 3D printing work.',
    icon: School,
  },
  {
    source: 'SPECIAL_REQUEST',
    title: 'Special request',
    subtitle: 'Club, event, competition, or another subject. Use this when a teacher or sponsor is approving work outside normal DT coursework.',
    icon: Star,
  },
];

const Field = ({ label, children, helper }: { label: string; children: ReactNode; helper?: string }) => (
  <label className="block space-y-2">
    <span className={labelClass}>{label}</span>
    {children}
    {helper && <span className="block text-xs leading-5 text-[#8C857B]">{helper}</span>}
  </label>
);

const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(file);
});

export const DTSubmissionPage = ({ onNavigate }: Props) => {
  const { user, isAdmin } = useAuth();
  const [, setVersion] = useState(0);
  const [source, setSource] = useState<DTSubmissionSource>('DT_PROJECT');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    studentEmail: user?.id.includes('@') ? user.id : '',
    studentName: user?.displayName ?? '',
    designClassNo: '',
    teacherName: 'Mr. Mok',
    yearGroup: 'S4',
    prototypeType: 'LO_FI_PROTOTYPE' as DTPrototypeType,
    machine: 'LASER_CUT' as DTMachineType,
    material: laserMaterials[0],
    units: 'mm' as const,
    width: '',
    height: '',
    depth: '',
    quantity: '1',
    workingFileName: '',
    workingFileType: '',
    workingFileDataUrl: '',
    previewImageName: '',
    previewImageDataUrl: '',
    additionalNotes: '',
  });

  const materialOptions = form.machine === 'LASER_CUT' ? laserMaterials : printMaterials;

  const mySubmissions = listSubmissions().filter((submission) => (
    isAdmin || isStudentOwner(submission.studentEmail, submission.studentName, user?.id ?? '')
  ));

  const setMachine = (machine: DTMachineType) => {
    const nextMaterials = machine === 'LASER_CUT' ? laserMaterials : printMaterials;
    setForm({ ...form, machine, material: nextMaterials[0], depth: machine === 'LASER_CUT' ? '' : form.depth });
  };

  const handleWorkingFile = async (file?: File) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm({ ...form, workingFileName: file.name, workingFileType: getFileExtension(file.name), workingFileDataUrl: dataUrl });
  };

  const handlePreviewFile = async (file?: File) => {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setForm({ ...form, previewImageName: file.name, previewImageDataUrl: dataUrl });
  };

  const resetForm = () => {
    setForm({
      studentEmail: user?.id.includes('@') ? user.id : '',
      studentName: user?.displayName ?? '',
      designClassNo: '',
      teacherName: 'Mr. Mok',
      yearGroup: 'S4',
      prototypeType: 'LO_FI_PROTOTYPE',
      machine: 'LASER_CUT',
      material: laserMaterials[0],
      units: 'mm',
      width: '',
      height: '',
      depth: '',
      quantity: '1',
      workingFileName: '',
      workingFileType: '',
      workingFileDataUrl: '',
      previewImageName: '',
      previewImageDataUrl: '',
      additionalNotes: '',
    });
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    const width = Number(form.width);
    const height = Number(form.height);
    const depth = form.depth ? Number(form.depth) : undefined;
    const quantity = Number(form.quantity);
    const workingExt = getFileExtension(form.workingFileName);
    const previewExt = getFileExtension(form.previewImageName);

    if (!form.studentEmail || !form.studentName || !form.designClassNo || !form.teacherName || !form.yearGroup || !form.material || !form.workingFileName) {
      setMessage('Please complete all required fields and upload one working file.');
      return;
    }
    if (!isSchoolEmail(form.studentEmail)) {
      setMessage('Email rule: use a valid school email address.');
      return;
    }
    if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0 || !Number.isFinite(quantity) || quantity <= 0) {
      setMessage('Width, height and quantity must be positive numbers.');
      return;
    }
    if (form.machine === 'THREE_D_PRINT' && (!depth || depth <= 0)) {
      setMessage('Depth is required for 3D print submissions.');
      return;
    }
    if (!workingFileExtensions.includes(workingExt)) {
      setMessage('Working file must be Affinity Designer (.afdesign), SVG, DXF or STL.');
      return;
    }
    if (form.previewImageName && !previewFileExtensions.includes(previewExt)) {
      setMessage('Preview image must be PNG, JPG or JPEG.');
      return;
    }

    const lateRule = matchingDeadlineRule({
      yearGroup: form.yearGroup,
      designClassNo: form.designClassNo,
      machine: form.machine,
      source,
    });
    if (lateRule?.blockAfterDeadline) {
      setMessage(lateRule.studentMessage || 'This submission is closed for your class/year group.');
      return;
    }

    const created = await createSubmission({
      source,
      studentEmail: form.studentEmail,
      studentName: form.studentName,
      designClassNo: form.designClassNo,
      yearGroup: form.yearGroup,
      teacherName: form.teacherName,
      prototypeType: form.prototypeType,
      machine: form.machine,
      material: form.material,
      units: 'mm',
      width,
      height,
      depth: form.machine === 'THREE_D_PRINT' ? depth : undefined,
      quantity,
      workingFileName: form.workingFileName,
      workingFileType: workingExt,
      workingFileDataUrl: form.workingFileDataUrl || undefined,
      previewImageName: form.previewImageName || undefined,
      previewImageDataUrl: form.previewImageDataUrl || undefined,
      additionalNotes: [
        lateRule && !lateRule.blockAfterDeadline ? `Late submission flag: ${lateRule.studentMessage}` : '',
        form.additionalNotes,
      ].filter(Boolean).join('\n'),
    });
    setMessage(`Submitted ${created.caseNumber}. Your request is now in review.`);
    resetForm();
    setVersion((value) => value + 1);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#2C2A26] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#F4D7C8]">
              <UploadCloud className="h-4 w-4" />
              /dt-submission
            </div>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">DT Coursework Submission</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#E8DED0] md:text-base">
              Submit your Design & Technology laser cutting or 3D printing working file for a lo-fi or hi-fi prototype. Fill in the form below.
            </p>
          </div>
          {isAdmin && (
            <button type="button" onClick={() => onNavigate('submission_dashboard')} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#2C2A26] hover:bg-[#F2EFE9]">
              Open Submission Dashboard
            </button>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {sourceCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.source}
              type="button"
              onClick={() => setSource(card.source)}
              className={clsx('rounded-3xl border p-5 text-left shadow-sm transition', source === card.source ? 'border-[#D5896F] bg-[#FFF6F0]' : 'border-[#E5E0D8] bg-white hover:border-[#D5896F]')}
            >
              <Icon className="h-8 w-8 text-[#D5896F]" />
              <h2 className="mt-3 text-xl font-black text-[#2C2A26]">{card.title} {card.source === 'DT_PROJECT' ? '📄' : '⭐'}</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{card.subtitle}</p>
            </button>
          );
        })}
      </section>

      <section className="rounded-3xl border border-[#F1D2C5] bg-[#FFF5F0] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Clock className="mt-1 h-6 w-6 flex-shrink-0 text-[#D5896F]" />
          <div>
            <h2 className="text-lg font-black text-[#2C2A26]">⏰ Please Allow Processing Time</h2>
            <p className="mt-2 text-sm leading-7 text-[#6B665E]">
              Submitting a file does not mean same-day production. Every submission goes through review, approval, queueing, and production — each step takes time. Turnaround depends on file readiness, workload, machine availability, and job priority. DT lesson-related work may be prioritised over non-DT requests. Incomplete files, wrong formats, or revision requests will extend processing time. Plan ahead and submit early to allow enough time for revisions.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={submit} className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className={labelClass}>One submission = one working file</div>
              <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">Upload and Submit</h2>
            </div>
            <div className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black text-[#6B665E]">{source === 'DT_PROJECT' ? 'DT coursework' : 'Special request'}</div>
          </div>

          {message && <div className="mt-4 rounded-2xl bg-[#FDF7EC] p-4 text-sm font-bold text-[#8A6430]">{message}</div>}

          <div className="mt-5 space-y-6">
            <div>
              <h3 className="text-lg font-black text-[#2C2A26]">Section A — Student Details</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <Field label="Email *" helper="Use your school email address."><input className={inputClass} value={form.studentEmail} onChange={(e) => setForm({ ...form, studentEmail: e.target.value })} placeholder="name@school.edu" /></Field>
                <Field label="Full Name *"><input className={inputClass} value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} /></Field>
                <Field label="Design Class No. *"><input className={inputClass} value={form.designClassNo} onChange={(e) => setForm({ ...form, designClassNo: e.target.value })} /></Field>
                <Field label="Teacher Name *"><input className={inputClass} value={form.teacherName} onChange={(e) => setForm({ ...form, teacherName: e.target.value })} /></Field>
                <Field label="Year Group *"><select className={inputClass} value={form.yearGroup} onChange={(e) => setForm({ ...form, yearGroup: e.target.value })}>{yearGroups.map((year) => <option key={year}>{year}</option>)}</select></Field>
                <Field label="Prototype Type *"><select className={inputClass} value={form.prototypeType} onChange={(e) => setForm({ ...form, prototypeType: e.target.value as DTPrototypeType })}>{Object.entries(prototypeTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#2C2A26]">Section B — Machine & Material</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <Field label="Machine *"><select className={inputClass} value={form.machine} onChange={(e) => setMachine(e.target.value as DTMachineType)}>{Object.entries(machineLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
                <Field label="Material *"><select className={inputClass} value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })}>{materialOptions.map((material) => <option key={material}>{material}</option>)}</select></Field>
                <Field label="Units"><input className={inputClass} value="mm" disabled /></Field>
                <Field label="Width *"><input className={inputClass} type="number" min="1" value={form.width} onChange={(e) => setForm({ ...form, width: e.target.value })} /></Field>
                <Field label="Height *"><input className={inputClass} type="number" min="1" value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} /></Field>
                <Field label="Depth, if 3D print"><input className={inputClass} type="number" min="1" disabled={form.machine === 'LASER_CUT'} value={form.depth} onChange={(e) => setForm({ ...form, depth: e.target.value })} /></Field>
                <Field label="Quantity"><input className={inputClass} type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /></Field>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#2C2A26]">Section C — Files</h3>
              <div className="mt-3 rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4 text-sm leading-6 text-[#6B665E]">
                One submission = one working file. For laser cutting, that working file must contain one page / one artboard only. If you need a second page, upload it as a separate submission so it joins the queue separately.
              </div>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <Field label="Working File *" helper="Accepted: Affinity Designer (.afdesign), SVG, DXF, STL.">
                  <input className={inputClass} type="file" accept=".afdesign,.svg,.dxf,.stl" onChange={(e) => void handleWorkingFile(e.target.files?.[0])} />
                  {form.workingFileName && <div className="mt-2 text-xs font-bold text-[#6B9080]">{form.workingFileName}</div>}
                </Field>
                <Field label="Preview Image" helper="Accepted: PNG, JPG, JPEG. Required only when teacher/technician asks for it.">
                  <input className={inputClass} type="file" accept=".png,.jpg,.jpeg" onChange={(e) => void handlePreviewFile(e.target.files?.[0])} />
                  {form.previewImageName && <div className="mt-2 text-xs font-bold text-[#6B9080]">{form.previewImageName}</div>}
                </Field>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#2C2A26]">Section D — Additional Notes</h3>
              <Field label="Additional Notes" helper="Add any information the technician should know, such as material choice, scale notes, or special instructions.">
                <textarea rows={4} className={inputClass} value={form.additionalNotes} onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })} />
              </Field>
              <div className="mt-3 rounded-2xl bg-[#FDF7EC] p-4 text-sm leading-6 text-[#6B665E]">
                🕑 Reminder: Submitting does not guarantee same-day production. All jobs require review and queueing time. Please submit well ahead of any deadline.
                <br />
                🔒 Class check: Use your real Design Class No. and Year Group. The system checks your student email against the class list, so choosing another year or class will not bypass deadline rules.
              </div>
            </div>
          </div>

          <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#D5896F] px-5 py-3 text-sm font-black text-white hover:bg-[#C4785E]">
            <FileUp className="h-4 w-4" />
            Submit Request
          </button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className={labelClass}>Guided submission steps</div>
            {['Who are you? Student details', 'What are you making? Year, machine, material', 'How big is it? Dimensions and limits', 'Upload and submit One working file'].map((step, index) => (
              <div key={step} className="mt-3 flex gap-3 rounded-2xl bg-[#F9F8F6] p-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2C2A26] text-xs font-black text-white">{index + 1}</div>
                <div className="text-sm font-bold leading-6 text-[#2C2A26]">{step}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className={labelClass}>Checklist notes</div>
            <div className="mt-3 space-y-2 text-sm leading-6 text-[#6B665E]">
              {['Fill in your student details exactly as school records.', 'Select your year and machine to see the correct file rules.', 'Enter your design dimensions. Check they are within limits.', 'Upload the correct working file and preview image if required.', '✓ Allow enough time — production is not instant.'].map((note) => <div key={note}>{note}</div>)}
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
          <Layers className="h-4 w-4" />
          {isAdmin ? 'All local demo submissions' : 'My submissions'}
        </div>
        <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">Submission Status</h2>
        <div className="mt-5 grid gap-3">
          {mySubmissions.length === 0 && <div className="rounded-2xl bg-[#F9F8F6] p-6 text-sm font-bold text-[#8C857B]">No submissions yet.</div>}
          {mySubmissions.map((submission) => (
            <article key={submission.id} className="rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-lg font-black text-[#2C2A26]">{submission.caseNumber}</div>
                    <span className="rounded-full border bg-white px-3 py-1 text-xs font-black text-[#6B665E]">{submissionStatusLabels[submission.status]}</span>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[#6B665E]">{submission.studentName} · {submission.designClassNo} · {submission.yearGroup}</div>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs font-bold text-[#8C857B]">
                    <span className="rounded-full bg-white px-2 py-1">{machineLabels[submission.machine]}</span>
                    <span className="rounded-full bg-white px-2 py-1">{submission.material}</span>
                    <span className="rounded-full bg-white px-2 py-1">{submission.width} × {submission.height}{submission.depth ? ` × ${submission.depth}` : ''} mm</span>
                    <span className="rounded-full bg-white px-2 py-1">Qty {submission.quantity}</span>
                  </div>
                  {submission.studentVisibleRemarks && <div className="mt-3 rounded-xl bg-white p-3 text-sm text-[#6B665E]">Technician remarks: {submission.studentVisibleRemarks}</div>}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#6B9080]">
                  {submission.status === 'COMPLETED' ? <CheckCircle2 className="h-4 w-4" /> : <Printer className="h-4 w-4" />}
                  {submission.workingFileName}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
