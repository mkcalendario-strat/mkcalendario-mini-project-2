import { Blog } from "@/types/blogs";

export function formatTime(timestamp: Blog["timestamp"]) {
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
