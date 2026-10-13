import educationJson from '@/data/education.json'
import experienceJson from '@/data/experience.json'
import profileJson from '@/data/profile.json'
import projectsJson from '@/data/projects.json'
import siteJson from '@/data/site.json'
import skillsJson from '@/data/skills.json'
import { isTechIconKey } from '@/components/portfolio/tech-icon'
import {
  assertUnique,
  asArray,
  asObject,
  fail,
  noUnknownKeys,
  optionalBoolean,
  optionalDate,
  optionalString,
  optionalStringArray,
  optionalUrl,
  requireAssetPath,
  requireDate,
  requireEmail,
  requireEnum,
  requireStableId,
  requireString,
  requireStringArray,
  requireUrl,
} from './content-validation'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export const strengthIconKeys = ['layers', 'target', 'rocket', 'users'] as const
export type StrengthIconKey = (typeof strengthIconKeys)[number]

export interface Language {
  name: string
  level: string
}

export interface Profile {
  name: string
  firstName: string
  role: string
  availability: string
  email: string
  linkedin: string
  github: string
  cv: string
  portrait: string
  languages: Language[]
}

export interface Strength {
  icon: StrengthIconKey
  title: string
  text: string
}

export interface NavLink {
  id: string
  label: string
}

export interface HeroStat {
  value: string
  label: string
}

export interface Project {
  id: string
  number: string
  name: string
  eyebrow: string
  description: string
  stack: string[]
  status: string
  accolade?: string
  /** Short text for the badge on the project card. Falls back to `accolade`. */
  accoladeBadge?: string
  github?: string
  highlights: string[]
  note?: string
  /** Key of an illustration in `project-illustrations.tsx`; unknown keys render a neutral fallback. */
  illustration: string
}

export const skillLevels = ['project', 'courses', 'studied', 'notions', 'tutorial'] as const
export type SkillLevel = (typeof skillLevels)[number]

export interface Skill {
  name: string
  icon: string
  level: SkillLevel
  note?: string
}

export interface SkillCategory {
  id: string
  title: string
  wide?: boolean
  skills: Skill[]
}

export interface EducationEntry {
  id: string
  qualification: string
  institution: string
  location?: string
  start: string
  end?: string
  current?: boolean
  period?: string
  details?: string[]
}

export const experienceTypes = ['experience', 'achievement'] as const
export type ExperienceType = (typeof experienceTypes)[number]

export interface ExperienceEntry {
  id: string
  type: ExperienceType
  title: string
  organization: string
  location?: string
  start: string
  end?: string
  current?: boolean
  period?: string
  highlights?: string[]
}

export interface TimelineEntry {
  id: string
  period: string
  kind: 'Education' | 'Experience' | 'Achievement'
  title: string
  place: string
  current?: boolean
  points?: string[]
}

export const skillLevelLabels: Record<SkillLevel, string> = {
  project: 'Project',
  courses: 'Courses',
  studied: 'Studied',
  notions: 'Notions',
  tutorial: 'Tutorial',
}

/* -------------------------------------------------------------------------- */
/* Parsers: JSON (unknown) -> typed data                                      */
/* -------------------------------------------------------------------------- */

const GITHUB_HOSTS = ['github.com'] as const
const LINKEDIN_HOSTS = ['linkedin.com'] as const

function parseProfile(raw: unknown): { profile: Profile; strengths: Strength[] } {
  const file = 'data/profile.json'
  const obj = asObject(raw, file)
  noUnknownKeys(
    obj,
    [
      'name',
      'firstName',
      'role',
      'availability',
      'email',
      'linkedin',
      'github',
      'cv',
      'portrait',
      'languages',
      'strengths',
    ],
    file,
  )

  const languages = asArray(obj.languages, `${file}.languages`).map((item, index) => {
    const path = `${file}.languages[${index}]`
    const entry = asObject(item, path)
    noUnknownKeys(entry, ['name', 'level'], path)
    return { name: requireString(entry, 'name', path), level: requireString(entry, 'level', path) }
  })

  const strengths = asArray(obj.strengths, `${file}.strengths`).map((item, index) => {
    const path = `${file}.strengths[${index}]`
    const entry = asObject(item, path)
    noUnknownKeys(entry, ['icon', 'title', 'text'], path)
    return {
      icon: requireEnum(entry, 'icon', path, strengthIconKeys),
      title: requireString(entry, 'title', path),
      text: requireString(entry, 'text', path),
    }
  })

  return {
    profile: {
      name: requireString(obj, 'name', file),
      firstName: requireString(obj, 'firstName', file),
      role: requireString(obj, 'role', file),
      availability: requireString(obj, 'availability', file),
      email: requireEmail(obj, 'email', file),
      linkedin: requireUrl(obj, 'linkedin', file, LINKEDIN_HOSTS),
      github: requireUrl(obj, 'github', file, GITHUB_HOSTS),
      cv: requireAssetPath(obj, 'cv', file),
      portrait: requireAssetPath(obj, 'portrait', file),
      languages,
    },
    strengths,
  }
}

