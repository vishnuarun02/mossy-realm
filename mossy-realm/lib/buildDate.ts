// This runs at build time, so the date updates on each deployment
const BUILD_DATE = new Date();

export function getFormattedBuildDate(): string {
  const months = [
    'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
  ];
  
  const month = months[BUILD_DATE.getMonth()];
  const day = BUILD_DATE.getDate();
  const year = BUILD_DATE.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

export function getBuildDate(): Date {
  return BUILD_DATE;
}

