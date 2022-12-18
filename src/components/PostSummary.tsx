import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import {
  Ask,
  askSchema,
  itemSchema,
  Job,
  jobSchema,
  Story,
  storySchema
} from '../schemas';
import PostSummarySkeleton from './PostSummarySkeleton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Link } from 'wouter';
import getItemSchema from '../helpers/getItemSchema';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
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

  const sharedCaption = (
    <>
      by{' '}
      <Link href={`/user/${item.by}`} className='hover:underline'>
        {item.by}
      </Link>{' '}
      <span
        title={dayjs(item.time * 1000).format('LLLL')}
        className='text-gray-500'
      >
        {dayjs(item.time * 1000).fromNow()}
      </span>{' '}
    </>
  );
  switch (getItemSchema(item)) {
    case storySchema: {
      const story = item as Story;
      return (
        <div>
          <a
            href={story.url}
            target='_blank'
            rel='noreferrer'
            className='hover:underline visited:text-gray-500'
          >
            {story.title}
          </a>
          <div className='text-sm text-gray-500'>
            {story.score} points {sharedCaption}|{' '}
            <Link href={`/item/${story.id}`} className='hover:underline'>
              {story.descendants} comments
            </Link>
          </div>
        </div>
      );
    }
    case jobSchema: {
      const job = item as Job;
      return (
        <div>
          <a
            href={job.url}
            target='_blank'
            rel='noreferrer'
            className='hover:underline visited:text-gray-500'
          >
            {job.title}
          </a>
          <div className='text-sm text-gray-500'>
            {job.score} points {sharedCaption}
          </div>
        </div>
      );
    }
    case askSchema: {
      const ask = item as Ask;
      return (
        <div>
          <a
            href={`/item/${ask.id}`}
            target='_blank'
            rel='noreferrer'
            className='hover:underline visited:text-gray-500'
          >
            {ask.title}
          </a>
          <div className='text-sm text-gray-500'>
            {ask.score} points {sharedCaption} |{' '}
            <Link href={`/item/${ask.id}`} className='hover:underline'>
              {ask.descendants} comments
            </Link>
          </div>
        </div>
      );
    }
    default:
      console.log(item);
      return <div>Error: Unknown item type</div>;
  }
}
