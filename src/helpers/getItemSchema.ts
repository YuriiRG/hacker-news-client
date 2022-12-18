import { askSchema, commentSchema, jobSchema, storySchema } from '../schemas';
import type { Item } from '../schemas';

const getItemSchema = (input: Item) =>
  [storySchema, commentSchema, askSchema, jobSchema]
    .map((schema) => ({
      schema,
      isValid: schema.safeParse(input).success
    }))
    .find((result) => result.isValid)?.schema;

export default getItemSchema;
