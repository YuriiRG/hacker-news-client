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

export const commentSchema = z.object({
  id: z.number(),
  by: z.string(),
  kids: z.array(z.number()),
  parent: z.number(),
  text: z.string(),
  time: z.number(),
  type: z.literal('comment')
});

export const userSchema = z.object({
  id: z.string(),
  about: z.string(),
  created: z.number(),
  karma: z.number(),
  submitted: z.array(z.number())
});

export const itemSchema = z.discriminatedUnion('type', [
  storySchema,
  commentSchema
]);
