const DEFAULT_API_BASE = '/api';

const normalizeBase = (base) => base.replace(/\/+$/, '');

const apiBase = normalizeBase(
  (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE).trim(),
);

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiBase}${normalizedPath}`;
};