function parseProjects(raw: unknown): Project[] {
  const file = 'data/projects.json'
  const list = asArray(raw, file).map((item, index) => {
    const path = `${file}[${index}]`
    const obj = asObject(item, path)
    noUnknownKeys(
      obj,
      [
        'id',
        'number',
        'name',
        'eyebrow',
        'description',
        'stack',
        'status',
        'accolade',
        'accoladeBadge',
        'github',
        'highlights',
        'note',
        'illustration',
      ],
      path,
    )
    const project: Project = {
      id: requireStableId(obj, 'id', path),
      number: requireString(obj, 'number', path),
      name: requireString(obj, 'name', path),
      eyebrow: requireString(obj, 'eyebrow', path),
      description: requireString(obj, 'description', path),
      stack: requireStringArray(obj, 'stack', path),
      status: requireString(obj, 'status', path),
      highlights: requireStringArray(obj, 'highlights', path),
      illustration: requireString(obj, 'illustration', path),
    }
    const accolade = optionalString(obj, 'accolade', path)
    const accoladeBadge = optionalString(obj, 'accoladeBadge', path)
    const github = optionalUrl(obj, 'github', path, GITHUB_HOSTS)
    const note = optionalString(obj, 'note', path)
    if (accolade) project.accolade = accolade
    if (accoladeBadge) project.accoladeBadge = accoladeBadge
    if (github) project.github = github
    if (note) project.note = note
    return project
  })
  assertUnique(
    list.map((project) => project.id),
    'project id',
    file,
  )
  return list
}

function parseSkillCategories(raw: unknown): SkillCategory[] {
  const file = 'data/skills.json'
  const categories = asArray(raw, file).map((item, index) => {
    const path = `${file}[${index}]`
    const obj = asObject(item, path)
    noUnknownKeys(obj, ['id', 'title', 'wide', 'skills'], path)

    const skills = asArray(obj.skills, `${path}.skills`).map((skillItem, skillIndex) => {
      const skillPath = `${path}.skills[${skillIndex}]`
      const skillObj = asObject(skillItem, skillPath)
      noUnknownKeys(skillObj, ['name', 'icon', 'level', 'note'], skillPath)

      const icon = requireString(skillObj, 'icon', skillPath)
      if (!isTechIconKey(icon)) {
        fail(
          `${skillPath}.icon`,
          `unknown icon "${icon}". Add it to components/portfolio/tech-icon.tsx or pick an existing key`,
        )
      }
      const skill: Skill = {
        name: requireString(skillObj, 'name', skillPath),
        icon,
        level: requireEnum(skillObj, 'level', skillPath, skillLevels),
      }
      const note = optionalString(skillObj, 'note', skillPath)
      if (note) skill.note = note
      return skill
    })

    const category: SkillCategory = {
      id: requireStableId(obj, 'id', path),
      title: requireString(obj, 'title', path),
      skills,
    }
    if (optionalBoolean(obj, 'wide', path)) category.wide = true
    return category
  })
  assertUnique(
    categories.map((category) => category.id),
    'skill category id',
    file,
  )
  return categories
}

