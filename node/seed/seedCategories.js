const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

async function seedCategories() {
  try {
    await Category.deleteMany({});

    await Category.create([
      {
        name: 'database_access',
        fields: [
          { fieldName: 'serverName', labelKey: 'serverName', type: 'text' },
          { fieldName: 'schemaName', labelKey: 'schemaName', type: 'text' },
          { fieldName: 'permission', labelKey: 'permission', type: 'select', options: ['read', 'modify'] },
        ]
      },
      {
        name: 'file_directory_access',
        fields: [
          { fieldName: 'serverName', labelKey: 'serverName', type: 'text' },
          { fieldName: 'path', labelKey: 'path', type: 'text' },
          { fieldName: 'folderName', labelKey: 'folderName', type: 'text' },
          { fieldName: 'permission', labelKey: 'permission', type: 'select', options: ['read', 'modify'] },
        ]
      },
      {
        name: 'code_help',
        fields: [
          { fieldName: 'language', labelKey: 'language', type: 'text' },
          { fieldName: 'codeLink', labelKey: 'codeLink', type: 'text' },
        ]
      },
      {
        name: 'technical_help',
        fields: [
          { fieldName: 'os', labelKey: 'os', type: 'text' },
          { fieldName: 'techDesc', labelKey: 'techDesc', type: 'text' },
        ]
      },
      {
        name: 'change_request',
        fields: [
          { fieldName: 'component', labelKey: 'component', type: 'text' },
          { fieldName: 'changeDesc', labelKey: 'changeDesc', type: 'text' },
        ]
      },
      {
        name: 'other',
        fields: [
          { fieldName: 'otherDesc', labelKey: 'otherDesc', type: 'text' },
        ]
      },
    ]);
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.disconnect();
  }
}

async function main() {
  if (!process.env.DB_URL) throw new Error("Missing DB_URL env var");
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await seedCategories();
}

main().catch(() => process.exit(1));
