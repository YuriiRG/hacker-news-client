import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { itemSchema } from '../schemas';
import PostSummarySkeleton from './PostSummarySkeleton';
import { Link } from 'wouter';
import FeedLink from './FeedLink';
import dayjs from '../lib/dayjs';
import PostDetails from './PostDetails';

export default function PostSummary({ id }: { id: number }) {
  const {
    data: item,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        itemSchema
      ),
    keepPreviousData: true,
    staleTime: 1500
  });
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <PostSummarySkeleton />;
  }
  if (item.type === 'pollopt' || item.type === 'comment') {
    return <>Invalid item type</>;
  }
  return (
    <div>
      {item.title ? (
        <>
          <FeedLink
            href={item.url ?? `/item/${item.id}`}
            domain={item.url ? ` (${new URL(item.url).hostname})` : <></>}
          >
            {item.title}
          </FeedLink>{' '}
          {item.url ? (
            <Link
              href={`/item/${item.id}`}
              className='hover:underline visited:text-gray-400'
            >
              [comments]
            </Link>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <div></div>
      <PostDetails item={item} />
    </div>
  );
}
