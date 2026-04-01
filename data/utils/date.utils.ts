export const toDate = (value: string | Date | undefined | null): Date | null => {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
};

export const toSQLiteDate = (
  value: string | Date | undefined | null,
): string | null => {
  const date = toDate(value);
  if (!date) return null;

  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const toISOStringSafe = (
  value: string | Date | undefined | null,
): string | null => {
  const date = toDate(value);
  if (!date) return null;

  return date.toISOString();
};