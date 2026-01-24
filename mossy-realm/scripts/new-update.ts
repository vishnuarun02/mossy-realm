#!/usr/bin/env npx ts-node

/**
 * Quick update generator
 * Usage: npm run update "Your update message here"
 * 
 * Appends to the current month's file in content/updates/
 */

import fs from 'fs';
import path from 'path';

const UPDATES_DIR = path.join(process.cwd(), 'content/updates');

/**
 * Get ISO timestamp with timezone offset
 * e.g., "2026-01-24T13:05:00-08:00"
 */
function toIsoWithOffset(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const tz = -d.getTimezoneOffset(); // minutes east of UTC
  const sign = tz >= 0 ? '+' : '-';
  const hh = pad(Math.floor(Math.abs(tz) / 60));
  const mm = pad(Math.abs(tz) % 60);

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${hh}:${mm}`;
}

// Get the message from command line args
const message = process.argv.slice(2).join(' ');

if (!message) {
  console.log('Usage: npm run update "Your update message here"');
  console.log('Example: npm run update "Added a new feature to the site!"');
  process.exit(1);
}

// Ensure directory exists
if (!fs.existsSync(UPDATES_DIR)) {
  fs.mkdirSync(UPDATES_DIR, { recursive: true });
}

// Get current date info
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const filename = `${year}-${month}.md`;
const filePath = path.join(UPDATES_DIR, filename);

// Get the ISO timestamp
const timestamp = toIsoWithOffset(now);

// Create the update line
const updateLine = `- ${timestamp} | ${message}`;

// Check if file exists
if (fs.existsSync(filePath)) {
  // Append to existing file
  fs.appendFileSync(filePath, `\n${updateLine}`);
} else {
  // Create new monthly file with header
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const header = `# ${monthNames[now.getMonth()]} ${year}\n\n`;
  fs.writeFileSync(filePath, header + updateLine);
}

console.log(`✨ Added to content/updates/${filename}`);
console.log(`   ${updateLine}`);
console.log('');
console.log('Next: git add, commit, push to deploy!');
