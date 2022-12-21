import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import {
  Ask,
  askSchema,
  Job,
  jobSchema,
  postSchema,
  Story,
  storySchema
} from '../schemas';
import PostSummarySkeleton from './PostSummarySkeleton';
import { Link } from 'wouter';
import getItemSchema from '../helpers/getItemSchema';
import FeedLink from './FeedLink';
import dayjs from '../lib/dayjs';

export default function PostSummary({ id }: { id: number }) {
  const {
    data: post,
    isLoading,
    isError
  } = useQuery({
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

  const sharedCaption = (
    <>
      {post.score} points by{' '}
      <Link href={`/user/${post.by}`} className='hover:underline'>
        {post.by}
      </Link>{' '}
      <span
        title={dayjs(post.time * 1000).format('LLLL')}
        className='text-gray-500'
      >
        {dayjs(post.time * 1000).fromNow()}
      </span>{' '}
    </>
  );
  switch (getItemSchema(post)) {
    case storySchema: {
      const story = post as Story;
      return (
        <div>
          <FeedLink href={story.url}>{story.title}</FeedLink>
          <div className='text-sm text-gray-500'>
            {sharedCaption}|{' '}
            <Link href={`/item/${story.id}`} className='hover:underline'>
              {story.descendants} comments
            </Link>
          </div>
        </div>
      );
    }
    case jobSchema: {
      const job = post as Job;
      return (
        <div>
          <FeedLink href={job.url}>{job.title}</FeedLink>
          <div className='text-sm text-gray-500'>{sharedCaption}</div>
        </div>
      );
    }
    case askSchema: {
      const ask = post as Ask;
      return (
        <div>
          <FeedLink href={`/item/${ask.id}`}>{ask.title}</FeedLink>
          <div className='text-sm text-gray-500'>
            {sharedCaption} |{' '}
            <Link href={`/item/${ask.id}`} className='hover:underline'>
              {ask.descendants} comments
            </Link>
          </div>
        </div>
      );
    }
    default:
      console.log(post);
      return <div>Error: Unknown post type</div>;
  }
}
