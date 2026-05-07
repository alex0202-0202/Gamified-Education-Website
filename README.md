# Gamified Education Website

## Design Technology Learning Platform

This project is a focused Design Technology learning and teaching platform for schools. It supports:

- IB MYP Design
- IB DP Design Technology
- EDB S1-S3 Design and Technology
- HKDSE Design and Applied Technology / DAT
- Design project and portfolio development
- IB IA and HKDSE DAT SBA preparation
- Materials, manufacturing, CAD, modelling, prototyping, sustainability, ergonomics, systems, and product design
- Teacher resource planning and curriculum mapping
- Student practice through interactive learning tools and game-based quizzes

The platform is intentionally **not** a general ICT, coding, robotics, or multi-subject education website. Automation, CAD, electronics, systems, digital media, coding, and robotics should only appear where they directly support Design Technology / DAT learning.

## Project Status

Current version: `0.3.1-ui-polish`

Current deployment stage: local Vite development build, suitable for curriculum review and school-demo testing.

Production readiness note: authentication, student data storage, and role-based access control still need a real backend deployment before use with real school data.

## Main User Groups

- S1-S3 Design and Technology students
- S4-S6 HKDSE DAT students
- IB MYP Design students
- IB DP Design Technology students
- Design Technology teachers
- DAT subject panel heads
- IB coordinators and curriculum leaders
- School leaders reviewing learning resources

## Main Features

### Student Dashboard

Students can enter demo mode and access curriculum modules, resources, games, and shared Design Technology tools.

Main files:

- `src/app/App.tsx`
- `src/app/components/Layout.tsx`
- `src/app/components/LevelSelect.tsx`
- `src/app/components/ModuleViewer.tsx`
- `src/app/context/AuthContext.tsx`
- `src/app/context/GameContext.tsx`
- `src/app/context/LanguageContext.tsx`

### Curriculum Pathways

The platform separates curriculum pathways so IB and Hong Kong / EDB / HKDSE content are not mixed.

IB pathway:

- IB MYP Design, Year 6-Year 10
- MYP Criteria A-D
- IB DP Design Technology, Year 11-Year 12
- DP current / last-assessment 2026 topics
- DP new / first-assessment 2027 structure
- IA / design project support
- IB case studies and research-for-design support

Data files:

- `src/data/ib-design/`
- `src/data/ib-design-technology/`

EDB / HKDSE pathway:

- S1-S3 Design and Technology
- S4-S6 HKDSE Design and Applied Technology / DAT
- DAT learning areas
- DAT elective modules
- DAT thematic resources
- DAT case studies
- DAT SBA / design project support

Data files:

- `src/data/edb-dt/`
- `src/data/hkdse-dat/`

### Fun Learning Hub

The Fun Learning Hub provides game-based practice while preserving existing scoring, XP, completion, and progress logic.

Main files:

- `src/app/components/FunLearning.tsx`
- `src/app/components/DrivingGame.tsx`
- `src/data/questionBanks/`
- `src/data/questionBanks/index.ts`

Question bank areas:

- `src/data/questionBanks/ib-myp/`
- `src/data/questionBanks/ib-dp/`
- `src/data/questionBanks/edb-dt/`
- `src/data/questionBanks/hkdse-dat/`
- `src/data/questionBanks/design-skills/`

### Orthographic Projection & Beginner CAD

This shared Design Technology skill panel supports:

- plan view
- front elevation
- back elevation
- left/right views
- isometric view
- section view
- beginner CAD thinking
- simple 2D-to-3D learning

Main files:

- `src/features/cad-learning/OrthographicProjectionPanel.tsx`
- `src/features/cad-learning/CADWorkspace2D.tsx`
- `src/features/cad-learning/ModelPreview3D.tsx`
- `src/features/cad-learning/ViewSelector.tsx`
- `src/features/cad-learning/SectionViewPanel.tsx`
- `src/data/design-skills/orthographicProjection.ts`
- `src/data/questionBanks/design-skills/orthographicProjectionQuestions.ts`

### Joining Methods & Adhesives

This shared skill panel supports material joining decisions for:

- wood
- cardboard
- acrylic
- plastics
- metal
- fabric and flexible materials
- adhesive selection
- joint selection
- project examples and safety notes

Main files:

- `src/features/materials-joining/JoiningMethodsPanel.tsx`
- `src/features/materials-joining/AdhesiveSelector.tsx`
- `src/features/materials-joining/JointingMethodCards.tsx`
- `src/data/design-skills/joiningMethods.ts`
- `src/data/questionBanks/design-skills/joiningMethodsQuestions.ts`

### Finger Joint Box Maker / 榫接盒產生器

This is a shared Design Technology fabrication tool for classroom laser-cutting and project-case learning.

It supports:

- basic box, tray, and project case generation
- full box-method list for teaching context
- material thickness, finger size, kerf, and press-fit settings
- fit modes: loose, normal, snug, tight press fit, custom
- press-fit rule: female slot opening is slightly smaller than male tab
- default tight fit tolerance: `0.2 mm`
- 2D flat panel SVG layout
- SVG export
- synced panel editor for circle holes, rectangles, rounded rectangles, slots, lines, and text
- cut, engrave, and score modes
- shape placement warnings
- isometric and exploded assembly preview
- view rotation and reset controls
- curved cardboard / living hinge SVG generator
- straight dashed, wave, cross, rounded slot, and honeycomb curve patterns

