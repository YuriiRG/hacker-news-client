import { z } from 'zod';

export const storySchema = z.object({
  id: z.number(),
  by: z.string(),
  descendants: z.number(),
  kids: z.array(z.number()),
  score: z.number(),
  time: z.number(),
  title: z.string(),
  type: z.literal('story'),
  url: z.string()
});
export type Story = z.infer<typeof storySchema>;

export const commentSchema = z.object({
  id: z.number(),
  by: z.string(),
  kids: z.array(z.number()),
  parent: z.number(),
  text: z.string(),
  time: z.number(),
  type: z.literal('comment')
});
export type Comment = z.infer<typeof commentSchema>;

export const userSchema = z.object({
  id: z.string(),
  about: z.string(),
  created: z.number(),
  karma: z.number(),
  submitted: z.array(z.number())
});
export type User = z.infer<typeof userSchema>;

export const jobSchema = z.object({
  id: z.number(),
  by: z.string(),
  score: z.number(),
  time: z.number(),
  title: z.string(),
  type: z.literal('job'),
  url: z.string()
});
export type Job = z.infer<typeof jobSchema>;

export const postSchema = z.discriminatedUnion('type', [
  storySchema,
  jobSchema
]);
export type Post = z.infer<typeof postSchema>;

export const itemSchema = z.discriminatedUnion('type', [
  storySchema,
  commentSchema,
  jobSchema
]);
export type Item = z.infer<typeof itemSchema>;