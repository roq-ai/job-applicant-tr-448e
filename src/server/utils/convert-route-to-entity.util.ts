const mapping: Record<string, string> = {
  candidates: 'candidate',
  companies: 'company',
  'job-postings': 'job_posting',
  notes: 'note',
  recommendations: 'recommendation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
