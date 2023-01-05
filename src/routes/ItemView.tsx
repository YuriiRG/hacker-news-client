import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { Link } from 'wouter';
import Post from '../components/Post';
import PostDetails from '../components/PostDetails';
import fetcher from '../helpers/fetcher';
import { itemSchema } from '../schemas';
import CommentView from './CommentView';

export default function ItemView({ id }: { id: number }) {
  const {
    data: item,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        itemSchema
      )
  });
  const [maxComments, setMaxComments] = useState(10);
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <></>;
  }
  return (
    <div className='px-4 pb-4'>
      <Post item={item} />
      <div>
        {item.kids && (
          <>
            {item.kids.slice(0, maxComments).map((commentId) => (
              <CommentView key={commentId} id={commentId} level={1} />
            ))}
            {item.kids.length > maxComments && (
              <button
                className='hover:underline p-2'
                onClick={() => setMaxComments((mc) => mc + 10)}
              >
                Show more comments
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
