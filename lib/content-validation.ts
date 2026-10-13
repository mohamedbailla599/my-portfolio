/**
 * Lightweight runtime validation for the JSON files in `data/`.
 *
 * Structural mistakes throw an error that names the file, the entry and the
 * field, so a bad edit fails the build (the previous deployment keeps serving)
 * instead of shipping a broken page.
 */

export type JsonObject = Record<string, unknown>

export function fail(path: string, message: string): never {
  throw new Error(`Invalid portfolio content at ${path}: ${message}`)
}

export function asObject(value: unknown, path: string): JsonObject {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(path, 'expected an object')
  }
  return value as JsonObject
}

export function asArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) fail(path, 'expected an array')
  return value
}

export function noUnknownKeys(obj: JsonObject, allowed: readonly string[], path: string): void {
  for (const key of Object.keys(obj)) {
    if (!allowed.includes(key)) {
      fail(`${path}.${key}`, `unknown field (allowed: ${allowed.join(', ')})`)
    }
  }
}

export function requireString(obj: JsonObject, key: string, path: string): string {
  const value = obj[key]
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`${path}.${key}`, 'expected a non-empty string')
  }
  return value
}

export function optionalString(obj: JsonObject, key: string, path: string): string | undefined {
  const value = obj[key]
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') fail(`${path}.${key}`, 'expected a string')
  return value.trim() === '' ? undefined : value
}

export function optionalBoolean(obj: JsonObject, key: string, path: string): boolean | undefined {
  const value = obj[key]
  if (value === undefined) return undefined
  if (typeof value !== 'boolean') fail(`${path}.${key}`, 'expected true or false')
  return value
}

export function requireStringArray(
  obj: JsonObject,
  key: string,
  path: string,
  minItems = 1,
): string[] {
  const items = asArray(obj[key], `${path}.${key}`)
  if (items.length < minItems) fail(`${path}.${key}`, `expected at least ${minItems} item(s)`)
  return items.map((item, index) => {
    if (typeof item !== 'string' || item.trim() === '') {
      fail(`${path}.${key}[${index}]`, 'expected a non-empty string')
    }
    return item
  })
}

export function optionalStringArray(
  obj: JsonObject,
  key: string,
  path: string,
): string[] | undefined {
  if (obj[key] === undefined) return undefined
  const items = requireStringArray(obj, key, path, 0)
  return items.length > 0 ? items : undefined
}

export function requireEnum<T extends string>(
  obj: JsonObject,
  key: string,
  path: string,
  allowed: readonly T[],
): T {
  const value = obj[key]
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    fail(`${path}.${key}`, `expected one of: ${allowed.join(', ')}`)
  }
  return value as T
}

function parseHttpsUrl(value: string, path: string, hosts?: readonly string[]): string {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    fail(path, `"${value}" is not a valid URL`)
  }
  if (url.protocol !== 'https:') fail(path, 'URL must start with https://')
  if (hosts) {
    const host = url.hostname.replace(/^www\./, '')
    if (!hosts.includes(host)) fail(path, `URL host must be one of: ${hosts.join(', ')}`)
  }
  return value
}

export function requireUrl(
  obj: JsonObject,
  key: string,
  path: string,
  hosts?: readonly string[],
): string {
  return parseHttpsUrl(requireString(obj, key, path), `${path}.${key}`, hosts)
}

export function optionalUrl(
  obj: JsonObject,
  key: string,
  path: string,
  hosts?: readonly string[],
): string | undefined {
  const value = optionalString(obj, key, path)
  return value === undefined ? undefined : parseHttpsUrl(value, `${path}.${key}`, hosts)
}

export function requireAssetPath(obj: JsonObject, key: string, path: string): string {
  const value = requireString(obj, key, path)
  if (!value.startsWith('/')) {
    fail(`${path}.${key}`, 'expected a path inside /public that starts with "/"')
  }
  return value
}

export function requireEmail(obj: JsonObject, key: string, path: string): string {
  const value = requireString(obj, key, path)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fail(`${path}.${key}`, 'expected an email address')
  return value
}

const stableId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function requireStableId(obj: JsonObject, key: string, path: string): string {
  const value = requireString(obj, key, path)
  if (!stableId.test(value)) {
    fail(`${path}.${key}`, 'expected lowercase letters, digits and hyphens only (e.g. "my-project")')
  }
  return value
}

const partialDate = /^\d{4}(?:-(?:0[1-9]|1[0-2]))?$/

export function requireDate(obj: JsonObject, key: string, path: string): string {
  const value = requireString(obj, key, path)
  if (!partialDate.test(value)) fail(`${path}.${key}`, 'expected "YYYY" or "YYYY-MM"')
  return value
}

export function optionalDate(obj: JsonObject, key: string, path: string): string | undefined {
  const value = optionalString(obj, key, path)
  if (value !== undefined && !partialDate.test(value)) {
    fail(`${path}.${key}`, 'expected "YYYY" or "YYYY-MM"')
  }
  return value
}

export function assertUnique(values: readonly string[], label: string, path: string): void {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) fail(path, `duplicate ${label} "${value}"`)
    seen.add(value)
  }
}
