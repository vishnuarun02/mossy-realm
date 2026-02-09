import fs from 'fs';
import path from 'path';

export interface Update {
  date: Date;
  message: string;
  formattedDate: string;
  formattedTime: string;
}

const UPDATES_DIR = path.join(process.cwd(), 'content/updates');
const MONTHLY_FILE_REGEX = /^\d{4}-\d{2}\.md$/;
const LINE_REGEX = /^\s*-?\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z))\s*\|\s*(.+)\s*$/;
const MAX_UPDATES = 15;

/**
 * Get ordinal suffix for day (1st, 2nd, 3rd, 4th, etc.)
 */
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Parse ISO timestamp and format date/time WITHOUT timezone conversion
 * This ensures "2026-01-24T13:05:00-08:00" always shows as "January 24th, 2026 · 1:05pm"
 * regardless of what timezone the server is in.
 */
function parseTimestamp(timestamp: string): { date: Date; formattedDate: string; formattedTime: string } | null {
  // Parse: 2026-01-24T13:05:00-08:00
  const match = timestamp.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr, hourStr, minuteStr] = match;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10); // 1-12
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);

  // Create Date object for sorting (this will be in UTC, but we only use it for sorting)
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return null;

  // Format date as "January 24th, 2026"
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const formattedDate = `${months[month - 1]} ${day}${getDaySuffix(day)}, ${year}`;

  // Format time as "1:05pm"
  const ampm = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 || 12;
  const formattedTime = `${hour12}:${minuteStr} ${ampm}`;

  return { date, formattedDate, formattedTime };
}

/**
 * Parse a single line into an Update object
 */
function parseLine(line: string): Update | null {
  const match = line.match(LINE_REGEX);
  if (!match) return null;

  const [, timestamp, message] = match;
  const parsed = parseTimestamp(timestamp);
  if (!parsed) return null;

  return {
    date: parsed.date,
    message: message.trim(),
    formattedDate: parsed.formattedDate,
    formattedTime: parsed.formattedTime,
  };
}

/**
 * Load all updates from monthly files in content/updates/
 * Returns latest N updates, sorted by date descending
 */
export function getUpdates(limit: number = MAX_UPDATES): Update[] {
  if (!fs.existsSync(UPDATES_DIR)) {
    return [];
  }

  // Get only monthly files (YYYY-MM.md)
  const files = fs.readdirSync(UPDATES_DIR).filter(f => MONTHLY_FILE_REGEX.test(f));

  const updates: Update[] = [];

  for (const filename of files) {
    const filePath = path.join(UPDATES_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
      // Skip empty lines and comments
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const update = parseLine(line);
      if (update) {
        updates.push(update);
      }
    }
  }

  // Sort by date descending (newest first)
  updates.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Return only the latest N
  return updates.slice(0, limit);
}
