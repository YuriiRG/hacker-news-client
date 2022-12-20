import { useQueries, useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { z } from 'zod';
import PostSummary from '../components/PostSummary';
import PostSummarySkeleton from '../components/PostSummarySkeleton';
import { Post, postSchema } from '../schemas';
export default function Feed({ type }: { type: 'new' | 'best' | 'top' }) {
  const postCount = 30;

  const { data: ids, isError } = useQuery({
    queryKey: [`${type}stories`],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/${type}stories.json`,
        z.array(z.number())
      ),
    select: (arr) => arr.slice(0, postCount)
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
            keepPreviousData: true,
            staleTime: 1500
          }))
        : []
  });

  if (postResponses.some((post) => post.isError) || isError) {
    return <div className='p-3'>Error.</div>;
  }

  if (
    postResponses.some((post) => post.data === undefined) ||
    postResponses.length === 0
  ) {
    return (
      <div className='m-2 flex flex-col items-center'>
        <div className='flex flex-col gap-2 max-w-prose break-words'>
          {[...Array(postCount)].map((_, i) => (
            <PostSummarySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const posts = postResponses.map((res) => res.data as Post);
  return (
    <div className='m-2 flex flex-col items-center'>
      <div className='flex flex-col gap-2 max-w-prose break-words'>
        {posts.map((post) => (
          <PostSummary key={post.id} id={post.id} />
        ))}
      </div>
    </div>
  );
}
