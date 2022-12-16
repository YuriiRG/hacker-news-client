import { useQuery, useQueries } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { z } from 'zod';
import { postSchema } from '../schemas';
export default function Root() {
  const { data: ids } = useQuery({
    queryKey: ['topstories'],
    queryFn: async () =>
      (
        await fetcher(
          'https://hacker-news.firebaseio.com/v0/topstories.json',
          z.array(z.number())
        )
      ).slice(0, 30),
    keepPreviousData: true
  });

  const postResponses = useQueries({
    queries:
      ids !== undefined
        ? ids.map((id) => ({
            queryKey: ['item', id],
            queryFn: () =>
              fetcher(
                `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
                postSchema
              ),
            keepPreviousData: true
          }))
        : []
  });

  if (postResponses.some((post) => post.isError)) {
    return <div className='p-3'>Error.</div>;
  }

  if (
    postResponses.some((post) => post.data === undefined) ||
    postResponses.length === 0
  ) {
    return <div className='p-3'>Loading...</div>;
  }

  const posts = postResponses.map(
    (res) => res.data as z.infer<typeof postSchema>
  );

  return (
    <div className='p-3'>
      {posts.map((post) => (
        <div key={post.id}>
          {post.score}: {post.title}
        </div>
      ))}
    </div>
  );
}
