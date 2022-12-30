import { useQueries, useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { z } from 'zod';
import PostSummary from '../components/PostSummary';
import PostSummarySkeleton from '../components/PostSummarySkeleton';
import { Item, itemSchema } from '../schemas';
import { useState } from 'react';
export default function Feed({ type }: { type: 'new' | 'best' | 'top' }) {
  const [postCount, setPostCount] = useState(30);

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
                itemSchema
              ),
            staleTime: 1500
          }))
        : []
  });

  if (postResponses.some((post) => post.isError) || isError) {
    return <div className='p-3'>Error.</div>;
  }

  if (postResponses.length === 0) {
    return (
      <div className='mx-2 my-4 flex justify-center'>
        <div className='flex flex-col w-prose gap-6'>
          {[...Array(postCount)].map((_, i) => (
            <PostSummarySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const posts = postResponses.map((res) => res.data as Item | undefined);
  return (
    <div className='mx-2 my-4 flex justify-center'>
      <div className='flex flex-col gap-6 w-prose break-words'>
        {posts.map(
          (post) => post && <PostSummary key={post.id} id={post.id} />
        )}
        <button
          className='py-2 px-4 bg-gray-700 self-center rounded-lg font-semibold'
          onClick={() => setPostCount((pc) => pc + 30)}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
