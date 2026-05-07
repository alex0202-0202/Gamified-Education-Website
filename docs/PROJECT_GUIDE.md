# Project Guide

## Product Focus

This website is a professional Design Technology education platform. It should remain focused on:

- IB MYP Design
- IB DP Design Technology
- EDB S1-S3 Design and Technology
- HKDSE Design and Applied Technology / DAT
- Design project, portfolio, IA, and SBA support
- Materials, manufacturing, CAD, modelling, prototyping, sustainability, ergonomics, systems, and product design

Avoid presenting the project as a general ICT, coding, robotics, or broad STEAM platform. Keep those topics only when they support Design Technology project work.

## Curriculum Separation

Keep IB and Hong Kong / EDB / HKDSE pathways separate.

IB pathway:

- Year 6-Year 10: IB MYP Design
- MYP Criteria A-D
- Year 11-Year 12: IB DP Design Technology
- DP current / last-assessment 2026 topics
- DP new / first-assessment 2027 structure
- IA / design project support

EDB / HKDSE pathway:

- S1-S3 Design and Technology
- S4-S6 HKDSE Design and Applied Technology / DAT
- DAT learning areas
- DAT elective modules
- DAT thematic resources
- DAT SBA / project support

Shared skill links are acceptable for user research, design brief, ideation, sketching, modelling, CAD, prototyping, testing, evaluation, design communication, sustainability, and portfolio evidence.

## Main Feature Areas

Dashboard and navigation:

- Controlled mainly from the React app layout and screen state.
- Keep existing student flow, login flow, progress, XP, teacher/admin tools, and games intact.

Curriculum data:

- `src/data/ib-design/`
- `src/data/ib-design-technology/`
- `src/data/edb-dt/`
- `src/data/hkdse-dat/`
- `src/data/sources/officialReferences.ts`

Shared Design Technology tools:

- `src/features/cad-learning/`
- `src/features/materials-joining/`
- `src/features/box-maker/`
- `src/data/design-skills/`

Question banks:

- `src/data/questionBanks/`
- Shared skill question banks live under `src/data/questionBanks/design-skills/`

## Finger Joint Box Maker / 榫接盒產生器

The Box Maker is an additive shared Design Technology tool. It supports:

- basic box, tray, project case, and teaching previews for other box types
- material thickness, finger size, kerf, and press-fit settings
- fit modes: loose, normal, snug, tight press fit, custom
- press-fit rule: female slot opening is smaller than the male tab
- default tight fit tolerance: `0.2 mm`
- 2D flat panel SVG layout
- SVG export
- synced panel editor for circle holes, rectangles, rounded rectangles, slots, lines, and text
- cut, engrave, and score operations
- safe editable area warnings
- selected-shape numeric editing and duplication
- true Three.js / React Three Fiber 3D assembly preview
- 360 degree orbit rotation, zoom, and pan
- assembled, exploded, joint-highlight, and x-ray display modes
- visible panel thickness and visual tab/slot markers
- isometric / exploded assembly preview
- view rotation and reset controls
- curved cardboard / living hinge SVG generator with straight, wave, cross, rounded slot, and honeycomb patterns

Current limitation:

- The true 3D assembly preview currently shows cut-outs as surface markings. Real boolean cut-through geometry is planned.
- The SVG-based isometric projection remains as a lightweight fallback and exportable teaching view.
- DXF, STL, OBJ, and 3MF export are planned but not implemented.
- Clone-from-file import is listed as a planned workflow only.

## Security and Privacy Rules

Do not commit:

- `.env`
- `.env.local`
- passwords
- production keys
- real student data
- class access codes
- private school data

Demo mode may use browser storage for demonstration only. Production school deployment must use protected backend storage with authentication, role-based access, and row-level security.

Supabase readiness notes:

- The anon key can be public, but production safety depends on Supabase Auth, RLS policies, and role checks.
- Add RLS policies for schools, classes, students, progress records, assessment records, teacher roles, and admin roles before production use.
- Restrict CORS origins for deployed Edge Functions.

## Source and Copyright Rules

Curriculum content should be original summary-only content based on teacher-created summaries and source metadata.

Do not copy official IB, EDB, PDF, DOCX, worksheet, slide, Google Site, or image content word-for-word unless permission is clear.

Do not claim full official curriculum coverage unless content is formally mapped and verified.

Source metadata should remain visible for teacher review.

## Development Workflow

Use additive changes by default.

1. Inspect existing files before editing.
2. Preserve old functions and data.
3. Add new curriculum data in separate files where possible.
4. Avoid duplicate pages, duplicate cards, and duplicate question banks.
5. Keep IB and EDB / HKDSE content separate.
6. Use existing UI style before introducing new design patterns.
7. Run quality checks.
8. Verify important UI changes in the local browser.

## Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## GitHub Push Workflow

For a new local copy that is not yet a Git repository:

```bash
git init
git branch -M main
git remote add origin https://github.com/alex0202-0202/Gamified-Education-Website.git
git add .
git commit -m "Add Design Technology platform content and tools"
git push -u origin main
```

If the remote repository already has commits, use:

```bash
git pull --rebase origin main
git push -u origin main
```

If GitHub authentication fails, sign in with GitHub CLI or configure a personal access token.

## Current QA Notes

Latest local checks:

- `npm run typecheck`: pass
- `npm run lint`: pass with existing warnings
- `npm run build`: pass with large bundle warning

Known technical follow-ups:

- Reduce lint warnings in older shared files.
- Add route-level lazy loading for heavy modules and games.
- Replace SVG-only assembly preview with a true Three.js model when exact 3D cut-outs are required.
- Add DXF export for laser cutters.
- Continue backend privacy work before production school deployment.

## Version History

The project version history is maintained in `CHANGELOG.md`.

Current documentation version:

- `0.3.1-ui-polish`

Use the changelog to record:

- new curriculum content
- game/question bank updates
- Design Technology tool additions
- bug fixes
- security/privacy changes
- known limitations
- deployment-readiness notes
