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
const MAX_UPDATES = 10;

/**
 * Format date as "January 24, 2026"
 */
function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}${suffix}, ${year}`;
}

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
 * Format time as "1:05pm"
 */
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${hours}:${formattedMinutes}${ampm}`;
}

/**
 * Parse a single line into an Update object
 */
function parseLine(line: string): Update | null {
  const match = line.match(LINE_REGEX);
  if (!match) return null;

  const [, timestamp, message] = match;
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return null;

  return {
    date,
    message: message.trim(),
    formattedDate: formatDate(date),
    formattedTime: formatTime(date),
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
