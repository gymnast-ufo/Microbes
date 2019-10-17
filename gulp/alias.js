import fs from 'fs';

// Читаем названия файлов из директории //
const scriptAlias = fs.readdirSync('./src/').filter(file => file.match(/.*\.js/ig));

export { scriptAlias };