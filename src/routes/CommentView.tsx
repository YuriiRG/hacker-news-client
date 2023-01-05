import { useQuery } from '@tanstack/react-query';
import dayjs from '../lib/dayjs';
import DOMPurify from 'dompurify';
import { ReactNode, useEffect, useState } from 'react';
import fetcher from '../helpers/fetcher';
import { commentSchema, itemSchema, Comment } from '../schemas';
import { Link } from 'wouter';
import Post from '../components/Post';
export default function CommentView({
  id,
  level = 1,
  children,
  showParent = false,
  highlight = false
}: {
  id: number;
  level?: number;
  children?: ReactNode;
  showParent?: boolean;
  highlight?: boolean;
}) {
  const [kidsLimit, setKidsLimit] = useState(10);
  const {
    data: item,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['item', id],
    queryFn: () =>
      fetcher(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        itemSchema
      )
  });
  const [showDeeper, setShowDeeper] = useState(false);

  let data: Comment | undefined;

  if (isError) {
    return <>Error.</>;
  }

  if (!commentSchema.safeParse(item).success) {
    if (isLoading) {
      // Loading
      return showParent ? (
        <>
          Loading...
          {children}
        </>
      ) : (
        <div className='h-10'></div>
      );
    } else {
      // Recursion edge case
      return (
        <>
          <Post item={item} />
          <div className='rounded-lg bg-teal-800 mt-5 w-fit'>
            <Link
              href={`/item/${item.id}`}
              className='block p-4 underline hover:text-gray-200'
            >
              Open main post
            </Link>
          </div>
          <ScrollToHighlight />
          {children}
        </>
      );
    }
  } else {
    data = commentSchema.parse(item);
  }
  if (isError) {
    return <>Error.</>;
  }
  if (!data?.text || data.deleted || data.dead) {
    return <></>;
  }

  if (children === undefined) {
    children = (
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
  }
  const mainMarkup = (
    <>
      <div
        className={
          'mt-10 bg-gray-700 p-2 rounded max-w-prose break-words ' +
          'hover:[&_a]:underline [&_pre]:break-words [&_pre]:whitespace-pre-wrap ' +
          (highlight ? 'border-teal-500 border-2' : '')
        }
        id={highlight ? 'highlight' : undefined}
      >
        <div className='flex gap-3 flex-wrap text-sm text-gray-400'>
          <div>
            by{' '}
            <Link href={`/user/${data.by}`} className='hover:underline'>
              {data.by}
            </Link>{' '}
            <span title={dayjs(data.time * 1000).format('LLLL')}>
              {dayjs(data.time * 1000).fromNow()}
            </span>
          </div>
          <Link href={`/comment/${data.id}`} className='hover:underline'>
            link
          </Link>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
        ></div>
      </div>

      <div className='ml-[5%] sm:ml-[3%]'>
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
    </>
  );
  return showParent ? (
    <CommentView id={data.parent} showParent>
      {mainMarkup}
    </CommentView>
  ) : (
    <div>{mainMarkup}</div>
  );
}

function ScrollToHighlight() {
  useEffect(() => {
    document
      .querySelector('#highlight')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return <></>;
}
