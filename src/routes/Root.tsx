import { useQueries, useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { z } from 'zod';
import Loader from './Loader';
import PostSummary from '../components/PostSummary';
import { Post, postSchema } from '../schemas';
import PostSummarySkeleton from '../components/PostSummarySkeleton';
export default function Root() {
  const postCount = 30;

  const {
    data: ids,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['topstories'],
    queryFn: () =>
      fetcher(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
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

  if (postResponses.some((post) => post.isError)) {
    return <div className='p-3'>Error.</div>;
  }

  if (
    postResponses.some((post) => post.data === undefined) ||
    postResponses.length === 0
  ) {
    return (
      <div className='p-3'>
        {[...Array(postCount)].map((_, i) => (
          <PostSummarySkeleton key={i} />
        ))}
      </div>
    );
  }

  const posts = postResponses.map((res) => res.data as Post);
  return (
    <div className='p-3'>
      {posts.map((post) => (
        <PostSummary key={post.id} id={post.id} />
      ))}
    </div>
  );
}
