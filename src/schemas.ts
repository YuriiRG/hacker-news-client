import { z } from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  by: z.string(),
  kids: z.array(z.number()).optional(),
  parent: z.number(),
  text: z.string(),
  time: z.number(),
  type: z.literal('comment')
});
export type Comment = z.infer<typeof commentSchema>;

export const userSchema = z.object({
  id: z.string(),
  about: z.string().optional(),
  created: z.number(),
  karma: z.number(),
  submitted: z.array(z.number()).optional()
});
export type User = z.infer<typeof userSchema>;

export const itemSchema = z.object({
  id: z.number(),
  deleted: z.boolean().optional(),
  type: z.enum(['story', 'job', 'comment', 'poll', 'pollopt']),
  by: z.string(),
  time: z.number(),
  text: z.string().optional(),
  dead: z.boolean().optional(),
  parent: z.number().optional(),
  poll: z.number().optional(),
  kids: z.array(z.number()).optional(),
  url: z.string().optional(),
  score: z.number().optional(),
  title: z.string().optional(),
  parts: z.array(z.number()).optional(),
  descendants: z.number().optional()
});
export type Item = z.infer<typeof itemSchema>;
