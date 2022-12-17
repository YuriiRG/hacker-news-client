import { useQuery, useQueries } from '@tanstack/react-query';
import fetcher from '../helpers/fetcher';
import { z } from 'zod';
import { postSchema } from '../schemas';
import Loader from './Loader';
import PostSummary from '../components/PostSummary';
export default function Root() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['topstories'],
    queryFn: async () =>
      (
        await fetcher(
          'https://hacker-news.firebaseio.com/v0/topstories.json',
          z.array(z.number())
        )
      ).slice(0, 30),
    keepPreviousData: true
  });
  if (isError) {
    return <>Error</>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='p-3'>
      {data.map((id) => (
        <PostSummary key={id} id={id} />
      ))}
    </div>
  );
}
