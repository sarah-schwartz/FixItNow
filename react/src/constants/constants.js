
// Category labels for Hebrew translation
export const CATEGORY_LABELS_HE = {
  database_access: 'גישה למסד נתונים',
  file_directory_access: 'גישה לספריית קבצים',
  code_help: 'עזרה בקוד',
  technical_help: 'עזרה טכנית',
  change_request: 'בקשת שינוי',
  other: 'אחר'
};

// Field labels for Hebrew translation
export const FIELD_LABELS_HE = {
  serverName: 'שם שרת',
  schemaName: 'שם סכמה',
  permission: 'רמת הרשאה',
  path: 'נתיב',
  folderName: 'שם ספריה',
  language: 'שפת תכנות',
  codeLink: 'קישור לקוד',
  os: 'מערכת הפעלה',
  techDesc: 'תיאור טכני',
  component: 'רכיב לשינוי',
  changeDesc: 'תיאור השינוי',
  otherDesc: 'נושא הפנייה',
};

// Priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'נמוכה' },
  { value: 'medium', label: 'בינונית' },
  { value: 'high', label: 'גבוהה' }
];

// Step configuration
export const FORM_STEPS = [
  { title: 'התחלה' },
  { title: 'בתהליך' },
  { title: 'הושלם' }
];

// Helper function to get Hebrew label for category
export const getCategoryLabel = (categoryName) => {
  return CATEGORY_LABELS_HE[categoryName] || categoryName;
};

// Helper function to get Hebrew label for field
export const getFieldLabel = (fieldKey) => {
  return FIELD_LABELS_HE[fieldKey] || fieldKey;
};

// Helper function to transform MongoDB category to display format
export const transformCategoryForDisplay = (category) => {
  return {
    ...category,
    displayName: getCategoryLabel(category.name),
    fields: category.fields.map(field => ({
      ...field,
      displayLabel: getFieldLabel(field.labelKey)
    }))
  };
};