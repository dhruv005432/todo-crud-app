export const PRIORITIES = {
  High: {
    label: 'High',
    color: 'danger',
    badgeClass: 'bg-danger-subtle text-danger border border-danger-subtle',
    icon: 'bi-exclamation-octagon-fill',
    weight: 3,
  },
  Medium: {
    label: 'Medium',
    color: 'warning',
    badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
    icon: 'bi-exclamation-triangle-fill',
    weight: 2,
  },
  Low: {
    label: 'Low',
    color: 'success',
    badgeClass: 'bg-success-subtle text-success border border-success-subtle',
    icon: 'bi-info-circle-fill',
    weight: 1,
  },
};

export const CATEGORIES = {
  Learning: { label: 'Learning', icon: 'bi-book-half', color: 'primary' },
  Work: { label: 'Work', icon: 'bi-briefcase-fill', color: 'info' },
  Study: { label: 'Study', icon: 'bi-mortarboard-fill', color: 'secondary' },
  Personal: { label: 'Personal', icon: 'bi-person-heart', color: 'purple' },
  Shopping: { label: 'Shopping', icon: 'bi-cart-fill', color: 'teal' },
  Other: { label: 'Other', icon: 'bi-tag-fill', color: 'dark' },
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'priority', label: 'Priority (High to Low)' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'alphabetical', label: 'Alphabetical (A - Z)' },
];


