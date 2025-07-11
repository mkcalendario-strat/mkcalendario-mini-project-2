export function formatTime(timestamp: string) {
  const date = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return formatter.format(date);
}
