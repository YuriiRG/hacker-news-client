import { useQuery } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { postSchema } from '../schemas';

export default function PostSummary({ id }: { id: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        postSchema
      ),
    keepPreviousData: true
  });
  if (isError) {
    return <>Error.</>;
  }
  if (isLoading) {
    return (
      <div className='flex gap-1 p-1'>
        <div className='w-10 h-6 bg-gray-600 rounded-lg'></div>
        <div className='w-10 h-6 bg-gray-600 rounded-lg'></div>
        <div className='w-96 h-6 bg-gray-600 rounded-lg'></div>
      </div>
    );
  }

  return (
    <div className='flex gap-1 p-1'>
      <div className='w-10'>{data.score}</div>
      {data.type === 'story' && <div className='w-10'>{data.descendants}</div>}
      <a href={data.url}>{data.title}</a>
    </div>
  );
}
