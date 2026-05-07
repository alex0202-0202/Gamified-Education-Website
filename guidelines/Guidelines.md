**Design Technology Platform Guidelines**

This project should remain a focused Design Technology learning and teaching platform.

Core subject scope:

* IB MYP Design
* IB DP Design Technology
* EDB S1-S3 Design and Technology
* HKDSE Design and Applied Technology / DAT
* Design project, portfolio, IA, and SBA support

Avoid presenting the site as a general ICT, coding, robotics, or broad STEAM platform. Only include CAD, electronics, automation, digital media, systems, robotics, or coding when they directly support Design Technology / DAT project learning.

Development rules:

* Preserve existing dashboard, login, games, scoring, XP, progress, teacher/admin tools, and old data unless a change is explicitly approved.
* Add curriculum content in separate data files where possible.
* Do not duplicate pages, topic cards, or question banks.
* Keep IB and EDB / HKDSE pathways clearly separated.
* Use source metadata for curriculum content.
* Do not copy official IB, EDB, PDF, DOCX, worksheet, slide, or Google Site text word-for-word.
* Do not commit `.env`, passwords, real student data, class codes, or production keys.
* Run `npm run typecheck`, `npm run lint`, and `npm run build` before pushing.

UI rules:

* Serious curriculum, teacher, and admin pages should use a professional school-ready visual style.
* Gamification belongs mainly in student learning activities.
* Use semantic buttons/links for clickable controls.
* Inputs need labels and visible focus states.
* Keep mobile/tablet layouts usable.

<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
