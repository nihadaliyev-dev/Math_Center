const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'az', 'de'], // List all supported languages
  directory: path.join(__dirname, '../locales'), // Directory for translation files
  defaultLocale: 'en', // Default language if none is specified
  autoReload: true, // Automatically reload translations when changed
  syncFiles: true, // Sync translation files
  queryParameter: 'lang', // Use "lang" in query params to switch language (e.g., ?lang=az)
  register: false, // Disable automatic route registration to prevent routing conflicts
});

module.exports = i18n;
