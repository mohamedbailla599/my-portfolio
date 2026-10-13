# Portfolio content

All site copy lives in these JSON files. Components never contain project, skill, education or experience text. `lib/portfolio-data.ts` validates every file when the app builds or starts; a mistake fails with a message naming the file, entry and field (for example `data/projects.json[2].github: URL must start with https://`).

| File | What it controls |
| --- | --- |
| `profile.json` | Name, role, availability, contact links, CV and portrait paths, languages, About strengths |
| `projects.json` | Project cards and their detail dialog |
| `skills.json` | Skill categories and skills |
| `education.json` | Education entries on the timeline |
| `experience.json` | Internships, jobs and achievements on the timeline |
| `site.json` | Navigation links and hero statistics |

Unknown field names are rejected, so a typo such as `githhub` is caught instead of silently ignored. Optional fields can be omitted or left as `""`; the matching UI is hidden.

## Add a project

Append an object to `projects.json`. Order in the file is the order on the page.

```json
{
  "id": "my-project",
  "number": "06",
  "name": "My Project",
  "eyebrow": "Backend · API",
  "description": "One or two sentences.",
  "stack": ["TypeScript", "PostgreSQL"],
  "status": "Web application",
  "github": "https://github.com/user/repo",
  "highlights": ["First point.", "Second point."],
  "note": "Optional footnote.",
  "illustration": "booking"
}
```

- `id` is a unique, lowercase, hyphenated identifier.
- `github`, `note`, `accolade` and `accoladeBadge` are optional. `github` must be an `https://github.com/...` URL. With no `github`, the repository button is hidden.
- `accolade` is the full text shown in the dialog; `accoladeBadge` is the shorter text on the card (falls back to `accolade`).
- `illustration` selects an SVG from `components/portfolio/project-illustrations.tsx` (`booking`, `greenflow`, `traffiq`, `pos`, `crowdsense`). An unknown key renders a neutral fallback panel instead of failing. A new illustration needs a new component and a `case` in `ProjectIllustration`.
- The hero statistic "Featured projects" reads its number from the project count automatically.

## Add a skill

In `skills.json`, add to a category's `skills` array:

```json
{ "name": "Redis", "icon": "fallback-not-allowed", "level": "courses", "note": "Optional" }
```

- `level` is one of `project`, `courses`, `studied`, `notions`, `tutorial`.
- `icon` must be a key in `components/portfolio/tech-icon.tsx` (`brand` or `generic` maps). An unknown key fails validation. To add a brand, import its icon there and add one line to the map.
- To add a category, append an object with a unique `id`, a `title`, optional `"wide": true`, and `skills`.

## Add education, experience or an achievement

Add an object to `education.json` or `experience.json`. Dates are `"YYYY"` or `"YYYY-MM"`.

```json
{
  "id": "my-internship",
  "type": "experience",
  "title": "Software Engineering Intern",
  "organization": "Company",
  "location": "City",
  "start": "2025-06",
  "end": "2025-08",
  "period": "Jun — Aug 2025",
  "highlights": ["What I did."]
}
```

- `type` is `experience` or `achievement`. Education entries use `qualification`, `institution` and `details` instead.
- Set `"current": true` and omit `end` for ongoing entries; it displays as `<start> — Present`.
- `period` is optional display text. Without it the period is derived from `start` and `end`.
- `id` must be unique across both files. The two files are merged into one timeline, newest first: later start year first, then the entry that ends later. You do not order entries by hand.

## Other

- Strength icons in `profile.json` are `layers`, `target`, `rocket` or `users`.
- The orbital hero animation geometry (`orbitBodies`) stays in `lib/portfolio-data.ts` because it is animation configuration, not content.
