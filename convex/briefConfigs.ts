import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const sectionTypeV = v.union(
  v.literal("greeting"),
  v.literal("weather"),
  v.literal("calendar"),
  v.literal("tasks"),
  v.literal("news"),
  v.literal("quote"),
);

const sectionV = v.object({
  type: sectionTypeV,
  enabled: v.boolean(),
  order: v.number(),
  config: v.optional(v.string()),
});

export const get = query({
  args: { profileId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("briefConfigs")
      .withIndex("by_profile_id", (q) => q.eq("profileId", args.profileId))
      .unique();
  },
});

export const upsert = mutation({
  args: {
    profileId: v.string(),
    recipientEmail: v.string(),
    timezone: v.string(),
    sections: v.array(sectionV),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("briefConfigs")
      .withIndex("by_profile_id", (q) => q.eq("profileId", args.profileId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("briefConfigs", { ...args, updatedAt: Date.now() });
  },
});