function parseEducation(raw: unknown): EducationEntry[] {
  const file = 'data/education.json'
  return asArray(raw, file).map((item, index) => {
    const path = `${file}[${index}]`
    const obj = asObject(item, path)
    noUnknownKeys(
      obj,
      ['id', 'qualification', 'institution', 'location', 'start', 'end', 'current', 'period', 'details'],
      path,
    )
    const entry: EducationEntry = {
      id: requireStableId(obj, 'id', path),
      qualification: requireString(obj, 'qualification', path),
      institution: requireString(obj, 'institution', path),
      start: requireDate(obj, 'start', path),
    }
    const location = optionalString(obj, 'location', path)
    const end = optionalDate(obj, 'end', path)
    const current = optionalBoolean(obj, 'current', path)
    const period = optionalString(obj, 'period', path)
    const details = optionalStringArray(obj, 'details', path)
    if (current && end) fail(path, '"current" entries must not have an "end" date')
    if (location) entry.location = location
    if (end) entry.end = end
    if (current) entry.current = true
    if (period) entry.period = period
    if (details) entry.details = details
    return entry
  })
}

function parseExperience(raw: unknown): ExperienceEntry[] {
  const file = 'data/experience.json'
  return asArray(raw, file).map((item, index) => {
    const path = `${file}[${index}]`
    const obj = asObject(item, path)
    noUnknownKeys(
      obj,
      ['id', 'type', 'title', 'organization', 'location', 'start', 'end', 'current', 'period', 'highlights'],
      path,
    )
    const entry: ExperienceEntry = {
      id: requireStableId(obj, 'id', path),
      type: requireEnum(obj, 'type', path, experienceTypes),
      title: requireString(obj, 'title', path),
      organization: requireString(obj, 'organization', path),
      start: requireDate(obj, 'start', path),
    }
    const location = optionalString(obj, 'location', path)
    const end = optionalDate(obj, 'end', path)
    const current = optionalBoolean(obj, 'current', path)
    const period = optionalString(obj, 'period', path)
    const highlights = optionalStringArray(obj, 'highlights', path)
    if (current && end) fail(path, '"current" entries must not have an "end" date')
    if (location) entry.location = location
    if (end) entry.end = end
    if (current) entry.current = true
    if (period) entry.period = period
    if (highlights) entry.highlights = highlights
    return entry
  })
}

function parseSite(raw: unknown, projectCount: number): { navLinks: NavLink[]; heroStats: HeroStat[] } {
  const file = 'data/site.json'
  const obj = asObject(raw, file)
  noUnknownKeys(obj, ['navLinks', 'heroStats'], file)

  const navLinks = asArray(obj.navLinks, `${file}.navLinks`).map((item, index) => {
    const path = `${file}.navLinks[${index}]`
    const link = asObject(item, path)
    noUnknownKeys(link, ['id', 'label'], path)
    return { id: requireStableId(link, 'id', path), label: requireString(link, 'label', path) }
  })
  assertUnique(
    navLinks.map((link) => link.id),
    'navigation id',
    `${file}.navLinks`,
  )

  const heroStats = asArray(obj.heroStats, `${file}.heroStats`).map((item, index) => {
    const path = `${file}.heroStats[${index}]`
    const stat = asObject(item, path)
    noUnknownKeys(stat, ['value', 'source', 'label'], path)
    const label = requireString(stat, 'label', path)
    const source = optionalString(stat, 'source', path)
    if (source !== undefined) {
      if (source !== 'projectCount') fail(`${path}.source`, 'expected "projectCount"')
      if (stat.value !== undefined) fail(path, 'use either "value" or "source", not both')
      return { value: String(projectCount), label }
    }
    return { value: requireString(stat, 'value', path), label }
  })

  return { navLinks, heroStats }
}

/* -------------------------------------------------------------------------- */
/* Timeline adapter                                                           */
/* -------------------------------------------------------------------------- */

function formatPeriod(entry: { start: string; end?: string; current?: boolean; period?: string }) {
  if (entry.period) return entry.period
  if (entry.current) return `${entry.start} — Present`
  if (entry.end && entry.end !== entry.start) return `${entry.start} — ${entry.end}`
  return entry.start
}

function joinPlace(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(', ')
}

const startYear = (entry: TimelineSource) => Number(entry.start.slice(0, 4))
const endValue = (entry: TimelineSource) => (entry.current ? '9999' : (entry.end ?? entry.start))

interface TimelineSource {
  start: string
  end?: string
  current?: boolean
  entry: TimelineEntry
}

/**
 * Combines `education.json` and `experience.json` into the single, newest-first
 * list the Experience section renders. Ordering rule: later start year first;
 * for the same start year, the entry that ends later comes first
 * ("current" counts as ending last). Ties keep file order.
 */
