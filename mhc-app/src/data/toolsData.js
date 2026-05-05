export const CATEGORIES = ['AI Tool', 'CRM Tool', 'SaaS Platforms', 'Marketing Tool', 'SEO Tool'];

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
