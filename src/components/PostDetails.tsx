import { Link } from 'wouter';
import dayjs from '../lib/dayjs';
import { Item } from '../schemas';
import { TbThumbUp, TbMessages } from 'react-icons/tb';
export default function PostDetails({ item }: { item: Item }) {
  return (
    <div className='flex items-start text-sm gap-2 text-gray-400 mt-1'>
      {item.score !== undefined ? (
        <div className='flex gap-1' title={`${item.score} points`}>
          <TbThumbUp className='h-4 w-4 self-center flex-none' />
          {Intl.NumberFormat('en', { notation: 'compact' }).format(item.score)}
        </div>
      ) : (
        <></>
      )}
      {item.descendants !== undefined ? (
        <div className='flex gap-1' title={`${item.descendants} comments`}>
          <TbMessages className='h-4 w-4 self-center flex-none' />

          {Intl.NumberFormat('en', { notation: 'compact' }).format(
            item.descendants
          )}
        </div>
      ) : (
        <></>
      )}
      <div>
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
      </div>
    </div>
  );
}
