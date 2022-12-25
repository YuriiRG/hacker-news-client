import { Link } from 'wouter';
import dayjs from '../lib/dayjs';
import { Item } from '../schemas';

export default function PostDetails({ item }: { item: Item }) {
  return (
    <>
      {item.score !== undefined ? (
        <>
          <span title={item.score.toString()}>
            {Intl.NumberFormat('en', { notation: 'compact' }).format(
              item.score
            )}
          </span>{' '}
          points{' '}
        </>
      ) : (
        ''
      )}
      {item.by ? (
        <>
          by{' '}
          <Link href={`/user/${item.by}`} className='hover:underline'>
            {item.by}
          </Link>{' '}
        </>
      ) : (
        ''
      )}
      <span title={dayjs(item.time * 1000).format('LLLL')}>
        {dayjs(item.time * 1000).fromNow()}
      </span>
      {item.descendants !== undefined ? (
        <>
          {' '}
          |{' '}
          <Link href={`/item/${item.id}`} className='hover:underline'>
            {item.descendants} comments
          </Link>
        </>
      ) : (
        ''
      )}
    </>
  );
}
