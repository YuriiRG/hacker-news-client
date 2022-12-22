import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { itemSchema } from '../schemas';
import PostSummarySkeleton from './PostSummarySkeleton';
import { Link } from 'wouter';
import FeedLink from './FeedLink';
import dayjs from '../lib/dayjs';

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
        <FeedLink href={item.url ?? `/item/${item.id}`}>{item.title}</FeedLink>
      ) : (
        <></>
      )}
      <div className='text-sm text-gray-400'>
        {item.score !== undefined ? (
          <>
            <span title={item.score.toString()}>
              {Intl.NumberFormat('en', { notation: 'compact' }).format(
                item.score
              )}
            </span>{' '}
            points{' '}
          </>
        ) : (
          ''
        )}
        {item.by ? (
          <>
            by{' '}
            <Link href={`/user/${item.by}`} className='hover:underline'>
              {item.by}
            </Link>{' '}
          </>
        ) : (
          ''
        )}
        <span title={dayjs(item.time * 1000).format('LLLL')}>
          {dayjs(item.time * 1000).fromNow()}
        </span>
        {item.descendants !== undefined ? (
          <>
            {' '}
            |{' '}
            <Link href={`/item/${item.id}`} className='hover:underline'>
              {item.descendants} comments
            </Link>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
