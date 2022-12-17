import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import Loader from '../routes/Loader';
import { postSchema } from '../schemas';

export default function PostSummary({ id }: { id: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        postSchema
      )
  });
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='p-2'>
      <div>
        <a href={data.url}>{data.title}</a>
      </div>
      <div className='flex gap-2'>
        <div className='w-10'>{data.score}</div>
        {data.type === 'story' && <div>{data.descendants} comments</div>}
        <div>by {data.by}</div>
      </div>
    </div>
  );
}
