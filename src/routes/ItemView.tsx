import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { Link } from 'wouter';
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
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div className='px-4'>
      {item.title ? (
        <h1 className='text-3xl'>
          {item.url ? (
            <Link href={item.url} className='hover:underline'>
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h1>
      ) : (
        <></>
      )}
      <div className='text-gray-400'>
        <PostDetails item={item} />
      </div>
      {item.text ? (
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
          className='hover:[&_a]:underline [&_a]:text-blue-200'
        ></p>
      ) : (
        <></>
      )}
      <div>
        {item.kids ? (
          item.kids.map((commentId) => (
            <CommentView key={commentId} id={commentId} level={1} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
