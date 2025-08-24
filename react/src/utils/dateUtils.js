/**
 * Format date for display in Hebrew locale
 * @param {string|Date} date - ISO date string or Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('he-IL');
};

/**
 * Format date and time for display
 * @param {string|Date} date - ISO date string or Date object
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('he-IL');
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - ISO date string or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const inputDate = new Date(date);
  const diffInMs = now - inputDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return formatDate(date);
};

/**
 * Check if a date is today
 * @param {string|Date} date - ISO date string or Date object
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate.toDateString() === today.toDateString();
};
