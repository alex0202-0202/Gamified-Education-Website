# Changelog

All notable project changes are summarized here.

## 0.3.1-ui-polish - 2026-05-07

### Added

- More welcoming two-column login screen with clear Design Technology identity.
- Login feature highlights for curriculum pathways, portfolio work, maker tools, and practice games.
- Student dashboard hero with learning-path explanation.
- Dashboard quick access cards for:
  - Project Portfolio
  - Practice Games
  - Orthographic / CAD
  - Joining Methods
- Dashboard summary metrics for modules, periods, and progress.
- Stronger XP progress card with circular and linear progress indicators.
- Step labels on junior DT module cards.

### Improved

- Sidebar labels are clearer and less technical.
- Resource labels no longer use vague "Add-on" wording.
- Design tools are separated visually in the sidebar.
- Layout now behaves better on tablet and narrow screens.
- Main header wraps more safely and avoids cramped controls.
- Module cards are semantic buttons with visible focus states.

### Preserved

- Existing navigation state.
- Existing curriculum data.
- Existing dashboard functions.
- Existing login behavior.
- Existing games, scoring, XP, and progress logic.

## 0.3.0-school-ready-additive - 2026-05-07

### Added

- Full GitHub-ready documentation in `README.md`.
- Project guide in `docs/PROJECT_GUIDE.md`.
- Design Technology build guidelines in `guidelines/Guidelines.md`.
- Version history in `CHANGELOG.md`.
- GitHub-ready project archive folder and zip outside the repository working tree.
- Finger Joint Box Maker / 榫接盒產生器.
- Box Maker material presets, kerf settings, press-fit settings, and fit modes.
- Press-fit calculation logic:
  - female slot opening smaller than male tab
  - default tight fit tolerance of `0.2 mm`
  - optional kerf compensation
  - material caliper reminder
- Box Maker 2D SVG panel preview and SVG export.
- Synced panel editor for:
  - circle holes
  - rectangle cut-outs
  - rounded rectangles
  - slots
  - lines
  - text labels
  - cut / engrave / score operations
- Shape validation warnings for panel bounds and joint-edge proximity.
- SVG escaping for user-entered text labels.
- Isometric and exploded assembly preview for teaching 榫接 assembly.
- View rotation and reset controls for the assembly preview.
- Curved cardboard / living hinge generator with:
  - straight dashed grid
  - wave grid
  - cross grid
  - rounded slot grid
  - honeycomb grid
- Orthographic Projection & Beginner CAD learning panel.
- Joining Methods & Adhesives learning panel.
- Shared Design Technology question banks for CAD, joining, adhesives, and finger joint boxes.

### Improved

- README now explains project purpose, code structure, setup, commands, feature areas, data folders, security notes, and current limitations.
- `.gitignore` excludes local editor settings, build output, dependencies, and environment files.
- Demo authentication structure documents production Supabase/Auth requirements.
- Source metadata and copyright-safe curriculum use rules are documented.

### Preserved

- Existing dashboard.
- Existing login flow.
- Existing games.
- Existing Fun Learning Hub.
- Existing scoring, XP, completion, and progress logic.
- Existing teacher/admin resources.
- Existing curriculum content and data.

### Known Limitations

- Box Maker assembly preview is SVG-based isometric projection, not true Three.js mesh geometry.
- DXF export is not implemented yet.
- STL, OBJ, and 3MF export are not implemented yet.
- Clone-from-file import is planned only.
- Main JS bundle is still large and should be split with lazy loading.
- Lint still reports existing warnings in legacy files.
- Production school deployment still needs backend authentication, database storage, and RLS policies.

## 0.2.0-curriculum-additive - 2026-05-07

### Added

- IB curriculum pathway data:
  - IB MYP Design Year 6-Year 10
  - MYP Criteria A-D
  - IB DP Design Technology current / last-assessment 2026 topics
  - IB DP Design Technology new / first-assessment 2027 structure
  - IA support
  - research-for-design support
  - case study support
- EDB / HKDSE pathway data:
  - S1-S3 Design and Technology
  - S4-S6 HKDSE Design and Applied Technology / DAT
  - DAT learning areas
  - DAT elective modules
  - DAT thematic resources
  - DAT case studies
  - SBA support
- S1 Design and Technology add-on content:
  - teaching examples
  - source metadata
  - S1 question bank
- Official/source reference metadata.

### Improved

- Curriculum content is separated by pathway rather than merged.
- IB and EDB / HKDSE data are stored in separate data folders.
- New content is additive and avoids replacing old functions.

## 0.1.1-school-readiness-fixes - 2026-05-07

### Fixed

- Removed visible hard-coded admin credentials from frontend behavior.
- Reworked demo admin access to use environment variables.
- Clarified demo login versus production school authentication.
- Added environment template.
- Added TypeScript, lint, and build scripts.
- Fixed stale state issue in final quiz scoring.
- Removed double XP awarding issue in the driving game logic.
- Added scroll reset behavior for screen/topic navigation.
- Replaced dynamic Tailwind class risk in module viewer patterns where safe.

### Added

- Demo-mode privacy notes.
- Gradebook/progress service structure for future server-side storage.
- TODO notes for Supabase Auth, RLS, teacher roles, class access, and student privacy.

## 0.1.0-original-base

### Added

- Original gamified education website base.
- Student dashboard.
- Topic/module learning flow.
- Materials database.
- Fun Learning Hub.
- Driving game.
- XP, progress, and scoring system.
- Demo login flow.
- Teacher/admin-related UI areas.
- Initial curriculum and module data.
