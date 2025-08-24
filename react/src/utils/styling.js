/**
 * Get color for priority tags
 * @param {string} priority - Priority level
 * @returns {string} Ant Design color name
 */
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'low': return 'geekblue';
    case 'medium': return 'green';
    case 'high': return 'volcano';
    default: return 'default';
  }
};

/**
 * Get color for status tags
 * @param {string} status - Ticket status
 * @returns {string} Ant Design color name
 */
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'waiting': return 'orange';
    case 'inprogress': return 'blue';
    case 'closed': return 'green';
    default: return 'default';
  }
};

/**
 * Get role styling for user tags
 * @param {string} role - User role
 * @returns {object} Style object with color and background
 */
export const getRoleStyle = (role) => {
  const baseStyle = {
    borderRadius: '6px',
    padding: '4px 8px',
    fontWeight: '500',
    fontSize: '12px',
  };

  switch (role?.toLowerCase()) {
    case 'admin':
      return {
        ...baseStyle,
        color: '#D946EF',
        borderColor: '#D946EF',
        backgroundColor: 'rgba(217, 70, 239, 0.08)',
      };
    case 'developer':
      return {
        ...baseStyle,
        color: '#3B82F6',
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
      };
    case 'support':
      return {
        ...baseStyle,
        color: '#10B981',
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
      };
    default:
      return {
        ...baseStyle,
        color: '#666',
        borderColor: '#d9d9d9',
        backgroundColor: '#f5f5f5',
      };
  }
};
