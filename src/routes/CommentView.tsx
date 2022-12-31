import { useQuery } from '@tanstack/react-query';
import dayjs from '../lib/dayjs';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import fetcher from '../helpers/fetcher';
import { commentSchema, itemSchema } from '../schemas';
import { Link } from 'wouter';

export default function CommentView({
  id,
  level
}: {
  id: number;
  level: number;
}) {
  const [kidsLimit, setKidsLimit] = useState(10);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        commentSchema
      )
  });
  const [showDeeper, setShowDeeper] = useState(false);
  const children = (
    <>
      {data?.kids?.slice(0, kidsLimit).map((commentId) => (
        <CommentView key={commentId} id={commentId} level={level + 1} />
      ))}
      {kidsLimit < (data?.kids?.length ?? 0) && (
        <button
          className='p-2 hover:underline'
          onClick={() => setKidsLimit((mc) => mc + 10)}
        >
          Show more comments
        </button>
      )}
    </>
  );
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <></>;
  }
  if (!data.text) {
    return <></>;
  }
  return (
    <div>
      <div
        className='
          mt-10 bg-gray-700 p-2 rounded max-w-prose
          hover:[&_a]:underline [&_pre]:break-words [&_pre]:whitespace-pre-wrap
        '
      >
        <div className='text-sm text-gray-400'>
          by{' '}
          <Link href={`/user/${data.by}`} className='hover:underline'>
            {data.by}
          </Link>{' '}
          <span title={dayjs(data.time * 1000).format('LLLL')}>
            {dayjs(data.time * 1000).fromNow()}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
        ></div>
      </div>

      <div className='ml-10'>
        {data.kids &&
          (level % 2 !== 0 ? (
            children
          ) : showDeeper ? (
            children
          ) : (
            <button
              onClick={() => setShowDeeper(true)}
              className='mt-2 px-2 py-1 rounded-lg hover:underline'
            >
              Show deeper comments
            </button>
          ))}
      </div>
    </div>
  );
}
