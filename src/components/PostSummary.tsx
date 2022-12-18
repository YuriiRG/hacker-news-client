import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { postSchema } from '../schemas';
import PostSummarySkeleton from './PostSummarySkeleton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Link } from 'wouter';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
export default function PostSummary({ id }: { id: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        postSchema
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

  return (
    <div>
      <a
        href={data.url}
        target='_blank'
        rel='noreferrer'
        className='hover:underline visited:text-gray-500'
      >
        {data.title}
      </a>
      <div className='text-sm text-gray-500'>
        {data.score} points by{' '}
        <Link href={`/user/${data.by}`} className='hover:underline'>
          {data.by}
        </Link>{' '}
        <span
          title={dayjs(data.time * 1000).format('LLLL')}
          className='text-gray-500'
        >
          {dayjs(data.time * 1000).fromNow()}
        </span>{' '}
        {data.type === 'story' ? (
          <>
            |{' '}
            <Link href={`/item/${data.id}`} className='hover:underline'>
              {data.descendants} comments
            </Link>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
