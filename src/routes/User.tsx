import { useQuery } from '@tanstack/react-query';
import dayjs from '../lib/dayjs';
import fetcher from '../helpers/fetcher';
import { userSchema } from '../schemas';
import DOMPurify from 'dompurify';

export default function User({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/user/${id}.json`,
        userSchema
      )
  });
  if (isLoading) {
    return (
      <div className='px-2 sm:px-20'>
        <h1 className='h-9 w-32 my-px bg-gray-500 rounded-lg'></h1>
        <p className='h-6 w-20 my-px bg-gray-600 rounded-lg'></p>
        <p className='h-6 w-60 my-px bg-gray-600 rounded-lg'></p>
      </div>
    );
  }
  if (isError) {
    return <div>Error while loading user data</div>;
  }
  return (
    <div className='px-2 sm:px-20'>
      <h1 className='text-3xl'>{data.id}</h1>
      <p title={data.karma.toString()}>
        Karma:{' '}
        {Intl.NumberFormat('en', { notation: 'compact' }).format(data.karma)}
      </p>
      <p>Created: {dayjs(data.created * 1000).format('LLL')}</p>
      {data.about ? (
        <>
          <p>About:</p>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.about) }}
          ></div>
        </>
      ) : null}
    </div>
  );
}
