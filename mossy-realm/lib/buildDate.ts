// Get the last commit date from Vercel's environment variable
// This only changes when you actually push code, not on every build
const COMMIT_DATE = process.env.VERCEL_GIT_COMMIT_AUTHOR_DATE
  ? new Date(process.env.VERCEL_GIT_COMMIT_AUTHOR_DATE)
  : new Date();

export function getFormattedBuildDate(): string {
  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];

  const month = months[COMMIT_DATE.getMonth()];
  const day = COMMIT_DATE.getDate();
  const year = COMMIT_DATE.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getBuildDate(): Date {
  return COMMIT_DATE;
}
