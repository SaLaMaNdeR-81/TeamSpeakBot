export function Timeformater(seconds: any): string {
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;

  let remaining = seconds;

  const days = Math.floor(remaining / DAY);
  remaining %= DAY;

  const hours = Math.floor(remaining / HOUR);
  remaining %= HOUR;

  const minutes = Math.floor(remaining / MINUTE);
  remaining %= MINUTE;

  const secs = remaining;

  const parts = [];
  if (days > 0) parts.push(`${days}D`);
  if (hours > 0) parts.push(`${hours}H`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join("-") || "0 s";
}
