import { wrapLayout } from "./layout.js";
import { renderGreeting } from "./sections/greeting.js";
import { renderWeather } from "./sections/weather.js";
import { renderCalendar } from "./sections/calendar.js";
import { renderTasks } from "./sections/tasks.js";
import { renderNews } from "./sections/news.js";
import { renderQuote } from "./sections/quote.js";

export interface SectionInput {
  type: "greeting" | "weather" | "calendar" | "tasks" | "news" | "quote";
  title: string;
  content: string;
}

const renderers: Record<SectionInput["type"], (s: SectionInput) => string> = {
  greeting: renderGreeting,
  weather: renderWeather,
  calendar: renderCalendar,
  tasks: renderTasks,
  news: renderNews,
  quote: renderQuote,
};

export function renderBriefHtml(sections: SectionInput[], date: string): string {
  const inner = sections.map((s) => renderers[s.type]?.(s) ?? "").join("\n");
  // Pad bottom so the last section doesn't butt against the footer
  const padded = inner + '\n<tr><td style="padding:20px 0 4px;"></td></tr>';
  return wrapLayout(padded, date);
}
