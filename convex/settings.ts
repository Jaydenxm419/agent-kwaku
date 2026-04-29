import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getActiveModel = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").first();
    return settings?.activeModel ?? null;
  },
});

export const setActiveModel = mutation({
  args: { model: v.string() },
  handler: async (ctx, args) => {
    const settings = await ctx.db.query("settings").first();
    if (settings) {
      await ctx.db.patch(settings._id, { activeModel: args.model });
    } else {
      await ctx.db.insert("settings", { activeModel: args.model });
    }
  },
});
