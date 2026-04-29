import { tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";
import { api } from "../../convex/_generated/api.js";
import { convex } from "../convex-client.js";
import { renderBriefHtml, type SectionInput } from "../email-templates/index.js";
import type { IntegrationModule } from "./registry.js";

const PROFILE_ID = "default";

const sectionTypeEnum = z.enum(["greeting", "weather", "calendar", "tasks", "news", "quote"]);

export const morningBriefIntegration: IntegrationModule = {
  name: "morning-brief",
  description:
    "Manage and render the user's morning brief email. Use get_brief_config to see enabled sections, render_brief_html to produce the HTML, and set_brief_config to save preferences.",

  createServer: async () => {
    return createSdkMcpServer({
      name: "morning-brief",
      version: "0.1.0",
      tools: [
        tool(
          "get_brief_config",
          `Return the morning brief configuration: which sections are enabled, their order, per-section config (e.g. city for weather), recipient email, and timezone.
Call this first before fetching data or rendering so you know exactly what to include.`,
          {},
          async () => {
            const cfg = await convex.query(api.briefConfigs.get, { profileId: PROFILE_ID });
            if (!cfg) {
              return {
                content: [
                  {
                    type: "text" as const,
                    text: JSON.stringify({
                      error:
                        "No brief config found. Ask the user to configure their morning brief sections first using set_brief_config.",
                    }),
                  },
                ],
              };
            }
            const enabled = cfg.sections
              .filter((s) => s.enabled)
              .sort((a, b) => a.order - b.order);
            return {
              content: [
                {
                  type: "text" as const,
                  text: JSON.stringify({
                    recipientEmail: cfg.recipientEmail,
                    timezone: cfg.timezone,
                    sections: enabled.map((s) => ({
                      type: s.type,
                      config: s.config ? JSON.parse(s.config) : {},
                    })),
                  }),
                },
              ],
            };
          },
        ),

        tool(
          "render_brief_html",
          `Render all brief sections into a complete inline-CSS HTML email string ready for GMAIL_SEND_EMAIL.
Call this after you have fetched the data for every enabled section and assembled it into the sections array.
Each section's content should be a plain-text string — newlines separate multiple items (e.g. one event per line for calendar).`,
          {
            sections: z.array(
              z.object({
                type: sectionTypeEnum,
                title: z.string().describe("Section header label, e.g. 'Today\\'s Weather'"),
                content: z
                  .string()
                  .describe("Plain-text data for this section. Use \\n to separate multiple items."),
              }),
            ),
            date: z
              .string()
              .describe("Human-readable date, e.g. 'Monday, April 28, 2026'"),
          },
          async (args) => {
            const html = renderBriefHtml(args.sections as SectionInput[], args.date);
            return {
              content: [{ type: "text" as const, text: html }],
            };
          },
        ),

        tool(
          "set_brief_config",
          `Create or update the morning brief configuration in Convex.
Use this when the user asks to add, remove, or reorder sections, change the recipient, or update section settings (e.g. city for weather).
The sections array should include ALL sections you want (enabled or disabled) — this replaces the entire config.`,
          {
            recipientEmail: z.string().describe("Email address to send the brief to."),
            timezone: z
              .string()
              .describe("IANA timezone, e.g. 'America/New_York'. Used to label timestamps."),
            sections: z.array(
              z.object({
                type: sectionTypeEnum,
                enabled: z.boolean(),
                order: z.number().int().describe("Ascending display order, starting from 0."),
                config: z
                  .string()
                  .optional()
                  .describe("JSON string with section-specific config, e.g. '{\"city\":\"NYC\"}'."),
              }),
            ),
          },
          async (args) => {
            await convex.mutation(api.briefConfigs.upsert, {
              profileId: PROFILE_ID,
              recipientEmail: args.recipientEmail,
              timezone: args.timezone,
              sections: args.sections,
            });
            const enabled = args.sections.filter((s) => s.enabled).map((s) => s.type);
            return {
              content: [
                {
                  type: "text" as const,
                  text: `Brief config saved. Enabled sections: ${enabled.join(", ") || "none"}.`,
                },
              ],
            };
          },
        ),
      ],
    });
  },
};
