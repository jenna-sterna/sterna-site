import { defineField, type FieldDefinition } from "sanity";

/**
 * Small helpers that generate paired EN/PT fields with a matching `_en` / `_pt`
 * suffix. Keeps field names identical to the existing Sveltia YAML files so the
 * Astro components can access them with pick(page, "hero_eyebrow", lang).
 *
 * `fieldset` gives editors a collapsible visual grouping without changing the
 * flat data shape.
 */

type Kind = "string" | "text";

type Options = {
  name: string;              // base field name (no _en/_pt)
  title: string;             // Plain-English label shown in Studio
  description?: string;      // Hint text
  type?: Kind;
  rows?: number;             // for type=text
  required?: boolean;        // default: true
  fieldset?: string;         // groups fields visually in Studio
};

function pair(opts: Options): FieldDefinition[] {
  const type = opts.type ?? "string";
  const required = opts.required !== false;
  const validation = required ? (Rule: any) => Rule.required() : undefined;
  const common = {
    description: opts.description,
    type,
    rows: opts.rows,
    validation,
    fieldset: opts.fieldset,
  } as any;
  return [
    defineField({
      ...common,
      name: `${opts.name}_en`,
      title: `${opts.title} (English)`,
    } as any),
    defineField({
      ...common,
      name: `${opts.name}_pt`,
      title: `${opts.title} (Portuguese)`,
    } as any),
  ];
}

/**
 * Flatten a list of paired-field configs into a flat list of Sanity fields.
 */
export function pairs(list: Options[]): FieldDefinition[] {
  return list.flatMap(pair);
}
