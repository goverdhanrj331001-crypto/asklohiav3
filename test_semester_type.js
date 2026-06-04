const { createClient } = require('c:\\Users\\Toshiba\\Music\\v44\\v44\\node_modules\\@supabase\\supabase-js');
const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\Toshiba\\Music\\v44\\v44\\.env', 'utf8');
let url, key;
content.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    if (k === 'NEXT_PUBLIC_SUPABASE_URL') url = v;
    if (k === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') key = v;
  }
});

if (url && key) {
  const supabase = createClient(url, key);
  
  // Test the exact searchMainExams query logic
  let query = supabase.from('main_exams').select('*');
  query = query.or('department.ilike.%Science%,subject.ilike.%Science%');
  query = query.eq('level', 'UG');
  query = query.eq('semester', 3);
  query = query.eq('status', 'Collegiate');
  
  query.then(({ data, error }) => {
    if (error) {
      console.error('Error executing query:', error);
    } else {
      console.log('Results with department and or:', data.length);
      data.forEach(row => {
        console.log(row.subject, row.exam_date);
      });
    }
  });
}
