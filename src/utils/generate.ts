import nanoid from 'nanoid';

export function generateSKU(name: string): string {
  const prefix = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 5);

  const random = nanoid.nanoid(5).toUpperCase();

  return `${prefix}-${random}`;
}