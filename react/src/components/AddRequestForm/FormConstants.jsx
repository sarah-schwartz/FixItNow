export const categories = [
  'גישה למסד נתונים',
  'גישה לספריית קבצים',
  'עזרה בקוד',
  'עזרה טכנית',
  'בקשת שינוי',
  'אחר',
];

export const CATEGORY_FIELDS = {
  'גישה למסד נתונים': [
    { name: 'serverName', label: 'שם שרת' },
    { name: 'schemaName', label: 'שם סכמה' },
    {
      name: 'permission',
      label: 'רמת הרשאה',
      type: 'select',
      options: ['read', 'modify'],
    },
  ],
  'גישה לספריית קבצים': [
    { name: 'serverName', label: 'שם שרת' },
    { name: 'path', label: 'נתיב' },
    { name: 'folderName', label: 'שם ספריה' },
    {
      name: 'permission',
      label: 'רמת הרשאה',
      type: 'select',
      options: ['read', 'modify'],
    },
  ],
  'עזרה בקוד': [
    { name: 'language', label: 'שפת תכנות' },
    { name: 'codeLink', label: 'קישור לקוד' },
  ],
  'עזרה טכנית': [
    { name: 'os', label: 'מערכת הפעלה' },
    { name: 'techDesc', label: 'תיאור טכני' },
  ],
  'בקשת שינוי': [
    { name: 'component', label: 'רכיב לשינוי' },
    { name: 'changeDesc', label: 'תיאור השינוי' },
  ],
  'אחר': [{ name: 'otherDesc', label: 'נושא הפנייה' }],
};