function buildTimeline(education: EducationEntry[], experience: ExperienceEntry[]): TimelineEntry[] {
  const sources: TimelineSource[] = [
    ...education.map((item) => ({
      start: item.start,
      end: item.end,
      current: item.current,
      entry: {
        id: item.id,
        period: formatPeriod(item),
        kind: 'Education' as const,
        title: item.qualification,
        place: joinPlace(item.institution, item.location),
        current: item.current,
        points: item.details,
      },
    })),
    ...experience.map((item) => ({
      start: item.start,
      end: item.end,
      current: item.current,
      entry: {
        id: item.id,
        period: formatPeriod(item),
        kind: item.type === 'achievement' ? ('Achievement' as const) : ('Experience' as const),
        title: item.title,
        place: joinPlace(item.organization, item.location),
        current: item.current,
        points: item.highlights,
      },
    })),
  ]

  assertUnique(
    sources.map((source) => source.entry.id),
    'timeline id (shared by education.json and experience.json)',
    'data/education.json + data/experience.json',
  )

  return sources
    .sort((a, b) => {
      const byStart = startYear(b) - startYear(a)
      if (byStart !== 0) return byStart
      return endValue(b).localeCompare(endValue(a))
    })
    .map(({ entry }) => {
      const { current, points, ...rest } = entry
      return { ...rest, ...(current ? { current } : {}), ...(points ? { points } : {}) }
    })
}

/* -------------------------------------------------------------------------- */
/* Exports consumed by the components                                         */
/* -------------------------------------------------------------------------- */

const parsedProfile = parseProfile(profileJson)

export const profile: Profile = parsedProfile.profile
export const strengths: Strength[] = parsedProfile.strengths
export const projects: Project[] = parseProjects(projectsJson)
export const skillCategories: SkillCategory[] = parseSkillCategories(skillsJson)
export const education: EducationEntry[] = parseEducation(educationJson)
export const experience: ExperienceEntry[] = parseExperience(experienceJson)
export const timeline: TimelineEntry[] = buildTimeline(education, experience)

const site = parseSite(siteJson, projects.length)
export const navLinks: NavLink[] = site.navLinks
export const heroStats: HeroStat[] = site.heroStats

/* -------------------------------------------------------------------------- */
/* Orbital scene configuration (animation geometry, intentionally in code)    */
/* -------------------------------------------------------------------------- */

export type OrbitTone = 'blue' | 'violet'

export interface OrbitBody {
  id: string
  label?: string
  sub?: string
  href?: string
  rx: number
  ry: number
  tilt: number
  speed: number
  phase: number
  size: number
  tone: OrbitTone
}

export const orbitBodies: OrbitBody[] = [
  {
    id: 'web',
    label: 'Web Development',
    sub: 'Modern web apps',
    href: '#projects',
    rx: 300,
    ry: 140,
    tilt: -14,
    speed: 0.1,
    phase: 0.7,
    size: 46,
    tone: 'blue',
  },
  {
    id: 'backend',
    label: 'Backend Engineering',
    sub: 'Services → Systems',
    href: '#projects',
    rx: 400,
    ry: 200,
    tilt: 10,
    speed: -0.072,
    phase: 3.7,
    size: 54,
    tone: 'violet',
  },
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    sub: 'Ideas → Intelligence',
    href: '#projects',
    rx: 455,
    ry: 255,
    tilt: -30,
    speed: 0.058,
    phase: 5.3,
    size: 42,
    tone: 'violet',
  },
  {
    id: 'data',
    label: 'Databases',
    sub: 'Data → Insights',
    href: '#skills',
    rx: 350,
    ry: 235,
    tilt: 38,
    speed: -0.09,
    phase: 1.9,
    size: 46,
    tone: 'blue',
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    sub: 'Build → Deploy',
    href: '#skills',
    rx: 255,
    ry: 185,
    tilt: 62,
    speed: 0.11,
    phase: 4.3,
    size: 38,
    tone: 'blue',
  },
  { id: 'd1', rx: 185, ry: 88, tilt: -8, speed: 0.16, phase: 2.4, size: 13, tone: 'violet' },
  { id: 'd2', rx: 430, ry: 170, tilt: 18, speed: -0.05, phase: 0.2, size: 10, tone: 'blue' },
  { id: 'd3', rx: 320, ry: 150, tilt: -45, speed: 0.07, phase: 4.9, size: 16, tone: 'violet' },
]
