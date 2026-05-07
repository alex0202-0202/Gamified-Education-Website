
# Design Technology Learning Platform

A focused Design Technology learning and teaching platform for:

- IB MYP Design and IB DP Design Technology
- EDB S1-S3 Design and Technology
- HKDSE Design and Applied Technology / DAT

The site supports curriculum pathways, project and portfolio preparation, IA / SBA support, materials and manufacturing learning, design process learning, assessment practice, teacher resources, and shared Design Technology skill tools.

This is not a general ICT, coding, robotics, or multi-subject education platform. Automation, CAD, electronics, systems, digital media, and prototyping content should only be used where it directly supports Design Technology or DAT learning.

## Current Major Areas

- Student dashboard and topic/module learning flow
- Fun Learning Hub with game-based practice
- XP, progress, scoring, and completion tracking
- Teacher/admin resource areas
- IB Design curriculum pathway
- EDB / HKDSE DT and DAT curriculum pathway
- Orthographic Projection & Beginner CAD panel
- Joining Methods & Adhesives panel
- Finger Joint Box Maker / 榫接盒產生器 with SVG export, press-fit logic, kerf settings, 2D panel layout, synced panel shape editor, and isometric/exploded assembly preview

## Running the Code

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

## Quality Checks

Run these before pushing changes:

```bash
npm run typecheck
npm run lint
npm run build
```

Current known status:

- `typecheck` passes.
- `build` passes.
- `lint` passes with existing warnings in older files. These warnings should be reduced gradually without blocking additive curriculum/tool work.
- Vite reports a large main bundle warning. Further route splitting and lazy loading are recommended.

## Documentation

See [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md) for architecture notes, workflow guidelines, QA steps, security/privacy notes, and current limitations.

## Environment

Use `.env.example` as the template. Do not commit real `.env` files, production keys, passwords, or student data.
  
