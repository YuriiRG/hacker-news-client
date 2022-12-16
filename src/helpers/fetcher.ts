import { z } from 'zod';
export default async function fetcher<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
