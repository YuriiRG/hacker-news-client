import DOMPurify from 'dompurify';
import { Item } from '../schemas';
import PostDetails from './PostDetails';

export default function Post({ item }: { item: Item }) {
  return (
    <>
      {item.title && (
        <h1 className='text-3xl'>
          {item.url ? (
            <a href={item.url} className='hover:underline'>
              {item.title}
            </a>
          ) : (
            item.title
          )}
        </h1>
      )}
      <div className='text-gray-400'>
        <PostDetails item={item} />
      </div>
      {item.text && (
        <p
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
          className='hover:[&_a]:underline [&_a]:text-blue-200'
        ></p>
      )}
    </>
  );
}
