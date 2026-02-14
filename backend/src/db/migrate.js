const fs = require('fs');
const path = require('path');
const pool = require('./pool');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql')).toString();
    await pool.query(sql);
    console.log('Database migration completed.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
