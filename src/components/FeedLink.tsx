import { ReactNode } from 'react';

type FeedLinkProps = {
  children: ReactNode;
  href: string;
  domain?: ReactNode;
};

export default function FeedLink({
  children,
  href,
  domain = ''
}: FeedLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='hover:underline text-lg leading-none visited:text-gray-400 font-semibold'
    >
      {children}
      <span className='text-base font-normal'>{domain}</span>
    </a>
  );
}
