import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const AGENTS_DIR = path.resolve(
  import.meta.dirname,
  '../../../harness-matrix/agents',
);

export interface Evidence {
  kind: string;
  ref: string;
  quote: string;
  notes?: string;
}

export interface Field {
  value: any;
  confidence?: string;
  evidence?: Evidence[];
}

export interface Harness {
  id: Field;
  name: Field;
  repo: { url: Field; default_branch: Field; pinned_commit: Field };
  license: Field;
  primary_language: Field;
  platforms: Field;
  edit: Record<string, Field>;
  tools: Record<string, Field>;
  config: Record<string, Field>;
  extensions: Record<string, any>;
  providers: Record<string, Field>;
  ux: Record<string, Field>;
  context: Record<string, Field>;
  reliability: Record<string, Field>;
  integration: Record<string, Field>;
  customization: Record<string, Field>;
  distribution: Record<string, Field>;
  packages: Record<string, Field>;
  extras: Record<string, Field>;
  [key: string]: any;
}

function isField(obj: any): obj is Field {
  return obj && typeof obj === 'object' && 'value' in obj;
}

function getField(obj: any): Field {
  if (isField(obj)) return obj;
  return { value: obj, confidence: undefined, evidence: [] };
}

export function getFieldValue(obj: any): any {
  if (isField(obj)) return obj.value;
  return obj;
}

export function getFieldSafe(data: any, ...keys: string[]): Field {
  let current = data;
  for (const key of keys) {
    if (!current || typeof current !== 'object') return { value: null };
    current = current[key];
  }
  return getField(current);
}

export function loadAllHarnesses(): Harness[] {
  const files = fs
    .readdirSync(AGENTS_DIR)
    .filter((f: string) => f.endsWith('.yaml'));
  return files.map((file: string) => {
    const raw = fs.readFileSync(path.join(AGENTS_DIR, file), 'utf-8');
    return yaml.load(raw) as Harness;
  });
}

export function loadHarness(id: string): Harness | null {
  const filePath = path.join(AGENTS_DIR, `${id}.yaml`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(raw) as Harness;
}

export function getRepoBaseUrl(harness: Harness): string | null {
  const url = getFieldSafe(harness, 'repo', 'url').value;
  const commit = getFieldSafe(harness, 'repo', 'pinned_commit').value;
  if (!url || !commit) return null;
  const cleanUrl = String(url).replace(/\.git$/, '');
  return `${cleanUrl}/blob/${commit}`;
}

function getRepoNameFromUrl(url: string): string | null {
  const cleanUrl = url.replace(/\.git$/, '');
  const match = cleanUrl.match(/\/([^/]+)$/);
  if (!match) return null;
  return match[1];
}

function normalizeRepoRelativeRefPath(harness: Harness, refPath: string): string {
  const repoUrl = getFieldSafe(harness, 'repo', 'url').value;
  if (!repoUrl) return refPath;

  const repoName = getRepoNameFromUrl(String(repoUrl));
  if (!repoName) return refPath;

  if (refPath === repoName) return '';
  if (refPath.startsWith(`${repoName}/`)) {
    return refPath.slice(repoName.length + 1);
  }

  return refPath;
}

export function makeEvidenceUrl(
  harness: Harness,
  ref: string,
): string | null {
  const base = getRepoBaseUrl(harness);
  if (!base) return null;
  // code refs: path/to/file.ext:123
  const match = ref.match(/^(.+?):(\d+)$/);
  if (match) {
    const filePath = normalizeRepoRelativeRefPath(harness, match[1]);
    return `${base}/${filePath}#L${match[2]}`;
  }
  // file path without line
  if (ref.includes('/') && !ref.startsWith('http')) {
    const filePath = normalizeRepoRelativeRefPath(harness, ref);
    return `${base}/${filePath}`;
  }
  // already a URL
  if (ref.startsWith('http')) return ref;
  return null;
}

function anchorSlug(input: string): string {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeSectionAnchor(sectionKey: string): string {
  return `section-${anchorSlug(sectionKey)}`;
}

export function makeFieldAnchor(sectionKey: string, fieldKey: string): string {
  return `field-${anchorSlug(sectionKey)}-${anchorSlug(fieldKey)}`;
}

export function loadDecisionGuide(): string {
  const filePath = path.resolve(
    import.meta.dirname,
    '../../../harness-matrix/DECISION_GUIDE.md',
  );
  return fs.readFileSync(filePath, 'utf-8');
}

// Group all sections for detail pages
const SECTION_ORDER = [
  'edit',
  'tools',
  'config',
  'extensions',
  'providers',
  'ux',
  'context',
  'reliability',
  'integration',
  'customization',
  'distribution',
  'packages',
];

export interface SectionField {
  label: string;
  key: string;
  field: Field;
}

export interface Section {
  name: string;
  key: string;
  fields: SectionField[];
}

function labelFromKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function flattenFields(
  obj: any,
  prefix: string = '',
): SectionField[] {
  const result: SectionField[] = [];
  if (!obj || typeof obj !== 'object') return result;

  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (isField(val)) {
      result.push({ label: labelFromKey(key), key: fullKey, field: val as Field });
    } else if (typeof val === 'object' && val !== null) {
      result.push(...flattenFields(val, fullKey));
    }
  }
  return result;
}

export function getSections(harness: Harness): Section[] {
  const sections: Section[] = [];

  // Core metadata
  const coreFields: SectionField[] = [
    { label: 'License', key: 'license', field: getField(harness.license) },
    {
      label: 'Primary Language',
      key: 'primary_language',
      field: getField(harness.primary_language),
    },
    {
      label: 'Platforms',
      key: 'platforms',
      field: getField(harness.platforms),
    },
  ];
  sections.push({ name: 'Core Metadata', key: 'core', fields: coreFields });

  for (const sectionKey of SECTION_ORDER) {
    const sectionData = harness[sectionKey];
    if (!sectionData || typeof sectionData !== 'object') continue;
    const fields = flattenFields(sectionData);
    if (fields.length > 0) {
      sections.push({
        name: labelFromKey(sectionKey),
        key: sectionKey,
        fields,
      });
    }
  }

  // Extras
  if (harness.extras && typeof harness.extras === 'object') {
    const extraFields: SectionField[] = [];
    for (const [key, val] of Object.entries(harness.extras)) {
      if (isField(val)) {
        extraFields.push({
          label: key,
          key: `extras.${key}`,
          field: val as Field,
        });
      }
    }
    if (extraFields.length > 0) {
      sections.push({ name: 'Extras', key: 'extras', fields: extraFields });
    }
  }

  return sections;
}