Main files:

- `src/features/box-maker/FingerJointBoxMakerPanel.tsx`
- `src/data/design-skills/fingerJointBoxMaker.ts`
- `src/data/questionBanks/design-skills/fingerJointBoxQuestions.ts`

Current limitation:

- The assembly view is an SVG-based isometric preview, not a real Three.js mesh with boolean cut-through geometry.
- DXF, STL, OBJ, and 3MF export are not implemented yet.
- Clone-from-file import is listed as a planned workflow only.

## How the Code Works

### Application Entry

The Vite React application starts at:

- `src/main.tsx`

The main app shell and screen state are controlled by:

- `src/app/App.tsx`
- `src/app/components/Layout.tsx`

The app uses custom screen state rather than full route-based React Router routing. The sidebar updates the current screen and renders the matching component.

### Context Providers

The app uses React context for shared runtime state:

- `AuthContext.tsx`: demo student/admin login state
- `GameContext.tsx`: XP, progress, completion, and scoring state
- `LanguageContext.tsx`: bilingual UI support

Production note: current demo data behavior is not suitable for real student data. Production deployment should use Supabase Auth or another protected backend with role-based access control.

### Data-Driven Curriculum

Most curriculum additions are stored as TypeScript data files rather than hard-coded JSX. This makes the platform easier to maintain and reduces duplicate content.

Important folders:

```text
src/data/ib-design/
src/data/ib-design-technology/
src/data/edb-dt/
src/data/hkdse-dat/
src/data/questionBanks/
src/data/design-skills/
src/data/sources/
```

### Shared Feature Modules

Large specialist learning tools live in `src/features/`:

```text
src/features/auth/
src/features/box-maker/
src/features/cad-learning/
src/features/gradebook/
src/features/materials-joining/
```

### Supabase Readiness

Supabase placeholders live in:

- `utils/supabase/info.tsx`
- `supabase/functions/server/`
- `.env.example`

The anon key can be public, but real school deployment requires Supabase Auth, Row Level Security, role checks, and strict CORS.

## Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server on port `5173`.

```bash
npm run typecheck
```

Runs TypeScript without emitting files.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run build
```

Builds the production bundle into `dist/`.

## Environment Variables

Use `.env.example` as the template.

```bash
cp .env.example .env.local
```

Important values:

```text
VITE_AUTH_MODE=demo
VITE_ENABLE_DEMO_ADMIN=false
VITE_DEMO_ADMIN_ACCESS_CODE=
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_ANON_KEY=
ALLOWED_ORIGINS=http://localhost:5173
```

Never commit real `.env`, passwords, production keys, student data, or class access codes.

## Quality Check Status

Latest known local checks:

- `npm run typecheck`: passes
- `npm run build`: passes
- `npm run lint`: passes with existing warnings

Known warnings:

- Some existing files use `any`.
- Some shared UI/context files trigger React Fast Refresh warnings.
- `DrivingGame.tsx` has existing hook dependency warnings.
- Vite reports a large main bundle warning.

These are not blocking the current upload, but should be improved before production release.

## Security and Student Data Privacy

Current state:

- Demo login is available for local testing.
- Demo student progress may use browser-side state/storage.
- Admin demo access is disabled by default unless enabled through environment variables.

Production requirements:

- protected student accounts
- teacher accounts
- admin accounts
- school tenancy
- class membership
- role-based access control
- Supabase RLS or equivalent database policies
- secure assessment records
- audit logs
- privacy and consent workflow
- no hard-coded passwords in frontend code

## Source and Copyright Policy

Curriculum content should be original summary-only content based on teacher-created summaries and verified source metadata.

Do not copy official IB, EDB, PDF, DOCX, worksheet, slide, Google Site, or image content word-for-word unless permission is explicit.

Do not claim full official curriculum coverage unless the content is formally mapped and verified.

Official/source metadata lives in:

- `src/data/sources/officialReferences.ts`

## Version History

See [CHANGELOG.md](CHANGELOG.md).

Short summary:

- `0.3.1`: Student-facing UI polish for login, dashboard, navigation, quick access and responsive layout.
- `0.3.0`: GitHub-ready documentation, synced Finger Joint Box Maker panel editor, SVG assembly preview, expanded shared Design Technology tools.
- `0.2.0`: IB / EDB / HKDSE curriculum data additions and question bank expansion.
- `0.1.0`: Original gamified education website base with dashboard, modules, games, XP, progress, and demo login.

## Deployment Notes

For local development:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

Deploy the generated `dist/` folder only after setting environment variables and confirming backend/data privacy requirements.

## Recommended Next Improvements

1. Add React Router or route-level navigation for deep links.
2. Lazy-load heavy modules and games to reduce the main bundle.
3. Replace SVG-only Box Maker assembly preview with true Three.js geometry.
4. Add DXF export for laser cutters.
5. Add Supabase Auth, tables, and RLS policies.
6. Reduce lint warnings in legacy files.
7. Add automated unit tests for scoring, XP, question filtering, and Box Maker geometry.
8. Add teacher/admin backend workflows for classes, progress, and assessment records.

## Repository

GitHub:

```text
https://github.com/alex0202-0202/Gamified-Education-Website
```
