import { parse } from 'csv-parse';
import XLSX from 'xlsx';
import fs from 'fs';


export const parseCSVBuffer = async (buffer) => {
  return new Promise((resolve, reject) => {
    const records = [];
    const parser = parse({ columns: true, trim: true });

    parser.on('readable', () => {
      let record;
      while ((record = parser.read())) {
        records.push(record);
      }
    });

    parser.on('error', reject);
    parser.on('end', () => resolve(records));

    parser.write(buffer);
    parser.end();
  });
};


export const parseExcelBuffer = (buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
};


export const normalizeRecords = (rows) => {
  
  return rows.map((r, idx) => {
    const get = (k) => r[k] ?? r[k?.toLowerCase?.()] ?? r[k?.toUpperCase?.()];
    const firstName =
      get('FirstName') ||
      get('firstname') ||
      get('First Name') ||
      get('first_name');
    const phone = String(get('Phone') || '').replace(/\D/g, '');
    const notes = get('Notes') || '';

    if (!firstName || !phone) {
      throw new Error(`Row ${idx + 1}: missing FirstName or Phone`);
    }

    return {
      firstName: String(firstName).trim(),
      phone,
      notes: String(notes).trim(),
    };
  });
};