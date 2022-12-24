import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import fetcher from '../helpers/fetcher';
import { commentSchema } from '../schemas';

export default function CommentView({
  id,
  level
}: {
  id: number;
  level: number;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        commentSchema
      )
  });
  const [showDeeper, setShowDeeper] = useState(false);
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div
        className='mt-10 bg-gray-700 p-2 rounded hover:[&_a]:underline [&_pre]:break-words [&_pre]:whitespace-pre-wrap max-w-prose'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
      ></div>

      <div className='ml-10'>
        {data.kids ? (
          level % 2 !== 0 ? (
            data.kids.map((commentId) => (
              <CommentView key={commentId} id={commentId} level={level + 1} />
            ))
          ) : showDeeper ? (
            data.kids.map((commentId) => (
              <CommentView key={commentId} id={commentId} level={level + 1} />
            ))
          ) : (
            <button
              onClick={() => setShowDeeper(true)}
              className='mt-2 px-2 py-1 rounded-lg hover:underline'
            >
              Show deeper comments
            </button>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
